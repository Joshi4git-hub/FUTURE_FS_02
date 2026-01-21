import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Dhanjo Store</h4>
          <p>Premium tech products for modern professionals</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/wishlist">Wishlist</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@dhanjo.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Dhanjo Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
