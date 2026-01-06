import { useState } from "react";
import "./Newsletter.css";
function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };
  return (
    <section className="newsletter">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <span className="newsletter-badge">Stay Updated</span>
          <h2 className="newsletter-title">Subscribe to Our Newsletter</h2>
          <p className="newsletter-description">
            Get exclusive access to new arrivals, special offers, and fashion
            tips delivered straight to your inbox.
          </p>
          {isSubscribed ? (
            <div className="success-message">
              <span className="success-icon">✓</span>
              <span>
                Thank you for subscribing! Check your inbox for a special
                welcome offer.
              </span>
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          )}
          <p className="newsletter-note">
            🎁 Get 15% off your first order when you subscribe!
          </p>
        </div>
        <div className="newsletter-image">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=600&fit=crop"
            alt="Fashion Newsletter"
          />
        </div>
      </div>
    </section>
  );
}
export default Newsletter;
