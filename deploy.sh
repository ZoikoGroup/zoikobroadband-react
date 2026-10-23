#!/bin/bash
set -e

echo "=== Deploy started at $(date) ==="
cd /var/www/html/zoikobroadband-react

# Pull latest code
git pull origin main

# Install any new dependencies
npm install

# Build Next.js
npm run build

# Restart PM2 process
pm2 restart zoikobroadband

echo "=== Deploy finished at $(date) ==="
