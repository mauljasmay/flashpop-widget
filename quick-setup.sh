#!/bin/bash

# 🚀 FlashPop - Ubuntu 22 Quick Setup Script
# Author: FlashPop Team
# Version: 1.0
# Compatible: Ubuntu 22.04 LTS

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration variables
PROJECT_NAME="flashpop"
PROJECT_DIR="/var/www/$PROJECT_NAME"
DOMAIN="${DOMAIN:-localhost}"
NODE_VERSION="18"
PORT="3000"

# Print colored header
print_header() {
    echo -e "${PURPLE}"
    echo "╔════════════════════════════════════════════════════════════════╗"
    echo "║                    🚀 FLASHPOP - UBUNTU 22 SETUP                    ║"
    echo "║                                                              ║"
    echo "║  Production-Ready Widget Notification System for Ubuntu 22.04   ║"
    echo "╚════════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

# Print section headers
print_section() {
    echo -e "\n${BLUE}━━━ $1 ━━━${NC}"
}

# Print success message
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Print error message
print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Print warning message
print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Print info message
print_info() {
    echo -e "${CYAN}ℹ️  $1${NC}"
}

# Check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        print_error "Please run this script as a regular user, not as root!"
        print_info "Use: sudo -u username ./quick-setup.sh"
        exit 1
    fi
}

# System update
update_system() {
    print_section "System Update"
    print_info "Updating package lists and upgrading system..."
    sudo apt update && sudo apt upgrade -y
    print_success "System updated successfully"
}

# Install essential packages
install_essentials() {
    print_section "Installing Essential Packages"
    print_info "Installing curl, wget, git, unzip, build tools..."
    sudo apt install -y curl wget git unzip software-properties-common \
        apt-transport-https ca-certificates gnupg lsb-release \
        build-essential htop iotop nethogs ufw fail2ban
    print_success "Essential packages installed"
}

# Install Node.js
install_nodejs() {
    print_section "Installing Node.js $NODE_VERSION.x LTS"
    
    # Check if Node.js is already installed
    if command -v node &> /dev/null; then
        local current_version=$(node --version | cut -d'v' -f2)
        print_info "Node.js $current_version is already installed"
        
        # Check if version matches required version
        if [[ "$current_version" == "$NODE_VERSION" ]]; then
            print_success "Node.js $NODE_VERSION.x is already installed"
            return
        fi
    fi
    
    print_info "Adding NodeSource repository..."
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
    
    print_info "Installing Node.js..."
    sudo apt-get install -y nodejs
    
    # Verify installation
    local node_version=$(node --version)
    local npm_version=$(npm --version)
    print_success "Node.js $node_version installed"
    print_success "npm $npm_version installed"
}

# Install PM2
install_pm2() {
    print_section "Installing PM2 Process Manager"
    
    if command -v pm2 &> /dev/null; then
        print_info "PM2 is already installed"
        pm2 --version
    else
        print_info "Installing PM2 globally..."
        npm install -g pm2
        print_success "PM2 installed successfully"
    fi
}

# Install Nginx
install_nginx() {
    print_section "Installing Nginx Web Server"
    
    if command -v nginx &> /dev/null; then
        print_info "Nginx is already installed"
        nginx -v
    else
        print_info "Installing Nginx..."
        sudo apt install -y nginx
        print_success "Nginx installed successfully"
    fi
    
    # Start and enable Nginx
    sudo systemctl start nginx
    sudo systemctl enable nginx
    print_success "Nginx started and enabled"
}

# Setup firewall
setup_firewall() {
    print_section "Configuring UFW Firewall"
    
    print_info "Configuring firewall rules..."
    sudo ufw default deny incoming
    sudo ufw default allow outgoing
    sudo ufw allow ssh
    sudo ufw allow 'Nginx Full'
    
    print_info "Enabling firewall..."
    sudo ufw --force enable
    print_success "Firewall configured and enabled"
}

# Create project directory
create_project_dir() {
    print_section "Creating Project Directory"
    
    print_info "Creating project directory: $PROJECT_DIR"
    sudo mkdir -p $PROJECT_DIR
    sudo chown -R $USER:$USER $PROJECT_DIR
    sudo chmod -R 755 $PROJECT_DIR
    print_success "Project directory created"
}

# Clone or setup project
setup_project() {
    print_section "Setting Up FlashPop Project"
    
    cd $PROJECT_DIR
    
    # Check if directory is empty
    if [ -z "$(ls -A $PROJECT_DIR)" ]; then
        print_info "Cloning FlashPop from GitHub..."
        git clone https://github.com/mauljasmay/flashpop-widget.git .
        print_success "Project cloned successfully"
    else
        print_warning "Project directory is not empty"
        print_info "Skipping clone, using existing files"
    fi
    
    # Install dependencies
    print_info "Installing project dependencies..."
    npm install
    print_success "Dependencies installed"
}

# Create environment file
create_env_file() {
    print_section "Creating Environment Configuration"
    
    print_info "Creating .env file..."
    cat > .env << EOF
# FlashPop Environment Configuration
NODE_ENV=production
PORT=$PORT
HOST=0.0.0.0

# Database
DATABASE_URL="file:./dev.db"

# JWT Secret (generate new one for production)
JWT_SECRET="$(openssl rand -base64 32)"

# Application
APP_NAME="FlashPop"
APP_URL="https://$DOMAIN"
API_URL="https://$DOMAIN/api"

# CORS
ALLOWED_ORIGINS="https://$DOMAIN,https://www.$DOMAIN"

# Analytics
ANALYTICS_ENABLED=true

# Security
BCRYPT_ROUNDS=12
SESSION_SECRET="$(openssl rand -base64 32)"

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# File Upload
MAX_FILE_SIZE=10485760

# Email (configure for production)
SMTP_HOST=""
SMTP_PORT=587
SMTP_USER=""
SMTP_PASS=""
SMTP_FROM=""
EOF
    
    print_success "Environment file created"
    print_warning "Please review and update .env file with your specific settings"
}

# Build application
build_application() {
    print_section "Building Application for Production"
    
    print_info "Cleaning previous build..."
    rm -rf .next
    
    print_info "Building for production..."
    npm run build
    
    print_success "Application built successfully"
}

# Create PM2 ecosystem file
create_pm2_config() {
    print_section "Creating PM2 Configuration"
    
    print_info "Creating PM2 ecosystem file..."
    cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'flashpop',
    script: 'npm',
    args: 'start',
    cwd: '$PROJECT_DIR',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: $PORT
    },
    error_file: '/var/log/flashpop/error.log',
    out_file: '/var/log/flashpop/out.log',
    log_file: '/var/log/flashpop/combined.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024'
  }]
};
EOF
    
    print_success "PM2 configuration created"
}

# Create log directories
create_log_dirs() {
    print_section "Creating Log Directories"
    
    print_info "Creating log directories..."
    sudo mkdir -p /var/log/flashpop
    sudo chown -R $USER:$USER /var/log/flashpop
    print_success "Log directories created"
}

# Create Nginx configuration
create_nginx_config() {
    print_section "Creating Nginx Configuration"
    
    print_info "Creating Nginx site configuration..."
    sudo tee /etc/nginx/sites-available/flashpop > /dev/null << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    # Redirect to HTTPS
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name $DOMAIN www.$DOMAIN;
    
    # SSL Configuration (will be updated by Certbot)
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    
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
    
    location / {
        proxy_pass http://localhost:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # API Rate Limiting
    location /api/ {
        limit_req_zone \$binary_remote_addr zone=api:10m rate=10r/s;
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://localhost:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
    
    # Static File Caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files \$uri =404;
    }
}
EOF
    
    # Enable site
    sudo ln -sf /etc/nginx/sites-available/flashpop /etc/nginx/sites-enabled/
    
    # Test configuration
    sudo nginx -t
    
    # Reload Nginx
    sudo systemctl reload nginx
    
    print_success "Nginx configuration created and enabled"
}

# Setup SSL certificate
setup_ssl() {
    print_section "SSL Certificate Setup"
    
    if [[ "$DOMAIN" == "localhost" ]]; then
        print_warning "Skipping SSL setup for localhost"
        return
    fi
    
    print_info "Installing Certbot for SSL certificates..."
    sudo apt install -y certbot python3-certbot-nginx
    
    print_info "Requesting SSL certificate for $DOMAIN..."
    print_warning "Make sure DNS A record points to this server IP"
    print_info "Run this command when ready:"
    echo "sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --email admin@$DOMAIN --agree-tos --no-eff-email"
    
    print_success "Certbot installed"
}

# Start application
start_application() {
    print_section "Starting FlashPop Application"
    
    cd $PROJECT_DIR
    
    print_info "Starting application with PM2..."
    pm2 start ecosystem.config.js
    
    # Save PM2 configuration
    pm2 save
    
    # Setup PM2 startup script
    pm2 startup
    
    print_success "FlashPop application started successfully"
}

# Create backup script
create_backup_script() {
    print_section "Creating Backup Script"
    
    cat > backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/flashpop"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup application files
tar -czf $BACKUP_DIR/flashpop_\$DATE.tar.gz $PROJECT_DIR

# Backup database
cp $PROJECT_DIR/db/dev.db $BACKUP_DIR/database_\$DATE.db 2>/dev/null || true

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "*.db" -mtime +7 -delete

echo "Backup completed: \$DATE"
EOF
    
    chmod +x backup.sh
    print_success "Backup script created"
}

# Setup monitoring
setup_monitoring() {
    print_section "Setting Up Monitoring"
    
    # Create monitoring script
    cat > monitor.sh << 'EOF'
#!/bin/bash
echo "=== FlashPop System Monitor ==="
echo "Time: $(date)"
echo "Uptime: $(uptime -p)"
echo "Memory Usage:"
free -h
echo "Disk Usage:"
df -h /
echo "Application Status:"
pm2 status
echo "=========================="
EOF
    
    chmod +x monitor.sh
    print_success "Monitoring script created"
}

# Display final information
display_final_info() {
    print_section "Installation Complete! 🎉"
    
    echo -e "${GREEN}"
    echo "╔════════════════════════════════════════════════════════════════╗"
    echo "║                    FLASHPOP INSTALLATION COMPLETE                    ║"
    echo "║                                                              ║"
    echo "║  📍 Project Directory: $PROJECT_DIR                        ║"
    echo "║  🌐 Domain: $DOMAIN                                       ║"
    echo "║  🚀 Port: $PORT                                           ║"
    echo "║  📊 Dashboard: http://$DOMAIN/dashboard                   ║"
    echo "║  🔧 API: http://$DOMAIN/api                              ║"
    echo "║                                                              ║"
    echo "║  📋 Next Steps:                                             ║"
    echo "║  1. Configure .env file with your settings                  ║"
    echo "║  2. Setup SSL certificate (if not localhost)               ║"
    echo "║  3. Test application: pm2 logs flashpop                     ║"
    echo "║  4. Monitor system: ./monitor.sh                             ║"
    echo "║                                                              ║"
    echo "╚════════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    
    echo -e "${CYAN}Useful Commands:${NC}"
    echo -e "${YELLOW}• Start application:    pm2 start flashpop${NC}"
    echo -e "${YELLOW}• Stop application:     pm2 stop flashpop${NC}"
    echo -e "${YELLOW}• Restart application:  pm2 restart flashpop${NC}"
    echo -e "${YELLOW}• View logs:           pm2 logs flashpop${NC}"
    echo -e "${YELLOW}• Monitor system:       ./monitor.sh${NC}"
    echo -e "${YELLOW}• Create backup:        ./backup.sh${NC}"
    echo -e "${YELLOW}• Update application:    git pull && npm install && npm run build && pm2 restart flashpop${NC}"
}

# Main execution
main() {
    print_header
    
    # Check if running as root
    check_root
    
    # Get domain from user or use default
    if [ -z "$1" ]; then
        print_info "No domain provided. Using localhost"
        print_info "Usage: $0 yourdomain.com"
        echo ""
        read -p "Enter your domain (or press Enter for localhost): " input_domain
        DOMAIN="${input_domain:-localhost}"
    else
        DOMAIN="$1"
    fi
    
    # Installation steps
    update_system
    install_essentials
    install_nodejs
    install_pm2
    install_nginx
    setup_firewall
    create_project_dir
    setup_project
    create_env_file
    build_application
    create_pm2_config
    create_log_dirs
    create_nginx_config
    setup_ssl
    start_application
    create_backup_script
    setup_monitoring
    display_final_info
}

# Run main function
main "$@"