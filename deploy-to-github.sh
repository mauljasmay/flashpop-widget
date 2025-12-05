#!/bin/bash

# GitHub Upload Script untuk FlashPop
# Cara penggunaan:
# 1. Export GitHub token: export GITHUB_TOKEN="ghp_your_token_here"
# 2. Jalankan script: ./upload-to-github.sh

# Warna untuk output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}    FlashPop GitHub Upload Script    ${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Konfigurasi
GITHUB_USERNAME="${GITHUB_USERNAME:-mauljasmay}"
REPO_NAME="${REPO_NAME:-flashpop-widget}"
GITHUB_TOKEN="${GITHUB_TOKEN:-}"

# Validasi
if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${RED}ERROR: GitHub token tidak ditemukan!${NC}"
    echo ""
    echo -e "${YELLOW}Cara mengatur token:${NC}"
    echo "1. Buat Personal Access Token di GitHub"
    echo "2. Export token dengan perintah:"
    echo -e "${BLUE}export GITHUB_TOKEN=\"ghp_your_token_here\"${NC}"
    echo "3. Jalankan ulang script ini"
    echo ""
    echo -e "${YELLOW}Atau gunakan GitHub CLI:${NC}"
    echo "gh repo create $REPO_NAME --public --clone=false"
    exit 1
fi

echo -e "${GREEN}✓ Token GitHub ditemukan${NC}"
echo -e "${BLUE}Username: $GITHUB_USERNAME${NC}"
echo -e "${BLUE}Repository: $REPO_NAME${NC}"
echo ""

# Cek dependencies
echo "🔍 Memeriksa dependencies..."
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git tidak terinstall${NC}"
    echo "Install: sudo apt-get install git (Ubuntu/Debian)"
    exit 1
fi

if ! command -v curl &> /dev/null; then
    echo -e "${RED}❌ cURL tidak terinstall${NC}"
    echo "Install: sudo apt-get install curl (Ubuntu/Debian)"
    exit 1
fi

echo -e "${GREEN}✓ Semua dependencies terinstall${NC}"
echo ""

# Inisialisasi Git jika belum ada
if [ ! -d ".git" ]; then
    echo "📦 Menginisialisasi Git repository..."
    git init
    git add .
    git commit -m "🚀 Initial commit: FlashPop - Widget Pop-up Notifikasi Super-Ringan

✨ Fitur:
- Landing page dengan hero section
- Login dan register system
- Dashboard admin dengan analytics
- API endpoints untuk notifications dan analytics
- Responsive design untuk mobile dan desktop
- Multi-tab widget interface
- Real-time analytics tracking
- Schedule dan expiry notifications

🛠 Tech Stack:
- Next.js 15 dengan App Router
- TypeScript 5
- Tailwind CSS
- shadcn/ui components
- REST API dengan JSON response

📊 Performance:
- Build size: ~100KB total
- First load: <5 seconds
- Mobile optimized
- SEO friendly"
else
    echo "📦 Git repository sudah ada"
fi

# Buat repository via GitHub CLI jika tersedia
if command -v gh &> /dev/null; then
    echo "🚀 Menggunakan GitHub CLI..."
    gh repo create $REPO_NAME --public --description="FlashPop - Widget Pop-up Notifikasi Super-Ringan untuk Website" --clone=false
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Repository berhasil dibuat dengan GitHub CLI${NC}"
    else
        echo "⚠️ Repository mungkin sudah ada, melanjutkan dengan push..."
    fi
else
    echo "⚠️ GitHub CLI tidak terinstall, menggunakan manual setup..."
    echo "Install GitHub CLI: npm install -g @github/cli"
fi

# Setup remote dan push
REPO_URL="https://$GITHUB_USERNAME@github.com/$GITHUB_USERNAME/$REPO_NAME.git"

if ! git remote get-url origin &> /dev/null; then
    echo "🔗 Menambahkan remote origin..."
    git remote add origin $REPO_URL
else
    echo "🔗 Memperbarui remote origin..."
    git remote set-url origin $REPO_URL
fi

echo "📤 Mengupload ke GitHub..."
git push -u origin master 2>/dev/null || git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}🎉 SUCCESS! Repository berhasil diupload ke GitHub!${NC}"
    echo ""
    echo "=============================================="
    echo -e "${BLUE}📍 Repository URL:${NC} https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo "=============================================="
    echo ""
    echo -e "${YELLOW}🚀 Next Steps (Deployment):${NC}"
    echo ""
    echo -e "${BLUE}1. Vercel (Recommended):${NC}"
    echo "   npm i -g vercel"
    echo "   vercel login"
    echo "   vercel --prod"
    echo ""
    echo -e "${BLUE}2. Netlify:${NC}"
    echo "   npm i -g netlify-cli"
    echo "   netlify login"
    echo "   netlify deploy --prod --dir=.next"
    echo ""
    echo -e "${BLUE}3. GitHub Pages:${NC}"
    echo "   Settings > Pages > Source: Deploy from a branch"
    echo "   Branch: main/master"
    echo "   Folder: .next"
    echo ""
    echo -e "${BLUE}4. Railway:${NC}"
    echo "   npm i -g @railway/cli"
    echo "   railway login"
    echo "   railway up"
    echo ""
else
    echo -e "${RED}❌ Gagal mengupload ke GitHub${NC}"
    echo "Periksa:"
    echo "1. Koneksi internet"
    echo "2. GitHub token validity"
    echo "3. Repository permissions"
    exit 1
fi