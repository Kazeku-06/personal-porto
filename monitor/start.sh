#!/bin/bash
MONITOR_DIR="/home/nopal/production/porto-gw/monitor"
PID_FILE="$MONITOR_DIR/monitor.pid"

if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE") 2>/dev/null; then
    echo "⚠️  Porto-GW monitor sudah berjalan (PID: $(cat $PID_FILE))."
    exit 0
fi

echo "🚀 Menjalankan Porto-GW Health Monitor di background..."
nohup python3 "$MONITOR_DIR/monitor.py" > /dev/null 2>&1 &
echo $! > "$PID_FILE"

echo "✅ Monitor aktif dengan PID: $(cat $PID_FILE)"
echo "📄 Log tersimpan di: $MONITOR_DIR/monitor.log"
