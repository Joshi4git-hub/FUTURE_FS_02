import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/AppContext';
import './Cart.css';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity } = useCart();
    
    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    if (cart.length === 0) {
        return (
            <div className="cart-section">
                <h1>Your Cart</h1>
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                    <Link to="/products">
                        <button className="btn btn-primary">Continue Shopping</button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-section">
            <h1>Shopping Cart ({itemCount} items)</h1>
            <div className="cart-items">
                {cart.map((item, index) => (
                    <div className="cart-item" key={index}>
                        <img src={item.image} alt={item.name} />
                        <div className="item-details">
                            <h3>{item.name}</h3>
                            <p className="price">₹{item.price}</p>
                            <div className="quantity-control">
                                <button onClick={() => updateQuantity(index, (item.quantity || 1) - 1)}>−</button>
                                <span>{item.quantity || 1}</span>
                                <button onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}>+</button>
                            </div>
                        </div>
                        <div className="item-total">
                            <p>₹{(item.price * (item.quantity || 1)).toLocaleString()}</p>
                            <button className="remove-btn" onClick={() => removeFromCart(index)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-summary">
                <h2>Total: ₹{total.toLocaleString()}</h2>
                <button className="btn btn-primary" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
            </div>
        </div>
    );
};

export default Cart;
