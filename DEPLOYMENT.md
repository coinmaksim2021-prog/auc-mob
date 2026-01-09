# Deployment Guide

Complete deployment guide for FOMO Strategy platform.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development](#local-development)
3. [Production Build](#production-build)
4. [Server Setup](#server-setup)
5. [Nginx Configuration](#nginx-configuration)
6. [Environment Variables](#environment-variables)
7. [SSL/HTTPS Setup](#sslhttps-setup)
8. [Database Setup](#database-setup)
9. [Monitoring](#monitoring)
10. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

### System Requirements

```
- Ubuntu 20.04+ or similar Linux distribution
- 2GB+ RAM (4GB recommended)
- 20GB+ disk space
- Root or sudo access
```

### Software Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Yarn
npm install -g yarn

# Install Python 3.11+
sudo apt install -y python3.11 python3.11-pip python3.11-venv

# Install MongoDB 6.0+
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org

# Install Nginx
sudo apt install -y nginx

# Install Supervisor (for process management)
sudo apt install -y supervisor

# Install Git
sudo apt install -y git
```

---

## 🏠 Local Development

### Clone Repository

```bash
git clone <repository-url>
cd fomo-strategy
```

### Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
nano .env
```

**.env configuration:**
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=fomo_strategy
CORS_ORIGINS=*
JWT_SECRET=your-development-secret-key
```

### Frontend Setup

```bash
cd ../frontend

# Install dependencies
yarn install

# Create .env file
cp .env.example .env
nano .env
```

**.env configuration:**
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

### Start Development Servers

```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate
python server.py

# Terminal 2 - Frontend
cd frontend
yarn start

# Terminal 3 - MongoDB
sudo systemctl start mongod
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001
- API Docs: http://localhost:8001/docs

---

## 🏗️ Production Build

### Frontend Build

```bash
cd frontend

# Install dependencies
yarn install

# Build for production
yarn build

# Output will be in frontend/build/
```

### Backend Preparation

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# No build needed - Python runtime
```

---

## 🖥️ Server Setup

### 1. Create Application Directory

```bash
sudo mkdir -p /var/www/fomo-strategy
sudo chown $USER:$USER /var/www/fomo-strategy
```

### 2. Deploy Files

```bash
# Frontend
scp -r frontend/build/* user@server:/var/www/fomo-strategy/

# Backend
scp -r backend/* user@server:/var/www/fomo-strategy/backend/

# Nginx config
scp nginx-config-production.conf user@server:/tmp/
```

### 3. Setup Python Environment

```bash
ssh user@server

cd /var/www/fomo-strategy/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 4. Configure Environment Variables

**Backend:**
```bash
nano /var/www/fomo-strategy/backend/.env
```
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=fomo_strategy_prod
CORS_ORIGINS=https://your-domain.com
JWT_SECRET=STRONG-RANDOM-SECRET-CHANGE-THIS
```

**Frontend (already in build):**
- REACT_APP_BACKEND_URL is baked into build
- Rebuild if URL needs to change

---

## 🌐 Nginx Configuration

### 1. Copy Configuration

```bash
sudo cp /tmp/nginx-config-production.conf /etc/nginx/sites-available/fomo-strategy
```

### 2. Update Configuration

```bash
sudo nano /etc/nginx/sites-available/fomo-strategy
```

**Update these values:**
```nginx
server_name your-domain.com www.your-domain.com;  # Your actual domain
ssl_certificate /path/to/certificate.crt;         # SSL cert path
ssl_certificate_key /path/to/private.key;         # SSL key path
root /var/www/fomo-strategy/build;                # Frontend build path
```

### 3. Enable Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/fomo-strategy /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## 🔒 SSL/HTTPS Setup

### Option 1: Let's Encrypt (Recommended)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal
sudo certbot renew --dry-run
```

### Option 2: Custom Certificate

```bash
# Copy certificates
sudo cp certificate.crt /etc/ssl/certs/fomo-strategy.crt
sudo cp private.key /etc/ssl/private/fomo-strategy.key

# Set permissions
sudo chmod 644 /etc/ssl/certs/fomo-strategy.crt
sudo chmod 600 /etc/ssl/private/fomo-strategy.key

# Update Nginx config with paths
sudo nano /etc/nginx/sites-available/fomo-strategy
```

---

## 💾 Database Setup

### MongoDB Configuration

```bash
# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Create database and user
mongo
```

```javascript
use fomo_strategy_prod

db.createUser({
  user: "fomo_admin",
  pwd: "STRONG-PASSWORD-HERE",
  roles: [
    { role: "readWrite", db: "fomo_strategy_prod" }
  ]
})

// Create indexes
db.user_wallets.createIndex({ wallet_address: 1 }, { unique: true })
db.user_wallets.createIndex({ invite_code: 1 }, { unique: true })
db.user_wallets.createIndex({ referred_by: 1 })
```

**Update MONGO_URL:**
```env
MONGO_URL=mongodb://fomo_admin:PASSWORD@localhost:27017/fomo_strategy_prod
```

---

## 🔄 Process Management (Supervisor)

### Backend Process

```bash
sudo nano /etc/supervisor/conf.d/fomo-backend.conf
```

```ini
[program:fomo-backend]
command=/var/www/fomo-strategy/backend/venv/bin/python server.py
directory=/var/www/fomo-strategy/backend
user=www-data
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=/var/log/fomo-backend.log
environment=PATH="/var/www/fomo-strategy/backend/venv/bin"
```

### Start Services

```bash
# Reload supervisor
sudo supervisorctl reread
sudo supervisorctl update

# Start backend
sudo supervisorctl start fomo-backend

# Check status
sudo supervisorctl status
```

---

## 📊 Monitoring

### Nginx Logs

```bash
# Access logs
sudo tail -f /var/log/nginx/fomo-strategy-access.log

# Error logs
sudo tail -f /var/log/nginx/fomo-strategy-error.log
```

### Backend Logs

```bash
# Application logs
sudo tail -f /var/log/fomo-backend.log

# Supervisor logs
sudo tail -f /var/log/supervisor/fomo-backend.log
```

### MongoDB Logs

```bash
sudo tail -f /var/log/mongodb/mongod.log
```

### System Resources

```bash
# CPU and Memory
htop

# Disk space
df -h

# Network
netstat -tulpn | grep LISTEN
```

---

## 🔍 SEO Configuration

### Google Search Console

1. Visit [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://your-domain.com`
3. Verify ownership (HTML file or DNS)
4. Submit sitemap: `https://your-domain.com/sitemap.xml`
5. Request indexing for main pages

### Sitemap Update

```bash
# Update domain in sitemap.xml
nano /var/www/fomo-strategy/sitemap.xml

# Replace all instances
https://your-domain.com → https://actual-domain.com
```

### Meta Tags Update

```bash
# Update production index.html if needed
nano /var/www/fomo-strategy/index.html

# Update canonical URLs, og:url, twitter:url
```

---

## 🐛 Troubleshooting

### Backend Not Starting

```bash
# Check logs
sudo tail -f /var/log/fomo-backend.log

# Check Python dependencies
cd /var/www/fomo-strategy/backend
source venv/bin/activate
pip list

# Test manually
python server.py
```

### Frontend 404 Errors

```bash
# Check Nginx config
sudo nginx -t

# Verify build files
ls -la /var/www/fomo-strategy/

# Check Nginx error log
sudo tail -f /var/log/nginx/error.log
```

### MongoDB Connection Issues

```bash
# Check MongoDB status
sudo systemctl status mongod

# Test connection
mongo

# Check config
cat /etc/mongod.conf
```

### CORS Errors

**Update backend .env:**
```env
CORS_ORIGINS=https://your-domain.com
```

**Restart backend:**
```bash
sudo supervisorctl restart fomo-backend
```

### SSL Certificate Issues

```bash
# Check certificate
sudo certbot certificates

# Renew if needed
sudo certbot renew

# Check Nginx SSL config
sudo nginx -t
```

---

## 🚀 Performance Optimization

### Enable HTTP/2

Already configured in Nginx config:
```nginx
listen 443 ssl http2;
```

### Gzip Compression

Already configured in Nginx config:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

### Browser Caching

Already configured in Nginx config:
```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg)$ {
    expires 1y;
}
```

---

## 📈 Scaling

### Horizontal Scaling

```bash
# Run multiple backend instances
# Use Nginx as load balancer

upstream backend_servers {
    server localhost:8001;
    server localhost:8002;
    server localhost:8003;
}
```

### Database Replication

```bash
# Setup MongoDB replica set
# See MongoDB documentation
```

### CDN Integration

- Use CloudFlare or AWS CloudFront
- Serve static assets from CDN
- Configure Nginx to proxy

---

## ✅ Post-Deployment Checklist

- [ ] Domain DNS configured
- [ ] SSL certificate installed
- [ ] Nginx configured and running
- [ ] Backend service running
- [ ] MongoDB running and secured
- [ ] Environment variables set
- [ ] Sitemap submitted to Google
- [ ] Social media previews tested
- [ ] API endpoints tested
- [ ] Wallet connection tested
- [ ] Legal pages accessible
- [ ] Cookie consent working
- [ ] Performance tested (Lighthouse)
- [ ] Security headers verified
- [ ] Backups configured
- [ ] Monitoring setup

---

## 🆘 Support

If you encounter issues:

1. Check logs (Nginx, Backend, MongoDB)
2. Verify environment variables
3. Test API endpoints manually
4. Review Nginx configuration
5. Contact support team

---

*Last updated: January 8, 2026*
