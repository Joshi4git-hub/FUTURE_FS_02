import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/AppContext';
import { useUser } from '../context/AppContext';
import { useNotification } from '../context/AppContext';
import { validators } from '../utils/helpers';
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, clearCart } = useCart();
    const { user } = useUser();
    const { showNotification } = useNotification();

    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Shipping Form State
    const [shipping, setShipping] = useState({
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ')[1] || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'India'
    });

    // Payment Form State
    const [payment, setPayment] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        saveCard: false
    });

    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    // Redirect if cart is empty
    if (cart.length === 0) {
        return (
            <div className="checkout-section">
                <div className="empty-cart-message">
                    <h2>Your cart is empty</h2>
                    <p>Please add items before checkout</p>
                    <button className="btn btn-primary" onClick={() => navigate('/products')}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    // Validate Shipping Form
    const validateShipping = () => {
        const newErrors = {};

        if (!shipping.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!shipping.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!shipping.email.trim()) newErrors.email = 'Email is required';
        else if (!validators.email(shipping.email)) newErrors.email = 'Invalid email';
        if (!shipping.phone.trim()) newErrors.phone = 'Phone is required';
        if (!shipping.address.trim()) newErrors.address = 'Address is required';
        if (!shipping.city.trim()) newErrors.city = 'City is required';
        if (!shipping.state.trim()) newErrors.state = 'State is required';
        if (!shipping.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Validate Payment Form
    const validatePayment = () => {
        const newErrors = {};

        if (!payment.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
        else if (payment.cardNumber.replace(/\s/g, '').length !== 16) {
            newErrors.cardNumber = 'Card number must be 16 digits';
        }
        if (!payment.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
        if (!payment.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
        if (!payment.cvv.trim()) newErrors.cvv = 'CVV is required';
        else if (payment.cvv.length !== 3) newErrors.cvv = 'CVV must be 3 digits';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShipping(prev => ({ ...prev, [name]: value }));
    };

    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setPayment(prev => ({ ...prev, [name]: value }));
    };

    const handleFormatCardNumber = (e) => {
        const value = e.target.value.replace(/\s/g, '').slice(0, 16);
        const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
        setPayment(prev => ({ ...prev, cardNumber: formatted }));
    };

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        if (validateShipping()) {
            setStep(2);
            setErrors({});
        }
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        if (validatePayment()) {
            setLoading(true);
            setErrors({});

            // Simulate payment processing
            setTimeout(() => {
                showNotification('Order placed successfully!', 'success');
                clearCart();
                setStep(3);
                setLoading(false);

                // Redirect to home after 2 seconds
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }, 1500);
        }
    };

    return (
        <div className="checkout-section">
            <div className="checkout-container">
                {/* Progress Steps */}
                <div className="checkout-progress">
                    <div className={`step ${step >= 1 ? 'active' : ''}`}>
                        <span className="step-number">1</span>
                        <span className="step-label">Shipping</span>
                    </div>
                    <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
                    <div className={`step ${step >= 2 ? 'active' : ''}`}>
                        <span className="step-number">2</span>
                        <span className="step-label">Payment</span>
                    </div>
                    <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
                    <div className={`step ${step >= 3 ? 'active' : ''}`}>
                        <span className="step-number">3</span>
                        <span className="step-label">Confirmation</span>
                    </div>
                </div>

                <div className="checkout-content">
                    {/* Shipping Form */}
                    {step === 1 && (
                        <form onSubmit={handleShippingSubmit} className="checkout-form">
                            <h2>Shipping Address</h2>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>First Name *</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={shipping.firstName}
                                        onChange={handleShippingChange}
                                        className={errors.firstName ? 'error' : ''}
                                    />
                                    {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
                                </div>
                                <div className="form-group">
                                    <label>Last Name *</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={shipping.lastName}
                                        onChange={handleShippingChange}
                                        className={errors.lastName ? 'error' : ''}
                                    />
                                    {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={shipping.email}
                                        onChange={handleShippingChange}
                                        className={errors.email ? 'error' : ''}
                                    />
                                    {errors.email && <span className="error-msg">{errors.email}</span>}
                                </div>
                                <div className="form-group">
                                    <label>Phone *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={shipping.phone}
                                        onChange={handleShippingChange}
                                        className={errors.phone ? 'error' : ''}
                                    />
                                    {errors.phone && <span className="error-msg">{errors.phone}</span>}
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label>Address *</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={shipping.address}
                                    onChange={handleShippingChange}
                                    placeholder="Street address"
                                    className={errors.address ? 'error' : ''}
                                />
                                {errors.address && <span className="error-msg">{errors.address}</span>}
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={shipping.city}
                                        onChange={handleShippingChange}
                                        className={errors.city ? 'error' : ''}
                                    />
                                    {errors.city && <span className="error-msg">{errors.city}</span>}
                                </div>
                                <div className="form-group">
                                    <label>State *</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={shipping.state}
                                        onChange={handleShippingChange}
                                        className={errors.state ? 'error' : ''}
                                    />
                                    {errors.state && <span className="error-msg">{errors.state}</span>}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>ZIP Code *</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={shipping.zipCode}
                                        onChange={handleShippingChange}
                                        className={errors.zipCode ? 'error' : ''}
                                    />
                                    {errors.zipCode && <span className="error-msg">{errors.zipCode}</span>}
                                </div>
                                <div className="form-group">
                                    <label>Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={shipping.country}
                                        disabled
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary btn-large">
                                Continue to Payment
                            </button>
                        </form>
                    )}

                    {/* Payment Form */}
                    {step === 2 && (
                        <form onSubmit={handlePaymentSubmit} className="checkout-form">
                            <h2>Payment Information</h2>

                            <div className="form-group full-width">
                                <label>Cardholder Name *</label>
                                <input
                                    type="text"
                                    name="cardName"
                                    value={payment.cardName}
                                    onChange={handlePaymentChange}
                                    placeholder="Name on card"
                                    className={errors.cardName ? 'error' : ''}
                                />
                                {errors.cardName && <span className="error-msg">{errors.cardName}</span>}
                            </div>

                            <div className="form-group full-width">
                                <label>Card Number *</label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={payment.cardNumber}
                                    onChange={handleFormatCardNumber}
                                    placeholder="1234 5678 9012 3456"
                                    maxLength="19"
                                    className={errors.cardNumber ? 'error' : ''}
                                />
                                {errors.cardNumber && <span className="error-msg">{errors.cardNumber}</span>}
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Expiry Date (MM/YY) *</label>
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        value={payment.expiryDate}
                                        onChange={handlePaymentChange}
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        className={errors.expiryDate ? 'error' : ''}
                                    />
                                    {errors.expiryDate && <span className="error-msg">{errors.expiryDate}</span>}
                                </div>
                                <div className="form-group">
                                    <label>CVV *</label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        value={payment.cvv}
                                        onChange={handlePaymentChange}
                                        placeholder="123"
                                        maxLength="3"
                                        className={errors.cvv ? 'error' : ''}
                                    />
                                    {errors.cvv && <span className="error-msg">{errors.cvv}</span>}
                                </div>
                            </div>

                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={payment.saveCard}
                                    onChange={(e) => setPayment(prev => ({ ...prev, saveCard: e.target.checked }))}
                                />
                                Save card for future purchases
                            </label>

                            <div className="checkout-buttons">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setStep(1)}
                                    disabled={loading}
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-large"
                                    disabled={loading}
                                >
                                    {loading ? 'Processing...' : 'Complete Order'}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Confirmation */}
                    {step === 3 && (
                        <div className="checkout-confirmation">
                            <div className="confirmation-icon">✓</div>
                            <h2>Order Confirmed!</h2>
                            <p>Your order has been placed successfully.</p>
                            <div className="order-details">
                                <p><strong>Items:</strong> {itemCount}</p>
                                <p><strong>Total:</strong> ₹{total.toLocaleString()}</p>
                                <p><strong>Shipping to:</strong> {shipping.city}, {shipping.state}</p>
                            </div>
                            <p className="confirmation-message">
                                You will receive an order confirmation email shortly at {shipping.email}
                            </p>
                            <button className="btn btn-primary" onClick={() => navigate('/')}>
                                Continue Shopping
                            </button>
                        </div>
                    )}
                </div>

                {/* Order Summary Sidebar */}
                <div className="checkout-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-items">
                        {cart.map((item, index) => (
                            <div key={index} className="summary-item">
                                <div>
                                    <p className="item-name">{item.name}</p>
                                    <p className="item-qty">Qty: {item.quantity || 1}</p>
                                </div>
                                <p className="item-price">₹{(item.price * (item.quantity || 1)).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-total">
                        <div className="total-row">
                            <span>Subtotal</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                        <div className="total-row">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="total-row">
                            <span>Tax</span>
                            <span>₹0</span>
                        </div>
                        <div className="total-row final">
                            <span>Total</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
