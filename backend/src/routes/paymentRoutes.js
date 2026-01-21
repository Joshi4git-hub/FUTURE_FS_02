const express = require('express');
const router = express.Router();

// Mock payment records
const payments = [];
let paymentIdCounter = 5001;

// Middleware to get user ID from token
const getUserId = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  return req.headers['user-id'] || 'default-user';
};

// Create payment intent (would use Stripe in production)
router.post('/create-intent', (req, res) => {
  try {
    const { amount, currency = 'INR', description, orderId } = req.body;
    const userId = getUserId(req) || 'default-user';

    // Validate input
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid amount is required'
      });
    }

    const paymentId = `PAY-${paymentIdCounter++}`;
    const clientSecret = `${paymentId}_secret_${Math.random().toString(36).substr(2, 9)}`;

    const payment = {
      id: paymentId,
      userId,
      orderId,
      amount,
      currency,
      description,
      clientSecret,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    payments.push(payment);

    // In production, this would be a real Stripe payment intent
    res.status(201).json({
      success: true,
      paymentId,
      clientSecret,
      amount,
      currency,
      status: 'pending'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Confirm payment
router.post('/confirm', (req, res) => {
  try {
    const { paymentId, cardToken } = req.body;
    const userId = getUserId(req) || 'default-user';

    if (!paymentId || !cardToken) {
      return res.status(400).json({
        success: false,
        message: 'Payment ID and card token are required'
      });
    }

    const payment = payments.find(p => p.id === paymentId && p.userId === userId);
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    // Simulate payment processing
    const isSuccessful = Math.random() > 0.05; // 95% success rate for demo

    if (isSuccessful) {
      payment.status = 'completed';
      payment.transactionId = `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      payment.updatedAt = new Date();

      res.json({
        success: true,
        message: 'Payment processed successfully',
        payment: {
          id: payment.id,
          status: payment.status,
          transactionId: payment.transactionId,
          amount: payment.amount,
          currency: payment.currency
        }
      });
    } else {
      payment.status = 'failed';
      payment.failureReason = 'Insufficient funds';
      payment.updatedAt = new Date();

      res.status(400).json({
        success: false,
        message: 'Payment failed',
        payment: {
          id: payment.id,
          status: payment.status,
          failureReason: payment.failureReason
        }
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get payment status
router.get('/:paymentId', (req, res) => {
  try {
    const userId = getUserId(req) || 'default-user';
    const payment = payments.find(p => p.id === req.params.paymentId && p.userId === userId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    res.json({
      success: true,
      payment: {
        id: payment.id,
        status: payment.status,
        amount: payment.amount,
        currency: payment.currency,
        orderId: payment.orderId,
        createdAt: payment.createdAt,
        transactionId: payment.transactionId || null
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Refund payment (admin)
router.post('/:paymentId/refund', (req, res) => {
  try {
    const { reason } = req.body;
    const payment = payments.find(p => p.id === req.params.paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    if (payment.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Only completed payments can be refunded'
      });
    }

    payment.status = 'refunded';
    payment.refundReason = reason || 'No reason provided';
    payment.refundedAt = new Date();
    payment.updatedAt = new Date();

    res.json({
      success: true,
      message: 'Payment refunded successfully',
      payment: {
        id: payment.id,
        status: payment.status,
        refundReason: payment.refundReason,
        amount: payment.amount
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get payment history for user
router.get('/history/all', (req, res) => {
  try {
    const userId = getUserId(req) || 'default-user';
    const userPayments = payments.filter(p => p.userId === userId);

    res.json({
      success: true,
      count: userPayments.length,
      payments: userPayments
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Payment statistics (admin)
router.get('/admin/statistics', (req, res) => {
  try {
    const totalPayments = payments.length;
    const totalRevenue = payments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0);
    const successRate = (payments.filter(p => p.status === 'completed').length / totalPayments * 100).toFixed(2);

    const statusBreakdown = {
      pending: payments.filter(p => p.status === 'pending').length,
      completed: payments.filter(p => p.status === 'completed').length,
      failed: payments.filter(p => p.status === 'failed').length,
      refunded: payments.filter(p => p.status === 'refunded').length
    };

    res.json({
      success: true,
      stats: {
        totalPayments,
        totalRevenue,
        successRate: `${successRate}%`,
        statusBreakdown
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
