# 🚀 FlashPop - GitHub Upload Guide

## 📋 Prerequisites

1. **Git sudah terinstall**
2. **GitHub Personal Access Token** atau **GitHub CLI**

## 🔑 Cara 1: Menggunakan GitHub CLI (Recommended)

### Install GitHub CLI
```bash
# Install via npm
npm install -g @github/cli

# Atau via apt (Ubuntu/Debian)
sudo apt install gh
```

### Login ke GitHub
```bash
gh auth login
```

### Upload ke GitHub
```bash
# Buat repository baru
gh repo create flashpop-widget --public --description="FlashPop - Widget Pop-up Notifikasi Super-Ringan untuk Website" --clone=false

# Push ke GitHub
git init
git add .
git commit -m "🚀 Initial commit: FlashPop - Widget Pop-up Notifikasi Super-Ringan"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/flashpop-widget.git
git push -u origin main
```

## 🔑 Cara 2: Menggunakan Personal Access Token

### 1. Buat Personal Access Token
1. Login ke GitHub
2. Settings > Developer settings > Personal access tokens
3. Generate new token (classic)
4. Beri nama: "FlashPop Upload"
5. Pilih permissions: `repo` (full control)
6. Generate token dan copy

### 2. Upload Script
```bash
# Set environment variable
export GITHUB_TOKEN="ghp_your_token_here"
export GITHUB_USERNAME="your_github_username"

# Jalankan upload script
cd /home/z/my-project
bash deploy-to-github.sh
```

## 📝 Manual Upload Steps

### 1. Inisialisasi Git
```bash
cd /home/z/my-project
git init
git add .
git commit -m "🚀 Initial commit: FlashPop - Widget Pop-up Notifikasi Super-Ringan"
```

### 2. Buat Repository di GitHub
1. Login ke GitHub
2. Click "New repository"
3. Repository name: `flashpop-widget`
4. Description: `FlashPop - Widget Pop-up Notifikasi Super-Ringan untuk Website`
5. Public: ✅
6. Don't initialize with README (karena sudah ada)
7. Create repository

### 3. Push ke GitHub
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/flashpop-widget.git
git push -u origin main
```

## 🌐 Deployment Options

### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login dan deploy
vercel login
vercel --prod
```

### 2. Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login dan deploy
netlify login
netlify deploy --prod --dir=.next
```

### 3. Railway
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login dan deploy
railway login
railway up
```

### 4. GitHub Pages
1. Repository settings > Pages
2. Source: Deploy from a branch
3. Branch: main
4. Folder: .next
5. Save

## 📊 Project Information

- **Repository Name**: flashpop-widget
- **Description**: FlashPop - Widget Pop-up Notifikasi Super-Ringan untuk Website
- **Visibility**: Public
- **Main Branch**: main
- **Build Output**: .next folder

## 🎯 Quick Commands

```bash
# Satu baris untuk upload (dengan token)
export GITHUB_TOKEN="your_token" && bash deploy-to-github.sh

# Satu baris untuk deploy ke Vercel
npm i -g vercel && vercel --prod

# Satu baris untuk deploy ke Netlify
npm i -g netlify-cli && netlify deploy --prod --dir=.next
```

## ✅ Success Indicators

- ✅ Repository terbuat di GitHub
- ✅ Code berhasil diupload
- ✅ Build production berhasil
- ✅ API endpoints berfungsi
- ✅ Website dapat diakses

## 🔗 Useful Links

- GitHub: https://github.com
- Vercel: https://vercel.com
- Netlify: https://netlify.com
- Railway: https://railway.app