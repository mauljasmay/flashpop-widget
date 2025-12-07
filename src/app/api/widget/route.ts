import { NextRequest, NextResponse } from 'next/server';

// Mock user data with their widget configurations
const userWidgets = [
  {
    userId: 'user1',
    token: 'fp_demo_12345678',
    domain: 'https://example.com',
    settings: {
      position: 'bottom-right',
      theme: 'purple',
      animation: 'slide-in',
      autoClose: false,
      showBadge: true
    },
    notifications: [
      {
        id: '1',
        title: 'FlashPop v2.0 Rilis!',
        message: 'Kami senang mengumumkan rilis FlashPop v2.0 dengan fitur multi-tab dan analytics yang lebih baik.',
        type: 'update',
        status: 'active',
        createdAt: new Date('2024-01-10')
      },
      {
        id: '2',
        title: 'Maintenance Terjadwal',
        message: 'Sistem akan mengalami maintenance pada 15 Januari 2024, pukul 02:00 - 04:00 WIB.',
        type: 'announcement',
        status: 'active',
        createdAt: new Date('2024-01-08')
      },
      {
        id: '3',
        title: 'Diskon 50% Paket Pro',
        message: 'Dapatkan diskon 50% untuk paket Pro tahunan. Promo berakhir 31 Desember 2024!',
        type: 'promotion',
        status: 'active',
        createdAt: new Date('2024-01-05')
      }
    ]
  }
];

// GET widget data for embed
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const domain = request.headers.get('referer') || '';

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token is required' },
        { status: 400 }
      );
    }

    // Find user by token
    const userWidget = userWidgets.find(uw => uw.token === token);

    if (!userWidget) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 404 }
      );
    }

    // Verify domain (in production, you might want to be more strict)
    if (domain && !domain.includes(userWidget.domain.replace('https://', '').replace('http://', ''))) {
      console.warn(`Domain mismatch: expected ${userWidget.domain}, got ${domain}`);
    }

    // Filter active notifications
    const activeNotifications = userWidget.notifications.filter(n => n.status === 'active');

    // Track impression for each notification
    // In production, you'd want to do this asynchronously to not slow down the widget
    for (const notification of activeNotifications) {
      try {
        await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/analytics`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            notificationId: notification.id,
            userId: userWidget.userId,
            event: 'impression',
            userAgent: request.headers.get('user-agent'),
            timestamp: new Date().toISOString()
          })
        });
      } catch (error) {
        console.error('Failed to track impression:', error);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        settings: userWidget.settings,
        notifications: activeNotifications
      }
    });

  } catch (error) {
    console.error('Error fetching widget data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch widget data' },
      { status: 500 }
    );
  }
}

// POST track widget interaction
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, notificationId, event } = body;

    if (!token || !notificationId || !event) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find user by token
    const userWidget = userWidgets.find(uw => uw.token === token);

    if (!userWidget) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 404 }
      );
    }

    // Verify notification exists for this user
    const notification = userWidget.notifications.find(n => n.id === notificationId);
    if (!notification) {
      return NextResponse.json(
        { success: false, error: 'Notification not found' },
        { status: 404 }
      );
    }

    // Track the interaction
    const analyticsResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/analytics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notificationId,
        userId: userWidget.userId,
        event,
        userAgent: request.headers.get('user-agent'),
        timestamp: new Date().toISOString()
      })
    });

    if (!analyticsResponse.ok) {
      throw new Error('Failed to track analytics');
    }

    return NextResponse.json({
      success: true,
      message: 'Interaction tracked successfully'
    });

  } catch (error) {
    console.error('Error tracking widget interaction:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track interaction' },
      { status: 500 }
    );
  }
}