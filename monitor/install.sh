#!/bin/bash
set -e

echo "=== 🚀 Installing Porto-GW Health Monitor as Systemd Service ==="

MONITOR_DIR="/home/nopal/production/porto-gw/monitor"
SERVICE_NAME="porto-monitor.service"

# Copy service file to systemd directory
sudo cp "$MONITOR_DIR/$SERVICE_NAME" /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable $SERVICE_NAME
sudo systemctl restart $SERVICE_NAME

echo "=== ✅ Service installed and started! ==="
echo "Status  : sudo systemctl status porto-monitor"
echo "Log     : tail -f $MONITOR_DIR/monitor.log"
