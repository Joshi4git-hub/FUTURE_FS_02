import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/AppContext';
import { useCart } from '../context/AppContext';
import './Wishlist.css';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="empty-wishlist">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <h2>Your Wishlist is Empty</h2>
          <p>Start adding products to save them for later</p>
          <Link to="/products">
            <button className="btn btn-primary">Browse Products</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>❤️ My Wishlist ({wishlist.length})</h1>
      </div>

      <div className="wishlist-grid">
        {wishlist.map(product => (
          <div key={product.id} className="wishlist-card">
            <div className="wishlist-image">
              <img src={product.image} alt={product.name} />
              <button
                className="remove-wishlist-btn"
                onClick={() => removeFromWishlist(product.id)}
                title="Remove from wishlist"
              >
                ✕
              </button>
            </div>
            <div className="wishlist-info">
              <h3>{product.name}</h3>
              <div className="wishlist-rating">
                <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
                <span className="review-count">({product.reviewCount})</span>
              </div>
              <div className="wishlist-price">
                <span className="price">₹{product.price.toLocaleString()}</span>
              </div>
              <div className="wishlist-category">
                <span className="category-badge">{product.category}</span>
              </div>
              <div className="wishlist-actions">
                <Link to={`/product/${product.id}`}>
                  <button className="view-btn">View Details</button>
                </Link>
                <button 
                  className="move-to-cart-btn"
                  onClick={() => handleMoveToCart(product)}
                >
                  🛒 Move to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
