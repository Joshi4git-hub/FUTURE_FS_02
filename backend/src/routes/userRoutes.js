const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Mock user database
const users = new Map();

// Middleware to get user ID from token
const getUserId = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  return req.headers['user-id'] || 'default-user';
};

// Get user profile
router.get('/profile', (req, res) => {
  try {
    const userId = getUserId(req) || 'default-user';
    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Don't return password
    const { password, ...userProfile } = user;
    res.json({
      success: true,
      user: userProfile
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update user profile
router.put('/profile', (req, res) => {
  try {
    const userId = getUserId(req) || 'default-user';
    const { name, email, phone, address, city, state, zipCode } = req.body;

    let user = users.get(userId);
    if (!user) {
      user = {
        id: userId,
        name: 'Guest User',
        email: 'guest@dhanjo.com',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        loyaltyPoints: 100,
        tier: 'Silver',
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (city) user.city = city;
    if (state) user.state = state;
    if (zipCode) user.zipCode = zipCode;

    user.updatedAt = new Date();
    users.set(userId, user);

    const { password, ...userProfile } = user;
    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: userProfile
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get loyalty program details
router.get('/loyalty', (req, res) => {
  try {
    const userId = getUserId(req) || 'default-user';
    let user = users.get(userId);

    if (!user) {
      user = {
        loyaltyPoints: 100,
        tier: 'Silver',
        tierBenefits: {
          Silver: ['5% discount on all purchases', 'Free shipping on orders above ₹500'],
          Gold: ['10% discount on all purchases', 'Free shipping on all orders', 'Priority customer support'],
          Platinum: ['15% discount on all purchases', 'Free expedited shipping', 'VIP customer support', 'Exclusive early access']
        }
      };
    }

    const tierBenefits = {
      Silver: ['5% discount on all purchases', 'Free shipping on orders above ₹500'],
      Gold: ['10% discount on all purchases', 'Free shipping on all orders', 'Priority customer support'],
      Platinum: ['15% discount on all purchases', 'Free expedited shipping', 'VIP customer support', 'Exclusive early access']
    };

    const pointsToNextTier = {
      Silver: 1000,
      Gold: 5000,
      Platinum: 10000
    };

    res.json({
      success: true,
      loyalty: {
        currentPoints: user.loyaltyPoints || 100,
        currentTier: user.tier || 'Silver',
        pointsToNextTier: pointsToNextTier[user.tier || 'Silver'],
        tierBenefits: tierBenefits[user.tier || 'Silver'],
        allTiers: tierBenefits
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add loyalty points
router.post('/loyalty/add-points', (req, res) => {
  try {
    const userId = getUserId(req) || 'default-user';
    const { points, reason } = req.body;

    if (!points || points < 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid points value is required'
      });
    }

    let user = users.get(userId) || {
      id: userId,
      loyaltyPoints: 0,
      tier: 'Silver'
    };

    user.loyaltyPoints = (user.loyaltyPoints || 0) + points;

    // Update tier based on points
    if (user.loyaltyPoints >= 10000) {
      user.tier = 'Platinum';
    } else if (user.loyaltyPoints >= 5000) {
      user.tier = 'Gold';
    } else {
      user.tier = 'Silver';
    }

    user.updatedAt = new Date();
    users.set(userId, user);

    res.json({
      success: true,
      message: `${points} loyalty points added. Reason: ${reason || 'Purchase'}`,
      loyalty: {
        currentPoints: user.loyaltyPoints,
        currentTier: user.tier
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Redeem loyalty points
router.post('/loyalty/redeem', (req, res) => {
  try {
    const userId = getUserId(req) || 'default-user';
    const { points } = req.body;

    let user = users.get(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (points > user.loyaltyPoints) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient loyalty points'
      });
    }

    user.loyaltyPoints -= points;
    user.updatedAt = new Date();
    users.set(userId, user);

    const discountAmount = (points / 100) * 50; // 1 point = ₹0.50 discount

    res.json({
      success: true,
      message: 'Loyalty points redeemed successfully',
      redemption: {
        pointsRedeemed: points,
        discountAmount,
        remainingPoints: user.loyaltyPoints
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Change password
router.post('/change-password', (req, res) => {
  try {
    const userId = getUserId(req) || 'default-user';
    const { currentPassword, newPassword } = req.body;

    let user = users.get(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current and new password are required'
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters'
      });
    }

    // Verify current password
    const isPasswordValid = bcrypt.compareSync(currentPassword, user.password || '');
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    user.password = bcrypt.hashSync(newPassword, 10);
    user.updatedAt = new Date();
    users.set(userId, user);

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user activity (orders, purchases, etc.)
router.get('/activity', (req, res) => {
  try {
    const userId = getUserId(req) || 'default-user';

    // Mock activity data
    const activity = {
      recentOrders: 12,
      totalPurchases: ₹ 45680,
      averageOrderValue: ₹ 3806.67,
      lastLoginAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      memberSince: new Date('2023-01-15'),
      preferences: {
        emailNotifications: true,
        smsNotifications: false,
        orderUpdates: true
      }
    };

    res.json({
      success: true,
      activity
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete account
router.delete('/account', (req, res) => {
  try {
    const userId = getUserId(req) || 'default-user';
    const { password } = req.body;

    const user = users.get(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Password is required to delete account'
      });
    }

    users.delete(userId);

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
