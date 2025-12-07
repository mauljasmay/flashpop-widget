'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Zap, Shield, BarChart3, Clock, Smartphone, Code, ArrowRight, Menu, X, Star, Users, Globe, Book } from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">FlashPop</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-slate-900 transition">Fitur</a>
              <a href="#demo" className="text-slate-600 hover:text-slate-900 transition">Demo</a>
              <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition">Harga</a>
              <a href="/login" className="text-slate-600 hover:text-slate-900 transition">Masuk</a>
              <a href="/register" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition inline-block text-center">
                Mulai Gratis
              </a>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200">
            <div className="px-4 py-2 space-y-1">
              <a href="#features" className="block py-2 text-slate-600">Fitur</a>
              <a href="#demo" className="block py-2 text-slate-600">Demo</a>
              <a href="#pricing" className="block py-2 text-slate-600">Harga</a>
              <a href="/login" className="block py-2 text-slate-600">Masuk</a>
              <a href="/register" className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg mt-2 inline-block text-center">
                Mulai Gratis
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Super Ringan - Hanya 15KB
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Pop-up Notifikasi
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              {" "}Super-Ringan
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Tampilkan pembaruan penting, pengumuman, atau informasi mendesak kepada pengunjung website secara 
            non-intrusif dan efisien. Integrasi hanya dengan satu baris kode.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => setShowDemo(true)}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center"
            >
              Coba Demo Live
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <Link
              href="/docs"
              className="border border-slate-300 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-50 transition inline-block text-center flex items-center justify-center gap-2"
            >
              <Book className="w-4 h-4" />
              Lihat Dokumentasi
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              Tanpa Kartu Kredit
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              Instalasi 1 Menit
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              SSL/TLS Security
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-slate-600">Dipercaya oleh website di seluruh Indonesia</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6" />
              <span className="font-semibold">10K+</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6" />
              <span className="font-semibold">5K+</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6" />
              <span className="font-semibold">4.9/5</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Fitur Unggulan FlashPop
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Semua yang Anda butuhkan untuk notifikasi website yang efektif dan ringan
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Super Ringan</h3>
              <p className="text-slate-600">Ukuran script maksimal 15KB dengan loading asinkron yang tidak memperlambat website Anda.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Multi-Tab Interface</h3>
              <p className="text-slate-600">Buat beberapa tab dalam satu pop-up (Updates, Pengumuman, Promosi) untuk informasi terorganisir.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Secure & Protected</h3>
              <p className="text-slate-600">Koneksi SSL/HTTPS dan token unik untuk mencegah penyalahgunaan widget oleh pihak tidak bertanggung jawab.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Analytics Built-in</h3>
              <p className="text-slate-600">Pantau tayangan, klik (CTR), dan tingkat penutupan untuk setiap notifikasi yang Anda buat.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Jadwal & Kedaluwarsa</h3>
              <p className="text-slate-600">Atur kapan notifikasi muncul dan hilang otomatis sesuai kebutuhan Anda.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Integrasi Cepat</h3>
              <p className="text-slate-600">Cukup copy-paste satu baris kode JavaScript sebelum tag &lt;/body&gt; untuk memulai.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Lihat Cara Kerja FlashPop
            </h2>
            <p className="text-xl text-slate-600">
              Widget notifikasi yang tidak mengganggu pengalaman pengguna
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Desktop View</h3>
                <div className="bg-slate-100 rounded-lg p-4 h-64 relative">
                  <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg border border-slate-200 p-3 max-w-xs">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">FlashPop Update</span>
                    </div>
                    <p className="text-sm text-slate-600">Website Anda akan memiliki notifikasi seperti ini!</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Mobile View</h3>
                <div className="bg-slate-100 rounded-lg p-4 h-64 flex items-center justify-center">
                  <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-3 max-w-xs w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">FlashPop Update</span>
                    </div>
                    <p className="text-sm text-slate-600">Responsif di semua perangkat</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-slate-50 rounded-lg">
              <h4 className="font-semibold text-slate-900 mb-2">Instalasi Super Mudah:</h4>
              <code className="text-sm bg-slate-800 text-green-400 p-2 rounded block">
                {`<script src="http://localhost:3000/widget.js?token=YOUR_TOKEN"></script>`}
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Harga Terjangkau untuk Semua Ukuran
            </h2>
            <p className="text-xl text-slate-600">
              Mulai gratis, upgrade saat Anda siap berkembang
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl border border-slate-200 p-8 hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Gratis</h3>
              <div className="text-3xl font-bold text-slate-900 mb-4">
                Rp0<span className="text-base font-normal text-slate-600">/bulan</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-slate-600">Hingga 1,000 tayangan/bulan</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-slate-600">1 website</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-slate-600">Dasar analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-slate-600">FlashPop branding</span>
                </li>
              </ul>
              <a href="/register" className="w-full border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition inline-block text-center">
                Mulai Gratis
              </a>
            </div>

            <div className="bg-purple-600 rounded-xl p-8 text-white hover:shadow-lg transition transform scale-105">
              <div className="bg-yellow-400 text-purple-900 text-sm font-semibold px-2 py-1 rounded inline-block mb-4">
                POPULER
              </div>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <div className="text-3xl font-bold mb-4">
                Rp99K<span className="text-base font-normal opacity-80">/bulan</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 mt-0.5" />
                  <span>Hingga 50,000 tayangan/bulan</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 mt-0.5" />
                  <span>Hingga 5 website</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 mt-0.5" />
                  <span>Analytics lengkap</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 mt-0.5" />
                  <span>Tanpa branding</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 mt-0.5" />
                  <span>Multi-tab interface</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 mt-0.5" />
                  <span>Schedule & expiry</span>
                </li>
              </ul>
              <button className="w-full bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-slate-100 transition font-semibold">
                Pilih Pro
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-8 hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Enterprise</h3>
              <div className="text-3xl font-bold text-slate-900 mb-4">
                Custom<span className="text-base font-normal text-slate-600">/bulan</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-slate-600">Tayangan tidak terbatas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-slate-600">Website tidak terbatas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-slate-600">Analytics advanced</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-slate-600">API access</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-slate-600">Custom integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-slate-600">Priority support</span>
                </li>
              </ul>
              <button className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition">
                Hubungi Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Meningkatkan Komunikasi Website Anda?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Bergabunglah dengan ribuan website yang menggunakan FlashPop untuk notifikasi yang efektif
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="bg-white text-purple-600 px-6 py-3 rounded-lg hover:bg-slate-50 transition font-semibold inline-block text-center">
              Mulai Gratis Sekarang
            </a>
            <button className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white/10 transition">
              Jadwalkan Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">FlashPop</span>
              </div>
              <p className="text-sm">Pop-up notifikasi super-ringan untuk website Indonesia.</p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Produk</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Fitur</a></li>
                <li><a href="#" className="hover:text-white transition">Harga</a></li>
                <li><a href="#" className="hover:text-white transition">Demo</a></li>
                <li><a href="#" className="hover:text-white transition">Integrasi</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Tentang</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Karir</a></li>
                <li><a href="#" className="hover:text-white transition">Kontak</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Dokumentasi</a></li>
                <li><a href="#" className="hover:text-white transition">API</a></li>
                <li><a href="#" className="hover:text-white transition">Status</a></li>
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>&copy; 2024 FlashPop. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-slate-900">FlashPop Demo</h3>
              <button 
                onClick={() => setShowDemo(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                <X />
              </button>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-purple-900">Notifikasi Aktif</span>
              </div>
              <p className="text-sm text-purple-800">Ini adalah contoh notifikasi FlashPop yang akan muncul di website Anda!</p>
            </div>
            
            <p className="text-slate-600 text-sm mb-4">
              Dengan FlashPop, Anda dapat dengan mudah menampilkan notifikasi penting kepada pengunjung website tanpa mengganggu pengalaman mereka.
            </p>
            
            <button 
              onClick={() => setShowDemo(false)}
              className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Mengerti, Lanjutkan!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}