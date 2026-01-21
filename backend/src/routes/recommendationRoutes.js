const express = require('express');
const router = express.Router();

// Mock product database (shared reference)
const allProducts = [
  { id: 1, name: 'Smartphone Pro', price: 15999, category: 'Electronics', tags: ['phone', 'premium', 'mobile'] },
  { id: 2, name: 'Wireless Earbuds', price: 1899, category: 'Audio', tags: ['audio', 'wireless', 'premium'] },
  { id: 3, name: 'Smart Watch', price: 4999, category: 'Wearables', tags: ['wearable', 'smart', 'premium'] },
  { id: 4, name: 'Travel Backpack', price: 2499, category: 'Bags', tags: ['travel', 'bag', 'durable'] },
  { id: 5, name: 'Power Bank', price: 1299, category: 'Electronics', tags: ['charging', 'portable', 'electronics'] },
  { id: 6, name: 'Mechanical Keyboard', price: 3499, category: 'Computing', tags: ['keyboard', 'gaming', 'computing'] },
  { id: 7, name: '4K Webcam', price: 7999, category: 'Photography', tags: ['camera', 'photography', 'streaming'] },
  { id: 8, name: 'Tripod', price: 599, category: 'Photography', tags: ['photography', 'accessory', 'camera'] },
  { id: 9, name: 'Charging Pad', price: 899, category: 'Accessories', tags: ['charging', 'wireless', 'accessory'] },
  { id: 10, name: 'USB Hub', price: 799, category: 'Accessories', tags: ['computing', 'accessory', 'connectivity'] },
  { id: 11, name: 'Water Bottle', price: 349, category: 'Accessories', tags: ['accessory', 'lifestyle', 'portable'] },
  { id: 12, name: 'Running Shoes', price: 3999, category: 'Footwear', tags: ['shoes', 'sports', 'footwear'] }
];

// Mock user purchase history
const userPurchaseHistory = new Map();

// Middleware to get user ID
const getUserId = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  return req.headers['user-id'] || 'default-user';
};

// Calculate similarity between products
const calculateSimilarity = (product1, product2) => {
  let score = 0;

  // Same category (high weight)
  if (product1.category === product2.category) score += 3;

  // Common tags (medium weight)
  const commonTags = product1.tags.filter(tag => product2.tags.includes(tag));
  score += commonTags.length * 2;

  // Price proximity (low weight)
  const priceDiff = Math.abs(product1.price - product2.price);
  if (priceDiff < 1000) score += 1;
  if (priceDiff < 5000) score += 0.5;

  return score;
};

// Get personalized recommendations for user
router.get('/personalized', (req, res) => {
  try {
    const userId = getUserId(req) || 'default-user';
    const limit = parseInt(req.query.limit) || 6;

    const userHistory = userPurchaseHistory.get(userId) || [];

    if (userHistory.length === 0) {
      // New user - return popular items
      const recommended = allProducts.slice(0, limit);
      return res.json({
        success: true,
        type: 'popular',
        recommendations: recommended
      });
    }

    // Collaborative filtering: find similar items to user's purchases
    const recommendations = new Map();

    userHistory.forEach(purchasedId => {
      const purchasedProduct = allProducts.find(p => p.id === purchasedId);
      if (!purchasedProduct) return;

      allProducts.forEach(product => {
        if (product.id === purchasedId) return; // Skip already purchased

        const similarity = calculateSimilarity(purchasedProduct, product);
        const currentScore = recommendations.get(product.id) || 0;
        recommendations.set(product.id, currentScore + similarity);
      });
    });

    // Sort by recommendation score and return top items
    const recommended = Array.from(recommendations.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([productId]) => allProducts.find(p => p.id === productId));

    res.json({
      success: true,
      type: 'personalized',
      recommendations: recommended.filter(p => p)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get similar products
router.get('/similar/:productId', (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const limit = parseInt(req.query.limit) || 4;

    const product = allProducts.find(p => p.id === productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Calculate similarity for all other products
    const similarities = allProducts
      .filter(p => p.id !== productId)
      .map(p => ({
        ...p,
        similarity: calculateSimilarity(product, p)
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
      .map(({ similarity, ...p }) => p);

    res.json({
      success: true,
      productId,
      similarProducts: similarities
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get trending products
router.get('/trending', (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;

    // Simulate trending by weighted random scoring
    const trending = allProducts
      .map(p => ({
        ...p,
        trendingScore: Math.random() * 100 + (p.id % 5) * 10 // Weighted by ID for consistency
      }))
      .sort((a, b) => b.trendingScore - a.trendingScore)
      .slice(0, limit)
      .map(({ trendingScore, ...p }) => p);

    res.json({
      success: true,
      type: 'trending',
      recommendations: trending
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Record purchase for recommendations (called after order completion)
router.post('/record-purchase', (req, res) => {
  try {
    const { productId } = req.body;
    const userId = getUserId(req) || 'default-user';

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    const history = userPurchaseHistory.get(userId) || [];
    if (!history.includes(productId)) {
      history.push(productId);
      userPurchaseHistory.set(userId, history);
    }

    res.json({
      success: true,
      message: 'Purchase recorded'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get products by category (for browsing recommendations)
router.get('/category/:category', (req, res) => {
  try {
    const category = req.params.category;
    const limit = parseInt(req.query.limit) || 6;

    const products = allProducts
      .filter(p => p.category.toLowerCase() === category.toLowerCase())
      .slice(0, limit);

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      category,
      products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
