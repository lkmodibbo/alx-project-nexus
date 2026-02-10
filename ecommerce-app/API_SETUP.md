# E-commerce App Setup Guide

## API Configuration

### Environment Variables

Create a `.env` file in the `ecommerce-app` directory with the following:

```
REACT_APP_API_BASE_URL=http://localhost:8000
```

Make sure your backend API is running on `http://localhost:8000` or adjust the URL accordingly.

## Complete Checkout & Payment Flow

### 1. **Add to Cart** (Home Page)
- Users can add products to their cart from the home page
- Cart items are persisted in localStorage
- Cart count badge appears in the header

### 2. **View Cart** (Cart Page)
- Users can view all items in their cart
- They can remove items from the cart
- A "Checkout" button appears in the header when cart has items

### 3. **Checkout Process** (Checkout Page)
- User clicks "Checkout" button
- If not authenticated, user is redirected to login page
- User logs in or creates an account
- After authentication, user returns to checkout
- User can adjust quantities for each product
- Order summary shows total amount
- User clicks "Proceed to Payment"

### 4. **Create Order & Prepare Payment** 
The system automatically:
- Creates an order via `POST /api/orders/`
- Adds each cart item to the order via `POST /api/orders/{id}/add_item/{pid}/`
- Creates a payment record via `POST /api/payments/`
- Redirects to Payment page with `orderId` and `paymentId` as query params

### 5. **Payment Gateway** (Payment Page)
- User enters card details:
  - Cardholder Name
  - Card Number (16 digits)
  - Expiry Date (MM/YY)
  - CVC (3 digits)
- System simulates payment processing
- Updates payment status: `pending` → `processing` → `completed`
- Calls `POST /api/orders/{id}/confirm-payment/` to confirm
- Redirects to Payment Success page

### 6. **Payment Success** (Payment Success Page)
- Shows success message with Order ID
- Provides options to continue shopping or view cart
- Cart is cleared for next purchase

## API Endpoints Used

### Authentication
- `POST /auth/token/` - Login (get access token)
- `POST /register/` - User registration

### Orders
- `POST /api/orders/` - Create new order
- `POST /api/orders/{id}/add_item/{pid}/` - Add product to order
- `POST /api/orders/{id}/confirm-payment/` - Confirm payment
- `GET /api/orders/{id}/` - Get order details

### Payments
- `POST /api/payments/` - Create payment record
- `PUT /api/payments/{id}/` - Update payment (status, transaction ID)
- `GET /api/payments/{id}/` - Get payment details

### Users
- `GET /api/users/{id}/profile/` - Get user profile

## Key Features

✅ **Authentication**
- Users must login before checkout
- Auth tokens stored in localStorage
- Automatic redirect to login if not authenticated

✅ **Cart Management**
- Persistent cart (localStorage)
- Add/remove items
- Quantity adjustment at checkout

✅ **Order Processing**
- Automatic order creation from cart
- Cart cleared after successful payment
- Order ID displayed for reference

✅ **Payment Integration**
- Simulated payment gateway (can be replaced with Stripe/PayPal)
- Payment status tracking
- Transaction ID generation

✅ **User Experience**
- Loading states during API calls
- Error handling with user-friendly messages
- Responsive design
- Proper authentication flow

## Testing the Flow

1. **Start Backend**: Make sure your Django/API server is running on port 8000
2. **Create Test User**: Register a new account at `/auth`
3. **Add Products**: Add products to cart from home page
4. **Checkout**: Click checkout button and complete the flow
5. **Verify**: Check your backend database for created orders and payments

## Customization

### Change API Base URL
Update the `REACT_APP_API_BASE_URL` in `.env` file

### Integrate Real Payment Gateway
Replace the payment simulation in [Payment.tsx](src/pages/Payment.tsx) with actual Stripe/PayPal integration

### Update Cart Persistence
Modify [CartContext.tsx](src/context/CartContext.tsx) to use your preferred storage method

## Troubleshooting

**"Invalid username or password" error**
- Make sure user account exists in backend
- Check API is running

**"Failed to create order" error**
- Verify authentication token is valid
- Check backend order creation endpoint

**Cart not persisting**
- Check browser localStorage is enabled
- Clear browser cache and try again

**Redirect loops**
- Clear localStorage and app state
- Check authentication context setup
