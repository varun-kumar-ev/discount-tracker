# 🚀 Deployment & Maintenance Guide for Beginners

This guide will help you deploy your Discount Tracker app and maintain it, even if you're completely new to app development.

## 📋 Table of Contents
1. [What You Need to Know First](#what-you-need-to-know-first)
2. [Tools You'll Need](#tools-youll-need)
3. [Deployment Options](#deployment-options)
4. [Step-by-Step Deployment](#step-by-step-deployment)
5. [Maintaining Your App](#maintaining-your-app)
6. [Common Issues & Solutions](#common-issues--solutions)

---

## What You Need to Know First

### Understanding Your App Structure

Your app has **two parts**:
1. **Frontend (Client)** - The website users see (React app)
2. **Backend (Server)** - The API that searches for products (Node.js)

Both need to be deployed separately or together.

### What is Deployment?

**Deployment** = Putting your app on the internet so others can use it.

Right now, your app only works on your computer. After deployment, anyone with the internet can access it!

---

## Tools You'll Need

### 1. **Git & GitHub** (Free)
- **What it is**: Version control system to save your code
- **Why you need it**: Most hosting services use Git
- **How to get it**: 
  - Download: https://git-scm.com/downloads
  - Create account: https://github.com

### 2. **Node.js** (Free)
- **What it is**: Runtime to run JavaScript on servers
- **Why you need it**: Your backend needs it
- **How to get it**: https://nodejs.org (Download LTS version)

### 3. **Code Editor** (Free)
- **What it is**: Where you write/edit code
- **Recommendations**: 
  - VS Code: https://code.visualstudio.com
  - Cursor: (You're already using this!)

### 4. **Hosting Service** (Free/Paid)
- **What it is**: Where your app lives on the internet
- **Options**: See deployment options below

---

## Deployment Options

### Option 1: **Vercel** (Recommended for Beginners) ⭐
- ✅ **Free tier available**
- ✅ **Easiest to use**
- ✅ **Automatic deployments**
- ✅ **Great for React apps**
- ❌ Backend needs separate hosting

**Best for**: Frontend + Backend on separate services

### Option 2: **Render** (Best for Full-Stack)
- ✅ **Free tier available**
- ✅ **Can host both frontend and backend**
- ✅ **Easy setup**
- ❌ Free tier has limitations

**Best for**: Complete beginners who want everything in one place

### Option 3: **Heroku** (Popular but Paid)
- ✅ **Very popular**
- ✅ **Good documentation**
- ❌ **No free tier anymore** (Paid plans start at $5/month)

**Best for**: When you're ready to pay

### Option 4: **Railway** (Modern Alternative)
- ✅ **Free tier with $5 credit**
- ✅ **Simple deployment**
- ✅ **Good for beginners**

**Best for**: Modern full-stack apps

---

## Step-by-Step Deployment

### 🎯 **Recommended: Deploy Frontend on Vercel + Backend on Render**

This is the easiest and most beginner-friendly approach.

---

## Part 1: Prepare Your Code for Deployment

### Step 1.1: Create a GitHub Account

1. Go to https://github.com
2. Sign up for a free account
3. Verify your email

### Step 1.2: Install Git

1. Download Git: https://git-scm.com/downloads
2. Install it (use default settings)
3. Open terminal/command prompt
4. Verify installation:
   ```bash
   git --version
   ```

### Step 1.3: Initialize Git in Your Project

1. Open terminal in your project folder
2. Run these commands:

```bash
# Initialize Git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Discount Tracker app"
```

### Step 1.4: Create GitHub Repository

1. Go to GitHub.com
2. Click the **"+"** icon → **"New repository"**
3. Name it: `discount-tracker-app`
4. Make it **Public** (free hosting requires public repos)
5. Click **"Create repository"**
6. Copy the repository URL (looks like: `https://github.com/yourusername/discount-tracker-app.git`)

### Step 1.5: Push Code to GitHub

In your terminal, run:

```bash
# Add remote repository (replace with your URL)
git remote add origin https://github.com/yourusername/discount-tracker-app.git

# Push code to GitHub
git branch -M main
git push -u origin main
```

You'll need to enter your GitHub username and password (or use a Personal Access Token).

---

## Part 2: Deploy Backend (Server) on Render

### Step 2.1: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub (easiest way)
3. Authorize Render to access your GitHub

### Step 2.2: Create Environment File

Create a file `server/.env` (we'll add this to .gitignore later):

```env
PORT=5000
NODE_ENV=production
```

### Step 2.3: Update Server for Production

We need to make the server work in production. Let's update it:

**File: `server/index.js`** - Add this at the top:

```javascript
require('dotenv').config();
```

And update the CORS settings to allow your frontend domain.

### Step 2.4: Deploy Backend on Render

1. In Render dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select your `discount-tracker-app` repository
4. Configure:
   - **Name**: `discount-tracker-backend`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Click **"Create Web Service"**
6. Wait for deployment (5-10 minutes)
7. Copy your backend URL (looks like: `https://discount-tracker-backend.onrender.com`)

---

## Part 3: Deploy Frontend (Client) on Vercel

### Step 3.1: Update Frontend to Use Production Backend

We need to tell the frontend where your backend is deployed.

**File: `client/src/App.js`** - Update the API URL:

```javascript
// Add this constant at the top of the file
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

Then update the fetch call:

```javascript
const response = await fetch(`${API_URL}/api/search`, {
  // ... rest of the code
});
```

### Step 3.2: Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel

### Step 3.3: Deploy Frontend on Vercel

1. In Vercel dashboard, click **"Add New..."** → **"Project"**
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Add Environment Variable:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: Your Render backend URL (from Step 2.4)
5. Click **"Deploy"**
6. Wait for deployment (2-5 minutes)
7. Your app is live! Copy the URL (looks like: `https://discount-tracker-app.vercel.app`)

---

## Part 4: Alternative - Deploy Everything on Render

If you want everything in one place:

### Step 4.1: Deploy Backend (Same as Part 2)

Follow Part 2 steps above.

### Step 4.2: Deploy Frontend on Render

1. In Render dashboard, click **"New +"** → **"Static Site"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `discount-tracker-frontend`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Environment Variables**:
     - `REACT_APP_API_URL` = Your backend URL
4. Click **"Create Static Site"**
5. Wait for deployment

---

## Maintaining Your App

### 🔧 **Daily/Weekly Maintenance**

#### 1. **Monitor Your App**

**Check if it's working:**
- Visit your app URL daily
- Try a search to make sure it works
- Check for error messages

**Tools to help:**
- **UptimeRobot** (Free): https://uptimerobot.com
  - Monitors your app every 5 minutes
  - Sends email if app goes down
  - Free for 50 monitors

#### 2. **Check Logs**

**Render:**
- Go to your service dashboard
- Click "Logs" tab
- Look for errors (red text)

**Vercel:**
- Go to your project
- Click "Deployments" → Select deployment → "View Function Logs"

#### 3. **Update Dependencies** (Monthly)

Dependencies get security updates. Update them monthly:

```bash
# In your project folder
cd server
npm update

cd ../client
npm update
```

Then commit and push:
```bash
git add .
git commit -m "Update dependencies"
git push
```

Your hosting service will automatically redeploy!

---

### 🛠️ **Making Changes to Your App**

#### Step 1: Make Changes Locally

1. Edit files in your code editor
2. Test locally:
   ```bash
   npm run dev
   ```
3. Make sure everything works

#### Step 2: Save Changes to GitHub

```bash
git add .
git commit -m "Description of your changes"
git push
```

#### Step 3: Automatic Deployment

- **Vercel/Render** automatically detects changes
- They rebuild and redeploy your app
- Usually takes 2-5 minutes
- You'll get an email when it's done

---

### 📊 **Monitoring Tools** (Free)

#### 1. **Google Analytics** (Free)
- Track how many people visit your app
- See which pages are popular
- Free forever

**Setup:**
1. Go to https://analytics.google.com
2. Create account
3. Get tracking code
4. Add to `client/public/index.html`

#### 2. **Sentry** (Free tier)
- Catches errors automatically
- Sends you email when something breaks
- Free for small apps

**Setup:**
1. Go to https://sentry.io
2. Create account
3. Follow setup instructions

---

### 🔄 **Regular Maintenance Tasks**

#### **Weekly:**
- ✅ Check if app is working
- ✅ Review error logs
- ✅ Test search functionality

#### **Monthly:**
- ✅ Update dependencies
- ✅ Review analytics
- ✅ Check hosting service status page

#### **Quarterly:**
- ✅ Review and optimize code
- ✅ Check for security updates
- ✅ Backup your code (GitHub does this automatically)

---

## Common Issues & Solutions

### Issue 1: "App is not loading"

**Check:**
1. Is backend deployed and running? (Check Render dashboard)
2. Is frontend deployed? (Check Vercel dashboard)
3. Are environment variables set correctly?

**Solution:**
- Check logs in your hosting dashboard
- Make sure backend URL in frontend is correct

### Issue 2: "CORS Error"

**Problem:** Backend is blocking frontend requests

**Solution:** Update `server/index.js`:

```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-url.vercel.app'],
  credentials: true
}));
```

### Issue 3: "Build Failed"

**Check:**
1. Look at build logs in hosting dashboard
2. Common causes:
   - Missing dependencies
   - Syntax errors
   - Wrong build commands

**Solution:**
- Fix errors locally first
- Test with `npm run build` locally
- Push fixed code

### Issue 4: "App works locally but not deployed"

**Common causes:**
- Environment variables not set
- Wrong API URLs
- Missing files in deployment

**Solution:**
- Double-check environment variables in hosting dashboard
- Verify all files are in GitHub
- Check build logs

---

## Cost Breakdown

### Free Tier (What you can use):

| Service | Free Tier |
|---------|-----------|
| **GitHub** | Unlimited public repos |
| **Vercel** | Unlimited deployments, 100GB bandwidth |
| **Render** | 750 hours/month (enough for 1 app) |
| **UptimeRobot** | 50 monitors, 5-min checks |

### If You Need More (Paid):

- **Render**: $7/month for always-on service
- **Vercel**: $20/month for team features (free tier is usually enough)
- **Custom Domain**: $10-15/year (optional)

**Total Free Cost: $0/month** ✅

---

## Quick Reference Commands

### Local Development
```bash
# Install dependencies
npm run install-all

# Start app
npm run dev

# Test build
cd client && npm run build
cd ../server && npm start
```

### Git Commands
```bash
# Check status
git status

# Add changes
git add .

# Save changes
git commit -m "Your message"

# Push to GitHub
git push

# Pull latest changes
git pull
```

### Deployment Checklist

Before deploying:
- [ ] Code works locally
- [ ] All files committed to Git
- [ ] Pushed to GitHub
- [ ] Environment variables ready
- [ ] Backend URL noted down

After deploying:
- [ ] Backend is running
- [ ] Frontend is accessible
- [ ] Search functionality works
- [ ] No errors in logs
- [ ] Monitoring set up

---

## Getting Help

### When You're Stuck:

1. **Check Logs First**
   - Most errors are in deployment logs
   - Look for red error messages

2. **Search Error Messages**
   - Copy error message
   - Paste in Google
   - Usually someone had the same issue

3. **Community Help**
   - **Stack Overflow**: https://stackoverflow.com
   - **Reddit**: r/webdev, r/learnprogramming
   - **Discord**: Web Dev communities

4. **Documentation**
   - Vercel Docs: https://vercel.com/docs
   - Render Docs: https://render.com/docs
   - React Docs: https://react.dev

---

## Next Steps After Deployment

1. **Add Custom Domain** (Optional)
   - Buy domain from Namecheap/GoDaddy ($10-15/year)
   - Connect to Vercel/Render
   - Makes your app look professional

2. **Add Analytics**
   - Set up Google Analytics
   - Track user behavior

3. **Improve SEO**
   - Add meta tags
   - Improve page titles
   - Add sitemap

4. **Add Features**
   - User authentication
   - Price alerts
   - Wishlist

---

## Summary

**To Deploy:**
1. ✅ Push code to GitHub
2. ✅ Deploy backend on Render
3. ✅ Deploy frontend on Vercel
4. ✅ Set environment variables
5. ✅ Test your live app

**To Maintain:**
1. ✅ Check app weekly
2. ✅ Update dependencies monthly
3. ✅ Monitor with UptimeRobot
4. ✅ Fix issues as they come

**Cost:** $0/month (using free tiers)

**Time:** 1-2 hours for first deployment, 5-10 minutes for updates

---

You've got this! 🚀 Start with Part 1 and take it one step at a time. If you get stuck, refer back to the troubleshooting section or ask for help in developer communities.

Good luck! 🎉
