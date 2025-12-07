'use client';

import { useState, useEffect } from 'react';
import { X, Bell, MessageSquare, Tag, Calendar, Settings } from 'lucide-react';

interface NotificationData {
  id: string;
  title: string;
  message: string;
  type: 'update' | 'announcement' | 'promotion';
  timestamp: Date;
  read: boolean;
}

interface FlashPopWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationData[];
}

export default function FlashPopWidget({ isOpen, onClose, notifications }: FlashPopWidgetProps) {
  const [activeTab, setActiveTab] = useState<'updates' | 'announcements' | 'promotions'>('updates');
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'>('bottom-right');

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      default:
        return 'bottom-4 right-4';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (activeTab) {
      case 'updates':
        return notification.type === 'update';
      case 'announcements':
        return notification.type === 'announcement';
      case 'promotions':
        return notification.type === 'promotion';
      default:
        return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className={`fixed ${getPositionClasses()} z-50 max-w-sm w-full`}>
      {/* Widget Container */}
      <div className="bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              <span className="font-semibold">FlashPop</span>
              {unreadCount > 0 && (
                <span className="bg-white text-purple-600 text-xs font-bold px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <button 
              onClick={onClose}
              className="text-white/80 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('updates')}
              className={`px-3 py-1 rounded text-sm font-medium transition ${
                activeTab === 'updates' 
                  ? 'bg-white text-purple-600' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Updates
            </button>
            <button
              onClick={() => setActiveTab('announcements')}
              className={`px-3 py-1 rounded text-sm font-medium transition ${
                activeTab === 'announcements' 
                  ? 'bg-white text-purple-600' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Pengumuman
            </button>
            <button
              onClick={() => setActiveTab('promotions')}
              className={`px-3 py-1 rounded text-sm font-medium transition ${
                activeTab === 'promotions' 
                  ? 'bg-white text-purple-600' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Promosi
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-96 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="p-6 text-center text-slate-500">
              <Bell className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p>Belum ada notifikasi di tab ini</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredNotifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 hover:bg-slate-50 transition cursor-pointer ${
                    !notification.read ? 'bg-purple-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {notification.type === 'update' && <MessageSquare className="w-4 h-4 text-blue-600" />}
                      {notification.type === 'announcement' && <Calendar className="w-4 h-4 text-orange-600" />}
                      {notification.type === 'promotion' && <Tag className="w-4 h-4 text-green-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-semibold text-slate-900 truncate">
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {notification.timestamp.toLocaleString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit',
                          day: 'numeric',
                          month: 'short'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <button className="text-xs text-purple-600 hover:text-purple-700 font-medium">
              Lihat Semua
            </button>
            <button className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1">
              <Settings className="w-3 h-3" />
              Pengaturan
            </button>
          </div>
        </div>
      </div>

      {/* Settings Dropdown */}
      <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-slate-200 p-2 hidden">
        <p className="text-xs text-slate-500 font-medium mb-2">Posisi Widget:</p>
        <div className="grid grid-cols-2 gap-1">
          {[
            { value: 'top-left', label: '↖ Kiri Atas' },
            { value: 'top-right', label: '↗ Kanan Atas' },
            { value: 'bottom-left', label: '↙ Kiri Bawah' },
            { value: 'bottom-right', label: '↘ Kanan Bawah' }
          ].map((pos) => (
            <button
              key={pos.value}
              onClick={() => setPosition(pos.value as any)}
              className={`text-xs px-2 py-1 rounded transition ${
                position === pos.value 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'hover:bg-slate-100'
              }`}
            >
              {pos.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Demo Component
export function FlashPopDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationData[]>([
    {
      id: '1',
      title: 'FlashPop v2.0 Rilis!',
      message: 'Kami senang mengumumkan rilis FlashPop v2.0 dengan fitur multi-tab dan analytics yang lebih baik.',
      type: 'update',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      read: false
    },
    {
      id: '2',
      title: 'Maintenance Terjadwal',
      message: 'Sistem akan mengalami maintenance pada 15 Januari 2024, pukul 02:00 - 04:00 WIB.',
      type: 'announcement',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      read: false
    },
    {
      id: '3',
      title: 'Diskon 50% untuk Paket Pro',
      message: 'Dapatkan diskon 50% untuk paket Pro tahunan. Promo berakhir 31 Desember 2024!',
      type: 'promotion',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: true
    },
    {
      id: '4',
      title: 'Fitur Baru: Custom Theme',
      message: 'Sekarang Anda dapat menyesuaikan warna dan tema widget sesuai brand website Anda.',
      type: 'update',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      read: true
    }
  ]);

  useEffect(() => {
    // Auto-open demo after 2 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  return (
    <div className="relative">
      {/* Demo Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
      >
        <Bell className="w-4 h-4" />
        Buka Widget Demo
        {notifications.filter(n => !n.read).length > 0 && (
          <span className="bg-white text-purple-600 text-xs font-bold px-2 py-1 rounded-full">
            {notifications.filter(n => !n.read).length}
          </span>
        )}
      </button>

      {/* Widget */}
      <FlashPopWidget
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        notifications={notifications}
      />
    </div>
  );
}