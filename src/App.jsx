import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { UserProvider, CartProvider, WishlistProvider, ProductProvider, NotificationProvider } from "./context/AppContext";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <Router>
      <NotificationProvider>
        <UserProvider>
          <CartProvider>
            <WishlistProvider>
              <ProductProvider>
                {/* ✅ Header ONLY here */}
                <Header />

                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/admin" element={<Admin />} />
                </Routes>

                {/* ✅ Footer ONLY here */}
                <Footer />
              </ProductProvider>
            </WishlistProvider>
          </CartProvider>
        </UserProvider>
      </NotificationProvider>
    </Router>
  );
};

export default App;
