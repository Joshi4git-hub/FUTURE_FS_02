const express = require('express');
const router = express.Router();

// Mock analytics data
const analyticsEvents = [];
const pageViews = new Map();
const conversionData = [];

// Middleware to get user ID
const getUserId = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  return req.headers['user-id'] || 'default-user';
};

// Track page view
router.post('/track-pageview', (req, res) => {
  try {
    const { page, referrer } = req.body;
    const userId = getUserId(req);

    const event = {
      timestamp: new Date(),
      userId,
      eventType: 'pageview',
      page,
      referrer,
      userAgent: req.headers['user-agent']
    };

    analyticsEvents.push(event);

    // Update page view counts
    const pageKey = `${page}`;
    pageViews.set(pageKey, (pageViews.get(pageKey) || 0) + 1);

    res.json({
      success: true,
      message: 'Page view tracked'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Track conversion
router.post('/track-conversion', (req, res) => {
  try {
    const { orderId, amount, products } = req.body;
    const userId = getUserId(req);

    const conversion = {
      timestamp: new Date(),
      userId,
      orderId,
      amount,
      productCount: products?.length || 0,
      products
    };

    conversionData.push(conversion);

    res.json({
      success: true,
      message: 'Conversion tracked'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get key performance indicators (KPIs)
router.get('/kpis', (req, res) => {
  try {
    const totalRevenue = conversionData.reduce((sum, c) => sum + c.amount, 0);
    const totalOrders = conversionData.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const conversionRate = analyticsEvents.length > 0 
      ? ((totalOrders / analyticsEvents.length) * 100).toFixed(2) 
      : 0;

    const kpis = {
      totalRevenue,
      totalOrders,
      averageOrderValue: averageOrderValue.toFixed(2),
      conversionRate: `${conversionRate}%`,
      totalPageViews: analyticsEvents.length,
      uniqueUsers: new Set(analyticsEvents.map(e => e.userId)).size,
      totalProductsSold: conversionData.reduce((sum, c) => sum + c.productCount, 0),
      bounceRate: '15.3%'
    };

    res.json({
      success: true,
      kpis
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get order analytics
router.get('/orders', (req, res) => {
  try {
    const period = req.query.period || 'monthly'; // daily, weekly, monthly

    // Simulate order analytics data
    const lastDays = period === 'daily' ? 30 : period === 'weekly' ? 12 : 12;
    const orders = [];

    for (let i = 0; i < lastDays; i++) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      orders.push({
        date: date.toISOString().split('T')[0],
        orders: Math.floor(Math.random() * 50) + 10,
        revenue: Math.floor(Math.random() * 100000) + 20000
      });
    }

    // Status breakdown
    const statusBreakdown = {
      pending: Math.floor(Math.random() * 20) + 5,
      processing: Math.floor(Math.random() * 15) + 3,
      shipped: Math.floor(Math.random() * 25) + 10,
      delivered: Math.floor(Math.random() * 100) + 50,
      cancelled: Math.floor(Math.random() * 10) + 2
    };

    res.json({
      success: true,
      period,
      orderTrend: orders.reverse(),
      statusBreakdown,
      avgProcessingTime: '2.5 days',
      fulfillmentRate: '97.3%'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get product analytics
router.get('/products', (req, res) => {
  try {
    // Top selling products
    const topProducts = [
      { id: 1, name: 'Smartphone Pro', unitsSold: 256, revenue: 4095744 },
      { id: 3, name: 'Smart Watch', unitsSold: 187, revenue: 934813 },
      { id: 6, name: 'Mechanical Keyboard', unitsSold: 145, revenue: 507355 },
      { id: 7, name: '4K Webcam', unitsSold: 98, revenue: 783902 },
      { id: 12, name: 'Running Shoes', unitsSold: 234, revenue: 935766 }
    ];

    // Product categories performance
    const categoryPerformance = {
      Electronics: { revenue: 6200000, units: 450 },
      Audio: { revenue: 892000, units: 470 },
      Wearables: { revenue: 934813, units: 187 },
      Bags: { revenue: 299880, units: 120 },
      Computing: { revenue: 1247145, units: 356 },
      Photography: { revenue: 1134800, units: 256 },
      Accessories: { revenue: 567890, units: 1200 },
      Footwear: { revenue: 935766, units: 234 }
    };

    // Product inventory status
    const inventoryStatus = {
      inStock: 8,
      lowStock: 3,
      outOfStock: 1,
      total: 12
    };

    res.json({
      success: true,
      topProducts,
      categoryPerformance,
      inventoryStatus
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get customer analytics
router.get('/customers', (req, res) => {
  try {
    const customerMetrics = {
      totalCustomers: 8452,
      newCustomers: 324,
      returningCustomers: 2156,
      churnRate: '5.2%',
      customerLifetimeValue: 12450.75,
      repeatPurchaseRate: '31.2%',
      averageCustomerAge: 28.4,
      topCountries: [
        { country: 'India', customers: 5234 },
        { country: 'USA', customers: 1456 },
        { country: 'UK', customers: 876 },
        { country: 'Canada', customers: 456 },
        { country: 'Australia', customers: 330 }
      ]
    };

    res.json({
      success: true,
      metrics: customerMetrics
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get traffic analytics
router.get('/traffic', (req, res) => {
  try {
    const trafficSources = {
      direct: 2340,
      organic: 4567,
      paid: 2134,
      social: 1876,
      referral: 1245,
      email: 543
    };

    const deviceBreakdown = {
      mobile: 5234,
      desktop: 8934,
      tablet: 1234
    };

    const hourlyTraffic = [];
    for (let i = 0; i < 24; i++) {
      hourlyTraffic.push({
        hour: `${i.toString().padStart(2, '0')}:00`,
        visitors: Math.floor(Math.random() * 500) + 100
      });
    }

    res.json({
      success: true,
      sources: trafficSources,
      devices: deviceBreakdown,
      hourlyBreakdown: hourlyTraffic,
      bounceRate: '34.5%',
      avgSessionDuration: '4m 23s'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get cohort analysis
router.get('/cohorts', (req, res) => {
  try {
    const cohortData = [
      {
        cohort: '2024-01',
        month0: 234,
        month1: 156,
        month2: 98,
        month3: 67,
        retention: '28.6%'
      },
      {
        cohort: '2024-02',
        month0: 289,
        month1: 187,
        month2: 112,
        retention: '38.8%'
      },
      {
        cohort: '2024-03',
        month0: 312,
        month1: 234,
        retention: '75.0%'
      },
      {
        cohort: '2024-04',
        month0: 456,
        retention: '100%'
      }
    ];

    res.json({
      success: true,
      cohorts: cohortData,
      avgRetention: '60.6%'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get funnel analysis
router.get('/funnel', (req, res) => {
  try {
    const funnelStages = [
      {
        stage: 'Landing Page',
        visitors: 10000,
        percentage: 100
      },
      {
        stage: 'Browse Products',
        visitors: 7850,
        percentage: 78.5
      },
      {
        stage: 'Product Detail View',
        visitors: 5230,
        percentage: 52.3
      },
      {
        stage: 'Add to Cart',
        visitors: 2145,
        percentage: 21.45
      },
      {
        stage: 'Checkout',
        visitors: 1876,
        percentage: 18.76
      },
      {
        stage: 'Payment',
        visitors: 1654,
        percentage: 16.54
      },
      {
        stage: 'Order Completed',
        visitors: 1523,
        percentage: 15.23
      }
    ];

    const dropoffPoints = [
      {
        stage: 'Browse → Product Detail',
        dropoff: 2620,
        dropoffRate: '33.4%'
      },
      {
        stage: 'Product Detail → Add to Cart',
        dropoff: 3085,
        dropoffRate: '59%'
      },
      {
        stage: 'Checkout → Payment',
        dropoff: 222,
        dropoffRate: '11.8%'
      }
    ];

    res.json({
      success: true,
      stages: funnelStages,
      dropoffPoints,
      overallConversionRate: '15.23%'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
