'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, BarChart3, Settings, Plus, Edit, Trash2, Eye, Calendar, TrendingUp, MessageSquare, Tag, Clock, CheckCircle, XCircle, Copy, RefreshCw, Key, Shield } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'overview' | 'notifications' | 'analytics' | 'settings' | 'tokens'>('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  // Form state for create notification
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'update' | 'announcement' | 'promotion'>('update');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Widget settings state
  const [widgetPosition, setWidgetPosition] = useState<'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'>('bottom-right');
  const [widgetTheme, setWidgetTheme] = useState<'purple' | 'blue' | 'green' | 'orange'>('purple');
  const [widgetAnimation, setWidgetAnimation] = useState<'slide' | 'fade' | 'bounce'>('slide');
  
  // Account settings state
  const [accountEmail, setAccountEmail] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountWebsite, setAccountWebsite] = useState('');
  
  // Token management state
  const [tokens, setTokens] = useState<any[]>([]);
  const [newTokenName, setNewTokenName] = useState('');
  const [newTokenPermissions, setNewTokenPermissions] = useState({
    read: true,
    write: false,
    delete: false
  });
  
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

  const embedCode = `<script src="http://localhost:3000/widget.js?token=fp_demo_12345678"></script>`;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('flashpop_user');
      if (user) {
        const userData = JSON.parse(user);
        setCurrentUser(userData);
        setAccountEmail(userData.email || '');
        setAccountName(userData.name || '');
        setAccountWebsite(userData.website || '');
      }
      
      // Load widget settings
      const settings = localStorage.getItem('flashpop_widget_settings');
      if (settings) {
        const parsedSettings = JSON.parse(settings);
        setWidgetPosition(parsedSettings.widgetPosition || 'bottom-right');
        setWidgetTheme(parsedSettings.widgetTheme || 'purple');
        setWidgetAnimation(parsedSettings.widgetAnimation || 'slide');
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('flashpop_token');
      localStorage.removeItem('flashpop_user');
    }
    router.push('/login');
  };

  const handleCreateNotification = () => {
    if (!notificationTitle.trim() || !notificationMessage.trim()) {
      alert('Judul dan pesan notifikasi harus diisi!');
      return;
    }

    // Create new notification
    const newNotification: Notification = {
      id: Date.now().toString(),
      title: notificationTitle,
      message: notificationMessage,
      type: notificationType,
      status: startDate && new Date(startDate) > new Date() ? 'scheduled' : 'active',
      impressions: 0,
      clicks: 0,
      ctr: 0,
      dismissals: 0,
      createdAt: new Date()
    };

    // In a real app, this would be sent to an API
    console.log('Creating notification:', newNotification);
    
    // Reset form
    setNotificationTitle('');
    setNotificationMessage('');
    setNotificationType('update');
    setStartDate('');
    setEndDate('');
    
    // Close modal
    setShowCreateModal(false);
    
    // Show success message
    alert('Notifikasi berhasil dibuat!');
  };

  const handleViewNotification = (notification: Notification) => {
    alert(`Melihat notifikasi: ${notification.title}\n\nPesan: ${notification.message}\n\nStatus: ${notification.status}\nTayangan: ${notification.impressions}\nKlik: ${notification.clicks}\nCTR: ${notification.ctr}%`);
  };

  const handleEditNotification = (notification: Notification) => {
    // Pre-fill the form with existing notification data
    setNotificationTitle(notification.title);
    setNotificationMessage(notification.message);
    setNotificationType(notification.type);
    setStartDate(notification.createdAt.toISOString().slice(0, 16));
    setEndDate('');
    
    // Open the create modal (which will now act as edit modal)
    setShowCreateModal(true);
    
    alert(`Mengedit notifikasi: ${notification.title}\n\nFitur edit lengkap akan diimplementasikan.`);
  };

  const handleDeleteNotification = (notificationId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus notifikasi ini?')) {
      // In a real app, this would call an API to delete the notification
      console.log('Deleting notification:', notificationId);
      alert('Notifikasi berhasil dihapus!');
    }
  };

  const handleExportAnalytics = () => {
    // In a real app, this would generate and download a CSV/PDF report
    alert('Fitur export analitik akan segera hadir!\n\nData yang akan diekspor:\n- Statistik tayangan\n- Data klik\n- Tingkat konversi\n- Laporan notifikasi');
  };

  const handleRefreshData = () => {
    // In a real app, this would fetch fresh data from the API
    alert('Data berhasil diperbarui!\n\nFitur refresh akan mengambil data terbaru dari server.');
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

  const generateToken = () => {
    return 'fp_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const handleCreateToken = () => {
    if (!newTokenName.trim()) {
      alert('Nama token harus diisi!');
      return;
    }

    const newToken = {
      id: Date.now().toString(),
      name: newTokenName,
      token: generateToken(),
      permissions: newTokenPermissions,
      createdAt: new Date(),
      lastUsed: null,
      status: 'active'
    };

    setTokens([...tokens, newToken]);
    
    // Reset form
    setNewTokenName('');
    setNewTokenPermissions({ read: true, write: false, delete: false });
    
    setShowTokenModal(false);
    
    alert(`Token berhasil dibuat!\n\nToken: ${newToken.token}\n\nSimpan token ini dengan aman. Token tidak akan ditampilkan lagi.`);
  };

  const handleDeleteToken = (tokenId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus token ini? Token yang dihapus tidak dapat digunakan lagi.')) {
      setTokens(tokens.filter(token => token.id !== tokenId));
      alert('Token berhasil dihapus!');
    }
  };

  const handleCopyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    alert('Token berhasil disalin ke clipboard!');
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
                { id: 'tokens', label: 'Token API', icon: Key },
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
                  <div className="flex gap-3">
                    <button 
                      onClick={handleRefreshData}
                      className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Refresh
                    </button>
                    <button 
                      onClick={() => setShowCreateModal(true)}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Notifikasi Baru
                    </button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div 
                    onClick={() => handleViewStatDetails('impressions')}
                    className="bg-white p-6 rounded-xl border border-slate-200 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-600">Total Tayangan</span>
                      <Eye className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">{analytics.totalImpressions.toLocaleString('id-ID')}</div>
                    <div className="text-sm text-green-600">+12% dari bulan lalu</div>
                  </div>

                  <div 
                    onClick={() => handleViewStatDetails('clicks')}
                    className="bg-white p-6 rounded-xl border border-slate-200 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-600">Total Klik</span>
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">{analytics.totalClicks.toLocaleString('id-ID')}</div>
                    <div className="text-sm text-green-600">+8% dari bulan lalu</div>
                  </div>

                  <div 
                    onClick={() => handleViewStatDetails('ctr')}
                    className="bg-white p-6 rounded-xl border border-slate-200 cursor-pointer hover:shadow-md transition-shadow"
                  >
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
                                <button 
                                  onClick={() => handleViewNotification(notification)}
                                  className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                                  title="Lihat Detail"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleEditNotification(notification)}
                                  className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                                  title="Edit Notifikasi"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteNotification(notification.id)}
                                  className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                                  title="Hapus Notifikasi"
                                >
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
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl font-bold text-slate-900">Analitik Detail</h1>
                  <button 
                    onClick={handleExportAnalytics}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    <TrendingUp className="w-4 h-4" />
                    Export Laporan
                  </button>
                </div>
                
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

            {/* Tokens Tab */}
            {activeTab === 'tokens' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">Token API</h1>
                    <p className="text-slate-600 mt-1">Kelola token API untuk integrasi dengan aplikasi eksternal</p>
                  </div>
                  <button 
                    onClick={() => setShowTokenModal(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Token Baru
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Token List */}
                  <div className="bg-white rounded-xl border border-slate-200">
                    <div className="p-6 border-b border-slate-200">
                      <h2 className="text-lg font-semibold text-slate-900">Token Aktif</h2>
                      <p className="text-sm text-slate-600 mt-1">Token yang dapat digunakan untuk mengakses API FlashPop</p>
                    </div>
                    
                    <div className="p-6">
                      {tokens.length === 0 ? (
                        <div className="text-center py-8">
                          <Key className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-slate-900 mb-2">Belum ada token</h3>
                          <p className="text-slate-600 mb-4">Buat token API pertama Anda untuk mulai mengintegrasikan FlashPop dengan aplikasi lain.</p>
                          <button 
                            onClick={() => setShowTokenModal(true)}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                          >
                            Buat Token Pertama
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {tokens.map((token) => (
                            <div key={token.id} className="border border-slate-200 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Key className="w-5 h-5 text-purple-600" />
                                  </div>
                                  <div>
                                    <h3 className="font-medium text-slate-900">{token.name}</h3>
                                    <p className="text-sm text-slate-600">
                                      Dibuat {token.createdAt.toLocaleDateString('id-ID')}
                                      {token.lastUsed && ` • Terakhir digunakan ${token.lastUsed.toLocaleDateString('id-ID')}`}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Aktif
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-slate-600">
                                  <span>Permissions:</span>
                                  <div className="flex gap-2">
                                    {token.permissions.read && <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">Read</span>}
                                    {token.permissions.write && <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Write</span>}
                                    {token.permissions.delete && <span className="px-2 py-1 bg-red-100 text-red-800 rounded">Delete</span>}
                                  </div>
                                </div>
                                
                                <div className="flex gap-2">
                                  <button 
                                    onClick={() => handleCopyToken(token.token)}
                                    className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition"
                                  >
                                    Copy Token
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteToken(token.id)}
                                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                                  >
                                    Hapus
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Security Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-blue-900">Keamanan Token</h3>
                        <ul className="text-sm text-blue-800 mt-1 space-y-1">
                          <li>• Simpan token dengan aman dan jangan bagikan ke orang lain</li>
                          <li>• Token memiliki izin yang dapat dikontrol (Read, Write, Delete)</li>
                          <li>• Hapus token yang tidak digunakan untuk keamanan maksimal</li>
                          <li>• Token yang dihapus tidak dapat dikembalikan</li>
                        </ul>
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
                        <select 
                          value={widgetPosition}
                          onChange={(e) => setWidgetPosition(e.target.value as 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left')}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                        >
                          <option value="bottom-right">Kanan Bawah</option>
                          <option value="bottom-left">Kiri Bawah</option>
                          <option value="top-right">Kanan Atas</option>
                          <option value="top-left">Kiri Atas</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Warna Tema</label>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setWidgetTheme('purple')}
                            className={`w-8 h-8 bg-purple-600 rounded border-2 ${widgetTheme === 'purple' ? 'border-purple-800' : 'border-slate-300'}`}
                          ></button>
                          <button 
                            onClick={() => setWidgetTheme('blue')}
                            className={`w-8 h-8 bg-blue-600 rounded border-2 ${widgetTheme === 'blue' ? 'border-blue-800' : 'border-slate-300'}`}
                          ></button>
                          <button 
                            onClick={() => setWidgetTheme('green')}
                            className={`w-8 h-8 bg-green-600 rounded border-2 ${widgetTheme === 'green' ? 'border-green-800' : 'border-slate-300'}`}
                          ></button>
                          <button 
                            onClick={() => setWidgetTheme('orange')}
                            className={`w-8 h-8 bg-orange-600 rounded border-2 ${widgetTheme === 'orange' ? 'border-orange-800' : 'border-slate-300'}`}
                          ></button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Animasi</label>
                        <select 
                          value={widgetAnimation}
                          onChange={(e) => setWidgetAnimation(e.target.value as 'slide' | 'fade' | 'bounce')}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                        >
                          <option value="slide">Slide In</option>
                          <option value="fade">Fade In</option>
                          <option value="bounce">Bounce</option>
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
                          value={accountEmail}
                          onChange={(e) => setAccountEmail(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Masukkan email"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Nama Website</label>
                        <input 
                          type="text" 
                          value={accountName}
                          onChange={(e) => setAccountName(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Masukkan nama website"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Domain</label>
                        <input 
                          type="text" 
                          value={accountWebsite}
                          onChange={(e) => setAccountWebsite(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Masukkan domain website"
                        />
                      </div>
                      
                      <div className="pt-4">
                        <button 
                          onClick={handleUpdateAccountSettings}
                          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                        >
                          Perbarui Akun
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Save Settings Button */}
                  <div className="flex justify-end">
                    <button 
                      onClick={handleSaveSettings}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
                    >
                      Simpan Pengaturan
                    </button>
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
                  value={notificationTitle}
                  onChange={(e) => setNotificationTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="Masukkan judul notifikasi"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Pesan</label>
                <textarea 
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg h-24"
                  placeholder="Masukkan pesan notifikasi"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tipe Notifikasi</label>
                <select 
                  value={notificationType}
                  onChange={(e) => setNotificationType(e.target.value as 'update' | 'announcement' | 'promotion')}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                >
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
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Kadaluarsa</label>
                  <input 
                    type="datetime-local" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
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
              <button 
                onClick={handleCreateNotification}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
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

      {/* Create Token Modal */}
      {showTokenModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full">
            <div className="p-6 border-b border-slate-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-slate-900">Buat Token API Baru</h2>
                <button 
                  onClick={() => setShowTokenModal(false)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nama Token</label>
                <input 
                  type="text" 
                  value={newTokenName}
                  onChange={(e) => setNewTokenName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Contoh: Website Integration, Mobile App, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Izin Token</label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={newTokenPermissions.read}
                      onChange={(e) => setNewTokenPermissions({...newTokenPermissions, read: e.target.checked})}
                      className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-slate-700">Read - Baca data notifikasi dan analitik</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={newTokenPermissions.write}
                      onChange={(e) => setNewTokenPermissions({...newTokenPermissions, write: e.target.checked})}
                      className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-slate-700">Write - Buat dan edit notifikasi</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={newTokenPermissions.delete}
                      onChange={(e) => setNewTokenPermissions({...newTokenPermissions, delete: e.target.checked})}
                      className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-slate-700">Delete - Hapus notifikasi dan data</span>
                  </label>
                </div>
              </div>
              
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Peringatan:</strong> Simpan token dengan aman setelah dibuat. Token tidak akan ditampilkan lagi setelah modal ditutup.
                </p>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
              <button 
                onClick={() => setShowTokenModal(false)}
                className="px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
              >
                Batal
              </button>
              <button 
                onClick={handleCreateToken}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Buat Token
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}