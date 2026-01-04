import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-column">
            <h3 className="footer-brand">Chy-Wears</h3>
            <p className="footer-description">
              Your destination for elegant women's fashion.
            </p>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Shop</h4>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Dresses
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Evening Wear
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Sale
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Customer Service</h4>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Newsletter</h4>
            <p className="footer-newsletter-text">
              Subscribe for exclusive offers
            </p>
            <input
              type="email"
              placeholder="Your email"
              className="footer-input"
            />
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; 2024 Chy-Wears. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
