# 🛡️ Porto-GW — Health Monitor & Self-Healing Service

Tools pemantauan otomatis untuk portfolio site **neverland.my.id**, berjalan di background untuk memantau kesehatan container & domain, mengirim notifikasi saat down, dan melakukan pemulihan otomatis.

---

## 📌 Fitur

1. **Pemeriksaan Berlapis (Setiap 30 detik)**:
   - **Docker Container Check** — Memastikan container `porto-nopal-app` berstatus `running`.
   - **Next.js Internal Check** — Memastikan `http://127.0.0.1:3579` merespons OK.
   - **Caddy Proxy Check** — Memastikan `https://neverland.my.id` dapat diakses publik.

2. **Auto Self-Healing**:
   - Container down → `docker restart porto-nopal-app`
   - Caddy gagal → `systemctl restart caddy`

3. **Notifikasi**:
   - **Email SMTP** (Gmail) — aktif dari awal
   - **Telegram Bot** — opsional, isi token di `config.env`
   - **Discord/Slack Webhook** — opsional, isi URL di `config.env`

---

## 📁 Struktur

```
monitor/
├── config.env              # Konfigurasi (email, token, interval, dll.)
├── monitor.py              # Daemon pemantau utama (Python 3, pure stdlib)
├── monitor.log             # File log aktivitas
├── start.sh                # Jalankan monitor di background
├── stop.sh                 # Hentikan monitor
├── install.sh              # Install sebagai Systemd Service
└── porto-monitor.service   # Unit file systemd
```

---

## ⚙️ Konfigurasi

Buka [`config.env`](./config.env) dan isi:

```env
# Email (wajib diisi untuk notifikasi email)
SMTP_USER=email@gmail.com
SMTP_PASS=app-password-gmail
EMAIL_TO=tujuan@email.com

# Telegram (opsional)
TELEGRAM_BOT_TOKEN=123456:ABCdef...
TELEGRAM_CHAT_ID=987654321

# Discord (opsional)
WEBHOOK_URL=https://discord.com/api/webhooks/...
```

> ⚠️ **Penting**: Pastikan `config.env` sudah masuk ke `.gitignore` agar kredensial tidak ter-commit.

---

## 🚀 Penggunaan

```bash
# Jalankan manual di background
chmod +x monitor/start.sh monitor/stop.sh monitor/install.sh
./monitor/start.sh

# Hentikan
./monitor/stop.sh

# Install sebagai systemd service (auto-start saat reboot)
sudo ./monitor/install.sh

# Test notifikasi email
python3 monitor/monitor.py --test-email

# Test semua channel notifikasi
python3 monitor/monitor.py --test-notify

# Lihat log real-time
tail -f monitor/monitor.log

# Status systemd
sudo systemctl status porto-monitor
```
