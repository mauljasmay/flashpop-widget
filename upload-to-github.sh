#!/bin/bash

# GitHub Upload Script untuk FlashPop
# Script ini akan mengupload proyek ke GitHub dengan aman

# Warna untuk output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fungsi untuk menampilkan pesan dengan warna
print_message() {
    echo -e "${2}${1}${NC}"
}

# Fungsi untuk menampilkan error dan keluar
error_exit() {
    print_message "ERROR: $1" "$RED"
    exit 1
}

# Fungsi untuk menampilkan success
success() {
    print_message "SUCCESS: $1" "$GREEN"
}

# Fungsi untuk menampilkan warning
warning() {
    print_message "WARNING: $1" "$YELLOW"
}

# Fungsi untuk menampilkan info
info() {
    print_message "INFO: $1" "$BLUE"
}

# Cek apakah git sudah diinstall
if ! command -v git &> /dev/null; then
    error_exit "Git tidak terinstall. Silakan install git terlebih dahulu."
fi

# Cek apakah curl sudah diinstall
if ! command -v curl &> /dev/null; then
    error_exit "cURL tidak terinstall. Silakan install curl terlebih dahulu."
fi

# Cek apakah jq sudah diinstall
if ! command -v jq &> /dev/null; then
    error_exit "jq tidak terinstall. Silakan install jq terlebih dahulu."
fi

# Variabel konfigurasi
GITHUB_USERNAME="${GITHUB_USERNAME:-mauljasmay}"
REPO_NAME="${REPO_NAME:-flashpop-widget}"
GITHUB_TOKEN="${GITHUB_TOKEN:-}"

# Validasi input
if [ -z "$GITHUB_TOKEN" ]; then
    error_exit "GitHub token tidak ditemukan. Set environment variable GITHUB_TOKEN atau export GITHUB_TOKEN=your_token"
fi

info "Mempersiapkan upload ke GitHub..."
info "Username: $GITHUB_USERNAME"
info "Repository: $REPO_NAME"

# Cek apakah repository sudah ada
info "Memeriksa apakah repository sudah ada..."
REPO_EXISTS=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    https://api.github.com/repos/$GITHUB_USERNAME/$REPO_NAME | \
    jq -r '.id // empty')

if [ "$REPO_EXISTS" != "empty" ]; then
    warning "Repository sudah ada. Menggunakan repository yang ada."
    REPO_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
else
    info "Membuat repository baru..."
    
    # Buat repository via API
    CREATE_RESPONSE=$(curl -s -X POST \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        https://api.github.com/user/repos \
        -d "{
            \"name\": \"$REPO_NAME\",
            \"description\": \"FlashPop - Widget Pop-up Notifikasi Super-Ringan untuk Website\",
            \"private\": false,
            \"auto_init\": false
        }")
    
    if [ $? -ne 0 ]; then
        error_exit "Gagal membuat repository. Periksa token GitHub Anda."
    fi
    
    success "Repository berhasil dibuat!"
    REPO_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
fi

# Inisialisasi git jika belum ada
if [ ! -d ".git" ]; then
    info "Menginisialisasi repository Git..."
    git init
    git add .
    git commit -m "Initial commit: FlashPop - Widget Pop-up Notifikasi Super-Ringan"
else
    info "Repository Git sudah ada."
fi

# Tambahkan remote origin jika belum ada
if ! git remote get-url origin &> /dev/null; then
    info "Menambahkan remote origin..."
    git remote add origin $REPO_URL
else
    info "Remote origin sudah ada, memperbarui URL..."
    git remote set-url origin $REPO_URL
fi

# Push ke GitHub
info "Mengupload ke GitHub..."
git push -u origin master || git push -u origin main

if [ $? -eq 0 ]; then
    success "Repository berhasil diupload ke GitHub!"
    echo ""
    echo "=============================================="
    echo "Repository URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo "=============================================="
    echo ""
    echo "Untuk deploy ke Vercel (recommended):"
    echo "1. Install Vercel CLI: npm i -g vercel"
    echo "2. Login ke Vercel: vercel login"
    echo "3. Deploy: vercel --prod"
    echo ""
    echo "Untuk deploy ke Netlify:"
    echo "1. Install Netlify CLI: npm i -g netlify-cli"
    echo "2. Login ke Netlify: netlify login"
    echo "3. Deploy: netlify deploy --prod --dir=.next"
else
    error_exit "Gagal mengupload ke GitHub. Periksa koneksi internet dan token GitHub Anda."
fi