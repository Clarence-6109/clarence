import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import "./Navbar.css";

const Navbar = ({ user, cartCount, onLogout }) => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <h1 className="brand-name">Chy-Wears</h1>
          </div>

          <div className="navbar-links">
            <a href="#home" className="nav-link">
              Home
            </a>
            <a href="#shop" className="nav-link">
              Shop
            </a>
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </div>

          <div className="navbar-icons">
            <button className="icon-button">
              <Search size={20} />
            </button>
            <button className="icon-button">
              <Heart size={20} />
            </button>
            <button className="icon-button cart-button">
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
            <button className="icon-button user-button" onClick={onLogout}>
              <User size={20} />
            </button>
            <button
              className="mobile-menu-button"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenu && (
        <div className="mobile-menu">
          <a href="#home" className="mobile-link">
            Home
          </a>
          <a href="#shop" className="mobile-link">
            Shop
          </a>
          <a href="#about" className="mobile-link">
            About
          </a>
          <a href="#contact" className="mobile-link">
            Contact
          </a>
          <button onClick={onLogout} className="mobile-link logout-link">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
