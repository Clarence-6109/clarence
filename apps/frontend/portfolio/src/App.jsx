import "./index.css";

/**
 * Helper Component: ContactInfoItem
 * Defined at the top so it is available before App renders.
 */
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

/**
 * Main Portfolio Component
 */
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
              scale and reliability. Explore a portfolio shaped by disciplined
              engineering and a vision for the future.
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
      {/*-- ============ ABOUT SECTION ============ */}
      <section id="about" class="about-section">
        <div class="container1">
          <h2 class="section-title">About Me</h2>
          <div class="about-grid">
            <div class="about-card">
              <div class="about-icon">
                <i class="fas fa-code"></i>
              </div>
              <h3>Full-Stack Developer</h3>
              <p>
                Expert in modern web technologies including React, Vue, Node.js,
                and cloud infrastructure. Building scalable applications from
                concept to deployment.
              </p>
            </div>

            <div class="about-card">
              <div class="about-icon">
                <i class="fas fa-lightbulb"></i>
              </div>
              <h3>Problem Solver</h3>
              <p>
                Passionate about solving complex technical challenges with
                elegant, efficient solutions. Driven by curiosity and continuous
                learning.
              </p>
            </div>

            <div class="about-card">
              <div class="about-icon">
                <i class="fas fa-rocket"></i>
              </div>
              <h3>Innovation Advocate</h3>
              <p>
                Committed to leveraging cutting-edge technology to create
                meaningful impact. Focus on future-ready solutions with
                long-term value.
              </p>
            </div>

            <div class="about-card">
              <div class="about-icon">
                <i class="fas fa-handshake"></i>
              </div>
              <h3>Collaborative Partner</h3>
              <p>
                Believe in the power of teamwork. Excellent communicator who
                thrives in agile environments and values open collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PORTFOLIO SECTION ============ */}
      <section id="portfolio" class="portfolio-section">
        <div class="container1">
          <h2 class="section-title">Featured Projects</h2>
          <div class="portfolio-grid">
            <div class="portfolio-card">
              <div class="portfolio-image">
                <img
                  src="https://via.placeholder.com/400x300?text=Project+1"
                  alt="Chy-Wears"
                />
                <div class="portfolio-overlay">
                  <a href="dashboard.html" class="portfolio-btn">
                    View Project
                  </a>
                </div>
              </div>
              <h3>Chy-Wears E-Commerce</h3>
              <p class="portfolio-category">Web Development and E-Commerce</p>
              <p class="portfolio-description">
                A modern e-commerce platform for fashion retail with inventory
                management, payment integration, and user analytics.
              </p>
            </div>

            <div class="portfolio-card">
              <div class="portfolio-image">
                <img
                  src="https://via.placeholder.com/400x300?text=Project+2"
                  alt="Unit Converter"
                />
                <div class="portfolio-overlay">
                  <a href="dashboard.html" class="portfolio-btn">
                    View Project
                  </a>
                </div>
              </div>
              <h3>Unit Converter App</h3>
              <p class="portfolio-category">Mobile App and Utility</p>
              <p class="portfolio-description">
                Cross-platform mobile app for unit conversions. Fast,
                offline-capable, with beautiful UI and real-time calculations.
              </p>
            </div>

            <div class="portfolio-card">
              <div class="portfolio-image">
                <img
                  src="https://via.placeholder.com/400x300?text=Project+3"
                  alt="Calculator"
                />
                <div class="portfolio-overlay">
                  <a href="dashboard.html" class="portfolio-btn">
                    View Project
                  </a>
                </div>
              </div>
              <h3>Advanced Calculator</h3>
              <p class="portfolio-category">Web App and Productivity</p>
              <p class="portfolio-description">
                Scientific calculator with graphing capabilities, equation
                solver, and customizable themes for power users.
              </p>
            </div>

            <div class="portfolio-card">
              <div class="portfolio-image">
                <img
                  src="https://via.placeholder.com/400x300?text=Project+4"
                  alt="Fizzlin"
                />
                <div class="portfolio-overlay">
                  <a href="dashboard.html" class="portfolio-btn">
                    View Project
                  </a>
                </div>
              </div>
              <h3>Fizzlin Beverage Brand</h3>
              <p class="portfolio-category">Web Design and Branding</p>
              <p class="portfolio-description">
                Brand website with interactive product showcase, e-commerce
                integration, and engaging multimedia content.
              </p>
            </div>

            <div class="portfolio-card">
              <div class="portfolio-image">
                <img
                  src="https://via.placeholder.com/400x300?text=Project+5"
                  alt="Dashboard"
                />
                <div class="portfolio-overlay">
                  <a href="dashboard.html" class="portfolio-btn">
                    View Project
                  </a>
                </div>
              </div>
              <h3>Analytics Dashboard</h3>
              <p class="portfolio-category">Web App and Data Visualization</p>
              <p class="portfolio-description">
                Real-time data visualization dashboard with interactive charts,
                custom reporting, and predictive analytics.
              </p>
            </div>

            <div class="portfolio-card">
              <div class="portfolio-image">
                <img
                  src="https://via.placeholder.com/400x300?text=Project+6"
                  alt="Portfolio"
                />
                <div class="portfolio-overlay">
                  <a href="dashboard.html" class="portfolio-btn">
                    View Project
                  </a>
                </div>
              </div>
              <h3>Personal Portfolio</h3>
              <p class="portfolio-category">Web Design â€¢ Portfolio</p>
              <p class="portfolio-description">
                Modern portfolio website showcasing projects, skills, and
                services with smooth animations and responsive design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SKILLS SECTION ============ */}
      <section id="skills" class="skills-section">
        <div class="container1">
          <h2 class="section-title">Technical Skills</h2>
          <div class="skills-container">
            <div class="skill-category">
              <h3>
                <i class="fas fa-paint-brush"></i> Frontend
              </h3>
              <div class="skill-tags">
                <span class="skill-tag">
                  <i class="fab fa-react"></i> React
                </span>
                <span class="skill-tag">
                  <i class="fab fa-vuejs"></i> Vue.js
                </span>
                <span class="skill-tag">
                  <i class="fas fa-code"></i> TypeScript
                </span>
                <span class="skill-tag">
                  <i class="fas fa-palette"></i> Tailwind CSS
                </span>
                <span class="skill-tag">
                  <i class="fab fa-html5"></i> HTML/CSS
                </span>
                <span class="skill-tag">
                  <i class="fab fa-js-square"></i> JavaScript
                </span>
              </div>
            </div>

            <div class="skill-category">
              <h3>
                <i class="fas fa-server"></i> Backend
              </h3>
              <div class="skill-tags">
                <span class="skill-tag">
                  <i class="fab fa-node-js"></i> Node.js
                </span>
                <span class="skill-tag">
                  <i class="fab fa-python"></i> Python
                </span>
                <span class="skill-tag">
                  <i class="fas fa-cube"></i> Express.js
                </span>
                <span class="skill-tag">
                  <i class="fas fa-database"></i> PostgreSQL
                </span>
                <span class="skill-tag">
                  <i class="fas fa-leaf"></i> MongoDB
                </span>
                <span class="skill-tag">
                  <i class="fas fa-plug"></i> REST API
                </span>
              </div>
            </div>

            <div class="skill-category">
              <h3>
                <i class="fas fa-tools"></i> Tools & DevOps
              </h3>
              <div class="skill-tags">
                <span class="skill-tag">
                  <i class="fab fa-git-alt"></i> Git
                </span>
                <span class="skill-tag">
                  <i class="fab fa-docker"></i> Docker
                </span>
                <span class="skill-tag">
                  <i class="fab fa-aws"></i> AWS
                </span>
                <span class="skill-tag">
                  <i class="fas fa-infinity"></i> CI/CD
                </span>
                <span class="skill-tag">
                  <i class="fab fa-linux"></i> Linux
                </span>
                <span class="skill-tag">
                  <i class="fas fa-cube"></i> Webpack
                </span>
              </div>
            </div>

            <div class="skill-category">
              <h3>
                <i class="fas fa-pen-fancy"></i> Design & UX
              </h3>
              <div class="skill-tags">
                <span class="skill-tag">
                  <i class="fas fa-pen-nib"></i> Figma
                </span>
                <span class="skill-tag">
                  <i class="fas fa-laptop"></i> UI Design
                </span>
                <span class="skill-tag">
                  <i class="fas fa-edit"></i> Wireframing
                </span>
                <span class="skill-tag">
                  <i class="fas fa-bezier-curve"></i> Prototyping
                </span>
                <span class="skill-tag">
                  <i class="fas fa-users"></i> User Research
                </span>
                <span class="skill-tag">
                  <i class="fas fa-universal-access"></i> Accessibility
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS SECTION ============ */}
      <section class="stats-section">
        <div class="container1">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">50+</div>
              <div class="stat-label">Projects Completed</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">30+</div>
              <div class="stat-label">Happy Clients</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">5+</div>
              <div class="stat-label">Years Experience</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">100%</div>
              <div class="stat-label">Dedication</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES SECTION ============ */}
      <section id="services" class="services-section">
        <div class="container1">
          <h2 class="section-title">Services</h2>
          <div class="services-grid">
            <div class="service-item">
              <div class="service-number">01</div>
              <h3>Web Development</h3>
              <p>
                Full-stack web applications with modern frameworks, responsive
                design, and optimized performance. From frontend to backend, I
                deliver complete solutions.
              </p>
              <a href="#" class="service-link">
                Learn More <i class="fas fa-arrow-right"></i>
              </a>
            </div>

            <div class="service-item">
              <div class="service-number">02</div>
              <h3>Mobile Development</h3>
              <p>
                Cross-platform mobile applications using React Native, Flutter,
                and native technologies. High-performance apps for iOS and
                Android.
              </p>
              <a href="#" class="service-link">
                Learn More <i class="fas fa-arrow-right"></i>
              </a>
            </div>

            <div class="service-item">
              <div class="service-number">03</div>
              <h3>Cloud & DevOps</h3>
              <p>
                Infrastructure setup, deployment automation, and cloud
                architecture. Leveraging AWS, Azure, and GCP for scalable
                solutions.
              </p>
              <a href="#" class="service-link">
                Learn More <i class="fas fa-arrow-right"></i>
              </a>
            </div>

            <div class="service-item">
              <div class="service-number">04</div>
              <h3>UI/UX Design</h3>
              <p>
                Beautiful, user-centric interface designs. Prototyping,
                wireframing, and design systems that enhance user experience.
              </p>
              <a href="#" class="service-link">
                Learn More <i class="fas fa-arrow-right"></i>
              </a>
            </div>

            <div class="service-item">
              <div class="service-number">05</div>
              <h3>Consulting</h3>
              <p>
                Technical strategy and architecture consulting. Help businesses
                optimize their tech stack and digital transformation journey.
              </p>
              <a href="#" class="service-link">
                Learn More <i class="fas fa-arrow-right"></i>
              </a>
            </div>

            <div class="service-item">
              <div class="service-number">06</div>
              <h3>Training & Mentorship</h3>
              <p>
                Share knowledge through workshops, training sessions, and
                mentorship programs. Help teams level up their technical skills.
              </p>
              <a href="#" class="service-link">
                Learn More <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

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
                value="Lagos, Nigeria"
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

export default App;
