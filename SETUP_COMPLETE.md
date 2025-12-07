# 🎉 FlashPop - Complete Ubuntu 22 Setup Package

## 📋 Files Created

### 1. 📚 Complete Documentation
**File:** `UBUNTU_SETUP_GUIDE.md`
- Comprehensive 200+ line setup guide
- Step-by-step instructions for Ubuntu 22.04
- Covers everything from system update to production deployment
- Includes troubleshooting, monitoring, and maintenance

### 2. 🚀 Automated Setup Script
**File:** `quick-setup.sh`
- Fully automated installation script
- One-command setup for FlashPop on Ubuntu 22
- Includes all dependencies, security, and optimization
- Colorful output with progress indicators

## 🚀 Quick Start Commands

### Option 1: Automated Setup (Recommended)
```bash
# Make script executable
chmod +x quick-setup.sh

# Run setup with your domain
./quick-setup.sh yourdomain.com

# Or for localhost development
./quick-setup.sh
```

### Option 2: Manual Setup
```bash
# Follow detailed guide
cat UBUNTU_SETUP_GUIDE.md

# Step-by-step manual installation
```

## 📦 What the Setup Includes

### System Requirements
- ✅ Ubuntu 22.04 LTS compatibility check
- ✅ System update and package installation
- ✅ Essential tools (curl, wget, git, build-essential)
- ✅ Security tools (UFW firewall, Fail2Ban)

### Development Environment
- ✅ Node.js 18.x LTS installation
- ✅ npm and Yarn package managers
- ✅ PM2 process manager for production
- ✅ Git configuration and version control

### Web Server Setup
- ✅ Nginx installation and configuration
- ✅ SSL certificate setup with Certbot
- ✅ Security headers and gzip compression
- ✅ Rate limiting and API protection

### Application Setup
- ✅ Project directory creation and permissions
- ✅ FlashPop code cloning from GitHub
- ✅ Dependencies installation (npm install)
- ✅ Production build optimization
- ✅ Environment configuration (.env file)

### Production Deployment
- ✅ PM2 ecosystem configuration
- ✅ Cluster mode for high availability
- ✅ Log management and rotation
- ✅ Process monitoring and auto-restart

### Security & Monitoring
- ✅ UFW firewall configuration
- ✅ SSL/TLS certificate setup
- ✅ Security headers implementation
- ✅ Rate limiting for API endpoints
- ✅ Backup script creation
- ✅ System monitoring script

## 🌐 Production Features

### Performance Optimization
- **Gzip Compression** - Reduces bandwidth usage
- **Static File Caching** - 1-year cache for assets
- **Cluster Mode** - Multiple CPU cores utilization
- **Memory Limits** - Prevents memory leaks
- **Rate Limiting** - API protection (10 req/s)

### Security Hardening
- **HTTPS Only** - SSL/TLS enforcement
- **Security Headers** - XSS, CSRF protection
- **Firewall Rules** - UFW with specific port access
- **Fail2Ban** - Automatic IP blocking
- **JWT Authentication** - Secure token-based auth

### Monitoring & Logging
- **PM2 Monitoring** - Real-time process monitoring
- **Access Logs** - Nginx access logging
- **Error Logs** - Application error tracking
- **System Metrics** - CPU, memory, disk usage
- **Automated Backups** - Daily backup with rotation

## 📊 File Structure After Setup

```
/var/www/flashpop/
├── src/                    # Application source code
├── .next/                  # Production build
├── node_modules/            # Dependencies
├── .env                    # Environment configuration
├── ecosystem.config.js       # PM2 configuration
├── backup.sh               # Backup script
├── monitor.sh              # Monitoring script
├── db/                     # Database files
└── logs/                   # Application logs

/etc/nginx/
├── sites-available/flashpop  # Nginx configuration
└── sites-enabled/flashpop   # Enabled site

/var/log/flashpop/
├── error.log               # Error logs
├── out.log                # Output logs
└── combined.log           # Combined logs

/var/backups/flashpop/
├── flashpop_YYYYMMDD_HHMMSS.tar.gz  # Application backups
└── database_YYYYMMDD_HHMMSS.db       # Database backups
```

## 🎯 Domain Configuration

### Production Domain Setup
```bash
# Setup with your domain
./quick-setup.sh yourdomain.com

# This will configure:
# - Nginx for yourdomain.com
# - SSL certificate for yourdomain.com
# - Firewall rules for yourdomain.com
# - Environment variables for yourdomain.com
```

### Local Development Setup
```bash
# Setup for localhost
./quick-setup.sh

# This will configure:
# - Local development environment
# - HTTP only (no SSL)
# - localhost domain
# - Development settings
```

## 🔧 Management Commands

### Application Management
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

# Check status
pm2 status
```

### System Management
```bash
# Monitor system resources
./monitor.sh

# Create backup
./backup.sh

# Update system
sudo apt update && sudo apt upgrade -y

# Check firewall status
sudo ufw status

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
```

## 🔐 Security Checklist

### ✅ Pre-Setup Security
- [ ] Ubuntu 22.04 LTS updated
- [ ] Firewall configured and enabled
- [ ] SSH keys configured (disable password auth)
- [ ] Fail2Ban installed and configured
- [ ] Unnecessary services disabled
- [ ] System monitoring configured

### ✅ Application Security
- [ ] SSL/TLS certificate installed
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Input validation implemented
- [ ] Environment variables secured
- [ ] Database encryption enabled
- [ ] Backup strategy implemented

## 📈 Performance Optimization

### ✅ Server Optimization
- [ ] Nginx gzip compression enabled
- [ ] Static file caching configured
- [ ] PM2 cluster mode enabled
- [ ] Memory limits configured
- [ ] Connection timeouts optimized
- [ ] Worker processes configured

### ✅ Application Optimization
- [ ] Production build optimized
- [ ] Bundle size minimized
- [ ] Images optimized
- [ ] Caching implemented
- [ ] Database queries optimized
- [ ] CDN configuration (optional)

## 🚨 Troubleshooting Guide

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

#### 3. SSL Certificate Issues
```bash
# Check certificate status
sudo certbot certificates

# Revoke and reissue
sudo certbot delete --cert-name yourdomain.com
sudo certbot --nginx -d yourdomain.com
```

#### 4. Application Not Starting
```bash
# Check PM2 logs
pm2 logs flashpop --lines 50

# Check Node.js version
node --version

# Check environment variables
cat .env
```

#### 5. High Memory Usage
```bash
# Check memory usage
free -h

# Check PM2 memory usage
pm2 show flashpop

# Restart application
pm2 restart flashpop
```

## 📞 Support and Maintenance

### Emergency Procedures
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

### Regular Maintenance
```bash
# Weekly system update
sudo apt update && sudo apt upgrade -y

# Monthly log cleanup
find /var/log/flashpop -name "*.log" -mtime +30 -delete

# Quarterly backup verification
ls -la /var/backups/flashpop/
```

## 🎉 Setup Completion

### ✅ Verification Checklist
After running the setup script, verify:

- [ ] Application accessible at http://yourdomain.com
- [ ] HTTPS working with valid certificate
- [ ] Dashboard accessible at http://yourdomain.com/dashboard
- [ ] API endpoints responding correctly
- [ ] PM2 process running and stable
- [ ] Logs being written correctly
- [ ] SSL certificate auto-renewal configured
- [ ] Firewall rules active and correct
- [ ] Backup script working
- [ ] Monitoring script functional

### 🎯 Success Indicators
- ✅ All services running without errors
- ✅ SSL certificate valid and renewed
- ✅ Application responding to requests
- ✅ Database connected and operational
- ✅ Logs showing normal operation
- ✅ System resources within normal limits
- ✅ Backup schedule configured
- ✅ Monitoring alerts configured

---

## 🚀 Ready for Production!

FlashPop is now fully configured and ready for production use on Ubuntu 22.04! 

**Next Steps:**
1. Configure your domain DNS
2. Test all functionality
3. Set up monitoring alerts
4. Configure backup offsite storage
5. Document your custom configurations

**Support:** Check the troubleshooting section for common issues and solutions.

**FlashPop Production Setup Complete!** 🎉