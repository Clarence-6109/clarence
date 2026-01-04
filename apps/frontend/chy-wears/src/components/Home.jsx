import "./Home.css";

const Home = () => {
  return (
    <div id="home" className="home-container">
      <div className="home-content">
        <div className="hero-section">
          <h2 className="hero-title">Welcome to Chy-Wears</h2>
          <p className="hero-description">
            Discover the latest trends in women's fashion. Elegant, stylish, and
            made just for you.
          </p>
          <button className="shop-now-button">Shop Now</button>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3 className="feature-title">Quality Fabrics</h3>
            <p className="feature-description">
              Premium materials for ultimate comfort
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3 className="feature-title">Free Shipping</h3>
            <p className="feature-description">On orders over $100</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💝</div>
            <h3 className="feature-title">Easy Returns</h3>
            <p className="feature-description">30-day return policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
