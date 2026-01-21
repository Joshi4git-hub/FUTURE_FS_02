import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser, useCart } from "../context/AppContext";
import "./Header.css";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useUser();
  const { cart } = useCart();

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="logo-link">
          <h2 className="logo">🔷 Dhanjo</h2>
        </Link>

        <div className="menu-icon" onClick={() => setOpen(!open)}>
          ☰
        </div>

        <ul className={`nav-links ${open ? "active" : ""}`}>
          <li onClick={handleLinkClick}>
            <Link to="/">Home</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link to="/products">Products</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link to="/wishlist">❤️ Wishlist</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link to="/cart" className="cart-link">
              🛒 Cart
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </li>
          
          {user ? (
            <>
              <li className="user-menu">
                <div className="user-info">
                  <img src={user.avatar} alt={user.name} className="user-avatar" />
                  <span className="user-name">{user.name}</span>
                </div>
              </li>
              <li onClick={handleLinkClick}>
                <button 
                  className="btn-logout"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li onClick={handleLinkClick}>
                <Link to="/login" className="btn-login">Login</Link>
              </li>
              <li onClick={handleLinkClick}>
                <Link to="/register" className="btn-register">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
