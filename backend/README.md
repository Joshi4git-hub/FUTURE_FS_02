# Dhanjo Backend API Documentation

## Overview
RESTful API backend for the Dhanjo e-commerce platform built with Node.js and Express.js.

## Getting Started

### Installation
```bash
cd backend
npm install
```

### Running the Server
```bash
# Development mode (with auto-reload via nodemon)
npm run dev

# Production mode
npm start
```

The server runs on `http://localhost:5000` by default.

---

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Health Check
- **GET** `/health`
  - Returns server status

---

## Authentication (`/api/auth`)

### Register User
- **POST** `/api/auth/register`
  - **Body**: `{ name, email, password, phone }`
  - **Response**: `{ token, user }`
  - Creates new user account with bcryptjs password hashing

### Login User
- **POST** `/api/auth/login`
  - **Body**: `{ email, password }`
  - **Response**: `{ token, user }`
  - Generates JWT token (7-day expiry)

### Verify Token
- **POST** `/api/auth/verify`
  - **Headers**: `Authorization: Bearer {token}`
  - **Response**: `{ user }`
  - Validates JWT token

---

## Products (`/api/products`)

### Get All Products
- **GET** `/api/products`
  - **Query Parameters**:
    - `category` - Filter by category
    - `minPrice` - Minimum price filter
    - `maxPrice` - Maximum price filter
    - `search` - Search by name
    - `sort` - Sort by (price-asc, price-desc, rating, newest)
  - **Response**: `{ products: [], count }`

### Get Single Product
- **GET** `/api/products/:id`
  - **Response**: `{ product }`

### Get Categories
- **GET** `/api/products/categories/all`
  - **Response**: `{ categories: [] }`

---

## Shopping Cart (`/api/cart`)

### Get User's Cart
- **GET** `/api/cart`
  - **Response**: `{ items: [], total, itemCount }`

### Add Item to Cart
- **POST** `/api/cart`
  - **Body**: `{ productId, name, price, quantity, image }`
  - **Response**: `{ cart: [], total, itemCount }`

### Update Item Quantity
- **PUT** `/api/cart/:itemId`
  - **Body**: `{ quantity }`
  - **Response**: `{ cart: [], total, itemCount }`

### Remove Item from Cart
- **DELETE** `/api/cart/:itemId`
  - **Response**: `{ cart: [], total, itemCount }`

### Clear Entire Cart
- **DELETE** `/api/cart`
  - **Response**: `{ items: [], total: 0, itemCount: 0 }`

---

## Orders (`/api/orders`)

### Create Order
- **POST** `/api/orders`
  - **Body**: `{ items: [], shippingAddress, paymentMethod, total }`
  - **Response**: `{ order }`
  - Creates order from cart items

### Get User's Orders
- **GET** `/api/orders`
  - **Response**: `{ orders: [], count }`

### Get Order Details
- **GET** `/api/orders/:id`
  - **Response**: `{ order }`

### Update Order Status (Admin)
- **PUT** `/api/orders/:id/status`
  - **Body**: `{ status }` (pending, processing, shipped, delivered, cancelled)
  - **Response**: `{ order }`

### Cancel Order
- **PUT** `/api/orders/:id/cancel`
  - **Response**: `{ order }`

### Get Order Statistics (Admin)
- **GET** `/api/orders/admin/stats`
  - **Response**: `{ stats: { totalOrders, totalRevenue, statusBreakdown } }`

---

## Wishlist (`/api/wishlist`)

### Get Wishlist
- **GET** `/api/wishlist`
  - **Response**: `{ items: [], count }`

### Add to Wishlist
- **POST** `/api/wishlist`
  - **Body**: `{ productId, name, price, image, category }`
  - **Response**: `{ item, wishlistCount }`

### Remove from Wishlist
- **DELETE** `/api/wishlist/:itemId`
  - **Response**: `{ wishlistCount }`

### Check if Product in Wishlist
- **GET** `/api/wishlist/check/:productId`
  - **Response**: `{ productId, inWishlist: boolean }`

### Clear Wishlist
- **DELETE** `/api/wishlist`
  - **Response**: `{ items: [], count: 0 }`

### Get Wishlist Statistics
- **GET** `/api/wishlist/stats/summary`
  - **Response**: `{ stats: { totalItems, totalValue, categories } }`

---

## Payments (`/api/payments`)

### Create Payment Intent
- **POST** `/api/payments/create-intent`
  - **Body**: `{ amount, currency, description, orderId }`
  - **Response**: `{ paymentId, clientSecret, amount, status }`

### Confirm Payment
- **POST** `/api/payments/confirm`
  - **Body**: `{ paymentId, cardToken }`
  - **Response**: `{ payment }`

### Get Payment Status
- **GET** `/api/payments/:paymentId`
  - **Response**: `{ payment }`

### Refund Payment (Admin)
- **POST** `/api/payments/:paymentId/refund`
  - **Body**: `{ reason }`
  - **Response**: `{ payment }`

### Get Payment History
- **GET** `/api/payments/history/all`
  - **Response**: `{ payments: [], count }`

### Payment Statistics (Admin)
- **GET** `/api/payments/admin/statistics`
  - **Response**: `{ stats: { totalPayments, totalRevenue, successRate, statusBreakdown } }`

---

## Users (`/api/users`)

### Get User Profile
- **GET** `/api/users/profile`
  - **Response**: `{ user }`

### Update User Profile
- **PUT** `/api/users/profile`
  - **Body**: `{ name, email, phone, address, city, state, zipCode }`
  - **Response**: `{ user }`

### Get Loyalty Program Details
- **GET** `/api/users/loyalty`
  - **Response**: `{ loyalty: { currentPoints, currentTier, tierBenefits } }`

### Add Loyalty Points
- **POST** `/api/users/loyalty/add-points`
  - **Body**: `{ points, reason }`
  - **Response**: `{ loyalty }`

### Redeem Loyalty Points
- **POST** `/api/users/loyalty/redeem`
  - **Body**: `{ points }`
  - **Response**: `{ redemption: { pointsRedeemed, discountAmount, remainingPoints } }`

### Change Password
- **POST** `/api/users/change-password`
  - **Body**: `{ currentPassword, newPassword }`
  - **Response**: `{ success: true }`

### Get User Activity
- **GET** `/api/users/activity`
  - **Response**: `{ activity: { recentOrders, totalPurchases, preferences } }`

### Delete Account
- **DELETE** `/api/users/account`
  - **Body**: `{ password }`
  - **Response**: `{ success: true }`

---

## Recommendations (`/api/recommendations`)

### Get Personalized Recommendations
- **GET** `/api/recommendations/personalized?limit=6`
  - **Response**: `{ type, recommendations: [] }`
  - Uses collaborative filtering based on purchase history

### Get Similar Products
- **GET** `/api/recommendations/similar/:productId?limit=4`
  - **Response**: `{ productId, similarProducts: [] }`
  - Content-based similarity

### Get Trending Products
- **GET** `/api/recommendations/trending?limit=8`
  - **Response**: `{ type: 'trending', recommendations: [] }`

### Record Purchase
- **POST** `/api/recommendations/record-purchase`
  - **Body**: `{ productId }`
  - **Response**: `{ success: true }`
  - Called after successful order

### Get Products by Category
- **GET** `/api/recommendations/category/:category?limit=6`
  - **Response**: `{ category, products: [] }`

---

## Analytics (`/api/analytics`)

### Track Page View
- **POST** `/api/analytics/track-pageview`
  - **Body**: `{ page, referrer }`
  - **Response**: `{ success: true }`

### Track Conversion
- **POST** `/api/analytics/track-conversion`
  - **Body**: `{ orderId, amount, products }`
  - **Response**: `{ success: true }`

### Get Key Performance Indicators (KPIs)
- **GET** `/api/analytics/kpis`
  - **Response**: `{ kpis: { totalRevenue, totalOrders, avgOrderValue, conversionRate } }`

### Get Order Analytics
- **GET** `/api/analytics/orders?period=monthly`
  - **Query**: `period` (daily, weekly, monthly)
  - **Response**: `{ orderTrend, statusBreakdown, fulfillmentRate }`

### Get Product Analytics
- **GET** `/api/analytics/products`
  - **Response**: `{ topProducts, categoryPerformance, inventoryStatus }`

### Get Customer Analytics
- **GET** `/api/analytics/customers`
  - **Response**: `{ metrics: { totalCustomers, churnRate, topCountries } }`

### Get Traffic Analytics
- **GET** `/api/analytics/traffic`
  - **Response**: `{ sources, devices, hourlyBreakdown, bounceRate }`

### Get Cohort Analysis
- **GET** `/api/analytics/cohorts`
  - **Response**: `{ cohorts: [], avgRetention }`

### Get Funnel Analysis
- **GET** `/api/analytics/funnel`
  - **Response**: `{ stages: [], dropoffPoints, overallConversionRate }`

---

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

---

## Authentication

Include JWT token in request headers:
```
Authorization: Bearer {token}
```

Token format: `Header.Payload.Signature`
- Expiry: 7 days
- Secret: `process.env.JWT_SECRET`

---

## Rate Limiting

- **Window**: 15 minutes
- **Limit**: 100 requests per IP address

---

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_key_here
DATABASE_URL=postgresql://user:password@localhost:5432/dhanjo
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
SENDGRID_API_KEY=SG...
REDIS_URL=redis://localhost:6379
```

---

## Database Integration (Planned)

The API is currently using in-memory storage. To integrate PostgreSQL:

1. Install PostgreSQL driver: `npm install pg`
2. Create database schema
3. Replace in-memory stores with database queries
4. Update models in `src/models/`

---

## Production Deployment

Before deploying to production:

1. Set `NODE_ENV=production`
2. Configure HTTPS
3. Set strong `JWT_SECRET`
4. Use PostgreSQL database
5. Configure CORS for production domain
6. Enable rate limiting
7. Set up error logging (e.g., Sentry)
8. Configure Redis for caching
9. Set up monitoring and alerts

---

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server with auto-reload
npm run dev

# Run production build
npm start

# Run database migrations
npm run migrate

# Seed database with sample data
npm run seed

# Run tests (when jest is configured)
npm test
```

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT + bcryptjs
- **Database**: PostgreSQL (planned)
- **Caching**: Redis (planned)
- **Payments**: Stripe (integrated)
- **Email**: Nodemailer (configured)
- **Validation**: validator.js
- **Security**: CORS, rate-limit

---

## File Structure

```
backend/
├── src/
│   ├── server.js           # Main Express app
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── wishlistRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── userRoutes.js
│   │   ├── recommendationRoutes.js
│   │   └── analyticsRoutes.js
│   ├── models/             # Database models (planned)
│   └── controllers/        # Business logic (planned)
├── package.json
├── .env                    # Environment variables
└── README.md              # This file
```

---

## Next Steps (Phase 2)

1. ✅ Backend API structure - COMPLETE
2. ⏳ PostgreSQL database setup
3. ⏳ Payment gateway testing
4. ⏳ Email service configuration
5. ⏳ Frontend API integration
6. ⏳ Deployment setup

---

## Support

For issues or questions, contact: support@dhanjo.com
