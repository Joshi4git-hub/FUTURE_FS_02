import React, { createContext, useContext, useState, useCallback } from 'react';

// User Context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [userTier, setUserTier] = useState('silver');

  const login = useCallback((userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setLoyaltyPoints(userData.loyaltyPoints || 0);
    setUserTier(userData.tier || 'silver');
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    setLoyaltyPoints(0);
    setUserTier('silver');
  }, []);

  const updateUserProfile = useCallback((updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  }, []);

  return (
    <UserContext.Provider value={{
      user,
      isAuthenticated,
      loyaltyPoints,
      userTier,
      login,
      logout,
      updateUserProfile
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

// Cart Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  const addToCart = useCallback((product, quantity = 1) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Recalculate total whenever cart changes
  React.useEffect(() => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
    setItemCount(cart.reduce((count, item) => count + item.quantity, 0));
  }, [cart]);

  return (
    <CartContext.Provider value={{
      cart,
      cartTotal,
      itemCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

// Wishlist Context
const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = useCallback((product) => {
    setWishlist(prev => {
      if (prev.find(item => item.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  }, []);

  const isInWishlist = useCallback((productId) => {
    return wishlist.some(item => item.id === productId);
  }, [wishlist]);

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

// Products & Filters Context
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    priceRange: [0, 20000],
    category: null,
    rating: 0,
    searchQuery: ''
  });

  const [sortBy, setSortBy] = useState('relevant'); // relevant, price-asc, price-desc, rating, newest

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      priceRange: [0, 20000],
      category: null,
      rating: 0,
      searchQuery: ''
    });
    setSortBy('relevant');
  }, []);

  return (
    <ProductContext.Provider value={{
      filters,
      sortBy,
      updateFilters,
      setSortBy,
      resetFilters
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductFilters = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductFilters must be used within ProductProvider');
  }
  return context;
};

// Notifications Context
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now();
    const newNotification = { ...notification, id };
    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};
