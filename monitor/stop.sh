#!/bin/bash
MONITOR_DIR="/home/nopal/production/porto-gw/monitor"
PID_FILE="$MONITOR_DIR/monitor.pid"

if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if kill -0 "$PID" 2>/dev/null; then
        echo "🛑 Menghentikan Porto-GW monitor (PID: $PID)..."
        kill "$PID"
        rm -f "$PID_FILE"
        echo "✅ Monitor dihentikan."
    else
        echo "⚠️  Monitor tidak sedang berjalan."
        rm -f "$PID_FILE"
    fi
else
    echo "⚠️  PID file tidak ditemukan."
fi
