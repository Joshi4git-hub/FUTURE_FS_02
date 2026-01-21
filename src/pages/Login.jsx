import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/AppContext';
import { validators } from '../utils/helpers';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const { login } = useUser();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validators.email(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            try {
                // Mock user data
                const userData = {
                    id: Math.random().toString(36).substr(2, 9),
                    email,
                    name: email.split('@')[0],
                    loyaltyPoints: 0,
                    tier: 'Silver',
                    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
                };

                login(userData);

                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }

                navigate('/');
            } catch (error) {
                setErrors({ form: 'Login failed. Please try again.' });
            } finally {
                setLoading(false);
            }
        }, 800);
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <div className="auth-box">
                    <h1>Welcome Back</h1>
                    <p className="auth-subtitle">Login to your Dhanjo account</p>

                    {errors.form && <div className="error-banner">{errors.form}</div>}

                    <form onSubmit={handleSubmit} className="auth-form">
                        {/* Email Field */}
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errors.email) setErrors({ ...errors, email: '' });
                                }}
                                className={errors.email ? 'input-error' : ''}
                                placeholder="you@example.com"
                            />
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>

                        {/* Password Field */}
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (errors.password) setErrors({ ...errors, password: '' });
                                }}
                                className={errors.password ? 'input-error' : ''}
                                placeholder="••••••••"
                            />
                            {errors.password && <span className="error-text">{errors.password}</span>}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="form-footer">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span>Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn-primary-full"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="divider">OR</div>

                    {/* Social Login */}
                    <div className="social-login">
                        <button className="social-btn google">
                            <span>🔵</span> Google
                        </button>
                        <button className="social-btn facebook">
                            <span>👤</span> Facebook
                        </button>
                    </div>

                    {/* Signup Link */}
                    <p className="auth-footer">
                        Don't have an account? <Link to="/register">Sign up here</Link>
                    </p>
                </div>

                {/* Illustration Side */}
                <div className="auth-illustration">
                    <div className="illustration-content">
                        <div className="illustration-icon">🔐</div>
                        <h2>Secure Login</h2>
                        <p>Your account is protected with industry-standard encryption</p>
                        <ul className="features-list">
                            <li>✓ Secure SSL Connection</li>
                            <li>✓ Two-Factor Authentication</li>
                            <li>✓ Account Protection</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
