# 🛍️ Dhanjo - Enterprise E-Commerce Platform

A modern, feature-rich e-commerce platform built with React, featuring advanced search capabilities, wishlist functionality, user authentication, and admin dashboard.

## ✨ Phase 1 Features Implemented

### 🏪 Core E-Commerce Features
- **Advanced Product Catalog**: 12+ unique products across multiple categories
- **Professional Product Details Page**: 
  - High-quality product images with zoom
  - Dynamic pricing display with discount badges
  - Detailed product information tabs (Details, Reviews, Shipping)
  - Related products recommendations
  - Customer reviews section
  - In-stock indicators and SKU information

- **Smart Search & Filtering**:
  - Real-time debounced search (300ms)
  - Dynamic category filters
  - Price range slider (₹0 - ₹20,000)
  - Rating filters (1-5 stars)
  - Multiple sorting options (relevant, price, rating, newest)
  - Mobile-responsive filter sidebar

- **Wishlist Management**:
  - Add/remove products from wishlist
  - Persistent wishlist with localStorage
  - Quick access to wishlist items
  - Move items from wishlist to cart
  - Visual indicators (heart icon) on product cards

- **Shopping Cart**:
  - Add/remove items from cart
  - Quantity management
  - Real-time total calculation
  - Persistent cart storage
  - Responsive cart page with order summary

### 👥 User Authentication & Management
- **Login System**:
  - Email/password authentication
  - Form validation with error handling
  - "Remember me" functionality
  - Social login buttons (UI ready)
  - Forgot password link

- **User Registration**:
  - Full name, email, phone input fields
  - Password strength indicator (5-level system)
  - Password confirmation validation
  - Terms & conditions agreement
  - Welcome bonus (100 loyalty points)
  - Account creation with avatar generation

- **User Profile**:
  - Display user name and avatar in header
  - Loyalty points tracking
  - Tier status (Silver/Gold/Platinum)
  - User preferences storage

### 📊 Admin Dashboard
- **Overview Tab**:
  - 6 KPI cards (Revenue, Orders, Products, Customers, Conversion Rate, AOV)
  - Growth indicators with percentage changes
  - Recent orders table with status tracking
  - Top products list with revenue metrics

- **Orders Management**:
  - View all orders with filtering
  - Order status tracking (delivered, shipped, processing, pending)
  - Customer information and order amounts
  - Timestamp for order dates

- **Products Tab**: (UI ready for implementation)
- **Customers Tab**: (UI ready for implementation)
- **Analytics Tab**: (UI ready for implementation)
- **Settings Tab**: (UI ready for implementation)

### 🎨 Professional UI/UX Design
- **Color Scheme**:
  - Primary: #1a3a52 (Dark Navy)
  - Secondary: #2d5a7b (Medium Blue)
  - Accent: #ff9800 (Orange)
  - Success: #4caf50 (Green)

- **Typography**:
  - Modern sans-serif font hierarchy
  - Proper font weights (400, 500, 600, 700)
  - Letter spacing for brand consistency
  - Responsive font sizes

- **Responsive Design**:
  - Mobile-first approach
  - Breakpoints: 480px, 768px, 1024px, 1400px
  - Hamburger menu on mobile
  - Touch-friendly buttons and controls
  - Optimized images and lazy loading

- **Visual Polish**:
  - Smooth transitions (0.3s ease)
  - Hover effects on all interactive elements
  - Subtle shadows (0.08-0.15 opacity)
  - Rounded corners (6-12px)
  - Gradient backgrounds
  - Loading states

### 🛡️ Technical Infrastructure

#### State Management
- **Context API Providers**:
  - `UserProvider`: User authentication & profile
  - `CartProvider`: Shopping cart management
  - `WishlistProvider`: Wishlist operations
  - `ProductProvider`: Product filtering & sorting
  - `NotificationProvider`: Toast notifications

#### Custom Hooks (9 total)
- `useFetch`: API calls with loading/error states
- `useDebouncedSearch`: Debounced search input
- `useLocalStorage`: Browser storage abstraction
- `useIntersectionObserver`: Lazy loading & infinite scroll
- `useAnalytics`: Event tracking
- `useForm`: Form state management
- `usePagination`: Pagination logic
- `useCopyToClipboard`: Clipboard operations
- `useScreenSize`: Responsive breakpoint detection

#### Utility Functions (25+)
- **Price Formatting**: `formatPrice()` with Indian numbering
- **Validators**: Email, password, phone, zipCode, creditCard (Luhn algorithm)
- **Calculations**: Tax, shipping, loyalty points, discounts
- **Filtering**: Advanced product filtering by multiple criteria
- **Sorting**: Multiple sort options with comparison functions
- **Storage**: LocalStorage wrapper with JSON serialization
- **ID Generation**: Unique ID creation for orders/items
- **Debounce/Throttle**: Performance optimization utilities

#### Configuration System
- **30+ Settings** with feature flags:
  - Feature toggles (Recommendations, Loyalty, Wishlist, etc.)
  - Product configuration (items per page, CDN settings)
  - Cart configuration (max quantity, free shipping threshold)
  - User configuration (password requirements, session timeout)
  - Loyalty tier configuration
  - Security settings

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx/CSS (Navbar with auth buttons)
│   ├── Footer.jsx/CSS
│   ├── ProductCard.jsx/CSS (Wishlist integration)
│   ├── SearchFilter.jsx/CSS (Advanced search)
│   ├── Wishlist.jsx/CSS
│   └── Cart.jsx (Shopping cart)
├── pages/
│   ├── Home.jsx/CSS
│   ├── Products.jsx/CSS (Search integration)
│   ├── Product.jsx/CSS (Enhanced details page)
│   ├── Cart.jsx/CSS
│   ├── About.jsx/CSS
│   ├── Login.jsx (User authentication)
│   ├── Register.jsx (User registration)
│   ├── Auth.css (Shared auth styling)
│   └── Admin.jsx/CSS (Admin dashboard)
├── context/
│   └── AppContext.jsx (5 context providers)
├── hooks/
│   └── useCustomHooks.js (9 custom hooks)
├── utils/
│   └── helpers.js (25+ utility functions)
├── config/
│   └── config.js (Configuration system)
├── data/
│   └── products.js (12 unique products)
└── App.jsx (Route configuration)
```

## 🚀 Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔐 Key Features

### Authentication
- User login/registration with email validation
- Password strength indicator (5 levels)
- Remember me functionality
- Logout option in header
- User avatar display

### Search & Discovery
- Real-time debounced search
- Multi-criteria filtering (category, price, rating)
- Smart sorting (relevant, price, rating, newest)
- Mobile-responsive filter sidebar

### Shopping Experience
- Add to cart with quantity selection
- Wishlist for saved items
- Product recommendations (related items)
- Customer reviews on product pages
- Order summary in cart

### Admin Features
- Sales dashboard with KPIs
- Recent orders monitoring
- Top products analytics
- Order status tracking
- Expandable tabs for future features

## 🎯 Performance Optimizations

- Debounced search (300ms) to reduce API calls
- Lazy loading for images
- CSS Grid for efficient layouts
- Minimal re-renders with React hooks
- LocalStorage for cart/wishlist persistence
- Optimized bundle size

## 📈 Metrics & Analytics Ready

The platform is built with analytics in mind:
- User authentication tracking
- Product view events
- Search query logging
- Cart operations tracking
- Conversion tracking
- Order analytics

## 🔄 User Flows

### New User Flow
1. Land on Home page
2. Explore Products with Search/Filters
3. View Product Details
4. Add to Wishlist/Cart
5. Register/Login
6. Proceed to Checkout

### Returning User Flow
1. Login from header
2. See personalized dashboard
3. Access saved wishlist
4. Quick reorder from cart
5. View order history (future)

### Admin Flow
1. Login with admin credentials
2. Access Admin Dashboard (/admin)
3. Monitor KPIs and recent orders
4. Manage products, customers (future)
5. View analytics (future)

## 🛠️ Technology Stack

- **Frontend**: React 18, React Router v6
- **State Management**: React Context API
- **Styling**: CSS3 (Grid, Flexbox, Gradients)
- **Storage**: LocalStorage
- **Validation**: Custom validators
- **Icons/Emojis**: Unicode emojis for UI elements

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🎓 Next Steps (Phase 2)

1. **Backend Integration**:
   - Node.js + Express server
   - PostgreSQL database
   - API endpoints (RESTful)

2. **Payment Integration**:
   - Stripe payment gateway
   - Multiple payment methods
   - Order confirmation

3. **Recommendation Engine**:
   - Collaborative filtering
   - Content-based recommendations
   - AI-powered suggestions

4. **Advanced Features**:
   - Email notifications
   - SMS alerts
   - Push notifications
   - Live chat support

5. **Performance**:
   - Image optimization
   - Code splitting
   - Service workers
   - CDN integration

## 📧 Contact & Support

For questions or support, please reach out to: support@dhanjo.com

## 📄 License

This project is licensed under the MIT License.

---

**Made with ❤️ for a better shopping experience**
