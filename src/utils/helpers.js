/**
 * Utility functions for e-commerce platform
 */

// Price formatting
export const formatPrice = (price, currency = '₹') => {
  return `${currency}${price.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

// Discount calculation
export const calculateDiscount = (originalPrice, discountedPrice) => {
  const discount = originalPrice - discountedPrice;
  const percentage = (discount / originalPrice) * 100;
  return {
    amount: discount,
    percentage: Math.round(percentage),
  };
};

// Rating display
export const formatRating = (rating, reviewCount) => {
  return {
    stars: Math.round(rating * 2) / 2, // Round to nearest 0.5
    text: `${rating.toFixed(1)} out of 5`,
    count: `(${reviewCount} reviews)`,
  };
};

// Date formatting
export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-IN', options);
};

// Time ago (e.g., "2 hours ago")
export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [key, value] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / value);
    if (interval >= 1) {
      return `${interval} ${key}${interval > 1 ? 's' : ''} ago`;
    }
  }
  return 'just now';
};

// URL slug generation
export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

// Validation functions
export const validators = {
  email: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  password: (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
  },

  phone: (phone) => {
    const re = /^[6-9]\d{9}$/; // Indian phone number
    return re.test(phone.replace(/\D/g, ''));
  },

  zipCode: (zipCode) => {
    const re = /^\d{6}$/; // Indian PIN code
    return re.test(zipCode);
  },

  creditCard: (cardNumber) => {
    // Luhn algorithm
    const digits = cardNumber.replace(/\D/g, '');
    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i], 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  },
};

// Storage management
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage error:', error);
    }
  },

  get: (key, defaultValue = null) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.error('Storage error:', error);
      return defaultValue;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage error:', error);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Storage error:', error);
    }
  },
};

// API call helper
export const apiCall = async (
  url,
  method = 'GET',
  data = null,
  headers = {}
) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Cart calculations
export const calculateCartTotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};

export const calculateTax = (amount, taxRate = 0.18) => {
  return amount * taxRate;
};

export const calculateShipping = (total, freeShippingThreshold = 1000) => {
  if (total >= freeShippingThreshold) {
    return 0;
  }
  return total < 500 ? 100 : 50;
};

export const calculateOrderTotal = (subtotal, taxRate = 0.18, freeShippingThreshold = 1000) => {
  const tax = calculateTax(subtotal, taxRate);
  const shipping = calculateShipping(subtotal, freeShippingThreshold);
  
  return {
    subtotal,
    tax: Math.round(tax),
    shipping,
    total: Math.round(subtotal + tax + shipping),
  };
};

// Search & filter helpers
export const filterProducts = (products, filters) => {
  return products.filter(product => {
    // Price filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (product.price < min || product.price > max) {
        return false;
      }
    }

    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    // Rating filter
    if (filters.rating && product.rating < filters.rating) {
      return false;
    }

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    return true;
  });
};

export const sortProducts = (products, sortBy) => {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'popular':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    default:
      return sorted;
  }
};

// Loyalty points calculation
export const calculateLoyaltyPoints = (orderAmount, userTier = 'silver') => {
  const baseRate = {
    silver: 1,
    gold: 1.5,
    platinum: 2,
  };

  const rate = baseRate[userTier] || 1;
  return Math.floor(orderAmount * rate);
};

// Tier eligibility
export const getNextTier = (currentPoints, currentTier) => {
  const tierThresholds = {
    silver: { next: 'gold', points: 500 },
    gold: { next: 'platinum', points: 2000 },
    platinum: { next: null, points: null },
  };

  const tier = tierThresholds[currentTier];
  if (tier.next) {
    const pointsNeeded = tier.points - currentPoints;
    return {
      tier: tier.next,
      pointsNeeded: Math.max(0, pointsNeeded),
      percentage: Math.min(100, (currentPoints / tier.points) * 100),
    };
  }

  return null;
};

// OTP generation (for verification)
export const generateOTP = (length = 6) => {
  return Math.random().toString().slice(2, 2 + length).padEnd(length, '0');
};

// Order status badge colors
export const getOrderStatusColor = (status) => {
  const colors = {
    pending: '#FFA500', // Orange
    processing: '#4169E1', // Royal Blue
    shipped: '#1E90FF', // Dodger Blue
    delivered: '#32CD32', // Lime Green
    cancelled: '#FF6347', // Tomato
    refunded: '#9370DB', // Medium Purple
  };

  return colors[status] || '#808080'; // Gray default
};

// Calculate reading time
export const calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min read`;
};

// Generate unique ID
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Debounce function
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
