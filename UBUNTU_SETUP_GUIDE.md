# 🐧 FlashPop - Ubuntu 22 Setup Guide

## 📋 Prerequisites

### System Requirements
- **OS**: Ubuntu 22.04 LTS atau lebih baru
- **RAM**: Minimal 2GB, recommended 4GB
- **Storage**: Minimal 10GB available space
- **Network**: Internet connection untuk download dependencies

### Initial Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install essential tools
sudo apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release build-essential
```

## 🔧 Development Environment Setup

### 1. Install Node.js 18.x (LTS)
```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Install Node.js
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 2. Install Yarn Package Manager
```bash
# Install Yarn globally
npm install -g yarn

# Verify installation
yarn --version
```

### 3. Install Git
```bash
# Install Git
sudo apt install -y git

# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify installation
git --version
```

### 4. Install PM2 (Process Manager)
```bash
# Install PM2 globally
npm install -g pm2

# Verify installation
pm2 --version
```

### 5. Install Nginx (Web Server)
```bash
# Install Nginx
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Verify installation
nginx -v
```

### 6. Install Certbot (SSL Certificate)
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Verify installation
certbot --version
```

### 7. Install UFW Firewall
```bash
# Install UFW
sudo apt install -y ufw

# Configure firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'

# Enable firewall
sudo ufw --force enable
```

## 📁 Project Setup

### 1. Create Project Directory
```bash
# Create project directory
sudo mkdir -p /var/www/flashpop
sudo chown -R $USER:$USER /var/www/flashpop
cd /var/www/flashpop
```

### 2. Clone or Create Project
```bash
# Option A: Clone from GitHub
git clone https://github.com/mauljasmay/flashpop-widget.git .

# Option B: Create new project (if starting from scratch)
# Copy existing project files here
```

### 3. Install Dependencies
```bash
# Install project dependencies
npm install

# Or use Yarn
yarn install
```

### 4. Environment Configuration
```bash
# Create environment file
cp .env.example .env

# Edit environment variables
nano .env
```

#### Example .env file:
```env
# Application
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# Database
DATABASE_URL="file:./dev.db"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-here"

# GitHub (for webhooks)
GITHUB_TOKEN="your-github-token"

# Analytics
ANALYTICS_API_KEY="your-analytics-api-key"

# CORS
ALLOWED_ORIGINS="https://yourdomain.com,https://www.yourdomain.com"
```

## 🏗️ Build Process

### 1. Build for Production
```bash
# Clean previous build
rm -rf .next

# Build for production
npm run build

# Verify build
ls -la .next/
```

### 2. Create PM2 Configuration
```bash
# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'flashpop',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/flashpop',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/flashpop/error.log',
    out_file: '/var/log/flashpop/out.log',
    log_file: '/var/log/flashpop/combined.log',
    time: true
  }]
};
EOF
```

### 3. Create Log Directories
```bash
# Create log directories
sudo mkdir -p /var/log/flashpop
sudo chown -R $USER:$USER /var/log/flashpop
```

## 🌐 Nginx Configuration

### 1. Create Nginx Config
```bash
# Create Nginx site configuration
sudo nano /etc/nginx/sites-available/flashpop
```

#### Nginx Configuration File:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;
    
    # Rate Limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=1r/s;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # API Rate Limiting
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Login Rate Limiting
    location /api/auth {
        limit_req zone=login burst=5 nodelay;
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Static File Caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }
}
```

### 2. Enable Site
```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/flashpop /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

## 🔒 SSL Certificate Setup

### 1. Get SSL Certificate with Certbot
```bash
# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com --email your@email.com --agree-tos --no-eff-email

# Test auto-renewal
sudo certbot renew --dry-run
```

### 2. Setup Auto-renewal
```bash
# Add cron job for auto-renewal
sudo crontab -e
```

Add this line to crontab:
```
0 12 * * * /usr/bin/certbot renew --quiet && systemctl reload nginx
```

## 🚀 Application Management

### 1. Start Application with PM2
```bash
# Start application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup
```

### 2. PM2 Management Commands
```bash
# Start application
pm2 start flashpop

# Stop application
pm2 stop flashpop

# Restart application
pm2 restart flashpop

# View logs
pm2 logs flashpop

# Monitor application
pm2 monit

# List all processes
pm2 list

# Delete application
pm2 delete flashpop
```

## 📊 Monitoring and Logging

### 1. Log Management
```bash
# View application logs
tail -f /var/log/flashpop/combined.log

# View error logs
tail -f /var/log/flashpop/error.log

# View Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### 2. System Monitoring
```bash
# Install monitoring tools
sudo apt install -y htop iotop nethogs

# Monitor system resources
htop

# Monitor disk I/O
sudo iotop

# Monitor network
nethogs
```

### 3. Application Monitoring
```bash
# PM2 monitoring
pm2 monit

# Check application status
pm2 status

# View resource usage
pm2 show flashpop
```

## 🔧 Maintenance

### 1. Update Application
```bash
# Pull latest changes
cd /var/www/flashpop
git pull origin main

# Install new dependencies
npm install

# Build application
npm run build

# Restart application
pm2 restart flashpop
```

### 2. Backup Strategy
```bash
# Create backup script
cat > backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/flashpop"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup application files
tar -czf $BACKUP_DIR/flashpop_$DATE.tar.gz /var/www/flashpop

# Backup database
cp /var/www/flashpop/db/dev.db $BACKUP_DIR/database_$DATE.db

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "*.db" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x backup.sh

# Add to cron for daily backup at 2 AM
sudo crontab -e
```

Add to crontab:
```
0 2 * * * /var/www/flashpop/backup.sh
```

## 🔐 Security Hardening

### 1. Firewall Configuration
```bash
# Check firewall status
sudo ufw status

# Allow specific ports if needed
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS

# Enable firewall
sudo ufw enable
```

### 2. Fail2Ban Setup
```bash
# Install Fail2Ban
sudo apt install -y fail2ban

# Configure Fail2Ban
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local
```

### 3. System Updates
```bash
# Create update script
cat > update-system.sh << 'EOF'
#!/bin/bash
echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y
echo "Updating npm packages..."
npm update -g
echo "System update completed!"
EOF

chmod +x update-system.sh

# Schedule weekly updates
sudo crontab -e
```

Add to crontab:
```
0 3 * * 0 /var/www/flashpop/update-system.sh
```

## 🚨 Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
```bash
# Check what's using port 3000
sudo lsof -i :3000

# Kill process
sudo kill -9 PID

# Or use different port
export PORT=3001
```

#### 2. Permission Denied
```bash
# Fix file permissions
sudo chown -R $USER:$USER /var/www/flashpop
sudo chmod -R 755 /var/www/flashpop
```

#### 3. Nginx Configuration Error
```bash
# Test Nginx configuration
sudo nginx -t

# Check Nginx error log
sudo tail -f /var/log/nginx/error.log
```

#### 4. SSL Certificate Issues
```bash
# Check certificate status
sudo certbot certificates

# Revoke and reissue if needed
sudo certbot delete --cert-name yourdomain.com
sudo certbot --nginx -d yourdomain.com
```

#### 5. Application Not Starting
```bash
# Check PM2 logs
pm2 logs flashpop --lines 50

# Check Node.js version
node --version

# Check if all dependencies are installed
npm list
```

## 📞 Support and Documentation

### Application Documentation
- API Documentation: http://yourdomain.com/api/docs
- User Guide: http://yourdomain.com/docs
- Admin Dashboard: http://yourdomain.com/dashboard

### Monitoring Dashboards
- PM2 Monitoring: http://yourdomain.com:9615
- Server Metrics: Custom setup with Grafana/Prometheus

### Emergency Commands
```bash
# Emergency stop
pm2 stop all

# Emergency restart
pm2 restart all

# Clear logs
pm2 flush

# System reboot (last resort)
sudo reboot
```

## 🎯 Production Checklist

- [ ] Ubuntu 22.04 LTS installed and updated
- [ ] Node.js 18.x LTS installed
- [ ] Nginx installed and configured
- [ ] SSL certificate installed and valid
- [ ] Firewall configured and enabled
- [ ] PM2 installed and configured
- [ ] Application built for production
- [ ] Environment variables configured
- [ ] Database set up and secured
- [ ] Backups configured and tested
- [ ] Monitoring and logging configured
- [ ] Security hardening completed
- [ ] Performance optimization applied
- [ ] Documentation completed
- [ ] Emergency procedures documented

---

**FlashPop is now ready for production deployment on Ubuntu 22!** 🚀