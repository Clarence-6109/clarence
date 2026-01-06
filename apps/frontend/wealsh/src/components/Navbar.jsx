import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CloseIcon, MenuIcon } from "./Icons";
import "./Navbar.css";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Pricing", path: "/pricing" },
    { name: "About", path: "/about" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">W</div>
          <span className="navbar-logo-text">Wealsh</span>
        </Link>

        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`navbar-link ${
                location.pathname === link.path ? "active" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="navbar-auth">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="navbar-auth-user">
                <div className="navbar-avatar">{user?.avatar}</div>
                Dashboard
              </Link>
              <button onClick={handleLogout} className="navbar-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-auth-link">
                Sign In
              </Link>
              <Link to="/register" className="navbar-cta">
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          className="navbar-mobile-btn"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {mobileMenu && (
        <div className="navbar-mobile-menu">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenu(false)}
              className="navbar-mobile-link"
            >
              {link.name}
            </Link>
          ))}
          <div className="navbar-mobile-divider">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenu(false)}
                  className="navbar-mobile-link"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenu(false);
                  }}
                  className="navbar-mobile-link"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenu(false)}
                  className="navbar-mobile-link"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenu(false)}
                  className="navbar-mobile-cta"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
