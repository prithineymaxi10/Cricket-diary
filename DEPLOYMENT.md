# Deployment Guide - The Cricket Diary

Complete guide for deploying The Cricket Diary to various platforms.

## 📋 Table of Contents

1. [GitHub Repository Setup](#github-repository-setup)
2. [Heroku Deployment (Full Stack)](#heroku-deployment-full-stack)
3. [Vercel Deployment (Frontend)](#vercel-deployment-frontend)
4. [GitHub Pages (Static Frontend)](#github-pages-static-frontend)
5. [Custom Server Deployment](#custom-server-deployment)
6. [MongoDB Atlas Setup](#mongodb-atlas-setup)

---

## GitHub Repository Setup

### Step 1: Initialize Repository

```bash
# Navigate to project directory
cd cricket-diary-project

# Initialize git (if not already done)
git init

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/cricket-diary.git

# Create and switch to main branch
git checkout -b main
```

### Step 2: Commit Initial Code

```bash
# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Cricket Diary full-stack application"

# Push to GitHub
git push -u origin main
```

### Step 3: Create GitHub Secrets (for CI/CD)

1. Go to Settings → Secrets and variables → Actions
2. Create these secrets:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: "production"
   - `API_URL`: Your production API URL

---

## Heroku Deployment (Full Stack)

### Prerequisites

- Heroku account ([signup](https://www.heroku.com))
- Heroku CLI installed (`npm i -g heroku`)
- MongoDB Atlas account ([signup](https://www.mongodb.com/cloud/atlas))

### Step 1: Create Heroku App

```bash
# Login to Heroku
heroku login

# Create app
heroku create cricket-diary-app
# If name taken, try: heroku create cricket-diary-YOUR_NAME
```

### Step 2: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create new cluster
3. Create database user
4. Whitelist your Heroku app IP (or allow all: 0.0.0.0/0)
5. Get connection string

### Step 3: Configure Environment Variables

```bash
# Set environment variables on Heroku
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/cricket-diary?retryWrites=true&w=majority
heroku config:set FRONTEND_URL=https://cricket-diary-app.herokuapp.com
```

### Step 4: Create Procfile

Create `Procfile` in root directory:

```
web: node backend/server.js
```

### Step 5: Update package.json

```json
{
  "engines": {
    "node": "16.x"
  },
  "scripts": {
    "start": "node backend/server.js",
    "dev": "nodemon backend/server.js",
    "seed": "node backend/seed.js"
  }
}
```

### Step 6: Deploy

```bash
# Deploy to Heroku
git push heroku main

# Seed the database
heroku run npm run seed

# View logs
heroku logs --tail

# Open app in browser
heroku open
```

### Step 7: Verify Deployment

```bash
# Check if API is running
curl https://cricket-diary-app.herokuapp.com/api/health

# Should return: {"status":"API is running","timestamp":"..."}
```

---

## Vercel Deployment (Frontend)

### Prerequisites

- Vercel account ([signup](https://vercel.com))
- Vercel CLI (`npm i -g vercel`)

### Step 1: Configure Vercel

Create `vercel.json` in frontend directory:

```json
{
  "version": 2,
  "buildCommand": "echo 'No build needed'",
  "public": true,
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "API_URL": "@api_url"
  }
}
```

### Step 2: Deploy

```bash
# Navigate to frontend directory
cd frontend

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Add production environment variable
vercel env add API_URL
# Enter: https://your-backend-url/api
```

### Step 3: Verify

Visit your Vercel deployment URL in browser.

---

## GitHub Pages (Static Frontend)

### Step 1: Create gh-pages Branch

```bash
cd cricket-diary-project

# Create gh-pages branch
git checkout --orphan gh-pages

# Remove all files except frontend
git rm -rf .
git add frontend/*
git mv frontend/* .
git commit -m "Deploy frontend to GitHub Pages"
git push origin gh-pages
```

### Step 2: Configure GitHub Pages

1. Go to Settings → Pages
2. Set Source to: `gh-pages` branch
3. Set root folder (if applicable)
4. Save

### Step 3: Update Frontend API URL

Update `frontend/js/app.js`:

```javascript
const API_BASE_URL = 'https://your-backend-url/api';
```

### Step 4: Verify

Your frontend is now live at: `https://YOUR_USERNAME.github.io/cricket-diary/`

---

## Custom Server Deployment

### Option A: DigitalOcean

1. Create Droplet (Ubuntu 20.04 LTS)
2. SSH into server
3. Install Node.js and MongoDB
4. Clone repository
5. Configure environment variables
6. Start with PM2

```bash
# SSH into server
ssh root@your_server_ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repository
git clone https://github.com/YOUR_USERNAME/cricket-diary.git
cd cricket-diary-project/backend

# Install dependencies
npm install

# Create .env file
nano .env
# Add configuration

# Start with PM2
pm2 start server.js --name "cricket-diary"
pm2 startup
pm2 save
```

### Option B: AWS EC2

Similar to DigitalOcean, but with AWS services:

1. Create EC2 instance
2. Configure security groups
3. Install Node.js
4. Use RDS or MongoDB Atlas for database
5. Deploy and manage with PM2 or Docker

### Option C: Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "backend/server.js"]
```

Build and run:

```bash
docker build -t cricket-diary .
docker run -p 5000:5000 -e MONGODB_URI=... cricket-diary
```

---

## MongoDB Atlas Setup

### Step 1: Create Cluster

1. Sign in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Create Deployment"
3. Choose "Create a Shared Cluster" (free tier)
4. Select provider and region
5. Click "Create Cluster"

### Step 2: Create Database User

1. In your cluster, click "Security" → "Database Access"
2. Click "Add New Database User"
3. Enter username and password
4. Click "Add User"

### Step 3: Allow Network Access

1. Go to "Security" → "Network Access"
2. Click "Add IP Address"
3. Option A: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Option B: Add specific IPs
5. Click "Confirm"

### Step 4: Get Connection String

1. Click "Databases"
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy connection string
5. Replace `<password>` and `<database>` with your values

Example:
```
mongodb+srv://user:password@cluster.mongodb.net/cricket-diary?retryWrites=true&w=majority
```

---

## CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Heroku

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: akhileshns/heroku-deploy@v3.12.13
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: ${{ secrets.HEROKU_APP_NAME }}
          heroku_email: ${{ secrets.HEROKU_EMAIL }}
```

---

## Environment Variables Checklist

### Production

- [ ] `NODE_ENV=production`
- [ ] `PORT=5000` (or appropriate port)
- [ ] `MONGODB_URI=mongodb+srv://...`
- [ ] `FRONTEND_URL=https://your-domain.com`
- [ ] `API_URL=https://your-api.com/api`

### Development

- [ ] `NODE_ENV=development`
- [ ] `PORT=5000`
- [ ] `MONGODB_URI=mongodb://localhost:27017/cricket-diary`
- [ ] `FRONTEND_URL=http://localhost:3000`
- [ ] `API_URL=http://localhost:5000/api`

---

## Troubleshooting

### Issue: Connection Timeout

**Solution:**
- Check MongoDB IP whitelist
- Verify connection string
- Check network connectivity

### Issue: Frontend Can't Connect to API

**Solution:**
- Verify API_URL in frontend
- Check CORS settings in backend
- Check if backend is running

### Issue: Heroku App Crashes

**Solution:**
- Check logs: `heroku logs --tail`
- Verify environment variables: `heroku config`
- Test locally first

### Issue: Database Not Seeded

**Solution:**
```bash
# Run seed command
heroku run npm run seed

# Check database
mongosh "connection-string"
```

---

## Monitoring & Maintenance

### Health Checks

```bash
# Check API health
curl https://your-api.com/api/health

# Monitor logs
heroku logs --tail

# Check database
mongosh "your-connection-string"
```

### Backups

Enable automated MongoDB backups in Atlas:
1. Go to Backup & Restore
2. Enable automatic backups
3. Set backup frequency

---

## Cost Estimates

| Service | Free Tier | Pro | Notes |
|---------|-----------|-----|-------|
| MongoDB Atlas | 512MB/mo | ✓ | Shared cluster |
| Heroku | ✗ | $7/mo | Hobby dyno |
| Vercel | ✓ | $20/mo | Static hosting |
| GitHub | ✓ | ✗ | Repository only |

---

## Next Steps

1. Deploy to production
2. Set up monitoring
3. Configure backups
4. Enable SSL/HTTPS
5. Set up custom domain
6. Monitor performance

---

For more help, check [Heroku Docs](https://devcenter.heroku.com), [MongoDB Docs](https://docs.mongodb.com), or [Vercel Docs](https://vercel.com/docs).
