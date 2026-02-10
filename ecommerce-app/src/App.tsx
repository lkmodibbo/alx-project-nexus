import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "context/AuthContext";
import { CartProvider } from "context/CartContext";
import Layout from "layout/Layout";
import Home from "pages/Home";
import Cart from "pages/Cart";
import SearchResults from "pages/SearchResults";
import AuthPage from "pages/AuthPage";
import Checkout from "pages/Checkout";
import Payment from "pages/Payment";
import PaymentSuccess from "pages/PaymentSuccess";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/search" element={<SearchResults />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
