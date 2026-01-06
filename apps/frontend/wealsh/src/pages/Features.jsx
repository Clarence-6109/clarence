import { Link } from "react-router-dom";
import {
  ChartIcon,
  CheckIcon,
  CreditCardIcon,
  GlobeIcon,
  LightningIcon,
  ShieldIcon,
  WalletIcon,
} from "../components/Icons";
import "./Features.css";

const Features = () => {
  const features = [
    {
      icon: <LightningIcon />,
      title: "Instant Transfers",
      desc: "Send money globally in seconds with zero fees on domestic transfers. Our lightning-fast infrastructure ensures your money arrives instantly.",
      benefits: [
        "Zero domestic fees",
        "Instant delivery",
        "Real-time tracking",
        "24/7 availability",
      ],
    },
    {
      icon: <ShieldIcon />,
      title: "Bank-Grade Security",
      desc: "Your funds are protected by military-grade encryption and multi-factor authentication. We take security seriously.",
      benefits: [
        "256-bit encryption",
        "Biometric login",
        "Fraud detection",
        "FDIC insured",
      ],
    },
    {
      icon: <ChartIcon />,
      title: "Smart Investing",
      desc: "AI-powered investment recommendations tailored to your financial goals. Build wealth with intelligent portfolio management.",
      benefits: [
        "AI recommendations",
        "Auto-rebalancing",
        "Tax optimization",
        "Diversified portfolios",
      ],
    },
    {
      icon: <GlobeIcon />,
      title: "Global Access",
      desc: "Access your money from anywhere with multi-currency support in over 180 countries. True financial freedom.",
      benefits: [
        "180+ countries",
        "50+ currencies",
        "Local bank transfers",
        "Competitive rates",
      ],
    },
    {
      icon: <CreditCardIcon />,
      title: "Virtual Cards",
      desc: "Create unlimited virtual cards for secure online shopping. Control spending and protect your main card.",
      benefits: [
        "Unlimited cards",
        "Spending limits",
        "Instant creation",
        "One-time use options",
      ],
    },
    {
      icon: <WalletIcon />,
      title: "Crypto Ready",
      desc: "Buy, sell, and hold cryptocurrencies seamlessly in your wallet. The future of finance at your fingertips.",
      benefits: [
        "50+ cryptocurrencies",
        "Low trading fees",
        "Secure storage",
        "Real-time prices",
      ],
    },
  ];

  return (
    <div className="features-page">
      <section className="features-hero">
        <div className="features-hero-container">
          <div className="features-hero-content">
            <h1 className="features-hero-title">
              Powerful features for{" "}
              <span className="gradient-text">modern finance</span>
            </h1>
            <p className="features-hero-description">
              Everything you need to manage, grow, and protect your money in one
              beautifully designed platform.
            </p>
            <Link to="/register" className="btn btn-primary btn-lg">
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-container">
          <div className="features-list">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-row ${index % 2 === 1 ? "reverse" : ""}`}
              >
                <div className="feature-content">
                  <div className="feature-content-icon">{feature.icon}</div>
                  <h2 className="feature-content-title">{feature.title}</h2>
                  <p className="feature-content-description">{feature.desc}</p>
                  <ul className="feature-benefits">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="feature-benefit">
                        <span className="feature-benefit-icon">
                          <CheckIcon />
                        </span>
                        <span className="feature-benefit-text">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="feature-visual">
                  <div className="feature-visual-inner">
                    <div className="feature-visual-icon">{feature.icon}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features-stats">
        <div className="features-stats-container">
          <div className="features-stats-header">
            <h2 className="features-stats-title">Trusted by millions</h2>
            <p className="features-stats-subtitle">
              Join the growing community of smart money managers
            </p>
          </div>
          <div className="features-stats-grid">
            {[
              { value: "$12B+", label: "Assets Managed" },
              { value: "2M+", label: "Active Users" },
              { value: "180+", label: "Countries" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat, index) => (
              <div key={index} className="features-stat-card">
                <div className="features-stat-value gradient-text">
                  {stat.value}
                </div>
                <div className="features-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features-cta">
        <div className="features-cta-container">
          <h2 className="features-cta-title">
            Ready to experience the future of{" "}
            <span className="gradient-text">banking?</span>
          </h2>
          <p className="features-cta-description">
            Join over 2 million users who trust Wealsh with their money.
          </p>
          <div className="features-cta-buttons">
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started Free
            </Link>
            <Link to="/pricing" className="btn btn-secondary btn-lg">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
