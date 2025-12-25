import "./index.css";

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (Add your backend logic here)");
  };

  return (
    <div className="protagonist">
      {/* ============ HEADER ============ */}
      <header className="main-header">
        <nav className="navbar">
          <div className="nav-brand">
            <img
              src="/clarencesymbol.png"
              alt="Clarence Symbol"
              className="nav-logo"
            />
            <span className="nav-title">CLARENCE</span>
          </div>
          <ul className="nav-menu">
            <li>
              <a href="#home" className="nav-link">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="nav-link">
                Services
              </a>
            </li>
            <li>
              <a href="#portfolio" className="nav-link">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#skills" className="nav-link">
                Skills
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* ============ HERO ============ */}
      <section id="home" className="hero-section">
        <div className="container1">
          <div className="hero-content">
            <img
              src="/clarencesymbol.png"
              alt="Clarence Symbol"
              className="hero-symbol"
            />
            <h1 className="headline">CLARENCE</h1>
            <h2 className="tagline">Software Engineer & Digital Innovator</h2>
            <p className="hero-description">
              I design and deliver high-performance software solutions built for
              scale and reliability.
            </p>
          </div>
          <div className="btn">
            <a
              href="/clarenceresume.docx"
              className="letgo cta-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-file-alt"></i> <span>View CV</span>
            </a>
          </div>
        </div>
      </section>

      {/* ... (Previous Sections: About, Services, Portfolio, Skills, Stats) ... */}

      {/* ============ CONTACT SECTION ============ */}
      <section id="contact" className="contact-section">
        <div className="container1">
          <h2 className="section-title">Let's Work Together</h2>
          <p className="contact-intro">
            Have a project in mind? Let's discuss how I can help bring your
            vision to life.
          </p>

          <div className="contact-content">
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <ContactInfoItem
                icon="fa-envelope"
                label="Email"
                value="your.email@example.com"
                link="mailto:your.email@example.com"
              />
              <ContactInfoItem
                icon="fa-phone"
                label="Phone"
                value="+1 (234) 567-890"
                link="tel:+1234567890"
              />
              <ContactInfoItem
                icon="fa-map-marker-alt"
                label="Location"
                value="Your City, Your Country"
              />
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Your Message"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" className="form-submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <div className="antagonist">
        <footer className="footer">
          <div className="footer-content">
            <div className="social-links">
              <h3>Follow Me</h3>
              <div className="icon">
                <a href="#" title="Facebook">
                  <ion-icon name="logo-facebook"></ion-icon>
                </a>
                <a href="#" title="Instagram">
                  <ion-icon name="logo-instagram"></ion-icon>
                </a>
                <a href="#" title="Twitter">
                  <ion-icon name="logo-twitter"></ion-icon>
                </a>
                <a href="#" title="GitHub">
                  <ion-icon name="logo-github"></ion-icon>
                </a>
                <a href="#" title="LinkedIn">
                  <ion-icon name="logo-linkedin"></ion-icon>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              &copy; 2025 Clarence. All rights reserved. | Crafted with{" "}
              <i className="fas fa-heart"></i> by Clarence
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function ContactInfoItem({ icon, label, value, link }) {
  return (
    <div className="info-item">
      <i className={`fas ${icon}`}></i>
      <div>
        <p className="info-label">{label}</p>
        {link ? <a href={link}>{value}</a> : <p>{value}</p>}
      </div>
    </div>
  );
}

export default App;
