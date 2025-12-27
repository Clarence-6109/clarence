import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faAws,
  faDocker,
  faGitAlt,
  faHtml5,
  faJsSquare,
  faLinux,
  faNodeJs,
  faPython,
  faReact,
  faVuejs,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBezierCurve,
  faCode,
  faCube,
  faDatabase,
  faEdit,
  faEnvelope,
  faFileAlt,
  faHandshake,
  faHeart,
  faInfinity,
  faLaptop,
  faLeaf,
  faLightbulb,
  faLocationArrow,
  faMoon,
  faPaintBrush,
  faPalette,
  faPenFancy,
  faPenNib,
  faPhone,
  faPlug,
  faRocket,
  faServer,
  faSun,
  faTools,
  faUniversalAccess,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
config.autoAddCss = false;

import clarenceLogo from "./assets/clarence_logo.avif";
import "./index.css";
import { initPortfolio } from "./utils/initPortfolio";

/**
 * Helper Component: ContactInfoItem
 */
function ContactInfoItem({ icon, label, value, link }) {
  return (
    <div className="info-item">
      <FontAwesomeIcon icon={icon} className="info-icon" />
      <div>
        <p className="info-label">{label}</p>
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {value}
          </a>
        ) : (
          <p>{value}</p>
        )}
      </div>
    </div>
  );
}

/**
 * Main Portfolio Component
 */
export default function App() {
  useEffect(() => {
    // Standard for late 2025: Initialize vanilla JS utils after mount
    initPortfolio();
  }, []);

  return (
    <div className="protagonist">
      {/* Scroll Progress Bar (Managed by your animation script) */}
      <div id="scroll-progress"></div>

      {/* ============ HEADER ============ */}
      <header className="main-header">
        <nav className="navbar">
          <div className="nav-brand">
            <img src={clarenceLogo} alt="Clarence Logo" className="nav-logo" />
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
              <a href="#portfolio" className="nav-link">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
          {/* THEME TOGGLE SWITCH */}
          <button className="theme-toggle-btn" aria-label="Toggle Theme">
            <FontAwesomeIcon icon={faSun} className="sun-icon" />
            <FontAwesomeIcon icon={faMoon} className="moon-icon" />
          </button>
        </nav>
      </header>

      {/* ============ HERO ============ */}
      <section id="home" className="hero-section">
        <div className="container1">
          <div className="hero-content">
            <img
              src={clarenceLogo}
              alt="Clarence logo"
              className="hero-symbol"
            />
            <h1 id="headline-text" className="headline">
              CLARENCE
            </h1>
            <h2 id="tagline-text" className="tagline">
              Software Engineer & Digital Innovator
            </h2>
            <p id="welcomeline-text" className="hero-description">
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
              <FontAwesomeIcon icon={faFileAlt} /> <span>View CV</span>
            </a>
          </div>
        </div>
      </section>
      {/*-- ============ ABOUT SECTION ============ */}
      <section id="about" className="about-section">
        <div className="container1">
          <h2 className="section-title">About Me</h2>
          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon">
                <FontAwesomeIcon icon={faCode} />
              </div>
              <h3>Full-Stack Developer</h3>
              <p>
                Expert in modern web technologies including React, Vue, Node.js,
                and cloud infrastructure. Building scalable applications from
                concept to deployment.
              </p>
            </div>

            <div className="about-card">
              <div className="about-icon">
                <FontAwesomeIcon icon={faLightbulb} />
              </div>
              <h3>Problem Solver</h3>
              <p>
                Passionate about solving complex technical challenges with
                elegant, efficient solutions. Driven by curiosity and continuous
                learning.
              </p>
            </div>

            <div className="about-card">
              <div className="about-icon">
                <FontAwesomeIcon icon={faRocket} />
              </div>
              <h3>Innovation Advocate</h3>
              <p>
                Committed to leveraging cutting-edge technology to create
                meaningful impact. Focus on future-ready solutions with
                long-term value.
              </p>
            </div>

            <div className="about-card">
              <div className="about-icon">
                <FontAwesomeIcon icon={faHandshake} />
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

      {/* ============ ACHIEVEMENTS SECTION ============ */}
      <section id="achievements" className="achievements-section">
        <div className="container1">
          <h2 className="section-title">Achievements & Certifications</h2>
          <div className="achievements-grid">
            <div className="achievements-card">
              <div className="achievements-image">
                <img src="/cert-aws.avif" alt="AWS Certification" />
                <div className="achievements-overlay">
                  <a href="#" className="achievements-btn">
                    View Certificate
                  </a>
                </div>
              </div>
              <h3>AWS Certified Solutions Architect</h3>
              <p className="achievements-description">
                Validated expertise in designing and deploying scalable cloud
                applications.
              </p>
            </div>

            <div className="achievements-card">
              <div className="achievements-image">
                <img src="/cert-react.avif" alt="React Certification" />
                <div className="achievements-overlay">
                  <a href="#" className="achievements-btn">
                    View Certificate
                  </a>
                </div>
              </div>
              <h3>React Developer Certification</h3>
              <p className="achievements-description">
                Demonstrated proficiency in modern React development.
              </p>
            </div>

            <div className="achievements-card">
              <div className="achievements-image">
                <img src="/cert-react.avif" alt="React Certification" />
                <div className="achievements-overlay">
                  <a href="#" className="achievements-btn">
                    View Certificate
                  </a>
                </div>
              </div>
              <h3>Responsive Web Design Certification</h3>
              <p className="achievements-description">
                Demonstrated proficiency of using Html and CSS to create a
                modern responsive web design.
              </p>
            </div>

            <div className="achievements-card">
              <div className="achievements-image">
                <img src="/cert-react.avif" alt="React Certification" />
                <div className="achievements-overlay">
                  <a href="#" className="achievements-btn">
                    View Certificate
                  </a>
                </div>
              </div>
              <h3>JavaScript Certification</h3>
              <p className="achievements-description">
                Experienced and well versed in use of JavaScript and application
                of its syntax.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ EXPERIENCE SECTION ============ */}
      <section id="experience" className="experience-section">
        <div className="container1">
          <h2 className="section-title">Professional Experience</h2>
          <div className="experience-grid">
            <div className="experience-card">
              <div className="experience-image">
                <img src="/exp-web.avif" alt="Web Development Project" />
                <div className="experience-overlay">
                  <a href="#" className="experience-btn">
                    View
                  </a>
                </div>
              </div>
              <h3>Full-Stack Web Development</h3>
              <p className="experience-description">
                Built responsive web applications using React, Node.js, and
                PostgreSQL. Implemented CI/CD and cloud deployment.
              </p>
            </div>

            <div className="experience-card">
              <div className="experience-image">
                <img src="/exp-mobile.avif" alt="Mobile App Project" />
                <div className="experience-overlay">
                  <a href="#" className="experience-btn">
                    View
                  </a>
                </div>
              </div>
              <h3>Cross-Platform Mobile Apps</h3>
              <p className="experience-description">
                Developed mobile applications with Flutter and React Native,
                emphasizing performance, UX, and offline support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PORTFOLIO SECTION ============ */}
      <section id="portfolio" className="portfolio-section">
        <div className="container1">
          <h2 className="section-title">Featured Projects</h2>
          <div className="portfolio-grid">
            <div className="portfolio-card">
              <div className="portfolio-image">
                <img
                  src="/chy_wears.avif"
                  alt="Chy-Wears E-Commerce Website"
                  width="3840"
                  height="2160"
                  loading="lazy"
                  decoding="async"
                  className="portfolio-img"
                />
                <div className="portfolio-overlay">
                  <a href="#" className="portfolio-btn">
                    View Project
                  </a>
                </div>
              </div>
              <h3>Chy-Wears E-Commerce</h3>
              <p className="portfolio-category">
                Web Development and E-Commerce
              </p>
              <p className="portfolio-description">
                A modern e-commerce platform for fashion retail with inventory
                management, payment integration, and user analytics.
              </p>
            </div>

            <div className="portfolio-card">
              <div className="portfolio-image">
                <img src="https://via.placeholder.com" alt="Unit Converter" />
                <div className="portfolio-overlay">
                  <a href="#" className="portfolio-btn">
                    View Project
                  </a>
                </div>
              </div>
              <h3>Unit Converter App</h3>
              <p className="portfolio-category">Mobile App and Utility</p>
              <p className="portfolio-description">
                Cross-platform mobile app for unit conversions. Fast,
                offline-capable, with beautiful UI and real-time calculations.
              </p>
            </div>

            <div className="portfolio-card">
              <div className="portfolio-image">
                <img
                  src="https://via.placeholder.com"
                  alt="Advanced Calculator"
                />
                <div className="portfolio-overlay">
                  <a href="#" className="portfolio-btn">
                    View Project
                  </a>
                </div>
              </div>
              <h3>Advanced Calculator</h3>
              <p className="portfolio-category">Web App and Productivity</p>
              <p className="portfolio-description">
                Scientific calculator supporting complex equations, graphing
                functions, and a persistent calculation history log.
              </p>
            </div>

            <div className="portfolio-card">
              <div className="portfolio-image">
                <img
                  src="/fizzlin-beverage.avif"
                  alt="Fizzlin Beverage Brand Website"
                  width="3840"
                  height="2160"
                  loading="lazy"
                  decoding="async"
                  className="portfolio-img"
                />
                <div className="portfolio-overlay">
                  <a href="#" className="portfolio-btn">
                    View Project
                  </a>
                </div>
              </div>
              <h3>Fizzlin Beverage Brand</h3>
              <p className="portfolio-category">Web Design and Branding</p>
              <p className="portfolio-description">
                Brand website with interactive product showcase, e-commerce
                integration, and engaging multimedia content.
              </p>
            </div>

            <div className="portfolio-card">
              <div className="portfolio-image">
                <img
                  src="https://via.placeholder.com"
                  alt="Analytics Dashboard"
                />
                <div className="portfolio-overlay">
                  <a href="#" className="portfolio-btn">
                    View Project
                  </a>
                </div>
              </div>
              <h3>Analytics Dashboard</h3>
              <p className="portfolio-category">
                Web App and Data Visualization
              </p>
              <p className="portfolio-description">
                Real-time data visualization dashboard with interactive charts,
                custom reporting, and predictive analytics.
              </p>
            </div>

            <div className="portfolio-card">
              <div className="portfolio-image">
                <img src="https://via.placeholder.com" alt="Portfolio" />
                <div className="portfolio-overlay">
                  <a
                    href="https://analytics-dashboard-clarence.vercel.app/"
                    className="portfolio-btn"
                  >
                    View Project
                  </a>
                </div>
              </div>
              <h3>Personal Portfolio</h3>
              <p className="portfolio-category">Web Design â€¢ Portfolio</p>
              <p className="portfolio-description">
                Modern portfolio website showcasing projects, skills, and
                services with smooth animations and responsive design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SKILLS SECTION ============ */}
      <section id="skills" className="skills-section">
        <div className="container1">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-container">
            <div className="skill-category">
              <h3>
                <FontAwesomeIcon icon={faPaintBrush} /> Frontend
              </h3>
              <div className="skill-tags">
                <span className="skill-tag">
                  <FontAwesomeIcon icon={faReact} /> React
                </span>
                <span className="skill-tag">
                  <FontAwesomeIcon icon={faVuejs} /> Vue.js
                </span>
                <span className="skill-tag">
                  <FontAwesomeIcon icon={faCode} /> TypeScript
                </span>
                <span className="skill-tag">
                  <FontAwesomeIcon icon={faPalette} /> Tailwind CSS
                </span>
                <span className="skill-tag">
                  <FontAwesomeIcon icon={faHtml5} /> HTML/CSS
                </span>
                <span className="skill-tag">
                  <FontAwesomeIcon icon={faJsSquare} /> JavaScript
                </span>
              </div>
            </div>

            <div className="skill-category">
              <h3>
                <FontAwesomeIcon icon={faServer} /> Backend
              </h3>
              <div className="skill-tags">
                <span className="skill-tag">
                  <FontAwesomeIcon icon={faNodeJs} /> Node.js
                </span>
                <span className="skill-tag">
                  <FontAwesomeIcon icon={faPython} /> Python
                </span>
                <span className="skill-tag">
                  <FontAwesomeIcon icon={faCube} /> Express.js
                </span>
                <span className="skill-tag">
                  <FontAwesomeIcon icon={faDatabase} /> PostgreSQL
                </span>
                <span className="skill-tag">
                  <FontAwesomeIcon icon={faLeaf} /> MongoDB
                </span>
                <span className="skill-tag">
                  <FontAwesomeIcon icon={faPlug} /> REST API
                </span>
              </div>
            </div>

            <div className="skill-category">
              <h3>
                <FontAwesomeIcon icon={faTools} /> Tools & DevOps
              </h3>
              <div className="skill-tags">
                <span className="skill-tag">
                  <FontAwesomeIcon icon={faGitAlt} /> Git
                </span>
                <span className="skill-tag">
                  <FontAwesomeIcon icon={faDocker} /> Docker
                </span>
                <span className="skill-tag">
                  <FontAwesomeIcon icon={faAws} /> AWS
                </span>
                <span className="skill-tag">
                  <FontAwesomeIcon icon={faInfinity} /> CI/CD
                </span>
                <span className="skill-tag">
                  <FontAwesomeIcon icon={faLinux} /> Linux
                </span>
                <span className="skill-tag">
                  <FontAwesomeIcon icon={faCube} /> Webpack
                </span>
              </div>
            </div>

            <div className="skill-category">
              <h3>
                <FontAwesomeIcon icon={faPenFancy} /> Design & UX
              </h3>
              <div className="skill-tags">
                <span className="skill-tag">
                  <FontAwesomeIcon icon={faPenNib} /> Figma
                </span>
                <span className="skill-tag">
                  <FontAwesomeIcon icon={faLaptop} /> UI Design
                </span>
                <span className="skill-tag">
                  <FontAwesomeIcon icon={faEdit} /> Wireframing
                </span>
                <span className="skill-tag">
                  <FontAwesomeIcon icon={faBezierCurve} /> Prototyping
                </span>
                <span className="skill-tag">
                  <FontAwesomeIcon icon={faUsers} /> User Research
                </span>
                <span className="skill-tag">
                  <FontAwesomeIcon icon={faUniversalAccess} /> Accessibility
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS SECTION ============ */}
      <section className="stats-section">
        <div className="container1">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">30+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Dedication</div>
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
              {/* Pass icon objects, not strings */}
              <ContactInfoItem
                icon={faEnvelope}
                label="Email"
                value="your.email@example.com"
                link="mailto:your.email@example.com"
              />
              <ContactInfoItem
                icon={faPhone}
                label="Phone"
                value="+1 (234) 567-890"
                link="tel:+1234567890"
              />
              <ContactInfoItem
                icon={faLocationArrow}
                label="Location"
                value="Lagos, Nigeria"
              />
            </div>

            {/* The 'contact-form' class is used by your initContactForm utility script */}
            <form className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
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
                <a
                  href="https://github.com/Clarence-6109/clarence"
                  title="GitHub"
                >
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
              <FontAwesomeIcon icon={faHeart} /> by Clarence
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
