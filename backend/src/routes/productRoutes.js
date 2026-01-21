const express = require('express');
const router = express.Router();

// Mock product database
const products = [
  {
    id: 1,
    name: 'Smartphone Pro',
    price: 15999,
    category: 'Electronics',
    rating: 4.5,
    reviewCount: 342,
    image: 'https://via.placeholder.com/300x300?text=Smartphone+Pro',
    description: 'Premium smartphone with advanced features',
    stock: 45
  },
  {
    id: 2,
    name: 'Wireless Earbuds',
    price: 1899,
    category: 'Audio',
    rating: 4.2,
    reviewCount: 189,
    image: 'https://via.placeholder.com/300x300?text=Wireless+Earbuds',
    description: 'High-quality wireless earbuds',
    stock: 120
  },
  {
    id: 3,
    name: 'Smart Watch',
    price: 4999,
    category: 'Wearables',
    rating: 4.7,
    reviewCount: 256,
    image: 'https://via.placeholder.com/300x300?text=Smart+Watch',
    description: 'Feature-rich smartwatch',
    stock: 80
  },
  {
    id: 4,
    name: 'Travel Backpack',
    price: 2499,
    category: 'Bags',
    rating: 4.3,
    reviewCount: 145,
    image: 'https://via.placeholder.com/300x300?text=Travel+Backpack',
    description: 'Durable travel backpack',
    stock: 60
  },
  {
    id: 5,
    name: 'Power Bank',
    price: 1299,
    category: 'Electronics',
    rating: 4.1,
    reviewCount: 198,
    image: 'https://via.placeholder.com/300x300?text=Power+Bank',
    description: 'High-capacity power bank',
    stock: 150
  },
  {
    id: 6,
    name: 'Mechanical Keyboard',
    price: 3499,
    category: 'Computing',
    rating: 4.6,
    reviewCount: 234,
    image: 'https://via.placeholder.com/300x300?text=Mechanical+Keyboard',
    description: 'Gaming mechanical keyboard',
    stock: 75
  },
  {
    id: 7,
    name: '4K Webcam',
    price: 7999,
    category: 'Photography',
    rating: 4.4,
    reviewCount: 156,
    image: 'https://via.placeholder.com/300x300?text=4K+Webcam',
    description: '4K resolution webcam',
    stock: 35
  },
  {
    id: 8,
    name: 'Tripod',
    price: 599,
    category: 'Photography',
    rating: 4.2,
    reviewCount: 98,
    image: 'https://via.placeholder.com/300x300?text=Tripod',
    description: 'Adjustable camera tripod',
    stock: 100
  },
  {
    id: 9,
    name: 'Charging Pad',
    price: 899,
    category: 'Accessories',
    rating: 4.0,
    reviewCount: 112,
    image: 'https://via.placeholder.com/300x300?text=Charging+Pad',
    description: 'Wireless charging pad',
    stock: 140
  },
  {
    id: 10,
    name: 'USB Hub',
    price: 799,
    category: 'Accessories',
    rating: 4.3,
    reviewCount: 87,
    image: 'https://via.placeholder.com/300x300?text=USB+Hub',
    description: 'Multi-port USB hub',
    stock: 110
  },
  {
    id: 11,
    name: 'Water Bottle',
    price: 349,
    category: 'Accessories',
    rating: 4.5,
    reviewCount: 234,
    image: 'https://via.placeholder.com/300x300?text=Water+Bottle',
    description: 'Insulated water bottle',
    stock: 200
  },
  {
    id: 12,
    name: 'Running Shoes',
    price: 3999,
    category: 'Footwear',
    rating: 4.6,
    reviewCount: 321,
    image: 'https://via.placeholder.com/300x300?text=Running+Shoes',
    description: 'Premium running shoes',
    stock: 90
  }
];

// Get all products with filtering
router.get('/', (req, res) => {
  try {
    const { category, minPrice, maxPrice, search, sort } = req.query;
    let filtered = [...products];

    // Filter by category
    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by price
    if (minPrice) {
      filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));
    }

    // Search by name
    if (search) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Sort
    if (sort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'newest') {
      // Reverse order (assume newer items at end)
      filtered.reverse();
    }

    res.json({
      success: true,
      count: filtered.length,
      products: filtered
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single product
router.get('/:id', (req, res) => {
  try {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get product categories
router.get('/categories/all', (req, res) => {
  try {
    const categories = [...new Set(products.map(p => p.category))];
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
