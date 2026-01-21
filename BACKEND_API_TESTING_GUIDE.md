# Backend API - Quick Testing Guide

## 🚀 Quick Start

### 1. Start the Backend Server
```bash
cd backend
npm install
npm run dev
```

Server will run on: `http://localhost:5000`

### 2. Test Health Check
```bash
curl http://localhost:5000/health
```

Expected Response:
```json
{
  "status": "Server running",
  "timestamp": "2026-01-21T..."
}
```

---

## 🔑 Authentication Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "9876543210"
  }'
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-123",
    "name": "John Doe",
    "email": "john@example.com",
    "loyaltyPoints": 100,
    "tier": "Silver"
  }
}
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Verify Token
```bash
curl -X POST http://localhost:5000/api/auth/verify \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📦 Product Examples

### Get All Products
```bash
curl "http://localhost:5000/api/products"
```

### Get Products with Filters
```bash
# By category
curl "http://localhost:5000/api/products?category=Electronics"

# By price range
curl "http://localhost:5000/api/products?minPrice=1000&maxPrice=5000"

# Search
curl "http://localhost:5000/api/products?search=Smartphone"

# Sort
curl "http://localhost:5000/api/products?sort=price-asc"

# Combined
curl "http://localhost:5000/api/products?category=Electronics&sort=price-desc&minPrice=1000"
```

### Get Single Product
```bash
curl http://localhost:5000/api/products/1
```

### Get Categories
```bash
curl http://localhost:5000/api/products/categories/all
```

---

## 🛒 Shopping Cart Examples

### Get Cart
```bash
curl http://localhost:5000/api/cart \
  -H "user-id: user-123"
```

### Add to Cart
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -H "user-id: user-123" \
  -d '{
    "productId": 1,
    "name": "Smartphone Pro",
    "price": 15999,
    "quantity": 1,
    "image": "https://..."
  }'
```

### Update Quantity
```bash
curl -X PUT http://localhost:5000/api/cart/ITEM_ID \
  -H "Content-Type: application/json" \
  -H "user-id: user-123" \
  -d '{"quantity": 2}'
```

### Remove Item
```bash
curl -X DELETE http://localhost:5000/api/cart/ITEM_ID \
  -H "user-id: user-123"
```

### Clear Cart
```bash
curl -X DELETE http://localhost:5000/api/cart \
  -H "user-id: user-123"
```

---

## 📋 Order Examples

### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "user-id: user-123" \
  -d '{
    "items": [
      {"productId": 1, "name": "Smartphone Pro", "price": 15999, "quantity": 1}
    ],
    "shippingAddress": "123 Main St, City, State 12345",
    "paymentMethod": "card",
    "total": 15999
  }'
```

### Get Orders
```bash
curl http://localhost:5000/api/orders \
  -H "user-id: user-123"
```

### Get Order Details
```bash
curl http://localhost:5000/api/orders/ORD-1001 \
  -H "user-id: user-123"
```

### Update Order Status (Admin)
```bash
curl -X PUT http://localhost:5000/api/orders/ORD-1001/status \
  -H "Content-Type: application/json" \
  -d '{"status": "shipped"}'
```

### Cancel Order
```bash
curl -X PUT http://localhost:5000/api/orders/ORD-1001/cancel \
  -H "user-id: user-123"
```

---

## ❤️ Wishlist Examples

### Get Wishlist
```bash
curl http://localhost:5000/api/wishlist \
  -H "user-id: user-123"
```

### Add to Wishlist
```bash
curl -X POST http://localhost:5000/api/wishlist \
  -H "Content-Type: application/json" \
  -H "user-id: user-123" \
  -d '{
    "productId": 1,
    "name": "Smartphone Pro",
    "price": 15999,
    "image": "https://...",
    "category": "Electronics"
  }'
```

### Remove from Wishlist
```bash
curl -X DELETE http://localhost:5000/api/wishlist/ITEM_ID \
  -H "user-id: user-123"
```

### Check if in Wishlist
```bash
curl http://localhost:5000/api/wishlist/check/1 \
  -H "user-id: user-123"
```

---

## 💳 Payment Examples

### Create Payment Intent
```bash
curl -X POST http://localhost:5000/api/payments/create-intent \
  -H "Content-Type: application/json" \
  -H "user-id: user-123" \
  -d '{
    "amount": 15999,
    "currency": "INR",
    "description": "Order ORD-1001",
    "orderId": "ORD-1001"
  }'
```

Response:
```json
{
  "success": true,
  "paymentId": "PAY-5001",
  "clientSecret": "PAY-5001_secret_abc123",
  "amount": 15999,
  "status": "pending"
}
```

### Confirm Payment
```bash
curl -X POST http://localhost:5000/api/payments/confirm \
  -H "Content-Type: application/json" \
  -H "user-id: user-123" \
  -d '{
    "paymentId": "PAY-5001",
    "cardToken": "tok_visa"
  }'
```

### Get Payment Status
```bash
curl http://localhost:5000/api/payments/PAY-5001 \
  -H "user-id: user-123"
```

---

## 👤 User Profile Examples

### Get Profile
```bash
curl http://localhost:5000/api/users/profile \
  -H "user-id: user-123"
```

### Update Profile
```bash
curl -X PUT http://localhost:5000/api/users/profile \
  -H "Content-Type: application/json" \
  -H "user-id: user-123" \
  -d '{
    "name": "John Doe Updated",
    "phone": "9876543210",
    "address": "456 New St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001"
  }'
```

### Get Loyalty Info
```bash
curl http://localhost:5000/api/users/loyalty \
  -H "user-id: user-123"
```

### Add Loyalty Points
```bash
curl -X POST http://localhost:5000/api/users/loyalty/add-points \
  -H "Content-Type: application/json" \
  -H "user-id: user-123" \
  -d '{"points": 500, "reason": "Purchase"}'
```

### Redeem Points
```bash
curl -X POST http://localhost:5000/api/users/loyalty/redeem \
  -H "Content-Type: application/json" \
  -H "user-id: user-123" \
  -d '{"points": 200}'
```

---

## 💡 Recommendations Examples

### Get Personalized Recommendations
```bash
curl "http://localhost:5000/api/recommendations/personalized?limit=6" \
  -H "user-id: user-123"
```

### Get Similar Products
```bash
curl "http://localhost:5000/api/recommendations/similar/1?limit=4"
```

### Get Trending Products
```bash
curl "http://localhost:5000/api/recommendations/trending?limit=8"
```

### Record Purchase
```bash
curl -X POST http://localhost:5000/api/recommendations/record-purchase \
  -H "Content-Type: application/json" \
  -H "user-id: user-123" \
  -d '{"productId": 1}'
```

---

## 📊 Analytics Examples

### Track Page View
```bash
curl -X POST http://localhost:5000/api/analytics/track-pageview \
  -H "Content-Type: application/json" \
  -d '{
    "page": "/products",
    "referrer": "google.com"
  }'
```

### Track Conversion
```bash
curl -X POST http://localhost:5000/api/analytics/track-conversion \
  -H "Content-Type: application/json" \
  -H "user-id: user-123" \
  -d '{
    "orderId": "ORD-1001",
    "amount": 15999,
    "products": [1, 2, 3]
  }'
```

### Get KPIs
```bash
curl http://localhost:5000/api/analytics/kpis
```

### Get Order Analytics
```bash
curl "http://localhost:5000/api/analytics/orders?period=monthly"
```

### Get Product Analytics
```bash
curl http://localhost:5000/api/analytics/products
```

### Get Customer Analytics
```bash
curl http://localhost:5000/api/analytics/customers
```

### Get Traffic Analytics
```bash
curl http://localhost:5000/api/analytics/traffic
```

### Get Funnel Analysis
```bash
curl http://localhost:5000/api/analytics/funnel
```

---

## 🧪 Using Postman/Insomnia

### Import Collection
1. Open Postman/Insomnia
2. Create new collection
3. Add requests using examples above
4. Set variable for `{{BASE_URL}}` = `http://localhost:5000`
5. Set variable for `{{JWT_TOKEN}}` from login response
6. Set variable for `{{USER_ID}}` = your user ID

### Example Environment Variables
```json
{
  "BASE_URL": "http://localhost:5000",
  "JWT_TOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "USER_ID": "user-123"
}
```

---

## 🐛 Common Issues & Solutions

### Issue: CORS Error
**Solution**: Check backend CORS configuration in server.js
```javascript
// Should allow localhost:5173
origin: process.env.CLIENT_URL || 'http://localhost:5173'
```

### Issue: 404 on Endpoints
**Solution**: Verify routes are mounted in server.js
```javascript
app.use('/api/products', require('./routes/productRoutes'));
```

### Issue: Rate Limiting
**Solution**: Wait 15 minutes or change rate limit in server.js
```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});
```

### Issue: Missing user-id header
**Solution**: Add `user-id` header to all requests needing user context
```bash
-H "user-id: user-123"
```

---

## ✅ Testing Checklist

- [ ] Health check working
- [ ] User registration successful
- [ ] User login returns token
- [ ] Products listing works
- [ ] Cart operations work
- [ ] Orders can be created
- [ ] Wishlist operations work
- [ ] Payments can be created
- [ ] User profile updates
- [ ] Loyalty points add/redeem
- [ ] Recommendations work
- [ ] Analytics tracking works

---

## 🔗 Useful Links

- Backend README: [backend/README.md](../backend/README.md)
- API Documentation: [BACKEND_COMPLETION_SUMMARY.md](../BACKEND_COMPLETION_SUMMARY.md)
- Project Status: [PROJECT_STATUS.md](../PROJECT_STATUS.md)

---

## 💾 Environment Setup

Create `.env` file in backend directory:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_key_here
DATABASE_URL=postgresql://user:password@localhost:5432/dhanjo
STRIPE_SECRET_KEY=sk_test_...
SENDGRID_API_KEY=SG...
REDIS_URL=redis://localhost:6379
```

---

**Happy Testing!** 🎉

For issues, refer to the full API documentation or contact support@dhanjo.com
