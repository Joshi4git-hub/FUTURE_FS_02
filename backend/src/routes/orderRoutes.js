const express = require('express');
const router = express.Router();

// Mock order database
const orders = [];
let orderIdCounter = 1001;

// Middleware to get user ID from token
const getUserId = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  return req.headers['user-id'] || 'default-user';
};

// Create new order
router.post('/', (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, total } = req.body;
    const userId = getUserId(req) || 'default-user';

    // Validate input
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item'
      });
    }

    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Shipping address and payment method are required'
      });
    }

    const orderId = `ORD-${orderIdCounter++}`;
    const newOrder = {
      id: orderId,
      userId,
      items,
      shippingAddress,
      paymentMethod,
      total,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days
    };

    orders.push(newOrder);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user's orders
router.get('/', (req, res) => {
  try {
    const userId = getUserId(req) || 'default-user';
    const userOrders = orders.filter(order => order.userId === userId);

    res.json({
      success: true,
      count: userOrders.length,
      orders: userOrders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get order by ID
router.get('/:id', (req, res) => {
  try {
    const userId = getUserId(req) || 'default-user';
    const order = orders.find(o => o.id === req.params.id && o.userId === userId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update order status (admin only)
router.put('/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const order = orders.find(o => o.id === req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.status = status;
    order.updatedAt = new Date();

    res.json({
      success: true,
      message: 'Order status updated',
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Cancel order
router.put('/:id/cancel', (req, res) => {
  try {
    const userId = getUserId(req) || 'default-user';
    const order = orders.find(o => o.id === req.params.id && o.userId === userId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (['shipped', 'delivered', 'cancelled'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel order with status: ${order.status}`
      });
    }

    order.status = 'cancelled';
    order.updatedAt = new Date();

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get order statistics (admin)
router.get('/admin/stats', (req, res) => {
  try {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const statusBreakdown = {
      pending: orders.filter(o => o.status === 'pending').length,
      processing: orders.filter(o => o.status === 'processing').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length
    };

    res.json({
      success: true,
      stats: {
        totalOrders,
        totalRevenue,
        statusBreakdown
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
