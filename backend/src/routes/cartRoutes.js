const express = require('express');
const router = express.Router();

// Mock cart storage
const carts = new Map();

// Middleware to get user ID from token
const getUserId = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  // In production, verify JWT token here
  return req.headers['user-id'] || 'default-user';
};

// Get user's cart
router.get('/', (req, res) => {
  try {
    const userId = getUserId(req) || 'default-user';
    const cart = carts.get(userId) || [];
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    res.json({
      success: true,
      items: cart,
      total,
      itemCount
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add item to cart
router.post('/', (req, res) => {
  try {
    const { productId, name, price, quantity, image } = req.body;
    const userId = getUserId(req) || 'default-user';

    // Validate input
    if (!productId || !name || !price || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: productId, name, price, quantity'
      });
    }

    const cart = carts.get(userId) || [];
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: `${productId}-${Date.now()}`,
        productId,
        name,
        price,
        quantity,
        image
      });
    }

    carts.set(userId, cart);

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    res.status(201).json({
      success: true,
      message: 'Item added to cart',
      cart,
      total,
      itemCount
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update cart item quantity
router.put('/:itemId', (req, res) => {
  try {
    const { quantity } = req.body;
    const userId = getUserId(req) || 'default-user';
    const itemId = req.params.itemId;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    const cart = carts.get(userId) || [];
    const item = cart.find(item => item.id === itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    item.quantity = quantity;
    carts.set(userId, cart);

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    res.json({
      success: true,
      message: 'Quantity updated',
      cart,
      total,
      itemCount
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Remove item from cart
router.delete('/:itemId', (req, res) => {
  try {
    const userId = getUserId(req) || 'default-user';
    const itemId = req.params.itemId;

    const cart = carts.get(userId) || [];
    const itemIndex = cart.findIndex(item => item.id === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    cart.splice(itemIndex, 1);
    carts.set(userId, cart);

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    res.json({
      success: true,
      message: 'Item removed from cart',
      cart,
      total,
      itemCount
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Clear entire cart
router.delete('/', (req, res) => {
  try {
    const userId = getUserId(req) || 'default-user';
    carts.delete(userId);

    res.json({
      success: true,
      message: 'Cart cleared',
      items: [],
      total: 0,
      itemCount: 0
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
