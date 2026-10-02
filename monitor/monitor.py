#!/usr/bin/env python3
"""
Porto-GW Health Monitor & Self-Healing Service
------------------------------------------------
Memantau kesehatan portfolio site neverland.my.id secara berkala,
mengirim notifikasi via Email/Telegram/Discord saat down & recovery,
serta melakukan auto self-healing pada container & Caddy.
"""
import os
import sys
import time
import json
import urllib.request
import urllib.error
import subprocess
import socket
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

# ---------------------------------------------------------------------------
# Config Loader
# ---------------------------------------------------------------------------
CONFIG_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "config.env")

def load_env(filepath):
    config = {}
    if os.path.exists(filepath):
        with open(filepath, "r") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    config[k.strip()] = v.strip()
    return config

config = load_env(CONFIG_PATH)

# ---------------------------------------------------------------------------
# Constants from config
# ---------------------------------------------------------------------------
CHECK_INTERVAL   = int(config.get("CHECK_INTERVAL", 30))
CONTAINER_NAME   = config.get("DOCKER_CONTAINER_NAME", "porto-nopal-app")
PUBLIC_DOMAIN    = config.get("PUBLIC_DOMAIN", "neverland.my.id")
AUTO_HEAL        = config.get("AUTO_HEAL", "true").lower() == "true"

TELEGRAM_BOT_TOKEN = config.get("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID   = config.get("TELEGRAM_CHAT_ID", "")
WEBHOOK_URL        = config.get("WEBHOOK_URL", "")

ENABLE_EMAIL = config.get("ENABLE_EMAIL", "false").lower() == "true"
SMTP_HOST    = config.get("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT    = int(config.get("SMTP_PORT", 465))
SMTP_USER    = config.get("SMTP_USER", "")
SMTP_PASS    = config.get("SMTP_PASS", "")
EMAIL_TO     = config.get("EMAIL_TO", "")

LOG_FILE = config.get(
    "LOG_FILE",
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "monitor.log")
)

# ---------------------------------------------------------------------------
# Endpoints to monitor
# ---------------------------------------------------------------------------
ENDPOINTS = [
    {
        "name": "Next.js App (internal :3579)",
        "url": "http://127.0.0.1:3579",
        "is_caddy": False,
    },
    {
        "name": f"Caddy Proxy → {PUBLIC_DOMAIN}",
        "url": f"https://{PUBLIC_DOMAIN}",
        "is_caddy": True,
    },
]

# ---------------------------------------------------------------------------
# State
# ---------------------------------------------------------------------------
is_currently_down  = False
last_error_reason  = ""

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
def log(msg: str, level: str = "INFO"):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    entry = f"[{timestamp}] [{level}] {msg}"
    print(entry, flush=True)
    try:
        os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)
        with open(LOG_FILE, "a") as f:
            f.write(entry + "\n")
    except Exception as e:
        print(f"[LOG WRITE ERROR] {e}", flush=True)

# ---------------------------------------------------------------------------
# Health Checks
# ---------------------------------------------------------------------------
def check_http(url: str, timeout: int = 8) -> tuple[bool, str]:
    """Return (ok, reason). Accepts 200/301/302/307/308."""
    try:
        req = urllib.request.Request(
            url,
            headers={"User-Agent": "Porto-Monitor/1.0"}
        )
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            if resp.status in (200, 301, 302, 307, 308):
                return True, f"HTTP {resp.status}"
            return False, f"Unexpected HTTP {resp.status}"
    except urllib.error.HTTPError as e:
        return False, f"HTTP Error {e.code}"
    except urllib.error.URLError as e:
        return False, f"URL Error: {e.reason}"
    except Exception as e:
        return False, str(e)


def check_docker_container(name: str) -> tuple[bool, str]:
    """Return (ok, reason) after inspecting docker container status."""
    try:
        result = subprocess.run(
            ["docker", "inspect", "--format",
             "{{.State.Status}}|{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}",
             name],
            capture_output=True, text=True, timeout=10
        )
        if result.returncode != 0:
            return False, f"Container '{name}' tidak ditemukan atau Docker error"

        parts = result.stdout.strip().split("|")
        state   = parts[0] if len(parts) > 0 else "unknown"
        health  = parts[1] if len(parts) > 1 else "none"

        if state != "running":
            return False, f"Container status: {state}"
        if health not in ("healthy", "none"):
            return False, f"Container unhealthy (health: {health})"
        return True, f"running / {health}"
    except subprocess.TimeoutExpired:
        return False, "docker inspect timed out"
    except FileNotFoundError:
        return False, "docker binary tidak ditemukan"
    except Exception as e:
        return False, str(e)

# ---------------------------------------------------------------------------
# Notification Helpers
# ---------------------------------------------------------------------------
def send_telegram(text: str):
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        return
    try:
        url  = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
        data = json.dumps({
            "chat_id": TELEGRAM_CHAT_ID,
            "text": text,
            "parse_mode": "Markdown"
        }).encode("utf-8")
        req = urllib.request.Request(
            url, data=data,
            headers={"Content-Type": "application/json", "User-Agent": "Porto-Monitor/1.0"}
        )
        urllib.request.urlopen(req, timeout=8)
        log("Telegram notification sent.")
    except Exception as e:
        log(f"Telegram send failed: {e}", level="ERROR")


def send_webhook(title: str, description: str, is_down: bool):
    if not WEBHOOK_URL:
        return
    try:
        color   = 0xFF4444 if is_down else 0x44FF88
        payload = {
            "embeds": [{
                "title": title,
                "description": description,
                "color": color,
                "footer": {"text": f"Porto-Monitor | {PUBLIC_DOMAIN}"},
                "timestamp": datetime.utcnow().isoformat() + "Z",
            }]
        }
        data = json.dumps(payload).encode("utf-8")
        req  = urllib.request.Request(
            WEBHOOK_URL, data=data,
            headers={"Content-Type": "application/json", "User-Agent": "Porto-Monitor/1.0"}
        )
        urllib.request.urlopen(req, timeout=8)
        log("Webhook notification sent.")
    except Exception as e:
        log(f"Webhook send failed: {e}", level="ERROR")


def send_email(subject: str, body: str):
    if not ENABLE_EMAIL or not SMTP_USER or not SMTP_PASS or not EMAIL_TO:
        return
    try:
        msg = MIMEMultipart()
        msg["From"]    = SMTP_USER
        msg["To"]      = EMAIL_TO
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))

        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=context, timeout=12) as server:
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, EMAIL_TO, msg.as_string())
        log(f"Email alert sent to {EMAIL_TO}.")
    except Exception as e:
        log(f"Email send failed: {e}", level="ERROR")

# ---------------------------------------------------------------------------
# Alert & Recovery Triggers
# ---------------------------------------------------------------------------
def trigger_alert(title: str, reason: str, heal_action: str = ""):
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S WIB")
    text  = f"🚨 *ALERT: {title}*\n\n"
    text += f"⏰ *Waktu:* {ts}\n"
    text += f"❌ *Detail:* {reason}\n"
    if heal_action:
        text += f"🔧 *Auto-Heal:* {heal_action}\n"
    text += f"🌐 *Site:* https://{PUBLIC_DOMAIN}"

    log(f"ALERT triggered: {title} — {reason}", level="WARNING")
    send_telegram(text)
    send_webhook(f"🚨 ALERT: {title}", reason, is_down=True)
    send_email(f"🚨 ALERT: {title}", text)


def trigger_recovery(title: str, details: str = ""):
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S WIB")
    text  = f"✅ *RECOVERY: {title}*\n\n"
    text += f"⏰ *Waktu:* {ts}\n"
    text += f"🎉 *Status:* Layanan telah kembali normal!\n"
    if details:
        text += f"ℹ️ *Info:* {details}\n"
    text += f"🌐 *Site:* https://{PUBLIC_DOMAIN}"

    log(f"RECOVERY: {title}", level="INFO")
    send_telegram(text)
    send_webhook(f"✅ RECOVERY: {title}", "Layanan telah kembali normal!", is_down=False)
    send_email(f"✅ RECOVERY: {title}", text)

# ---------------------------------------------------------------------------
# Auto Self-Healing
# ---------------------------------------------------------------------------
def auto_heal(container_failed: bool, caddy_failed: bool) -> str:
    actions = []

    if container_failed:
        log(f"Auto Self-Healing: restarting container '{CONTAINER_NAME}'...", level="WARNING")
        try:
            res = subprocess.run(
                ["docker", "restart", CONTAINER_NAME],
                capture_output=True, text=True, timeout=30
            )
            if res.returncode == 0:
                actions.append(f"Container `{CONTAINER_NAME}` berhasil di-restart.")
            else:
                actions.append(f"Gagal restart container: {res.stderr.strip()}")
        except Exception as e:
            actions.append(f"Gagal restart container: {e}")

    if caddy_failed:
        log("Auto Self-Healing: restarting Caddy service...", level="WARNING")
        for cmd in [["sudo", "systemctl", "restart", "caddy"], ["systemctl", "restart", "caddy"]]:
            try:
                res = subprocess.run(cmd, capture_output=True, text=True, timeout=15)
                if res.returncode == 0:
                    actions.append("Caddy berhasil di-restart.")
                    break
                # try next
            except Exception:
                continue
        else:
            actions.append("Gagal restart Caddy.")

    return " | ".join(actions) if actions else "Tidak ada tindakan otomatis."

# ---------------------------------------------------------------------------
# Main Health Check Loop
# ---------------------------------------------------------------------------
def run_health_checks() -> tuple[bool, str, dict]:
    """Returns (ok, summary_message, fail_flags)."""
    fail_flags = {"container": False, "caddy": False}

    # 1. Docker container check
    docker_ok, docker_msg = check_docker_container(CONTAINER_NAME)
    if not docker_ok:
        fail_flags["container"] = True
        return False, f"Docker container issue: {docker_msg}", fail_flags

    # 2. HTTP endpoint checks
    failed = []
    for ep in ENDPOINTS:
        ok, msg = check_http(ep["url"])
        if not ok:
            failed.append(f"{ep['name']} → {msg}")
            if ep["is_caddy"]:
                fail_flags["caddy"] = True
            else:
                fail_flags["container"] = True

    if failed:
        return False, "Endpoint gagal: " + "; ".join(failed), fail_flags

    return True, f"Semua layanan (Docker, Next.js :3579, Caddy {PUBLIC_DOMAIN}) normal", fail_flags


def main():
    global is_currently_down, last_error_reason

    log("=" * 60)
    log(f"Porto-GW Health Monitor starting...")
    log(f"Container : {CONTAINER_NAME}")
    log(f"Domain    : {PUBLIC_DOMAIN}")
    log(f"Interval  : {CHECK_INTERVAL}s | Auto-Heal: {AUTO_HEAL}")
    log(f"Email     : {'on' if ENABLE_EMAIL else 'off'} | "
        f"Telegram: {'on' if TELEGRAM_BOT_TOKEN else 'off'} | "
        f"Webhook: {'on' if WEBHOOK_URL else 'off'}")
    log("=" * 60)

    while True:
        try:
            ok, message, fail_flags = run_health_checks()

            if ok:
                if is_currently_down:
                    log("System status: DOWN → UP")
                    trigger_recovery("Porto-GW (neverland.my.id) Online Kembali", message)
                    is_currently_down  = False
                    last_error_reason  = ""
                else:
                    log(f"OK: {message}")
            else:
                log(f"FAIL: {message}", level="ERROR")
                if not is_currently_down:
                    is_currently_down = True
                    last_error_reason = message

                    heal_msg = ""
                    if AUTO_HEAL:
                        heal_msg = auto_heal(
                            container_failed=fail_flags["container"],
                            caddy_failed=fail_flags["caddy"]
                        )
                    trigger_alert("Porto-GW Terdeteksi Down", message, heal_msg)

        except Exception as e:
            log(f"Unexpected monitor loop error: {e}", level="ERROR")

        time.sleep(CHECK_INTERVAL)


# ---------------------------------------------------------------------------
# Entrypoint
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--test-email":
        log("Testing email notification...")
        log(f"SMTP User: {SMTP_USER} | Email To: {EMAIL_TO}")
        send_email(
            "🧪 Test Email — Porto-GW Monitor",
            f"Halo!\n\nIni email pengujian dari porto-gw health monitor.\n\n"
            f"Email To: {EMAIL_TO}\nWaktu: {datetime.now().strftime('%Y-%m-%d %H:%M:%S WIB')}"
        )
        print("Test email selesai.")
    elif len(sys.argv) > 1 and sys.argv[1] == "--test-notify":
        log("Testing all notification channels...")
        trigger_alert(
            "TEST: Porto-GW Monitor",
            "Ini adalah notifikasi pengujian — layanan tidak benar-benar down.",
            "Tidak ada tindakan."
        )
        print("Test notifikasi selesai.")
    else:
        main()
