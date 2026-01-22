# 🚀 Dhanjo E-Commerce - Deployment Guide

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Frontend Deployment](#frontend-deployment)
3. [Backend Deployment](#backend-deployment)
4. [Database Setup](#database-setup)
5. [Environment Configuration](#environment-configuration)
6. [Monitoring & Maintenance](#monitoring--maintenance)
7. [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

### Code & Build
- [x] Frontend built successfully (`npm run build` - creates `dist/` folder)
- [x] No console errors or warnings in development
- [ ] All environment variables configured
- [ ] Git repository committed and ready
- [ ] Environment files created (`.env` and `backend/.env`)

### Security
- [ ] JWT secret changed from default
- [ ] Database credentials secured
- [ ] CORS origins configured for production domain
- [ ] Rate limiting enabled
- [ ] HTTPS/SSL certificate ready

### Testing
- [ ] Frontend works locally (`npm run dev`)
- [ ] Backend API responds (`npm run dev` in backend)
- [ ] Database connection verified
- [ ] Payment processing tested (Stripe sandbox)

---

## Frontend Deployment

### Option 1: Vercel (Recommended - Free Tier Available)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Configure Environment**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add: `VITE_API_URL=https://your-backend-domain.com/api`

### Option 2: Netlify

1. **Connect GitHub Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select your repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Set Environment Variables**
   - Site settings → Build & deploy → Environment
   - Add: `VITE_API_URL=https://your-backend-domain.com/api`

### Option 3: Manual Deployment (Shared Hosting/VPS)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload `dist/` folder** to your hosting provider's public directory

3. **Configure Web Server** (nginx example)
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       root /var/www/dhanjo/dist;
       index index.html;
       
       location / {
           try_files $uri /index.html;
       }
   }
   ```

---

## Backend Deployment

### Option 1: Render.com (Free Tier Available)

1. **Push code to GitHub**
   ```bash
   git push -u origin main
   ```

2. **Create New Web Service on Render**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Select the backend folder

3. **Configure Settings**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Runtime**: Node

4. **Add Environment Variables**
   - Go to Environment → Add from `.env.example`
   - Update with production values

### Option 2: Railway.app

1. **Push to GitHub**
   ```bash
   git push -u origin main
   ```

2. **Create Project on Railway**
   - Connect GitHub repository
   - Railway auto-detects Node.js project

3. **Configure Variables**
   - Variables → Add from `.env.example`
   - Update with production credentials

### Option 3: AWS EC2 / DigitalOcean

1. **Launch Server Instance**
   - Ubuntu 22.04 LTS recommended
   - Minimum: 1GB RAM, 1 CPU

2. **Install Dependencies**
   ```bash
   sudo apt update
   sudo apt install nodejs npm postgresql redis-server nginx
   ```

3. **Clone Repository**
   ```bash
   git clone your-repo-url
   cd FUTURE_FS_02/backend
   npm install
   ```

4. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with production values
   nano .env
   ```

5. **Setup Process Manager (PM2)**
   ```bash
   npm install -g pm2
   pm2 start src/server.js --name "dhanjo-api"
   pm2 startup
   pm2 save
   ```

6. **Configure nginx Reverse Proxy**
   ```bash
   sudo nano /etc/nginx/sites-available/dhanjo-api
   ```
   
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **Enable Site & Restart nginx**
   ```bash
   sudo ln -s /etc/nginx/sites-available/dhanjo-api /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

---

## Database Setup

### PostgreSQL Setup

1. **Create Database**
   ```bash
   psql -U postgres
   CREATE DATABASE dhanjo_ecommerce;
   CREATE USER dhanjo_user WITH PASSWORD 'strong_password';
   GRANT ALL PRIVILEGES ON DATABASE dhanjo_ecommerce TO dhanjo_user;
   \q
   ```

2. **Run Migrations** (if available)
   ```bash
   cd backend
   npm run migrate
   ```

3. **Seed Sample Data** (optional)
   ```bash
   npm run seed
   ```

### Environment Variables for Database
```env
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=dhanjo_ecommerce
DB_USER=dhanjo_user
DB_PASSWORD=your_strong_password
```

---

## Environment Configuration

### Production Frontend (.env)
```env
VITE_API_URL=https://api.yourdomain.com/api
NODE_ENV=production
```

### Production Backend (backend/.env)
```env
NODE_ENV=production
PORT=5000
CLIENT_URL=https://yourdomain.com

# Database
DB_HOST=db.yourdomain.com
DB_PORT=5432
DB_NAME=dhanjo_ecommerce
DB_USER=dhanjo_user
DB_PASSWORD=secure_password

# Security
JWT_SECRET=your_very_long_random_secret_key_change_this
JWT_EXPIRY=7d
CORS_ORIGIN=https://yourdomain.com

# Stripe
STRIPE_PUBLIC_KEY=pk_live_your_live_key
STRIPE_SECRET_KEY=sk_live_your_live_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=noreply@yourdomain.com

# Redis
REDIS_URL=redis://your-redis-server:6379

# Other Services
GOOGLE_ANALYTICS_ID=G_your_ga_id
SENTRY_DSN=https://your_sentry_dsn
```

---

## SSL/HTTPS Setup

### Using Let's Encrypt (Free)

1. **Install Certbot**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Generate Certificate**
   ```bash
   sudo certbot certonly --nginx -d yourdomain.com -d api.yourdomain.com
   ```

3. **Auto-Renewal**
   ```bash
   sudo systemctl enable certbot.timer
   sudo systemctl start certbot.timer
   ```

---

## Monitoring & Maintenance

### Health Checks
```bash
# Frontend
curl https://yourdomain.com

# Backend
curl https://api.yourdomain.com/api/health
```

### Logs
```bash
# Render/Railway
Check in platform dashboard

# EC2/DigitalOcean with PM2
pm2 logs dhanjo-api
tail -f /var/log/nginx/error.log
```

### Monitoring Tools
- **Uptime**: UptimeRobot, Pingdom
- **Error Tracking**: Sentry
- **Performance**: New Relic, DataDog
- **Analytics**: Google Analytics

---

## Troubleshooting

### Frontend Issues

**"Cannot GET /" after deployment**
- Ensure build command completed successfully
- Verify `dist/` folder was deployed
- Check web server routes (SPA routing fix needed)

**API calls failing**
- Check `VITE_API_URL` environment variable
- Verify CORS settings in backend
- Check browser console for errors

### Backend Issues

**Database connection failed**
- Verify database credentials in `.env`
- Check database server is running and accessible
- Ensure firewall allows connections

**Port already in use**
- Change `PORT` in `.env`
- Or find process: `lsof -i :5000` and kill it

**Rate limiting blocking requests**
- Adjust `RATE_LIMIT_MAX_REQUESTS` in `.env`
- Consider IP whitelisting for trusted services

---

## Post-Deployment Checklist

- [ ] Frontend accessible at domain
- [ ] Backend API responding with health check
- [ ] Database connected successfully
- [ ] Authentication working (register/login)
- [ ] Products loading from database
- [ ] Search functionality working
- [ ] Shopping cart functioning
- [ ] Payment processing working (test mode)
- [ ] Admin dashboard accessible
- [ ] Wishlist operations working
- [ ] SSL/HTTPS certificate active
- [ ] Monitoring and alerts configured
- [ ] Backups scheduled
- [ ] Error tracking configured (Sentry)
- [ ] Analytics tracking implemented

---

## Support & Resources

- **React Docs**: https://react.dev
- **Vite Guide**: https://vitejs.dev
- **Express.js**: https://expressjs.com
- **PostgreSQL**: https://www.postgresql.org
- **Stripe API**: https://stripe.com/docs/api

---

## Quick Deployment Commands

### Full Stack Local Development
```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
cd backend && npm run dev
```

### Build for Production
```bash
# Frontend
npm run build

# Backend (no build needed for Node.js)
cd backend && npm install --production
```

### Deploy Frontend (Vercel)
```bash
npm install -g vercel
vercel --prod
```

### Deploy Backend (Render)
```bash
git push -u origin main
# Then connect on Render dashboard
```

---

**Deployment Status: Ready ✅**

Last Updated: January 22, 2026
