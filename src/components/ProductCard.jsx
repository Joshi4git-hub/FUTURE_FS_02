import { Link } from "react-router-dom";
import { useWishlist, useCart } from "../context/AppContext";
import { useNotification } from "../context/AppContext";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
  const inWishlist = isInWishlist(product.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    showNotification(`${product.name} added to cart!`, "success");
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} />
        <button 
          className={`wishlist-heart ${inWishlist ? 'active' : ''}`}
          onClick={handleWishlist}
          title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          ♡
        </button>
        {product.discount && (
          <div className="discount-badge">
            -{product.discount}%
          </div>
        )}
      </div>
      <h3>{product.name}</h3>
      <div className="product-rating">
        <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
        <span className="rating-count">({product.reviewCount})</span>
      </div>
      <p className="product-price">₹{product.price.toLocaleString()}</p>
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        🛒 Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
