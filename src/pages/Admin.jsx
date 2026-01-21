import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/AppContext';
import './Admin.css';

const AdminDashboard = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    // Mock data
    const stats = {
        totalRevenue: '₹4,85,230',
        totalOrders: 1264,
        totalProducts: 12,
        activeCustomers: 3521,
        conversionRate: '3.2%',
        avgOrderValue: '₹384',
        revenueGrowth: '+12.5%',
        orderGrowth: '+8.3%'
    };

    const recentOrders = [
        { id: 'ORD-001', customer: 'Rajesh Kumar', amount: '₹2,499', status: 'delivered', date: '2024-01-20' },
        { id: 'ORD-002', customer: 'Priya Sharma', amount: '₹5,999', status: 'processing', date: '2024-01-19' },
        { id: 'ORD-003', customer: 'Amit Patel', amount: '₹1,299', status: 'pending', date: '2024-01-18' },
        { id: 'ORD-004', customer: 'Neha Singh', amount: '₹8,999', status: 'delivered', date: '2024-01-17' },
        { id: 'ORD-005', customer: 'Vikram Gupta', amount: '₹3,499', status: 'shipped', date: '2024-01-16' },
    ];

    const topProducts = [
        { id: 1, name: 'Smartphone Pro', sales: 342, revenue: '₹51,30,000' },
        { id: 2, name: 'Wireless Earbuds', sales: 521, revenue: '₹9,89,900' },
        { id: 3, name: 'Smart Watch', sales: 218, revenue: '₹32,70,000' },
        { id: 4, name: 'Backpack', sales: 456, revenue: '₹4,56,000' },
        { id: 5, name: 'USB Hub', sales: 892, revenue: '₹8,92,000' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered':
                return '#4caf50';
            case 'shipped':
                return '#2196f3';
            case 'processing':
                return '#ff9800';
            case 'pending':
                return '#f44336';
            default:
                return '#999';
        }
    };

    if (!user) {
        return (
            <div className="admin-unauthorized">
                <h2>Access Denied</h2>
                <p>Please login to access the admin dashboard.</p>
                <Link to="/login" className="btn-login">Login</Link>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <div className="sidebar-header">
                    <h3>Admin Panel</h3>
                </div>
                <ul className="sidebar-menu">
                    <li className={activeTab === 'overview' ? 'active' : ''}>
                        <button onClick={() => setActiveTab('overview')}>
                            📊 Overview
                        </button>
                    </li>
                    <li className={activeTab === 'orders' ? 'active' : ''}>
                        <button onClick={() => setActiveTab('orders')}>
                            📦 Orders
                        </button>
                    </li>
                    <li className={activeTab === 'products' ? 'active' : ''}>
                        <button onClick={() => setActiveTab('products')}>
                            🛍️ Products
                        </button>
                    </li>
                    <li className={activeTab === 'customers' ? 'active' : ''}>
                        <button onClick={() => setActiveTab('customers')}>
                            👥 Customers
                        </button>
                    </li>
                    <li className={activeTab === 'analytics' ? 'active' : ''}>
                        <button onClick={() => setActiveTab('analytics')}>
                            📈 Analytics
                        </button>
                    </li>
                    <li className={activeTab === 'settings' ? 'active' : ''}>
                        <button onClick={() => setActiveTab('settings')}>
                            ⚙️ Settings
                        </button>
                    </li>
                </ul>
                <div className="sidebar-footer">
                    <Link to="/" className="back-link">← Back to Store</Link>
                </div>
            </div>

            <div className="admin-content">
                {/* Header */}
                <div className="admin-header">
                    <h1>Admin Dashboard</h1>
                    <div className="admin-user-info">
                        <span>Welcome, {user.name}!</span>
                        <img src={user.avatar} alt={user.name} className="admin-avatar" />
                    </div>
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="tab-content">
                        {/* KPI Cards */}
                        <div className="kpi-grid">
                            <div className="kpi-card">
                                <div className="kpi-icon">💰</div>
                                <div className="kpi-info">
                                    <p className="kpi-label">Total Revenue</p>
                                    <h3 className="kpi-value">{stats.totalRevenue}</h3>
                                    <span className={`kpi-change positive`}>↑ {stats.revenueGrowth}</span>
                                </div>
                            </div>

                            <div className="kpi-card">
                                <div className="kpi-icon">📦</div>
                                <div className="kpi-info">
                                    <p className="kpi-label">Total Orders</p>
                                    <h3 className="kpi-value">{stats.totalOrders}</h3>
                                    <span className={`kpi-change positive`}>↑ {stats.orderGrowth}</span>
                                </div>
                            </div>

                            <div className="kpi-card">
                                <div className="kpi-icon">🛍️</div>
                                <div className="kpi-info">
                                    <p className="kpi-label">Total Products</p>
                                    <h3 className="kpi-value">{stats.totalProducts}</h3>
                                    <span className="kpi-change">4 new this month</span>
                                </div>
                            </div>

                            <div className="kpi-card">
                                <div className="kpi-icon">👥</div>
                                <div className="kpi-info">
                                    <p className="kpi-label">Active Customers</p>
                                    <h3 className="kpi-value">{stats.activeCustomers}</h3>
                                    <span className="kpi-change">↑ 2.1%</span>
                                </div>
                            </div>

                            <div className="kpi-card">
                                <div className="kpi-icon">📊</div>
                                <div className="kpi-info">
                                    <p className="kpi-label">Conversion Rate</p>
                                    <h3 className="kpi-value">{stats.conversionRate}</h3>
                                    <span className="kpi-change">↑ 0.5%</span>
                                </div>
                            </div>

                            <div className="kpi-card">
                                <div className="kpi-icon">💵</div>
                                <div className="kpi-info">
                                    <p className="kpi-label">Avg Order Value</p>
                                    <h3 className="kpi-value">{stats.avgOrderValue}</h3>
                                    <span className="kpi-change">↑ 3.2%</span>
                                </div>
                            </div>
                        </div>

                        {/* Two Column Layout */}
                        <div className="admin-grid">
                            {/* Recent Orders */}
                            <div className="admin-card">
                                <div className="card-header">
                                    <h2>Recent Orders</h2>
                                    <Link to="#" className="view-all">View All →</Link>
                                </div>
                                <div className="table-container">
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Customer</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentOrders.map(order => (
                                                <tr key={order.id}>
                                                    <td className="order-id">{order.id}</td>
                                                    <td>{order.customer}</td>
                                                    <td className="amount">{order.amount}</td>
                                                    <td>
                                                        <span
                                                            className="status-badge"
                                                            style={{ backgroundColor: getStatusColor(order.status) }}
                                                        >
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td>{order.date}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Top Products */}
                            <div className="admin-card">
                                <div className="card-header">
                                    <h2>Top Products</h2>
                                    <Link to="#" className="view-all">View All →</Link>
                                </div>
                                <div className="products-list">
                                    {topProducts.map((product, index) => (
                                        <div key={product.id} className="product-row">
                                            <div className="product-rank">#{index + 1}</div>
                                            <div className="product-info">
                                                <p className="product-name">{product.name}</p>
                                                <span className="product-sales">{product.sales} sales</span>
                                            </div>
                                            <div className="product-revenue">{product.revenue}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                    <div className="tab-content">
                        <div className="admin-card">
                            <div className="card-header">
                                <h2>Orders Management</h2>
                                <input type="search" placeholder="Search orders..." className="search-input" />
                            </div>
                            <div className="table-container">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Customer</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentOrders.map(order => (
                                            <tr key={order.id}>
                                                <td className="order-id">{order.id}</td>
                                                <td>{order.customer}</td>
                                                <td className="amount">{order.amount}</td>
                                                <td>
                                                    <span
                                                        className="status-badge"
                                                        style={{ backgroundColor: getStatusColor(order.status) }}
                                                    >
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td>{order.date}</td>
                                                <td>
                                                    <button className="btn-small">View</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Products Tab */}
                {activeTab === 'products' && (
                    <div className="tab-content">
                        <div className="admin-card">
                            <div className="card-header">
                                <h2>Products Management</h2>
                                <button className="btn-primary-small">+ Add Product</button>
                            </div>
                            <p className="placeholder-text">Product management features will be implemented here.</p>
                        </div>
                    </div>
                )}

                {/* Customers Tab */}
                {activeTab === 'customers' && (
                    <div className="tab-content">
                        <div className="admin-card">
                            <div className="card-header">
                                <h2>Customers Management</h2>
                                <input type="search" placeholder="Search customers..." className="search-input" />
                            </div>
                            <p className="placeholder-text">Customer management features will be implemented here.</p>
                        </div>
                    </div>
                )}

                {/* Analytics Tab */}
                {activeTab === 'analytics' && (
                    <div className="tab-content">
                        <div className="admin-card">
                            <div className="card-header">
                                <h2>Analytics Dashboard</h2>
                            </div>
                            <p className="placeholder-text">Advanced analytics will be displayed here.</p>
                        </div>
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <div className="tab-content">
                        <div className="admin-card">
                            <div className="card-header">
                                <h2>Settings</h2>
                            </div>
                            <p className="placeholder-text">Admin settings will be available here.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
