import { Link } from "react-router-dom";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChartIcon,
  CreditCardIcon,
  GlobeIcon,
  LightningIcon,
  PlayIcon,
  SendIcon,
  ShieldIcon,
  WalletIcon,
} from "../components/Icons";
import "./Home.css";

const Hero = () => (
  <section className="hero">
    <div className="hero-bg-effects">
      <div className="hero-bg-circle hero-bg-circle-1"></div>
      <div className="hero-bg-circle hero-bg-circle-2"></div>
    </div>

    <div className="hero-container">
      <div className="hero-grid">
        <div className="hero-content">
          <div className="hero-badge">
            <LightningIcon />
            <span>Trusted by 2M+ users worldwide</span>
          </div>

          <h1 className="hero-title">
            Banking for the <span className="gradient-text">Digital Age</span>
          </h1>

          <p className="hero-description">
            Experience the future of finance with instant transfers, smart
            investments, and bank-grade security. All in one powerful platform.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="hero-btn-primary">
              Start Free Trial
            </Link>
            <button className="hero-btn-secondary">
              <PlayIcon />
              Watch Demo
            </button>
          </div>

          <div className="hero-stats">
            <div>
              <div className="hero-stat-value">$12B+</div>
              <div className="hero-stat-label">Assets Managed</div>
            </div>
            <div className="hero-stat-divider"></div>
            <div>
              <div className="hero-stat-value">180+</div>
              <div className="hero-stat-label">Countries</div>
            </div>
            <div className="hero-stat-divider"></div>
            <div>
              <div className="hero-stat-value">99.9%</div>
              <div className="hero-stat-label">Uptime</div>
            </div>
          </div>
        </div>

        <div className="hero-card-wrapper">
          <div className="hero-card">
            <div className="hero-card-header">
              <div>
                <p className="hero-card-balance-label">Total Balance</p>
                <p className="hero-card-balance">$48,352.87</p>
              </div>
              <div className="hero-card-change">
                <ArrowUpIcon /> +12.5%
              </div>
            </div>

            <div className="hero-chart">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                <div
                  key={i}
                  className="hero-chart-bar"
                  style={{ height: `${h}%` }}
                ></div>
              ))}
            </div>

            <div className="hero-actions">
              <button className="hero-action">
                <div className="hero-action-icon">
                  <SendIcon />
                </div>
                <p className="hero-action-label">Send</p>
              </button>
              <button className="hero-action">
                <div className="hero-action-icon">
                  <ArrowDownIcon />
                </div>
                <p className="hero-action-label">Receive</p>
              </button>
              <button className="hero-action">
                <div className="hero-action-icon">
                  <ChartIcon />
                </div>
                <p className="hero-action-label">Invest</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FeaturesPreview = () => {
  const features = [
    {
      icon: <LightningIcon />,
      title: "Instant Transfers",
      desc: "Send money globally in seconds with zero fees.",
    },
    {
      icon: <ShieldIcon />,
      title: "Bank-Grade Security",
      desc: "Military-grade encryption and 2FA authentication.",
    },
    {
      icon: <ChartIcon />,
      title: "Smart Investing",
      desc: "AI-powered investment recommendations.",
    },
    {
      icon: <GlobeIcon />,
      title: "Global Access",
      desc: "Multi-currency support in 180+ countries.",
    },
    {
      icon: <CreditCardIcon />,
      title: "Virtual Cards",
      desc: "Unlimited virtual cards for secure shopping.",
    },
    {
      icon: <WalletIcon />,
      title: "Crypto Ready",
      desc: "Buy, sell, and hold cryptocurrencies.",
    },
  ];

  return (
    <section className="features-preview">
      <div className="features-preview-container">
        <div className="features-preview-header">
          <h2 className="features-preview-title">
            Everything you need to{" "}
            <span className="gradient-text">manage money</span>
          </h2>
          <p className="features-preview-subtitle">
            Powerful features designed to give you complete control over your
            finances.
          </p>
        </div>

        <div className="features-preview-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Startup Founder",
      text: "Wealsh transformed how I manage my business finances. The instant transfers and analytics are game-changers.",
      avatar: "SC",
    },
    {
      name: "Marcus Johnson",
      role: "Freelancer",
      text: "Finally, a platform that understands freelancers. Multi-currency support and low fees saved me thousands.",
      avatar: "MJ",
    },
    {
      name: "Elena Rodriguez",
      role: "Investor",
      text: "The investment features are incredible. AI recommendations helped me grow my portfolio by 40% this year.",
      avatar: "ER",
    },
  ];

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">
            Loved by <span className="gradient-text">thousands</span>
          </h2>
          <p className="testimonials-subtitle">
            See what our customers have to say
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{testimonial.avatar}</div>
                <div>
                  <div className="testimonial-name">{testimonial.name}</div>
                  <div className="testimonial-role">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => (
  <section className="cta">
    <div className="cta-container">
      <h2 className="cta-title">
        Ready to transform your <span className="gradient-text">finances?</span>
      </h2>
      <p className="cta-description">
        Join over 2 million users who trust Wealsh with their money. Start free
        today.
      </p>
      <div className="cta-buttons">
        <Link to="/register" className="cta-btn-primary">
          Get Started Free
        </Link>
        <button className="cta-btn-secondary">Talk to Sales</button>
      </div>
    </div>
  </section>
);

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturesPreview />
      <Testimonials />
      <CTA />
    </>
  );
};

export default Home;
