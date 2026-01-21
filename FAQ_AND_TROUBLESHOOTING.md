# ❓ Dhanjo - FAQ & Troubleshooting

## Frequently Asked Questions

### 🛍️ Shopping Features

**Q: How do I search for products?**  
A: Use the search bar on the Products page. It searches in real-time with 300ms debouncing. Start typing a product name and results will update automatically.

**Q: How do filters work?**  
A: On the Products page, use the filter sidebar to filter by:
- Category (Audio, Footwear, Wearables, etc.)
- Price range (use slider or input fields)
- Rating (select 1-5 stars)
- Multiple filters work together

**Q: Can I sort products?**  
A: Yes! Use the Sort dropdown to sort by:
- Relevant (default)
- Price Low to High
- Price High to Low
- Rating (highest first)
- Newest First

**Q: How do I add items to my wishlist?**  
A: Click the heart icon (♡) on any product card or in the product details page. The heart will turn red when added to wishlist.

**Q: Where is my wishlist?**  
A: You can view your wishlist by:
1. Clicking the wishlist icon in the sidebar
2. Or navigating to /wishlist route
3. Items are saved in your browser's local storage

**Q: Can I save my wishlist between sessions?**  
A: Yes! Your wishlist is saved in your browser's local storage and will persist even after you close the browser.

**Q: What if my cart is empty after reloading?**  
A: Your cart is saved in localStorage. If it's empty, try:
1. Check browser cache/cookies aren't disabled
2. Check if you're in private/incognito mode
3. Clear cache and reload

**Q: How do I change quantity in cart?**  
A: On the Cart page, you can increase/decrease quantity using the +/- buttons next to each item.

---

### 👤 User Account

**Q: How do I create an account?**  
A: Click "Sign Up" in the header or go to /register. Fill in:
- Full Name
- Email
- Phone (optional)
- Password (8+ chars with uppercase, lowercase, number)
- Confirm Password
- Agree to Terms

**Q: What's the password requirement?**  
A: Passwords must be at least 8 characters and include:
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- Optional: special character (for stronger security)

**Q: How do I login?**  
A: Click "Login" in the header or go to /login. Enter your email and password.

**Q: What does "Remember Me" do?**  
A: It saves your email in localStorage for convenience. You'll still need to enter your password next time.

**Q: How do I logout?**  
A: When logged in, click the "Logout" button in the header under your username.

**Q: Where is my profile?**  
A: Profile page coming soon! For now, you can see:
- Your name and avatar in the header
- Loyalty points (future feature)
- Account tier (Silver/Gold/Platinum)

**Q: Can I use social login?**  
A: Social login buttons are visible but will be implemented in Phase 2.

---

### 💳 Payments & Orders (Coming Soon)

**Q: How do I checkout?**  
A: Checkout feature coming in Phase 2! For now you can:
1. Add items to cart
2. View order summary with total
3. Proceed to payment when feature launches

**Q: What payment methods are supported?**  
A: Phase 2 will include:
- Credit/Debit Cards
- UPI (India specific)
- Digital Wallets
- Razorpay
- Stripe

**Q: Can I use a discount code?**  
A: Discount codes coming in Phase 2!

---

### 📱 Mobile & Responsive

**Q: Does the app work on mobile?**  
A: Yes! The app is fully responsive and optimized for:
- iPhones (480px and up)
- Android phones
- Tablets
- Desktop

**Q: Why is the menu collapsed on mobile?**  
A: The hamburger menu (☰) is shown on mobile to save screen space. Click to expand/collapse the menu.

**Q: Are all features available on mobile?**  
A: Yes! All features work on mobile:
- Search and filters (sidebar pops out)
- Product details (optimized layout)
- Shopping cart (full functionality)
- User account (condensed view)

---

### 🏪 Admin Dashboard

**Q: How do I access the admin dashboard?**  
A: 
1. Login with your account
2. Go to /admin route
3. Or it will show "Access Denied" if not logged in

**Q: What KPIs are shown?**  
A: The Overview tab displays:
- Total Revenue (₹4,85,230)
- Total Orders (1,264)
- Total Products (12)
- Active Customers (3,521)
- Conversion Rate (3.2%)
- Average Order Value (₹384)

**Q: Can I manage products from admin?**  
A: Product management UI is ready in Phase 1. Full functionality coming in Phase 2.

**Q: Where are customer details?**  
A: Customers tab is ready in the UI. Customer management coming in Phase 2.

---

## 🐛 Troubleshooting

### Search Not Working

**Problem**: Search results are not showing
**Solution**:
1. Clear your browser cache
2. Try typing a different product name (exact match)
3. Check if filters are too restrictive
4. Try resetting filters

**Problem**: Search is slow
**Solution**:
- This is normal - search has 300ms debounce to optimize performance
- Wait a moment after typing for results to update

---

### Cart Issues

**Problem**: Items disappear from cart after refresh
**Solution**:
1. Check if localStorage is enabled in your browser
2. Check if you're in private/incognito mode (data won't persist)
3. Try adding items again

**Problem**: Quantity not updating
**Solution**:
1. Refresh the page
2. Try clearing browser cache
3. Try a different browser

**Problem**: Cart total is incorrect
**Solution**:
1. Tax is automatically calculated at 18% (GST)
2. Shipping is free on orders over ₹1000
3. Check if discounts are applied

---

### Wishlist Issues

**Problem**: Heart icon not turning red when clicked
**Solution**:
1. Try refreshing the page
2. Check browser console for errors (F12)
3. Try a different browser

**Problem**: Wishlist items disappear
**Solution**:
1. Wishlist uses localStorage (limited space)
2. Clear browser cache might remove wishlist
3. Try adding items again

---

### Authentication Issues

**Problem**: Login page shows "Login failed"
**Solution**:
1. Check email is correct
2. Check password is correct (case-sensitive)
3. Try registering a new account
4. Clear browser cache and try again

**Problem**: "Remember me" not working
**Solution**:
1. Check if cookies are enabled
2. Try clearing browser cache
3. Email might not be saving properly

**Problem**: Can't register account
**Solution**:
1. Check all required fields are filled
2. Password must be 8+ characters
3. Check email format is valid (user@example.com)
4. Phone number format should be +91 XXXXXXXXXX

---

### Mobile Issues

**Problem**: Hamburger menu not opening
**Solution**:
1. Try clicking directly on the ☰ icon
2. Try a different tap position
3. Refresh the page

**Problem**: Text is too small on mobile
**Solution**:
1. This is intentional for mobile optimization
2. Pinch to zoom if needed
3. Check browser zoom level (should be 100%)

**Problem**: Buttons are hard to click
**Solution**:
1. All buttons are 40x40px minimum (easy to tap)
2. Try using landscape mode
3. Check if browser zoom is too low

---

### Performance Issues

**Problem**: Page is loading slowly
**Solution**:
1. Images use lazy loading
2. Check internet connection speed
3. Try clearing browser cache
4. Try a different browser
5. Close other browser tabs

**Problem**: Search is laggy
**Solution**:
1. Search has intentional 300ms debounce
2. Close other browser tabs
3. Try refreshing the page

---

### Browser Compatibility

**Problem**: App looks broken on Safari
**Solution**:
1. Make sure you have the latest Safari version
2. Try Chrome or Firefox as alternative
3. Clear Safari cache (Settings > Privacy)

**Problem**: Fonts look different
**Solution**:
1. This is normal - different browsers render fonts differently
2. All browsers are supported and styled properly
3. Try disabling browser extensions

---

## 🔧 Developer Tips

### Clear LocalStorage
To clear all saved data (cart, wishlist):
```javascript
// Open browser console (F12)
localStorage.clear();
location.reload();
```

### Check Console Errors
Press F12 → Console tab to see any errors

### Test Different Breakpoints
1. Press F12 (DevTools)
2. Click device icon (top-left of DevTools)
3. Select different device sizes

### Test Performance
1. Open DevTools (F12)
2. Go to "Performance" tab
3. Record page interactions
4. Check for slow operations

---

## 📋 Checklist for Users

### Before Reporting a Bug
- [ ] Have you refreshed the page? (F5 or Ctrl+Shift+R)
- [ ] Have you cleared your browser cache?
- [ ] Have you tried a different browser?
- [ ] Have you checked browser console for errors? (F12)
- [ ] Are you using a supported browser?
- [ ] Is JavaScript enabled in your browser?
- [ ] Are cookies/localStorage enabled?

### Information to Include When Reporting
- What were you trying to do?
- What happened instead?
- What browser are you using?
- What device? (mobile/tablet/desktop)
- Screenshot of the error
- Error message from console (F12)

---

## 🆘 Getting Help

### Quick Support
1. Check this FAQ first
2. Refresh your browser (Ctrl+Shift+R)
3. Clear browser cache
4. Try a different browser
5. Check if JavaScript is enabled

### For Developers
1. Check component files for inline comments
2. Review helper functions in `utils/helpers.js`
3. Check Context providers in `context/AppContext.jsx`
4. Review configuration in `config/config.js`

### Contact
- Email: support@dhanjo.com
- Documentation: Read PHASE_1_FEATURES.md
- Quick Start: Read QUICK_START.md

---

## 📞 Support Matrix

| Issue | Severity | Status | Timeline |
|-------|----------|--------|----------|
| Search not working | High | Phase 2 | Week 5-6 |
| Checkout missing | High | Phase 2 | Week 7-8 |
| Payment integration | High | Phase 2 | Week 7-8 |
| Email notifications | Medium | Phase 2 | Week 11-12 |
| Inventory alerts | Medium | Phase 2 | Week 9-10 |
| Multi-language | Low | Phase 2 | Week 11-12 |

---

## ✅ Phase 1 Known Limitations

1. **No Backend**: Using mock data (localStorage only)
2. **No Payments**: Checkout UI ready, payment coming Phase 2
3. **No Emails**: Email notifications coming Phase 2
4. **No Inventory**: Mock inventory only
5. **No Real Orders**: Order system UI ready, Phase 2
6. **Limited Analytics**: KPI display ready, Phase 2
7. **No Admin Features**: Product/Customer management coming Phase 2
8. **Social Login**: UI only, coming Phase 2

---

## 🎯 FAQ Summary

| Category | Questions | Answers |
|----------|-----------|---------|
| Shopping | 8 | ✅ Complete |
| Accounts | 8 | ✅ Complete |
| Payments | 3 | ⏳ Phase 2 |
| Mobile | 3 | ✅ Complete |
| Admin | 4 | ⏳ Phase 2 |
| Troubleshooting | 12 | ✅ Complete |

---

**Last Updated**: January 2024  
**Phase**: 1 (Complete)  
**Status**: Ready for Testing
