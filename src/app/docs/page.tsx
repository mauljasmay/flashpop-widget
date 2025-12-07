import Link from 'next/link';
import { ArrowLeft, Book, Code, Zap, Settings, BarChart3, Users, Shield } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 text-slate-600 hover:text-slate-900">
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Beranda</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Book className="w-6 h-6 text-purple-600" />
              <span className="text-xl font-bold text-slate-900">Dokumentasi FlashPop</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Dokumentasi Lengkap FlashPop
          </h1>
          <p className="text-xl text-slate-600">
            Panduan lengkap untuk mengimplementasikan dan mengelola widget notifikasi FlashPop
          </p>
        </div>

        {/* Quick Start */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <Zap className="w-6 h-6 text-purple-600 mr-3" />
            Quick Start
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">1. Instalasi Widget</h3>
              <p className="text-slate-600 mb-4">
                Tambahkan script berikut ke dalam tag &lt;head&gt; atau sebelum tag &lt;/body&gt; penutup di website Anda:
              </p>
              <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                {`<script src="http://localhost:3000/widget.js?token=YOUR_TOKEN"></script>`}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">2. Konfigurasi Token</h3>
              <p className="text-slate-600 mb-4">
                Ganti <code className="bg-slate-100 px-2 py-1 rounded text-sm">YOUR_TOKEN</code> dengan token yang Anda dapatkan dari dashboard.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">
                  <strong>Token Demo:</strong> <code>fp_demo_12345678</code>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">3. Kustomisasi (Opsional)</h3>
              <p className="text-slate-600">
                Widget akan otomatis mengambil pengaturan dari server. Anda dapat mengubah posisi, tema, dan perilaku melalui dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center mb-4">
              <Settings className="w-8 h-8 text-purple-600 mr-3" />
              <h3 className="text-xl font-semibold text-slate-900">Pengaturan Widget</h3>
            </div>
            <ul className="space-y-2 text-slate-600">
              <li>• Posisi widget (kanan bawah, kiri bawah, dll)</li>
              <li>• Tema warna (ungu, biru, hijau)</li>
              <li>• Animasi masuk dan keluar</li>
              <li>• Auto-close setelah interaksi</li>
              <li>• Tampilkan badge notifikasi</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-8 h-8 text-purple-600 mr-3" />
              <h3 className="text-xl font-semibold text-slate-900">Analytics & Tracking</h3>
            </div>
            <ul className="space-y-2 text-slate-600">
              <li>• Pelacakan impressions</li>
              <li>• Klik dan interaksi pengguna</li>
              <li>• Tingkat konversi</li>
              <li>• Laporan real-time</li>
              <li>• Export data ke CSV</li>
            </ul>
          </div>
        </div>

        {/* API Reference */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <Code className="w-6 h-6 text-purple-600 mr-3" />
            API Reference
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">GET /api/widget</h3>
              <p className="text-slate-600 mb-3">Mengambil data widget berdasarkan token</p>
              <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-3">
{`GET /api/widget?token=fp_demo_12345678
Authorization: Bearer YOUR_API_KEY`}
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Response:</h4>
              <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm">
{`{
  "success": true,
  "data": {
    "settings": {
      "position": "bottom-right",
      "theme": "purple",
      "animation": "slide-in",
      "autoClose": false,
      "showBadge": true
    },
    "notifications": [...]
  }
}`}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">POST /api/widget</h3>
              <p className="text-slate-600 mb-3">Mencatat interaksi pengguna dengan notifikasi</p>
              <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-3">
{`POST /api/widget
Content-Type: application/json

{
  "token": "fp_demo_12345678",
  "notificationId": "1",
  "event": "click"
}`}
              </div>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <Shield className="w-6 h-6 text-purple-600 mr-3" />
            Troubleshooting
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Widget Tidak Muncul</h3>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>Pastikan token yang digunakan valid</li>
                <li>Periksa console browser untuk error JavaScript</li>
                <li>Pastikan server FlashPop berjalan</li>
                <li>Periksa koneksi internet</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Notifikasi Tidak Update</h3>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>Widget melakukan refresh otomatis setiap 5 menit</li>
                <li>Coba refresh halaman secara manual</li>
                <li>Periksa pengaturan cache browser</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Error CORS</h3>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>Pastikan domain website terdaftar di dashboard</li>
                <li>Periksa konfigurasi CORS di server</li>
                <li>Gunakan HTTPS untuk production</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-center text-white">
          <Users className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Butuh Bantuan?</h2>
          <p className="mb-6">
            Tim support kami siap membantu Anda 24/7. Hubungi kami untuk bantuan teknis atau pertanyaan lainnya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@flashpop.id"
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-slate-50 transition"
            >
              Email Support
            </a>
            <a
              href="https://wa.me/6281234567890"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}