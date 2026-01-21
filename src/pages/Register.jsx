import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/AppContext';
import { validators } from '../utils/helpers';
import './Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        agreeTerms: false
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const { login } = useUser();
    const navigate = useNavigate();

    const validatePassword = (pwd) => {
        let strength = 0;
        if (pwd.length >= 8) strength++;
        if (/[A-Z]/.test(pwd)) strength++;
        if (/[a-z]/.test(pwd)) strength++;
        if (/[0-9]/.test(pwd)) strength++;
        if (/[^A-Za-z0-9]/.test(pwd)) strength++;
        return strength;
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validators.email(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!validators.password(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (formData.phone && !validators.phone(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        if (!formData.agreeTerms) {
            newErrors.agreeTerms = 'You must agree to the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData({
            ...formData,
            [name]: newValue
        });

        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }

        if (name === 'password') {
            setPasswordStrength(validatePassword(value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            try {
                const userData = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    loyaltyPoints: 100, // Welcome bonus
                    tier: 'Silver',
                    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`
                };

                login(userData);
                navigate('/');
            } catch (error) {
                setErrors({ form: 'Registration failed. Please try again.' });
            } finally {
                setLoading(false);
            }
        }, 800);
    };

    const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const strengthColors = ['#d32f2f', '#ff9800', '#ffc107', '#8bc34a', '#4caf50'];

    return (
        <div className="auth-container">
            <div className="auth-wrapper register-wrapper">
                <div className="auth-box">
                    <h1>Create Account</h1>
                    <p className="auth-subtitle">Join Dhanjo and start shopping</p>

                    {errors.form && <div className="error-banner">{errors.form}</div>}

                    <form onSubmit={handleSubmit} className="auth-form">
                        {/* Full Name */}
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={errors.name ? 'input-error' : ''}
                                placeholder="John Doe"
                            />
                            {errors.name && <span className="error-text">{errors.name}</span>}
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? 'input-error' : ''}
                                placeholder="you@example.com"
                            />
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>

                        {/* Phone */}
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number (Optional)</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={errors.phone ? 'input-error' : ''}
                                placeholder="+91 9876543210"
                            />
                            {errors.phone && <span className="error-text">{errors.phone}</span>}
                        </div>

                        {/* Password */}
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={errors.password ? 'input-error' : ''}
                                placeholder="••••••••"
                            />
                            {formData.password && (
                                <div className="password-strength">
                                    <div className="strength-bar">
                                        <div
                                            className="strength-fill"
                                            style={{
                                                width: `${(passwordStrength / 5) * 100}%`,
                                                backgroundColor: strengthColors[passwordStrength - 1]
                                            }}
                                        />
                                    </div>
                                    <span style={{ color: strengthColors[passwordStrength - 1] }}>
                                        {strengthLabels[passwordStrength - 1] || 'Very Weak'}
                                    </span>
                                </div>
                            )}
                            {errors.password && <span className="error-text">{errors.password}</span>}
                        </div>

                        {/* Confirm Password */}
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={errors.confirmPassword ? 'input-error' : ''}
                                placeholder="••••••••"
                            />
                            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                        </div>

                        {/* Terms Agreement */}
                        <div className="form-group">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    name="agreeTerms"
                                    checked={formData.agreeTerms}
                                    onChange={handleChange}
                                />
                                <span>
                                    I agree to the <Link to="/terms">Terms and Conditions</Link> and <Link to="/privacy">Privacy Policy</Link>
                                </span>
                            </label>
                            {errors.agreeTerms && <span className="error-text">{errors.agreeTerms}</span>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn-primary-full"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="divider">OR</div>

                    {/* Social Signup */}
                    <div className="social-login">
                        <button className="social-btn google">
                            <span>🔵</span> Google
                        </button>
                        <button className="social-btn facebook">
                            <span>👤</span> Facebook
                        </button>
                    </div>

                    {/* Login Link */}
                    <p className="auth-footer">
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                </div>

                {/* Illustration Side */}
                <div className="auth-illustration">
                    <div className="illustration-content">
                        <div className="illustration-icon">🎉</div>
                        <h2>Join Our Community</h2>
                        <p>Get exclusive deals and rewards when you sign up</p>
                        <ul className="features-list">
                            <li>✓ 100 Welcome Points</li>
                            <li>✓ Exclusive Offers</li>
                            <li>✓ Fast Checkout</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
