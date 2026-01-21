import React, { useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import products from '../data/products';
import { useCart } from '../context/AppContext';
import { useWishlist } from '../context/AppContext';
import { formatPrice } from '../utils/helpers';
import './Product.css';

const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, inWishlist } = useWishlist();
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('details');
    
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <div className="product-not-found">
                <h2>Product Not Found</h2>
                <p>Sorry, the product you're looking for doesn't exist.</p>
                <Link to="/products" className="btn-back">Back to Products</Link>
            </div>
        );
    }

    const isInWishlist = inWishlist(product.id);

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
        alert(`Added ${quantity} item(s) to cart!`);
    };

    const handleWishlist = () => {
        if (isInWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    // Get related products (same category, exclude current)
    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const reviews = [
        {
            id: 1,
            author: "Rajesh Kumar",
            rating: 5,
            date: "2024-01-15",
            title: "Excellent Quality!",
            text: "Very satisfied with this purchase. Great quality and fast delivery."
        },
        {
            id: 2,
            author: "Priya Sharma",
            rating: 4,
            date: "2024-01-10",
            title: "Good Value for Money",
            text: "Good product but delivery took longer than expected."
        },
        {
            id: 3,
            author: "Amit Patel",
            rating: 5,
            date: "2024-01-05",
            title: "Worth Every Penny",
            text: "Amazing product. Highly recommend to all friends and family."
        }
    ];

    const renderStars = (rating) => {
        return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    return (
        <div className="product-page">
            {/* Breadcrumb */}
            <div className="breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <Link to="/products">Products</Link>
                <span>/</span>
                <span>{product.category}</span>
            </div>

            {/* Product Details Section */}
            <div className="product-details-section">
                <div className="product-image-container">
                    <img src={product.image} alt={product.name} className="product-image-large" />
                    <div className="discount-label">-20%</div>
                </div>

                <div className="product-info-container">
                    <h1>{product.name}</h1>
                    
                    {/* Rating */}
                    <div className="product-rating-section">
                        <div className="stars-display">{renderStars(product.rating)}</div>
                        <span className="rating-value">{product.rating}.0</span>
                        <span className="review-count">({product.reviewCount} reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="price-section">
                        <div className="original-price">₹{product.price}</div>
                        <div className="sale-price">₹{Math.floor(product.price * 0.8)}</div>
                        <div className="discount-percent">Save 20%</div>
                    </div>

                    {/* Category & Availability */}
                    <div className="product-meta">
                        <p><strong>Category:</strong> {product.category}</p>
                        <p><strong>Availability:</strong> <span className="in-stock">In Stock</span></p>
                        <p><strong>SKU:</strong> {`PROD${product.id.toString().padStart(5, '0')}`}</p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="quantity-section">
                        <label>Quantity:</label>
                        <div className="quantity-selector">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                            <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} min="1" max="10" />
                            <button onClick={() => setQuantity(Math.min(10, quantity + 1))}>+</button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <button className="btn-add-to-cart" onClick={handleAddToCart}>
                            🛒 Add to Cart
                        </button>
                        <button 
                            className={`btn-wishlist ${isInWishlist ? 'active' : ''}`}
                            onClick={handleWishlist}
                        >
                            {isInWishlist ? '❤️' : '🤍'} {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                        </button>
                    </div>

                    {/* Shipping Info */}
                    <div className="shipping-info">
                        <div className="info-item">
                            <span className="icon">🚚</span>
                            <div>
                                <strong>Free Shipping</strong>
                                <p>On orders above ₹1000</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <span className="icon">🔄</span>
                            <div>
                                <strong>Easy Returns</strong>
                                <p>30-day return policy</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <span className="icon">🛡️</span>
                            <div>
                                <strong>Secure Checkout</strong>
                                <p>SSL encrypted payment</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="tabs-section">
                <div className="tabs-header">
                    <button 
                        className={`tab ${activeTab === 'details' ? 'active' : ''}`}
                        onClick={() => setActiveTab('details')}
                    >
                        Details
                    </button>
                    <button 
                        className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
                        onClick={() => setActiveTab('reviews')}
                    >
                        Reviews ({reviews.length})
                    </button>
                    <button 
                        className={`tab ${activeTab === 'shipping' ? 'active' : ''}`}
                        onClick={() => setActiveTab('shipping')}
                    >
                        Shipping & Returns
                    </button>
                </div>

                {/* Details Tab */}
                {activeTab === 'details' && (
                    <div className="tab-content">
                        <h3>Product Details</h3>
                        <p>This is a premium {product.name} product crafted with excellent quality and attention to detail. Perfect for everyday use with superior performance and durability.</p>
                        <ul className="features-list">
                            <li>✓ Premium Quality Materials</li>
                            <li>✓ Ergonomic Design</li>
                            <li>✓ Durable Construction</li>
                            <li>✓ Warranty Included</li>
                            <li>✓ Eco-friendly Packaging</li>
                        </ul>
                    </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                    <div className="tab-content">
                        <div className="reviews-container">
                            {reviews.map(review => (
                                <div key={review.id} className="review-item">
                                    <div className="review-header">
                                        <strong>{review.author}</strong>
                                        <span className="review-date">{review.date}</span>
                                    </div>
                                    <div className="review-rating">
                                        {renderStars(review.rating)}
                                    </div>
                                    <h4 className="review-title">{review.title}</h4>
                                    <p className="review-text">{review.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Shipping Tab */}
                {activeTab === 'shipping' && (
                    <div className="tab-content">
                        <h3>Shipping Information</h3>
                        <p><strong>Standard Shipping:</strong> 5-7 business days</p>
                        <p><strong>Express Shipping:</strong> 2-3 business days (Extra ₹100)</p>
                        <h3 style={{ marginTop: '20px' }}>Return Policy</h3>
                        <p>We offer 30-day returns on all products. Items must be unused and in original packaging. Contact support for return authorization.</p>
                    </div>
                )}
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="related-products-section">
                    <h2>You Might Also Like</h2>
                    <div className="related-products-grid">
                        {relatedProducts.map(relProduct => (
                            <Link key={relProduct.id} to={`/product/${relProduct.id}`} className="related-product-card">
                                <img src={relProduct.image} alt={relProduct.name} />
                                <h4>{relProduct.name}</h4>
                                <p className="price">₹{relProduct.price}</p>
                                <div className="rating">⭐ {relProduct.rating} ({relProduct.reviewCount})</div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;
