import { NextRequest, NextResponse } from 'next/server';

// Mock analytics data
let analyticsData = [
  {
    id: '1',
    notificationId: '1',
    date: new Date('2024-01-10'),
    impressions: 12345,
    clicks: 234,
    dismissals: 567,
    ctr: 1.9,
    userId: 'user1'
  },
  {
    id: '2',
    notificationId: '2',
    date: new Date('2024-01-08'),
    impressions: 8765,
    clicks: 123,
    dismissals: 234,
    ctr: 1.4,
    userId: 'user1'
  }
];

// Mock performance data for charts
let performanceData = [
  { date: '2024-01-01', impressions: 5000, clicks: 100, ctr: 2.0 },
  { date: '2024-01-02', impressions: 5200, clicks: 110, ctr: 2.1 },
  { date: '2024-01-03', impressions: 4800, clicks: 95, ctr: 1.98 },
  { date: '2024-01-04', impressions: 6100, clicks: 125, ctr: 2.05 },
  { date: '2024-01-05', impressions: 5500, clicks: 115, ctr: 2.09 },
  { date: '2024-01-06', impressions: 5900, clicks: 120, ctr: 2.03 },
  { date: '2024-01-07', impressions: 6200, clicks: 130, ctr: 2.10 },
  { date: '2024-01-08', impressions: 5800, clicks: 118, ctr: 2.03 },
  { date: '2024-01-09', impressions: 6500, clicks: 135, ctr: 2.08 },
  { date: '2024-01-10', impressions: 7000, clicks: 145, ctr: 2.07 },
];

// GET analytics data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const notificationId = searchParams.get('notificationId');
    const period = searchParams.get('period') || '30days';
    const type = searchParams.get('type');

    // Filter by user
    let filteredData = analyticsData;
    if (userId) {
      filteredData = filteredData.filter(a => a.userId === userId);
    }

    // Filter by notification
    if (notificationId) {
      filteredData = filteredData.filter(a => a.notificationId === notificationId);
    }

    // Calculate overall analytics
    const totalImpressions = filteredData.reduce((sum, a) => sum + a.impressions, 0);
    const totalClicks = filteredData.reduce((sum, a) => sum + a.clicks, 0);
    const totalDismissals = filteredData.reduce((sum, a) => sum + a.dismissals, 0);
    const averageCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(1) : '0.0';

    // Get performance data based on period
    let performanceChartData = performanceData;
    if (period === '7days') {
      performanceChartData = performanceData.slice(-7);
    } else if (period === '30days') {
      performanceChartData = performanceData;
    }

    // Get top performing notifications
    const topNotifications = filteredData
      .sort((a, b) => parseFloat(b.ctr) - parseFloat(a.ctr))
      .slice(0, 5);

    // Device breakdown (mock data)
    const deviceBreakdown = {
      desktop: 65,
      mobile: 35
    };

    // Time performance (mock data)
    const timePerformance = {
      '09:00-12:00': 42,
      '19:00-22:00': 38,
      other: 20
    };

    // Type performance (mock data)
    const typePerformance = {
      update: 3.2,
      announcement: 2.1,
      promotion: 2.8
    };

    let responseData: any = {
      success: true,
      summary: {
        totalImpressions,
        totalClicks,
        totalDismissals,
        averageCTR: parseFloat(averageCTR),
        activeNotifications: filteredData.filter(a => a.impressions > 0).length,
        totalNotifications: filteredData.length
      }
    };

    // Add specific data based on type parameter
    if (type === 'performance') {
      responseData.performance = performanceChartData;
    } else if (type === 'top') {
      responseData.topNotifications = topNotifications;
    } else if (type === 'demographics') {
      responseData.demographics = {
        deviceBreakdown,
        timePerformance,
        typePerformance
      };
    } else {
      // Return all data
      responseData.performance = performanceChartData;
      responseData.topNotifications = topNotifications;
      responseData.demographics = {
        deviceBreakdown,
        timePerformance,
        typePerformance
      };
    }

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

// POST track analytics event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      notificationId, 
      userId, 
      event, // 'impression', 'click', 'dismissal'
      userAgent,
      timestamp 
    } = body;

    // Validate required fields
    if (!notificationId || !userId || !event) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find existing analytics record for this notification
    let analyticsRecord = analyticsData.find(a => a.notificationId === notificationId && a.userId === userId);

    if (!analyticsRecord) {
      // Create new analytics record
      analyticsRecord = {
        id: Date.now().toString(),
        notificationId,
        date: new Date(),
        impressions: 0,
        clicks: 0,
        dismissals: 0,
        ctr: 0,
        userId
      };
      analyticsData.push(analyticsRecord);
    }

    // Update metrics based on event type
    switch (event) {
      case 'impression':
        analyticsRecord.impressions += 1;
        break;
      case 'click':
        analyticsRecord.clicks += 1;
        break;
      case 'dismissal':
        analyticsRecord.dismissals += 1;
        break;
    }

    // Recalculate CTR
    analyticsRecord.ctr = analyticsRecord.impressions > 0 
      ? ((analyticsRecord.clicks / analyticsRecord.impressions) * 100).toFixed(1)
      : '0.0';

    // Update performance data for today
    const today = new Date().toISOString().split('T')[0];
    const todayPerformance = performanceData.find(p => p.date === today);
    
    if (todayPerformance) {
      if (event === 'impression') {
        todayPerformance.impressions += 1;
      } else if (event === 'click') {
        todayPerformance.clicks += 1;
      }
      
      // Recalculate CTR
      todayPerformance.ctr = todayPerformance.impressions > 0 
        ? ((todayPerformance.clicks / todayPerformance.impressions) * 100).toFixed(2)
        : '0.00';
    }

    return NextResponse.json({
      success: true,
      message: 'Analytics event tracked successfully',
      data: analyticsRecord
    });

  } catch (error) {
    console.error('Error tracking analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track analytics event' },
      { status: 500 }
    );
  }
}