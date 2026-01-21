/**
 * Dhanjo E-Commerce Platform Configuration
 * Central configuration for all environment-specific settings
 */

export const CONFIG = {
  // App Info
  APP: {
    NAME: 'Dhanjo',
    VERSION: '1.0.0',
    ENVIRONMENT: process.env.NODE_ENV || 'development',
    DOMAIN: process.env.REACT_APP_DOMAIN || 'http://localhost:3000',
  },

  // API Configuration
  API: {
    BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
  },

  // Payment Configuration
  PAYMENTS: {
    STRIPE_PUBLIC_KEY: process.env.REACT_APP_STRIPE_KEY || '',
    PAYPAL_CLIENT_ID: process.env.REACT_APP_PAYPAL_ID || '',
    RAZORPAY_KEY_ID: process.env.REACT_APP_RAZORPAY_KEY || '',
  },

  // Analytics Configuration
  ANALYTICS: {
    GOOGLE_ANALYTICS_ID: process.env.REACT_APP_GA_ID || '',
    SEGMENT_KEY: process.env.REACT_APP_SEGMENT_KEY || '',
    TRACKING_ENABLED: true,
  },

  // Features
  FEATURES: {
    RECOMMENDATIONS: true,
    LOYALTY_PROGRAM: true,
    WISHLIST: true,
    REVIEWS: true,
    SOCIAL_SHARE: true,
    LIVE_CHAT: true,
    AI_CHATBOT: false,
    MULTI_LANGUAGE: false,
    MULTI_CURRENCY: false,
    DARK_MODE: true,
  },

  // Product Configuration
  PRODUCTS: {
    ITEMS_PER_PAGE: 12,
    IMAGES_CDN: process.env.REACT_APP_CDN_URL || 'https://cdn.example.com',
    MAX_IMAGES_PER_PRODUCT: 5,
    LAZY_LOAD_IMAGES: true,
  },

  // Cart Configuration
  CART: {
    MAX_QUANTITY: 999,
    MIN_ORDER_VALUE: 100,
    FREE_SHIPPING_THRESHOLD: 1000,
    STANDARD_SHIPPING_COST: 50,
    CART_EXPIRY: 30 * 24 * 60 * 60 * 1000, // 30 days
  },

  // Order Configuration
  ORDER: {
    FULFILLMENT_TIME_DAYS: 3,
    RETURN_WINDOW_DAYS: 30,
    DELIVERY_TIME_DAYS: 7,
    AUTO_CANCEL_DAYS: 15,
  },

  // User Configuration
  USER: {
    PASSWORD_MIN_LENGTH: 8,
    SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours
    OTP_EXPIRY: 10 * 60 * 1000, // 10 minutes
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
  },

  // Loyalty Program Configuration
  LOYALTY: {
    SILVER_POINTS_MULTIPLIER: 1,
    GOLD_POINTS_MULTIPLIER: 1.5,
    PLATINUM_POINTS_MULTIPLIER: 2,
    GOLD_THRESHOLD: 500,
    PLATINUM_THRESHOLD: 2000,
    POINTS_PER_RUPEE: 1,
    POINTS_REDEMPTION_VALUE: 100, // 100 points = ₹50
  },

  // Pricing Configuration
  PRICING: {
    CURRENCY: '₹',
    CURRENCY_CODE: 'INR',
    TAX_RATE: 0.18, // 18% GST
    BULK_DISCOUNT_THRESHOLD: 5,
    BULK_DISCOUNT_PERCENTAGE: 10,
  },

  // Search Configuration
  SEARCH: {
    MIN_QUERY_LENGTH: 2,
    MAX_RESULTS: 20,
    DEBOUNCE_DELAY: 300,
    ENABLE_TYPO_CORRECTION: true,
    ENABLE_VOICE_SEARCH: false,
  },

  // Notification Configuration
  NOTIFICATIONS: {
    EMAIL_ENABLED: true,
    SMS_ENABLED: true,
    PUSH_ENABLED: true,
    IN_APP_ENABLED: true,
    NOTIFICATION_TIMEOUT: 5000,
  },

  // Security Configuration
  SECURITY: {
    ENABLE_2FA: true,
    ENABLE_BIOMETRIC_LOGIN: true,
    REQUIRE_EMAIL_VERIFICATION: true,
    REQUIRE_PHONE_VERIFICATION: false,
    ENABLE_PASSWORD_RESET: true,
    JWT_EXPIRY: 15 * 60 * 1000, // 15 minutes
    REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
  },

  // Admin Configuration
  ADMIN: {
    ENABLE_ADMIN_PANEL: true,
    DEFAULT_ITEMS_PER_PAGE: 20,
    ENABLE_BULK_ACTIONS: true,
    EXPORT_FORMATS: ['CSV', 'Excel', 'PDF'],
  },

  // Performance Configuration
  PERFORMANCE: {
    ENABLE_LAZY_LOADING: true,
    ENABLE_CODE_SPLITTING: true,
    ENABLE_COMPRESSION: true,
    CACHE_DURATION: 60 * 60 * 1000, // 1 hour
    IMAGE_OPTIMIZATION: true,
  },

  // Rating & Review Configuration
  RATINGS: {
    ALLOW_ANONYMOUS_REVIEWS: false,
    REQUIRE_VERIFIED_PURCHASE: true,
    MODERATION_ENABLED: true,
    MIN_RATING_TEXT_LENGTH: 10,
    MAX_RATING_TEXT_LENGTH: 1000,
  },

  // Social Integration
  SOCIAL: {
    FACEBOOK_APP_ID: process.env.REACT_APP_FB_APP_ID || '',
    GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
    TWITTER_APP_ID: process.env.REACT_APP_TWITTER_APP_ID || '',
    INSTAGRAM_ENABLED: true,
    ENABLE_SOCIAL_SHARE: true,
  },

  // Support Configuration
  SUPPORT: {
    ENABLE_LIVE_CHAT: true,
    ENABLE_TICKET_SYSTEM: true,
    AVERAGE_RESPONSE_TIME: 'Within 1 hour',
    SUPPORT_EMAIL: 'support@dhanjo.com',
    SUPPORT_PHONE: '+1-800-TECH-HUB',
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 12,
    MAX_PAGE_SIZE: 100,
    ENABLE_INFINITE_SCROLL: false,
  },

  // Debug Configuration
  DEBUG: {
    ENABLE_CONSOLE_LOGS: process.env.NODE_ENV === 'development',
    ENABLE_NETWORK_LOGS: process.env.NODE_ENV === 'development',
    ENABLE_REDUX_DEVTOOLS: process.env.NODE_ENV === 'development',
  },

  // Maintenance Mode
  MAINTENANCE: {
    ENABLED: false,
    MESSAGE: 'We are currently under maintenance. Please check back soon.',
    ESTIMATED_TIME: '1 hour',
    SHOW_COUNTDOWN: true,
  },

  // Feature Flags
  FLAGS: {
    ENABLE_NEW_CHECKOUT: true,
    ENABLE_WISHLIST_SHARING: true,
    ENABLE_PRICE_MATCHING: false,
    ENABLE_SUBSCRIPTIONS: false,
    ENABLE_GIFT_CARDS: false,
  },
};

// Export configuration based on environment
export const getConfig = () => {
  const env = process.env.NODE_ENV || 'development';

  switch (env) {
    case 'production':
      return {
        ...CONFIG,
        API: {
          ...CONFIG.API,
          BASE_URL: 'https://api.dhanjo.com/api',
        },
        DEBUG: {
          ENABLE_CONSOLE_LOGS: false,
          ENABLE_NETWORK_LOGS: false,
          ENABLE_REDUX_DEVTOOLS: false,
        },
      };

    case 'staging':
      return {
        ...CONFIG,
        API: {
          ...CONFIG.API,
          BASE_URL: 'https://staging-api.dhanjo.com/api',
        },
      };

    default: // development
      return CONFIG;
  }
};

export default getConfig();
