'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, BarChart3, Settings, Plus, Edit, Trash2, Eye, Calendar, TrendingUp, MessageSquare, Tag, Clock, CheckCircle, XCircle, Copy } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'update' | 'announcement' | 'promotion';
  status: 'active' | 'scheduled' | 'expired';
  impressions: number;
  clicks: number;
  ctr: number;
  dismissals: number;
  createdAt: Date;
}

interface Analytics {
  totalImpressions: number;
  totalClicks: number;
  totalDismissals: number;
  averageCTR: number;
  activeNotifications: number;
  totalNotifications: number;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'notifications' | 'analytics' | 'settings'>('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const router = useRouter();

  // Sample data
  const analytics: Analytics = {
    totalImpressions: 45678,
    totalClicks: 1234,
    totalDismissals: 2345,
    averageCTR: 2.7,
    activeNotifications: 3,
    totalNotifications: 15
  };

  const notifications: Notification[] = [
    {
      id: '1',
      title: 'FlashPop v2.0 Rilis!',
      message: 'Kami senang mengumumkan rilis FlashPop v2.0 dengan fitur multi-tab dan analytics yang lebih baik.',
      type: 'update',
      status: 'active',
      impressions: 12345,
      clicks: 234,
      ctr: 1.9,
      dismissals: 567,
      createdAt: new Date('2024-01-10')
    },
    {
      id: '2',
      title: 'Maintenance Terjadwal',
      message: 'Sistem akan mengalami maintenance pada 15 Januari 2024, pukul 02:00 - 04:00 WIB.',
      type: 'announcement',
      status: 'active',
      impressions: 8765,
      clicks: 123,
      ctr: 1.4,
      dismissals: 234,
      createdAt: new Date('2024-01-08')
    },
    {
      id: '3',
      title: 'Diskon 50% Paket Pro',
      message: 'Dapatkan diskon 50% untuk paket Pro tahunan. Promo berakhir 31 Desember 2024!',
      type: 'promotion',
      status: 'scheduled',
      impressions: 0,
      clicks: 0,
      ctr: 0,
      dismissals: 0,
      createdAt: new Date('2024-01-05')
    }
  ];

  const embedCode = `<script src="https://flashpop.id/widget.js?token=fp_demo_12345678"></script>`;

  const handleLogout = () => {
    localStorage.removeItem('flashpop_token');
    localStorage.removeItem('flashpop_user');
    router.push('/login');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Aktif
          </span>
        );
      case 'scheduled':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            Terjadwal
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <XCircle className="w-3 h-3 mr-1" />
            Kadaluarsa
          </span>
        );
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'update':
        return <MessageSquare className="w-4 h-4 text-blue-600" />;
      case 'announcement':
        return <Calendar className="w-4 h-4 text-orange-600" />;
      case 'promotion':
        return <Tag className="w-4 h-4 text-green-600" />;
      default:
        return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">FlashPop</span>
              <span className="text-slate-500">Dashboard</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowEmbedModal(true)}
                className="text-slate-600 hover:text-slate-900 transition flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Embed Code
              </button>
              <button 
                onClick={handleLogout}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {[
                { id: 'overview', label: 'Ringkasan', icon: BarChart3 },
                { id: 'notifications', label: 'Notifikasi', icon: Bell },
                { id: 'analytics', label: 'Analitik', icon: TrendingUp },
                { id: 'settings', label: 'Pengaturan', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                    activeTab === tab.id
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl font-bold text-slate-900">Ringkasan Dashboard</h1>
                  <button 
                    onClick={() => setShowCreateModal(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Notifikasi Baru
                  </button>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-600">Total Tayangan</span>
                      <Eye className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">{analytics.totalImpressions.toLocaleString('id-ID')}</div>
                    <div className="text-sm text-green-600">+12% dari bulan lalu</div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-600">Total Klik</span>
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">{analytics.totalClicks.toLocaleString('id-ID')}</div>
                    <div className="text-sm text-green-600">+8% dari bulan lalu</div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-600">CTR Rata-rata</span>
                      <BarChart3 className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">{analytics.averageCTR}%</div>
                    <div className="text-sm text-red-600">-2% dari bulan lalu</div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-600">Notifikasi Aktif</span>
                      <Bell className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">{analytics.activeNotifications}</div>
                    <div className="text-sm text-slate-600">dari {analytics.totalNotifications} total</div>
                  </div>
                </div>

                {/* Recent Notifications */}
                <div className="bg-white rounded-xl border border-slate-200">
                  <div className="p-6 border-b border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-900">Notifikasi Terbaru</h2>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {notifications.slice(0, 3).map((notification) => (
                      <div key={notification.id} className="p-4 hover:bg-slate-50 transition">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            {getTypeIcon(notification.type)}
                            <div>
                              <h3 className="font-medium text-slate-900">{notification.title}</h3>
                              <p className="text-sm text-slate-600 line-clamp-1">{notification.message}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                                <span>{notification.impressions.toLocaleString('id-ID')} tayangan</span>
                                <span>{notification.clicks} klik</span>
                                <span>{notification.ctr}% CTR</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {getStatusBadge(notification.status)}
                            <div className="flex gap-1">
                              <button className="p-1 text-slate-400 hover:text-slate-600">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-slate-400 hover:text-red-600">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl font-bold text-slate-900">Manajemen Notifikasi</h1>
                  <button 
                    onClick={() => setShowCreateModal(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Notifikasi Baru
                  </button>
                </div>

                <div className="bg-white rounded-xl border border-slate-200">
                  <div className="p-6 border-b border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-900">Semua Notifikasi</h2>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="text-left p-4 font-medium text-slate-700">Notifikasi</th>
                          <th className="text-left p-4 font-medium text-slate-700">Tipe</th>
                          <th className="text-left p-4 font-medium text-slate-700">Status</th>
                          <th className="text-left p-4 font-medium text-slate-700">Tayangan</th>
                          <th className="text-left p-4 font-medium text-slate-700">Klik</th>
                          <th className="text-left p-4 font-medium text-slate-700">CTR</th>
                          <th className="text-left p-4 font-medium text-slate-700">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {notifications.map((notification) => (
                          <tr key={notification.id} className="hover:bg-slate-50">
                            <td className="p-4">
                              <div>
                                <h3 className="font-medium text-slate-900">{notification.title}</h3>
                                <p className="text-sm text-slate-600 line-clamp-1">{notification.message}</p>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                {getTypeIcon(notification.type)}
                                <span className="text-sm text-slate-600 capitalize">{notification.type}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              {getStatusBadge(notification.status)}
                            </td>
                            <td className="p-4 text-sm text-slate-600">
                              {notification.impressions.toLocaleString('id-ID')}
                            </td>
                            <td className="p-4 text-sm text-slate-600">
                              {notification.clicks}
                            </td>
                            <td className="p-4 text-sm text-slate-600">
                              {notification.ctr}%
                            </td>
                            <td className="p-4">
                              <div className="flex gap-1">
                                <button className="p-1 text-slate-400 hover:text-slate-600">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-slate-400 hover:text-slate-600">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-slate-400 hover:text-red-600">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-8">Analitik Detail</h1>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Performance Chart */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Performa 30 Hari Terakhir</h2>
                    <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
                      <p className="text-slate-500">Chart akan ditampilkan di sini</p>
                    </div>
                  </div>

                  {/* Top Performing */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Notifikasi Terbaik</h2>
                    <div className="space-y-3">
                      {notifications
                        .sort((a, b) => b.ctr - a.ctr)
                        .slice(0, 5)
                        .map((notification, index) => (
                          <div key={notification.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-bold text-slate-500">#{index + 1}</span>
                              {getTypeIcon(notification.type)}
                              <div>
                                <h4 className="text-sm font-medium text-slate-900 line-clamp-1">{notification.title}</h4>
                                <p className="text-xs text-slate-600">{notification.ctr}% CTR</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-slate-900">{notification.clicks}</div>
                              <div className="text-xs text-slate-600">klik</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Detailed Stats */}
                <div className="mt-8 bg-white rounded-xl border border-slate-200 p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Statistik Detail</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-slate-600 mb-2">Demografi Pengunjung</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Desktop</span>
                          <span className="font-medium">65%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Mobile</span>
                          <span className="font-medium">35%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-slate-600 mb-2">Waktu Tayang Terbaik</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">09:00 - 12:00</span>
                          <span className="font-medium">42%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">19:00 - 22:00</span>
                          <span className="font-medium">38%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-slate-600 mb-2">Interaksi per Tipe</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Update</span>
                          <span className="font-medium">3.2%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Promosi</span>
                          <span className="font-medium">2.8%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-8">Pengaturan</h1>
                
                <div className="space-y-6">
                  {/* Widget Settings */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Pengaturan Widget</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Posisi Widget</label>
                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                          <option>Kanan Bawah</option>
                          <option>Kiri Bawah</option>
                          <option>Kanan Atas</option>
                          <option>Kiri Atas</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Warna Tema</label>
                        <div className="flex gap-2">
                          <button className="w-8 h-8 bg-purple-600 rounded border-2 border-slate-300"></button>
                          <button className="w-8 h-8 bg-blue-600 rounded"></button>
                          <button className="w-8 h-8 bg-green-600 rounded"></button>
                          <button className="w-8 h-8 bg-orange-600 rounded"></button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Animasi</label>
                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                          <option>Slide In</option>
                          <option>Fade In</option>
                          <option>Bounce</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Account Settings */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Pengaturan Akun</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                        <input 
                          type="email" 
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                          defaultValue="user@example.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Nama Website</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                          defaultValue="Website Saya"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Domain</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                          defaultValue="https://example.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Create Notification Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-slate-900">Notifikasi Baru</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Judul Notifikasi</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="Masukkan judul notifikasi"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Pesan</label>
                <textarea 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg h-24"
                  placeholder="Masukkan pesan notifikasi"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tipe Notifikasi</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                  <option value="update">Update</option>
                  <option value="announcement">Pengumuman</option>
                  <option value="promotion">Promosi</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Jadwal Mulai</label>
                  <input 
                    type="datetime-local" 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Kadaluarsa</label>
                  <input 
                    type="datetime-local" 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
              >
                Batal
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                Buat Notifikasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Embed Code Modal */}
      {showEmbedModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full">
            <div className="p-6 border-b border-slate-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-slate-900">Embed Code</h2>
                <button 
                  onClick={() => setShowEmbedModal(false)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-slate-600 mb-4">
                Copy dan paste kode ini di website Anda sebelum tag &lt;/body&gt;:
              </p>
              
              <div className="relative">
                <code className="block bg-slate-900 text-green-400 p-4 rounded-lg text-sm font-mono">
                  {embedCode}
                </code>
                <button 
                  onClick={() => navigator.clipboard.writeText(embedCode)}
                  className="absolute top-2 right-2 bg-slate-700 text-white px-3 py-1 rounded text-sm hover:bg-slate-600 transition flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> Pastikan website Anda menggunakan HTTPS untuk keamanan maksimal.
                </p>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-200 flex justify-end">
              <button 
                onClick={() => setShowEmbedModal(false)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}