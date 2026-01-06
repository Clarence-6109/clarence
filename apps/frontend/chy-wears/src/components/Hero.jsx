import "./Hero.css";
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <span className="hero-badge">New Collection 2024</span>
        <h1 className="hero-title">
          Discover Your
          <span className="highlight"> Unique Style</span>
        </h1>
        <p className="hero-description">
          Explore our curated collection of elegant women's fashion. From casual
          chic to evening glamour, find pieces that celebrate your
          individuality.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary">Shop Now</button>
          <button className="btn btn-secondary">View Lookbook</button>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">500+</span>
            <span className="stat-label">Products</span>
          </div>
          <div className="stat">
            <span className="stat-number">50k+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat">
            <span className="stat-number">100%</span>
            <span className="stat-label">Quality</span>
          </div>
        </div>
      </div>
      <div className="hero-image">
        <div className="image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop"
            alt="Fashion Model"
          />
          <div className="floating-card card-1">
            <span className="card-icon">👗</span>
            <span className="card-text">New Arrivals</span>
          </div>
          <div className="floating-card card-2">
            <span className="card-icon">✨</span>
            <span className="card-text">50% Off</span>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Hero;
