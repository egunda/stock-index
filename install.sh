#!/bin/bash

# Market Live Heatmap - Deployment Script
# Targets: Linux (Ubuntu/Debian/CentOS)

echo "🚀 Starting deployment of Market Live Heatmap..."

# 1. Check for PHP
if ! command -v php &> /dev/null; then
    echo "❌ PHP is not installed. Please install PHP (>= 7.4) first."
    exit 1
fi

# 2. Check for PHP-curl extension
if ! php -m | grep -i curl &> /dev/null; then
    echo "⚠️  PHP-curl extension not found. Attempting to install..."
    if command -v apt-get &> /dev/null; then
        sudo apt-get update && sudo apt-get install -y php-curl
    elif command -v yum &> /dev/null; then
        sudo yum install -y php-common
    fi
fi

# 3. Setup Permissions
echo "📂 Setting up file permissions..."
chmod -R 755 .
# If running under Apache/Nginx, you might need to uncomment the following:
# sudo chown -R www-data:www-data .

# 4. Clean up Node.js artifacts (not needed for PHP deployment)
echo "🧹 Cleaning up development artifacts..."
rm -f server.js package.json package-lock.json

echo "✅ Deployment complete!"
echo "🌐 You can now serve this folder using your preferred web server (Apache/Nginx/etc)."
echo "💡 To test immediately, run: php -S 0.0.0.0:8007"
