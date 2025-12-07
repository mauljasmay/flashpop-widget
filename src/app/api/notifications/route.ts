import { NextRequest, NextResponse } from 'next/server';

// Mock data - in production, this would come from a database
let notifications = [
  {
    id: '1',
    title: 'FlashPop v2.0 Rilis!',
    message: 'Kami senang mengumumkan rilis FlashPop v2.0 dengan fitur multi-tab dan analytics yang lebih baik.',
    type: 'update',
    status: 'active',
    impressions: 12345,
    clicks: 234,
    dismissals: 567,
    scheduledAt: null,
    expiresAt: null,
    createdAt: new Date('2024-01-10'),
    userId: 'user1'
  },
  {
    id: '2',
    title: 'Maintenance Terjadwal',
    message: 'Sistem akan mengalami maintenance pada 15 Januari 2024, pukul 02:00 - 04:00 WIB.',
    type: 'announcement',
    status: 'active',
    impressions: 8765,
    clicks: 123,
    dismissals: 234,
    scheduledAt: null,
    expiresAt: null,
    createdAt: new Date('2024-01-08'),
    userId: 'user1'
  }
];

let analytics = [
  {
    id: '1',
    notificationId: '1',
    date: new Date(),
    impressions: 12345,
    clicks: 234,
    dismissals: 567,
    ctr: 1.9
  }
];

// GET all notifications for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    let filteredNotifications = notifications;

    // Filter by user
    if (userId) {
      filteredNotifications = filteredNotifications.filter(n => n.userId === userId);
    }

    // Filter by type
    if (type && type !== 'all') {
      filteredNotifications = filteredNotifications.filter(n => n.type === type);
    }

    // Filter by status
    if (status && status !== 'all') {
      filteredNotifications = filteredNotifications.filter(n => n.status === status);
    }

    // Calculate CTR for each notification
    const notificationsWithCTR = filteredNotifications.map(notification => ({
      ...notification,
      ctr: notification.impressions > 0 ? ((notification.clicks / notification.impressions) * 100).toFixed(1) : '0.0'
    }));

    return NextResponse.json({
      success: true,
      data: notificationsWithCTR,
      total: notificationsWithCTR.length
    });

  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

// POST create new notification
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, message, type, scheduledAt, expiresAt, userId } = body;

    // Validate required fields
    if (!title || !message || !type || !userId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newNotification = {
      id: Date.now().toString(),
      title,
      message,
      type,
      status: scheduledAt ? 'scheduled' : 'active',
      impressions: 0,
      clicks: 0,
      dismissals: 0,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      createdAt: new Date(),
      userId
    };

    notifications.push(newNotification);

    return NextResponse.json({
      success: true,
      data: newNotification
    });

  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create notification' },
      { status: 500 }
    );
  }
}

// PUT update notification
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, message, type, status, scheduledAt, expiresAt } = body;

    const notificationIndex = notifications.findIndex(n => n.id === id);

    if (notificationIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Notification not found' },
        { status: 404 }
      );
    }

    // Update notification
    const updatedNotification = {
      ...notifications[notificationIndex],
      title: title || notifications[notificationIndex].title,
      message: message || notifications[notificationIndex].message,
      type: type || notifications[notificationIndex].type,
      status: status || notifications[notificationIndex].status,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : notifications[notificationIndex].scheduledAt,
      expiresAt: expiresAt ? new Date(expiresAt) : notifications[notificationIndex].expiresAt,
    };

    notifications[notificationIndex] = updatedNotification;

    return NextResponse.json({
      success: true,
      data: updatedNotification
    });

  } catch (error) {
    console.error('Error updating notification:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update notification' },
      { status: 500 }
    );
  }
}

// DELETE notification
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Notification ID is required' },
        { status: 400 }
      );
    }

    const notificationIndex = notifications.findIndex(n => n.id === id);

    if (notificationIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Notification not found' },
        { status: 404 }
      );
    }

    notifications.splice(notificationIndex, 1);

    return NextResponse.json({
      success: true,
      message: 'Notification deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting notification:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete notification' },
      { status: 500 }
    );
  }
}