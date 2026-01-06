import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", path: "/features" },
        { name: "Pricing", path: "/pricing" },
        { name: "Security", path: "#" },
        { name: "Enterprise", path: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", path: "/about" },
        { name: "Careers", path: "#" },
        { name: "Press", path: "#" },
        { name: "Blog", path: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", path: "#" },
        { name: "Contact", path: "#" },
        { name: "Status", path: "#" },
        { name: "API Docs", path: "#" },
      ],
    },
  ];

  const socialLinks = ["Twitter", "LinkedIn", "GitHub"];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">W</div>
              <span className="footer-logo-text">Wealsh</span>
            </Link>
            <p className="footer-description">
              The modern platform for managing your money. Secure, fast, and
              designed for the digital age.
            </p>
            <div className="footer-socials">
              {socialLinks.map((social, index) => (
                <a key={index} href="#" className="footer-social">
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((column, index) => (
            <div key={index} className="footer-column">
              <h4>{column.title}</h4>
              <ul className="footer-links">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link to={link.path} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2024 Wealsh. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
