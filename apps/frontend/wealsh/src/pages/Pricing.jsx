import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckIcon } from "../components/Icons";
import "./Pricing.css";

const Pricing = () => {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: "Basic",
      description: "Perfect for getting started",
      price: annual ? 0 : 0,
      features: [
        "Up to $10,000/month transfers",
        "Basic analytics dashboard",
        "2 virtual cards",
        "Email support",
        "Mobile app access",
        "Standard security",
      ],
      popular: false,
      cta: "Start Free",
    },
    {
      name: "Pro",
      description: "For growing businesses",
      price: annual ? 12 : 15,
      features: [
        "Unlimited transfers",
        "Advanced analytics & reports",
        "Unlimited virtual cards",
        "Priority 24/7 support",
        "Crypto trading",
        "AI investment insights",
        "Multi-currency accounts",
        "Team access (up to 5)",
      ],
      popular: true,
      cta: "Start Pro Trial",
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      price: annual ? 49 : 59,
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "Custom API access",
        "White-label options",
        "SLA guarantee",
        "Unlimited team members",
        "Custom integrations",
        "On-premise deployment",
      ],
      popular: false,
      cta: "Contact Sales",
    },
  ];

  const faqs = [
    {
      q: "Can I switch plans anytime?",
      a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
    },
    {
      q: "Is there a free trial?",
      a: "Yes! Pro plan comes with a 14-day free trial. No credit card required.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards, bank transfers, and cryptocurrency payments.",
    },
    {
      q: "Can I cancel my subscription?",
      a: "Absolutely. You can cancel anytime with no questions asked. We offer pro-rata refunds.",
    },
  ];

  return (
    <div className="pricing-page">
      <section className="pricing-hero">
        <div className="pricing-container">
          <div className="pricing-header">
            <h1 className="pricing-title">
              Simple, transparent <span className="gradient-text">pricing</span>
            </h1>
            <p className="pricing-subtitle">
              Choose the plan that works best for you. All plans include our
              core features with no hidden fees.
            </p>

            <div className="pricing-toggle">
              <button
                onClick={() => setAnnual(true)}
                className={`pricing-toggle-btn ${annual ? "active" : ""}`}
              >
                Annual (Save 20%)
              </button>
              <button
                onClick={() => setAnnual(false)}
                className={`pricing-toggle-btn ${!annual ? "active" : ""}`}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="pricing-cards">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`pricing-card ${plan.popular ? "popular" : ""}`}
              >
                {plan.popular && (
                  <div className="pricing-card-badge">Most Popular</div>
                )}
                <h3 className="pricing-card-name">{plan.name}</h3>
                <p className="pricing-card-description">{plan.description}</p>
                <div className="pricing-card-price">
                  <span className="pricing-card-price-value">
                    ${plan.price}
                  </span>
                  <span className="pricing-card-price-period">/month</span>
                </div>
                <ul className="pricing-card-features">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="pricing-card-feature">
                      <span className="pricing-card-feature-icon">
                        <CheckIcon />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`pricing-card-btn ${
                    plan.popular ? "primary" : "secondary"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing-comparison">
        <div className="pricing-comparison-container">
          <h2 className="pricing-comparison-title">Compare all features</h2>
          <div className="pricing-table-wrapper">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Basic</th>
                  <th className="highlight">Pro</th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Monthly transfers", "$10,000", "Unlimited", "Unlimited"],
                  ["Virtual cards", "2", "Unlimited", "Unlimited"],
                  ["Team members", "1", "5", "Unlimited"],
                  ["API access", "✗", "✓", "Custom"],
                  ["Crypto trading", "✗", "✓", "✓"],
                  ["Priority support", "✗", "✓", "✓"],
                  ["Dedicated manager", "✗", "✗", "✓"],
                  ["White-label", "✗", "✗", "✓"],
                ].map((row, index) => (
                  <tr key={index}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                    <td>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="pricing-faq">
        <div className="pricing-faq-container">
          <h2 className="pricing-faq-title">Frequently asked questions</h2>
          <div className="pricing-faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="pricing-faq-item">
                <h3 className="pricing-faq-question">{faq.q}</h3>
                <p className="pricing-faq-answer">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing-cta">
        <div className="pricing-cta-container">
          <h2 className="pricing-cta-title">Still have questions?</h2>
          <p className="pricing-cta-description">
            Our team is here to help you find the perfect plan for your needs.
          </p>
          <button className="btn btn-primary btn-lg">Contact Sales</button>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
