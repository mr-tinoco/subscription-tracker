# Subscription Tracker - Deployment Guide
## Step-by-Step Infrastructure Instructions for Learning Developers

---

## 🎯 PURPOSE

This file contains detailed, hand-holding instructions for:
1. Setting up the project locally
2. Using Git/GitHub
3. Deploying to Vercel/Netlify
4. Setting up payment (Gumroad)
5. Troubleshooting common issues

**Assumption:** You're learning infrastructure. Every command is explained.

---

## 📂 INITIAL PROJECT SETUP

### Step 1: Create Project Folder

```bash
# Open terminal
# Navigate to where you keep projects
cd ~/projects

# Create project folder
mkdir subscription-tracker

# Go into that folder
cd subscription-tracker

# Verify you're in the right place
pwd
# Should show: /home/[your-username]/projects/subscription-tracker
```

**What this does:** Creates a dedicated folder for your project

---

### Step 2: Initialize Git

```bash
# Make sure you're in project folder
cd ~/projects/subscription-tracker

# Initialize git repository
git init

# Verify git is set up
ls -la
# You should see a .git folder
```

**What this does:** Turns your folder into a git repository for version control

---

### Step 3: Create .gitignore

```bash
# Create .gitignore file
touch .gitignore

# Open it in your editor
nano .gitignore
# Or use: code .gitignore (if using VS Code)
```

**Add this content:**
```
# Dependencies
node_modules/
package-lock.json

# Environment variables
.env
.env.local

# OS files
.DS_Store
Thumbs.db

# Editor files
.vscode/
.idea/

# Build files
dist/
build/

# Logs
*.log
```

**Save and exit** (Ctrl+X, then Y, then Enter if using nano)

**What this does:** Tells git which files to ignore (don't need to track)

---

### Step 4: Create Basic Files

```bash
# Create the main files
touch index.html
touch styles.css
touch app.js
touch README.md

# Create .claude folder for context
mkdir .claude
touch .claude/project-context.md
touch .claude/build-log.md
touch .claude/deployment.md

# Verify files were created
ls -la
```

**What this does:** Creates all the files you'll need for the project

---

### Step 5: Add Starter Code to index.html

```bash
# Open index.html
nano index.html
# Or: code index.html
```

**Add this basic structure:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Tracker</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Subscription Tracker</h1>
    <p>Coming soon...</p>
    
    <script src="app.js"></script>
</body>
</html>
```

**Save and exit**

**What this does:** Creates the skeleton of your web page

---

## 🐙 GITHUB SETUP

### Step 1: Create GitHub Repository

**In your browser:**
1. Go to https://github.com
2. Click the "+" in top right
3. Click "New repository"
4. Name it: `subscription-tracker`
5. Description: "Simple subscription tracking app"
6. Keep it Public (or Private if you prefer)
7. **Do NOT check** "Add README" (you already have one)
8. Click "Create repository"

**What this does:** Creates an online home for your code

---

### Step 2: Connect Local to GitHub

**GitHub will show you commands. Use these:**

```bash
# Make sure you're in your project folder
cd ~/projects/subscription-tracker

# Add all files to git
git add .

# Make first commit
git commit -m "Initial commit - project setup"

# Add GitHub as remote (use YOUR GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/subscription-tracker.git

# Push to GitHub
git branch -M main
git push -u origin main

# Enter your GitHub credentials if asked
```

**What this does:** Uploads your local code to GitHub

---

### Step 3: Verify Upload

**In your browser:**
1. Go to your GitHub repository
2. Refresh the page
3. You should see your files

**What this does:** Confirms code is on GitHub

---

## 💻 LOCAL DEVELOPMENT

### Option 1: Simple HTTP Server (Easiest)

```bash
# Navigate to project folder
cd ~/projects/subscription-tracker

# Start server (Python method - usually pre-installed)
python3 -m http.server 8000

# You should see: "Serving HTTP on 0.0.0.0 port 8000"

# Open browser to: http://localhost:8000
```

**To stop server:** Press Ctrl+C in terminal

**What this does:** Runs your app locally so you can test

---

### Option 2: VS Code Live Server (If using VS Code)

```bash
# Open project in VS Code
code ~/projects/subscription-tracker

# In VS Code:
# 1. Install "Live Server" extension (one time setup)
# 2. Right-click index.html
# 3. Select "Open with Live Server"
# 4. Browser opens automatically
```

**What this does:** Auto-refreshes browser when you save files

---

### Option 3: npx http-server (Alternative)

```bash
# Navigate to project
cd ~/projects/subscription-tracker

# Run server (installs if needed)
npx http-server -p 8080

# Open browser to: http://localhost:8080
```

**What this does:** Modern server with nice features

---

## 📝 DAILY DEVELOPMENT WORKFLOW

### Each Time You Build:

```bash
# 1. Navigate to project
cd ~/projects/subscription-tracker

# 2. Start server (choose one method from above)
python3 -m http.server 8000

# 3. Open browser
# Go to: http://localhost:8000

# 4. Edit files (index.html, app.js, styles.css)
# Save changes

# 5. Refresh browser to see changes
# (Or use Live Server for auto-refresh)

# 6. When session ends, commit your work:
git add .
git commit -m "Descriptive message about what you built"
git push

# 7. Stop server
# Press Ctrl+C in terminal
```

**What this does:** Your daily build → test → commit cycle

---

## 🚀 DEPLOYMENT (When Ready to Ship)

### Option 1: Vercel (Recommended)

**Step 1: Install Vercel CLI**
```bash
# Install Vercel globally (one-time setup)
npm install -g vercel

# Or if you don't have npm:
# Download from: https://vercel.com/download
```

**Step 2: Deploy**
```bash
# Navigate to project
cd ~/projects/subscription-tracker

# Login to Vercel (first time only)
vercel login
# Follow prompts, connect your GitHub

# Deploy
vercel

# Answer prompts:
# "Set up and deploy?" → Yes
# "Which scope?" → Your account
# "Link to existing project?" → No
# "What's your project's name?" → subscription-tracker
# "In which directory is your code?" → ./ (current directory)
# "Want to modify settings?" → No

# Wait for deployment...
# You'll get a URL like: https://subscription-tracker-xyz.vercel.app
```

**Step 3: Test Live Site**
```bash
# Open the URL Vercel gave you
# Test all features
# If it works, you're live!
```

**What this does:** Puts your app on the internet with a real URL

---

### Option 2: Netlify (Alternative)

**Step 1: Create Netlify Account**
1. Go to https://netlify.com
2. Sign up (use GitHub login)

**Step 2: Deploy from GitHub**
1. Click "Add new site" → "Import an existing project"
2. Choose "Deploy with GitHub"
3. Select your `subscription-tracker` repository
4. Build settings: (leave default - no build command needed)
5. Click "Deploy"
6. Wait 1-2 minutes
7. You get a URL like: https://random-name-123.netlify.app

**Step 3: Custom Name (Optional)**
1. In Netlify dashboard
2. Go to "Site settings" → "Change site name"
3. Change to: subscription-tracker
4. New URL: https://subscription-tracker.netlify.app

**What this does:** Same as Vercel, different platform

---

## 💳 PAYMENT SETUP (Gumroad)

### Step 1: Create Gumroad Account

```
1. Go to: https://gumroad.com
2. Click "Start Selling"
3. Sign up with email
4. Verify email
5. Complete profile
```

---

### Step 2: Create Product

```
1. Click "Create Product"
2. Product name: "Subscription Tracker"
3. Description: "Simple web app to track all your subscriptions"
4. Price: $5 (or whatever you want)
5. Upload thumbnail: (screenshot of your app)
6. Product URL: /subscription-tracker
7. Click "Save"
```

---

### Step 3: Add to Your App

**Create a "Buy" button in your deployed app:**

```html
<!-- In your index.html, add this where you want the button -->
<a href="https://YOUR_USERNAME.gumroad.com/l/subscription-tracker" 
   target="_blank"
   class="buy-button">
   Buy Now - $5
</a>
```

**Or use Gumroad's overlay (fancier):**

```html
<!-- Add before closing </body> tag -->
<script src="https://gumroad.com/js/gumroad.js"></script>

<!-- Add button wherever you want -->
<a class="gumroad-button" href="https://YOUR_USERNAME.gumroad.com/l/subscription-tracker">
  Buy Now - $5
</a>
```

---

### Step 4: Test Purchase

```
1. Deploy your updated app (with buy button)
2. Click the buy button yourself
3. Complete a test purchase ($0 using test mode)
4. Verify email receipt works
5. Now set it live!
```

**What this does:** Lets people buy your app with credit card

---

## 🐛 TROUBLESHOOTING

### Issue: "Command not found: git"

**Solution:**
```bash
# Install git (Mac)
brew install git

# Install git (Ubuntu/Linux)
sudo apt install git

# Install git (Windows)
# Download from: https://git-scm.com/download/win
```

---

### Issue: "Permission denied (publickey)" when pushing to GitHub

**Solution:**
```bash
# Set up SSH key for GitHub
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter for all prompts

# Copy your SSH key
cat ~/.ssh/id_ed25519.pub
# Copy the output

# Add to GitHub:
# 1. Go to GitHub Settings → SSH Keys
# 2. Click "New SSH Key"
# 3. Paste your key
# 4. Save

# Try pushing again
```

---

### Issue: Port already in use (8000, 8080, etc.)

**Solution:**
```bash
# Find what's using the port
lsof -i :8000

# Kill that process
kill -9 [PID from above command]

# Or just use a different port
python3 -m http.server 8001
```

---

### Issue: Changes not showing in browser

**Solutions:**
1. **Hard refresh:** Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
2. **Clear cache:** Chrome → Settings → Privacy → Clear Data
3. **Try incognito mode:** Ctrl+Shift+N
4. **Check file saved:** Make sure you saved your changes
5. **Check console:** F12 → Console tab for errors

---

### Issue: Vercel deployment failed

**Solution:**
```bash
# Check build logs
vercel logs

# Redeploy
vercel --prod

# If still failing, check:
# 1. All files committed to git
# 2. No syntax errors (check browser console)
# 3. No missing files (index.html must exist)
```

---

### Issue: Git saying "nothing to commit"

**What this means:** No changes since last commit

**Check what changed:**
```bash
git status
# Shows which files changed

git diff
# Shows exact changes
```

---

## 📋 CHEAT SHEET - DAILY COMMANDS

```bash
# START OF DAY
cd ~/projects/subscription-tracker
python3 -m http.server 8000
# Open http://localhost:8000 in browser

# DURING BUILD
# Edit files, save, refresh browser

# END OF SESSION
Ctrl+C (stop server)
git add .
git commit -m "Built [feature name]"
git push

# DEPLOY TO VERCEL
vercel --prod
```

---

## 🎯 DEPLOYMENT CHECKLIST (Before Launching)

**Pre-Launch Testing:**
- [ ] All features work locally
- [ ] No console errors (F12 → Console)
- [ ] Works on Chrome
- [ ] Works on Firefox
- [ ] Works on Safari
- [ ] Works on mobile (test with phone)
- [ ] Data persists after refresh
- [ ] Add/Delete functions work
- [ ] Total calculation correct
- [ ] Basic styling looks good

**Deployment Steps:**
- [ ] Code committed to GitHub
- [ ] Deployed to Vercel/Netlify
- [ ] Live URL works
- [ ] Tested live site thoroughly
- [ ] Gumroad product created
- [ ] Buy button added and working
- [ ] Test purchase completed

**Launch Day:**
- [ ] Screenshot app for social media
- [ ] Write launch post
- [ ] Post in Discord
- [ ] Post on Twitter
- [ ] Share with friends
- [ ] Celebrate! 🎉

---

## 💬 GETTING HELP

**If You're Stuck:**

1. **Check console for errors:**
   - Press F12
   - Go to Console tab
   - Copy error message
   - Ask Claude Code: "I'm getting error: [paste error]"

2. **Google the error:**
   - Copy exact error message
   - Google it
   - Often find StackOverflow solutions

3. **Ask Claude Code:**
   - Be specific: "In app.js line 23, getting error X"
   - Show your code
   - Explain what you expected vs what happened

4. **Ask SV Guru V2:**
   - For bigger architectural questions
   - For "why isn't this working" mysteries
   - For deployment issues

---

## 🎉 SUCCESS CRITERIA

**You'll know you're done when:**
- ✅ App works at live URL
- ✅ Buy button works
- ✅ You can demo it to anyone in 2 minutes
- ✅ No console errors
- ✅ Mobile responsive
- ✅ Ready to make first sale

**Then:**
- Post launch announcement
- Ship it to the world
- Make that first $! 🚀

---

**Last Updated:** December 19, 2025
**Status:** Ready to use when you start building
