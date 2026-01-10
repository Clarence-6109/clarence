import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faAws,
  faCss3,
  faDocker,
  faGitAlt,
  faGithub,
  faHtml5,
  faJsSquare,
  faLinux,
  faMedium,
  faNodeJs,
  faOrcid,
  faPython,
  faReact,
  faTelegram,
  faUpwork,
  faVuejs,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowUp,
  faBezierCurve,
  faBook,
  faChartLine,
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
  faQuoteLeft,
  faRocket,
  faServer,
  faSun,
  faTools,
  faUniversalAccess,
  faUpRightFromSquare,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import clarenceLogo from "./assets/clarence_logo.avif";
import "./index.css";
import { initPortfolio } from "./utils/initPortfolio";
// Removed initSmoothScroll import since we're handling it inline
config.autoAddCss = false;

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

// Generic Carousel Component
function Carousel({ items, slideCount, autoPlayInterval = 6000 }) {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const moveTo = (index) => {
    setCurrentIndex(index);
  };

  const move = (direction) => {
    setCurrentIndex((prev) => (prev + direction + slideCount) % slideCount);
  };

  useEffect(() => {
    if (!isHovered && autoPlayInterval) {
      const interval = setInterval(() => {
        move(1);
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isHovered, autoPlayInterval]);

  return (
    <div
      className="carousel"
      ref={carouselRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="carousel-container"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: "transform 0.5s ease",
        }}
      >
        {items.map((item, i) => (
          <div className="carousel-slide" key={i}>
            {item}
          </div>
        ))}
      </div>
      <button className="arrow left" onClick={() => move(-1)}>
        &#9664;
      </button>
      <button className="arrow right" onClick={() => move(1)}>
        &#9654;
      </button>
      <div className="carousel-dots">
        {Array.from({ length: slideCount }).map((_, i) => (
          <button
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => moveTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Main Portfolio Component
 */
export default function App() {
  useEffect(() => {
    // 1. Initialize portfolio utilities (typing, theme, etc.)
    initPortfolio();

    // 2. Mobile nav toggle (runs once here)
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");
    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        navToggle.classList.toggle("active");
      });
    }

    // 3. Smooth scrolling and mobile menu close for nav links
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
        // Close mobile menu
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      });
    });

    // 4. Back-to-top button visibility
    const backToTop = document.getElementById("back-to-top");
    if (backToTop) {
      const handleScroll = () => {
        if (window.scrollY > 500) {
          backToTop.classList.add("visible");
        } else {
          backToTop.classList.remove("visible");
        }
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check

      // Cleanup scroll listener
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  // Achievements items
  const achievementsItems = [
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
    </div>,
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
    </div>,
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
        Teaches the fundamentals of HTML and CSS, including modern layout,
        design, accessibility, and responsive web development. Also helps in
        building practical projects and gaining the skills to create
        professional, user-friendly webpages.
      </p>
    </div>,
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
        Experienced and well versed in use of JavaScript and application of its
        syntax.
      </p>
    </div>,
  ];

  // Portfolio items with dual buttons
  const portfolioItems = [
    <div className="portfolio-card">
      <div className="portfolio-image">
        <img
          src="/chy_wears.avif"
          alt="Chy-Wears E-Commerce Website"
          className="portfolio-img"
        />
        <div className="portfolio-overlay">
          <div className="dual-buttons">
            <a href="https://chy-wears.vercel.app/" className="portfolio-btn">
              <FontAwesomeIcon icon={faUpRightFromSquare} /> Live Demo
            </a>
            <a href="#" className="portfolio-btn secondary">
              <FontAwesomeIcon icon={faGithub} /> Source Code
            </a>
          </div>
        </div>
      </div>
      <h3>Chy-Wears E-Commerce</h3>
      <p className="portfolio-category">Web Development and E-Commerce</p>
      <div className="tech-tags">
        <span>
          <FontAwesomeIcon icon={faReact} />
          React
        </span>
        <span>
          <FontAwesomeIcon icon={faChartLine} />
          Chart.js
        </span>
        <span>
          <FontAwesomeIcon icon={faCss3} />
          CSS3
        </span>
      </div>
      <p className="portfolio-description">
        A modern e-commerce platform for fashion retail with inventory
        management, payment integration, and user analytics.
      </p>
    </div>,
    <div className="portfolio-card">
      <div className="portfolio-image">
        <img src="/unit_converter.avif" alt="Unit Converter" />
        <div className="portfolio-overlay">
          <div className="dual-buttons">
            <a
              href="https://unit-converter-flax-alpha.vercel.app/"
              className="portfolio-btn"
            >
              <FontAwesomeIcon icon={faUpRightFromSquare} /> Live Demo
            </a>
            <a href="#" className="portfolio-btn secondary">
              <FontAwesomeIcon icon={faGithub} /> Source Code
            </a>
          </div>
        </div>
      </div>
      <h3>Unit Converter App</h3>
      <p className="portfolio-category">Mobile App and Utility</p>
      <div className="tech-tags">
        <span>
          <FontAwesomeIcon icon={faReact} />
          React
        </span>
        <span>
          <FontAwesomeIcon icon={faChartLine} />
          Chart.js
        </span>
        <span>
          <FontAwesomeIcon icon={faCss3} />
          CSS3
        </span>
      </div>
      <p className="portfolio-description">
        Cross-platform mobile app for unit conversions. Fast, offline-capable,
        with beautiful UI and real-time calculations.
      </p>
    </div>,
    <div className="portfolio-card">
      <div className="portfolio-image">
        <img
          src="/hyper_scientific_calculator.avif"
          alt="Hyper Scientific Calculator"
        />
        <div className="portfolio-overlay">
          <div className="dual-buttons">
            <a
              href="https://hyper-scientific-calculator.vercel.app/"
              className="portfolio-btn"
            >
              <FontAwesomeIcon icon={faUpRightFromSquare} /> Live Demo
            </a>
            <a href="#" className="portfolio-btn secondary">
              <FontAwesomeIcon icon={faGithub} /> Source Code
            </a>
          </div>
        </div>
      </div>
      <h3>Hyper Scientific Calculator</h3>
      <p className="portfolio-category">Web App and Productivity</p>
      <div className="tech-tags">
        <span>
          <FontAwesomeIcon icon={faReact} />
          React
        </span>
        <span>
          <FontAwesomeIcon icon={faChartLine} />
          Chart.js
        </span>
        <span>
          <FontAwesomeIcon icon={faCss3} />
          CSS3
        </span>
      </div>
      <p className="portfolio-description">
        Scientific calculator supporting complex equations, graphing functions,
        and a persistent calculation history log.
      </p>
    </div>,
    <div className="portfolio-card">
      <div className="portfolio-image">
        <img
          src="/fizzlin-beverage.avif"
          alt="Fizzlin Beverage Brand Website"
          className="portfolio-img"
        />
        <div className="portfolio-overlay">
          <div className="dual-buttons">
            <a href="#" className="portfolio-btn">
              <FontAwesomeIcon icon={faUpRightFromSquare} /> Live Demo
            </a>
            <a href="#" className="portfolio-btn secondary">
              <FontAwesomeIcon icon={faGithub} /> Source Code
            </a>
          </div>
        </div>
      </div>
      <h3>Fizzlin Beverage Brand</h3>
      <p className="portfolio-category">Web Design and Branding</p>
      <div className="tech-tags">
        <span>
          <FontAwesomeIcon icon={faReact} />
          React
        </span>
        <span>
          <FontAwesomeIcon icon={faChartLine} />
          Chart.js
        </span>
        <span>
          <FontAwesomeIcon icon={faCss3} />
          CSS3
        </span>
      </div>
      <p className="portfolio-description">
        Brand website with interactive product showcase, e-commerce integration,
        and engaging multimedia content.
      </p>
    </div>,
    <div className="portfolio-card">
      <div className="portfolio-image">
        <img src="/analytics_dashboard.avif" alt="Analytics Dashboard" />
        <div className="portfolio-overlay">
          <div className="dual-buttons">
            <a
              href="https://analytics-dashboard-clarence.vercel.app/"
              className="portfolio-btn"
            >
              <FontAwesomeIcon icon={faUpRightFromSquare} /> Live Demo
            </a>
            <a href="#" className="portfolio-btn secondary">
              <FontAwesomeIcon icon={faGithub} /> Source Code
            </a>
          </div>
        </div>
      </div>
      <h3>Analytics Dashboard</h3>
      <p className="portfolio-category">Web App and Data Visualization</p>
      <div className="tech-tags">
        <span>
          <FontAwesomeIcon icon={faReact} />
          React
        </span>
        <span>
          <FontAwesomeIcon icon={faChartLine} />
          Chart.js
        </span>
        <span>
          <FontAwesomeIcon icon={faCss3} />
          CSS3
        </span>
      </div>
      <p className="portfolio-description">
        Real-time data visualization dashboard with interactive charts, custom
        reporting, and predictive analytics.
      </p>
    </div>,
    <div className="portfolio-card">
      <div className="portfolio-image">
        <img src="/wealsh.avif" alt="Wealsh" />
        <div className="portfolio-overlay">
          <div className="dual-buttons">
            <a href="https://wealsh.vercel.app/" className="portfolio-btn">
              <FontAwesomeIcon icon={faUpRightFromSquare} /> Live Demo
            </a>
            <a href="#" className="portfolio-btn secondary">
              <FontAwesomeIcon icon={faGithub} /> Source Code
            </a>
          </div>
        </div>
      </div>
      <h3>Wealsh</h3>
      <p className="portfolio-category">Web Design • Fintech</p>
      <div className="tech-tags">
        <span>
          <FontAwesomeIcon icon={faReact} />
          React
        </span>
        <span>
          <FontAwesomeIcon icon={faChartLine} />
          Chart.js
        </span>
        <span>
          <FontAwesomeIcon icon={faCss3} />
          CSS3
        </span>
      </div>
      <p className="portfolio-description">
        A sleek fintech web application offering personal finance management,
        budgeting tools, and investment tracking with a user-friendly interface.
      </p>
    </div>,
    <div className="portfolio-card">
      <div className="portfolio-image">
        <img
          src="/chess_game.avif"
          alt="Chess Game"
          className="portfolio-img"
        />
        <div className="portfolio-overlay">
          <div className="dual-buttons">
            <a
              href="https://chess-game-blond-seven.vercel.app/"
              className="portfolio-btn"
            >
              <FontAwesomeIcon icon={faUpRightFromSquare} /> Live Demo
            </a>
            <a href="#" className="portfolio-btn secondary">
              <FontAwesomeIcon icon={faGithub} /> Source Code
            </a>
          </div>
        </div>
      </div>
      <h3>Chess Game</h3>
      <p className="portfolio-category">Game Development and Design</p>
      <div className="tech-tags">
        <span>
          <FontAwesomeIcon icon={faReact} />
          React
        </span>
        <span>
          <FontAwesomeIcon icon={faCss3} />
          CSS3
        </span>
      </div>
      <p className="portfolio-description">
        An interactive chess game built with React and CSS, featuring a
        responsive design and smooth gameplay.
      </p>
    </div>,
    <div className="portfolio-card">
      <div className="portfolio-image">
        <img
          src="/tic-tac-toe-game.avif"
          alt="Tic-Tac-Toe Game"
          className="portfolio-img"
        />
        <div className="portfolio-overlay">
          <div className="dual-buttons">
            <a
              href="https://tic-tac-toe-tau-bay.vercel.app/"
              className="portfolio-btn"
            >
              <FontAwesomeIcon icon={faUpRightFromSquare} /> Live Demo
            </a>
            <a href="#" className="portfolio-btn secondary">
              <FontAwesomeIcon icon={faGithub} /> Source Code
            </a>
          </div>
        </div>
      </div>
      <h3>Tic-Tac-Toe Game</h3>
      <p className="portfolio-category">Game Development and Design</p>
      <div className="tech-tags">
        <span>
          <FontAwesomeIcon icon={faReact} />
          React
        </span>
        <span>
          <FontAwesomeIcon icon={faCss3} />
          CSS3
        </span>
      </div>
      <p className="portfolio-description">
        An interactive tic-tac-toe game built with React and CSS, featuring a
        responsive design and smooth gameplay.
      </p>
    </div>,
    <div className="portfolio-card">
      <div className="portfolio-image">
        <img
          src="/to-do-list.avif"
          alt="To-Do List"
          className="portfolio-img"
        />
        <div className="portfolio-overlay">
          <div className="dual-buttons">
            <a
              href="https://to-do-app-beryl-five.vercel.app/"
              className="portfolio-btn"
            >
              <FontAwesomeIcon icon={faUpRightFromSquare} /> Live Demo
            </a>
            <a href="#" className="portfolio-btn secondary">
              <FontAwesomeIcon icon={faGithub} /> Source Code
            </a>
          </div>
        </div>
      </div>
      <h3>To-Do List</h3>
      <p className="portfolio-category">Productivity and Task Management</p>
      <div className="tech-tags">
        <span>
          <FontAwesomeIcon icon={faReact} />
          React
        </span>
        <span>
          <FontAwesomeIcon icon={faCss3} />
          CSS3
        </span>
      </div>
      <p className="portfolio-description">
        A simple and elegant to-do list application built with React and CSS,
        featuring a clean interface and intuitive task management.
      </p>
    </div>,
    <div className="portfolio-card">
      <div className="portfolio-image">
        <img
          src="/groove_music.avif"
          alt="Groove Music"
          className="portfolio-img"
        />
        <div className="portfolio-overlay">
          <div className="dual-buttons">
            <a
              href="https://tic-tac-toe-tau-bay.vercel.app/"
              className="portfolio-btn"
            >
              <FontAwesomeIcon icon={faUpRightFromSquare} /> Live Demo
            </a>
            <a href="#" className="portfolio-btn secondary">
              <FontAwesomeIcon icon={faGithub} /> Source Code
            </a>
          </div>
        </div>
      </div>
      <h3>Groove Music</h3>
      <p className="portfolio-category">Music Streaming and Design</p>
      <div className="tech-tags">
        <span>
          <FontAwesomeIcon icon={faReact} />
          React
        </span>
        <span>
          <FontAwesomeIcon icon={faCss3} />
          CSS3
        </span>
      </div>
      <p className="portfolio-description">
        A music streaming web application with search, playlists, and
        recommendations.
      </p>
    </div>,
  ];

  // Testimonials items
  const testimonialsItems = [
    <div className="testimonial-card">
      <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />
      <p className="testimonial-text">
        Clarence delivered an outstanding e-commerce platform ahead of schedule.
        Professional, creative, and highly skilled.
      </p>
      <div className="testimonial-author">
        <strong>— Sarah J., CEO at Fashion Inc.</strong>
      </div>
    </div>,
    <div className="testimonial-card">
      <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />
      <p className="testimonial-text">
        His AI expertise transformed our app into something truly innovative.
        Highly recommend!
      </p>
      <div className="testimonial-author">
        <strong>— Mike T., Tech Lead</strong>
      </div>
    </div>,
    <div className="testimonial-card">
      <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />
      <p className="testimonial-text">
        Exceptional work on our dashboard—fast, reliable, and user-friendly.
      </p>
      <div className="testimonial-author">
        <strong>— Emma R., Product Manager</strong>
      </div>
    </div>,
  ];

  // Blog items (updated to match achievements/portfolio structure with overlay)
  const blogItems = [
    <div className="blog-card">
      <div className="blog-image">
        <img
          src="https://via.placeholder.com/540x300?text=AI+Future"
          alt="AI Blog"
        />
        <div className="blog-overlay">
          <a
            href="https://medium.com/@yourusername/ai-web-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="blog-btn"
          >
            Read on Medium
          </a>
        </div>
      </div>
      <h3>The Future of AI in Web Development</h3>
      <p className="blog-description">
        Exploring how AI is revolutionizing full-stack development in 2025 and
        beyond.
      </p>
    </div>,
    <div className="blog-card">
      <div className="blog-image">
        <img
          src="https://via.placeholder.com/540x300?text=Cloud+Arch"
          alt="Cloud Blog"
        />
        <div className="blog-overlay">
          <a
            href="https://medium.com/@yourusername/cloud-arch"
            target="_blank"
            rel="noopener noreferrer"
            className="blog-btn"
          >
            Read on Medium
          </a>
        </div>
      </div>
      <h3>Scalable Cloud Architectures</h3>
      <p className="blog-description">
        Best practices for building resilient systems with AWS and modern tools.
      </p>
    </div>,
    <div className="blog-card">
      <div className="blog-image">
        <img src="emerging_ux.avif" alt="UX Blog" />
        <div className="blog-overlay">
          <a
            href="https://medium.com/@chinemeremmadu.frelan/emerging-ux-trends-in-2025-e345af5ed1fa"
            target="_blank"
            rel="noopener noreferrer"
            className="blog-btn"
          >
            Read on Medium
          </a>
        </div>
      </div>
      <h3>Emerging UX Trends in 2025</h3>
      <p className="blog-description">
        How user research and accessibility are shaping the next generation of
        apps.
      </p>
    </div>,
  ];

  // About items
  const aboutItems = [
    <div className="about-card">
      <div className="about-icon">
        <FontAwesomeIcon icon={faCode} />
      </div>
      <h3>Full-Stack Developer</h3>
      <p>
        Expert in modern web technologies including React, Vue, Node.js, and
        cloud infrastructure. Building scalable applications from concept to
        deployment.
      </p>
    </div>,
    <div className="about-card">
      <div className="about-icon">
        <FontAwesomeIcon icon={faPenFancy} />
      </div>
      <h3>Research & Analysis</h3>
      <p>
        I perform rigorous, evidence-based analysis on emerging tech, AI, and
        industry trends to inform strategic decisions, produce high-impact
        thought leadership and compelling technical documentation.
      </p>
    </div>,
    <div className="about-card">
      <div className="about-icon">
        <FontAwesomeIcon icon={faRocket} />
      </div>
      <h3>Innovation Advocate</h3>
      <p>
        Committed to leveraging cutting-edge technology to create meaningful
        impact. Focus on future-ready solutions with long-term value.
      </p>
    </div>,
    <div className="about-card">
      <div className="about-icon">
        <FontAwesomeIcon icon={faHandshake} />
      </div>
      <h3>Collaborative Partner</h3>
      <p>
        Believe in the power of teamwork. Excellent communicator who thrives in
        agile environments and values open collaboration.
      </p>
    </div>,
    <div className="about-card">
      <div className="about-icon">
        <FontAwesomeIcon icon={faLightbulb} />
      </div>
      <h3>Problem Solver</h3>
      <p>
        Passionate about solving complex technical challenges with elegant,
        efficient solutions. Driven by curiosity and continuous learning.
      </p>
    </div>,
    <div className="about-card">
      <div className="about-icon">
        <FontAwesomeIcon icon={faBook} />
      </div>
      <h3>Thought Writer</h3>
      <p>
        I leverage deep domain knowledge in Full-Stack and AI to produce
        insightful articles, contents, industrial analysis and technical
        documentation that translate complex technological advancement to
        educate, inspire, drive understanding and shape dialogue around the
        future of technology.
      </p>
    </div>,
  ];
  const skillsItems = [
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
    </div>,
    <div className="skills-container">
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
    </div>,
    <div className="skills-container">
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
    </div>,
    <div className="skills-container">
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
    </div>,
  ];

  return (
    <div className="protagonist">
      {/* Scroll Progress Bar */}
      <div id="scroll-progress"></div>

      {/* Header */}
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
              <a href="#achievements" className="nav-link">
                Achievements
              </a>
            </li>
            <li>
              <a href="#experience" className="nav-link">
                Experience
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
          <button className="theme-toggle-btn" aria-label="Toggle Theme">
            <FontAwesomeIcon icon={faSun} className="sun-icon" />
            <FontAwesomeIcon icon={faMoon} className="moon-icon" />
          </button>
          <div className="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </header>

      <main id="main-content">
        {/* Hero */}
        <section id="home" className="hero-section">
          <div className="container1">
            <div className="hero-content">
              <img
                src={clarenceLogo}
                alt="Clarence logo"
                className="hero-symbol"
              />
              <h1 id="headline-text" className="headline">
                Chinemerem Madu Clarence
              </h1>
              <h2 id="tagline-text" className="tagline">
                AI Solutions Architect & Technical Strategist
              </h2>
              <p id="welcomeline-text" className="hero-description">
                I design and deploy intelligent, full-stack solutions built for
                technical scale and reliability.
                <br /> My expertise is rooted in rigorous AI research and
                translating complex innovations into compelling, accessible
                narratives.
              </p>
            </div>
            <div className="btn-container">
              <div className="btn">
                <a
                  href="/clarenceresume.docx"
                  className="letgo cta-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faFileAlt} /> <span>View Resume</span>
                </a>
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
          </div>
        </section>

        {/* About */}
        <section id="about" className="about-section">
          <div className="container1">
            <h2 className="section-title">About Me</h2>
            <Carousel items={aboutItems} slideCount={aboutItems.length} />
          </div>
        </section>

        {/* Achievements */}
        <section id="achievements" className="achievements-section">
          <div className="container1">
            <h2 className="section-title">Achievements & Certifications</h2>
            <Carousel
              items={achievementsItems}
              slideCount={achievementsItems.length}
            />
          </div>
        </section>

        {/* Experience */}
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

        {/* Portfolio */}
        <section id="portfolio" className="portfolio-section">
          <div className="container1">
            <h2 className="section-title">Featured Projects</h2>
            <Carousel
              items={portfolioItems}
              slideCount={portfolioItems.length}
            />
          </div>
        </section>

        {/* Blog */}
        <section id="blog" className="blog-section">
          <div className="container1">
            <h2 className="section-title">Recent Blog Posts</h2>
            <Carousel items={blogItems} slideCount={blogItems.length} />
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="testimonials-section">
          <div className="container1">
            <h2 className="section-title">What Clients Say</h2>
            <Carousel
              items={testimonialsItems}
              slideCount={testimonialsItems.length}
            />
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="skills-section">
          <div className="container1">
            <h2 className="section-title">Skills</h2>
            <Carousel items={skillsItems} slideCount={skillsItems.length} />
          </div>
        </section>

        {/* Stats */}
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

        {/* Contact */}
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
                  />
                </div>
                <button type="submit" className="form-submit">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <div className="antagonist">
        <footer className="footer">
          <div className="footer-content">
            <div className="social-links">
              <h3>Follow Me</h3>
              <div className="icon">
                <a href="https://x.com/it_is_clarence" title="Twitter">
                  <FontAwesomeIcon icon={faXTwitter} />
                </a>
                <a
                  href="https://t.me/chinemerem_clarence_madu"
                  title="Telegram"
                >
                  <FontAwesomeIcon icon={faTelegram} />
                </a>
                <a
                  href="https://github.com/Clarence-6109/clarence"
                  title="GitHub"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a
                  href="https://orcid.org/my-orcid?orcid=0009-0009-6911-2442"
                  title="ORCID"
                >
                  <FontAwesomeIcon icon={faOrcid} />
                </a>
                <a href="#" title="Upwork">
                  <FontAwesomeIcon icon={faUpwork} />
                </a>
                <a
                  href="https://medium.com/@chinemeremmadu.frelan"
                  title="Medium"
                >
                  <FontAwesomeIcon icon={faMedium} />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              &copy; 2025 Clarence. All rights reserved. | Crafted with
              <FontAwesomeIcon icon={faHeart} /> by Clarence
            </p>
          </div>
        </footer>
      </div>

      {/* Back to Top Button */}
      <button
        id="back-to-top"
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
}
