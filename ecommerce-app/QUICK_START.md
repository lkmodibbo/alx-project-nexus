# Quick Start - Checkout & Payment Implementation

## Setup Steps

### 1. Create `.env` file
```bash
# ecommerce-app/.env
REACT_APP_API_BASE_URL=http://localhost:8000
```

### 2. Ensure Your Backend API is Running
```bash
# Backend should be running on port 8000
# Make sure these endpoints are available:
# POST /auth/token/
# POST /register/
# POST /api/orders/
# POST /api/payments/
# etc.
```

### 3. Install Dependencies (if needed)
```bash
cd ecommerce-app
npm install
```

### 4. Start the App
```bash
npm start
```

## Testing the Complete Flow

### Scenario 1: New User
1. Go to home page
2. Add products to cart
3. Click "Checkout" in header
4. Click "Sign up" to create account
5. Fill registration form
6. Redirected back to checkout
7. Review order and proceed
8. Enter payment details
9. See success page

### Scenario 2: Existing User
1. Go to home page
2. Add products to cart
3. Click "Checkout" in header
4. Login with credentials
5. Redirected back to checkout
6. Review order and proceed
7. Enter payment details
8. See success page

## Key Files & Their Purposes

```
src/
├── context/
│   ├── AuthContext.tsx          # Authentication state management
│   └── CartContext.tsx          # Shopping cart state management
├── services/
│   ├── authService.ts           # API calls for authentication
│   ├── orderService.ts          # API calls for orders
│   └── paymentService.ts        # API calls for payments
├── pages/
│   ├── Checkout.tsx             # Checkout page with order creation
│   ├── Payment.tsx              # Payment form & processing
│   ├── PaymentSuccess.tsx       # Order confirmation page
│   └── Login.tsx                # Login with API integration
├── layout/
│   └── Header.tsx               # Navigation & auth display
└── App.tsx                       # Routes & providers

Configuration:
├── .env                         # API base URL
├── API_SETUP.md                 # Detailed API setup guide
└── IMPLEMENTATION_SUMMARY.md    # Implementation details
```

## API Workflow

### 1. User adds items and clicks checkout
- Cart stored in localStorage
- Persists across sessions

### 2. Authentication check
- If not logged in → Redirect to /auth
- After login → Redirect back to /checkout

### 3. Create order
```
POST /api/orders/
{
  "total_amount": 150.00,
  "status": "pending"
}
```

### 4. Add items to order
```
POST /api/orders/{order_id}/add_item/{product_id}/
{
  "quantity": 2,
  "price": 75.00
}
```

### 5. Create payment
```
POST /api/payments/
{
  "order_id": 1,
  "amount": 150.00,
  "status": "pending",
  "payment_method": "card"
}
```

### 6. Process payment & confirm
```
PUT /api/payments/{payment_id}/
{
  "status": "completed",
  "transaction_id": "TXN-1234567890"
}

POST /api/orders/{order_id}/confirm-payment/
{
  "payment_id": 1
}
```

### 7. Success
- Cart cleared
- Display order confirmation
- User can continue shopping

## Common Issues & Solutions

**Issue: "API is unreachable"**
- Check `.env` has correct `REACT_APP_API_BASE_URL`
- Verify backend is running
- Check CORS settings on backend

**Issue: "Login failed"**
- Verify user exists in backend
- Check credentials are correct
- Look for API error messages

**Issue: "Order creation failed"**
- Ensure user is authenticated (token valid)
- Check cart items have required fields
- Verify total amount is correct

**Issue: "Cart not persisting"**
- Clear browser cache
- Check localStorage is enabled
- Verify CartProvider wraps the app

**Issue: "Payment page not loading"**
- Check orderId and paymentId in URL
- Verify payment was created successfully
- Check API response format

## Customization Notes

### To customize the payment form:
Edit `src/pages/Payment.tsx` - replace simulated payment with:
- Stripe integration
- PayPal integration
- Other payment processors

### To add more validations:
- Add field validation to payment form
- Add order validation
- Add inventory checks

### To change redirect behavior:
- Modify `handleProceed()` in Checkout
- Modify success redirect in Payment
- Adjust navigation routes

## Performance Tips

1. **Lazy load payment page** - Only loaded when needed
2. **Cache user data** - Stored in localStorage
3. **Debounce quantity changes** - In checkout form
4. **Optimize images** - Product images in cart

## Security Notes

⚠️ **Important:** 
- Never expose API keys in frontend code
- Use HTTPS in production
- Validate all user inputs
- Store tokens securely (current: localStorage - consider sessionStorage)
- Implement CORS properly
- Add rate limiting on backend

## Next Steps

1. ✅ Setup is complete
2. Test the complete flow
3. Fix any API integration issues
4. Customize payment gateway
5. Add additional features as needed
6. Deploy to production

## Support & Documentation

- See `API_SETUP.md` for detailed API configuration
- See `IMPLEMENTATION_SUMMARY.md` for technical details
- Check individual service files for API documentation
- Review component files for implementation details

---

**Happy Coding! 🎉**
