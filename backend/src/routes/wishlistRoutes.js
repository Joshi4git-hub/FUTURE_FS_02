const express = require('express');
const router = express.Router();

// Mock wishlist storage
const wishlists = new Map();

// Middleware to get user ID from token
const getUserId = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  return req.headers['user-id'] || 'default-user';
};

// Get user's wishlist
router.get('/', (req, res) => {
  try {
    const userId = getUserId(req) || 'default-user';
    const wishlist = wishlists.get(userId) || [];

    res.json({
      success: true,
      count: wishlist.length,
      items: wishlist
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add item to wishlist
router.post('/', (req, res) => {
  try {
    const { productId, name, price, image, category } = req.body;
    const userId = getUserId(req) || 'default-user';

    // Validate input
    if (!productId || !name || !price) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: productId, name, price'
      });
    }

    const wishlist = wishlists.get(userId) || [];
    const exists = wishlist.find(item => item.productId === productId);

    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'Item already in wishlist'
      });
    }

    const newItem = {
      id: `${productId}-${Date.now()}`,
      productId,
      name,
      price,
      image,
      category,
      addedAt: new Date()
    };

    wishlist.push(newItem);
    wishlists.set(userId, wishlist);

    res.status(201).json({
      success: true,
      message: 'Item added to wishlist',
      item: newItem,
      wishlistCount: wishlist.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Remove item from wishlist
router.delete('/:itemId', (req, res) => {
  try {
    const userId = getUserId(req) || 'default-user';
    const itemId = req.params.itemId;

    const wishlist = wishlists.get(userId) || [];
    const itemIndex = wishlist.findIndex(item => item.id === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in wishlist'
      });
    }

    wishlist.splice(itemIndex, 1);
    wishlists.set(userId, wishlist);

    res.json({
      success: true,
      message: 'Item removed from wishlist',
      wishlistCount: wishlist.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Check if product in wishlist
router.get('/check/:productId', (req, res) => {
  try {
    const userId = getUserId(req) || 'default-user';
    const productId = parseInt(req.params.productId);
    const wishlist = wishlists.get(userId) || [];

    const inWishlist = wishlist.some(item => item.productId === productId);

    res.json({
      success: true,
      productId,
      inWishlist
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Clear entire wishlist
router.delete('/', (req, res) => {
  try {
    const userId = getUserId(req) || 'default-user';
    wishlists.delete(userId);

    res.json({
      success: true,
      message: 'Wishlist cleared',
      items: [],
      count: 0
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get wishlist statistics
router.get('/stats/summary', (req, res) => {
  try {
    const userId = getUserId(req) || 'default-user';
    const wishlist = wishlists.get(userId) || [];

    const totalValue = wishlist.reduce((sum, item) => sum + item.price, 0);
    const categoryBreakdown = {};
    
    wishlist.forEach(item => {
      categoryBreakdown[item.category] = (categoryBreakdown[item.category] || 0) + 1;
    });

    res.json({
      success: true,
      stats: {
        totalItems: wishlist.length,
        totalValue,
        categories: categoryBreakdown
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
