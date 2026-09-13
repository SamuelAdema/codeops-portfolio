import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to ShopSphere</h1>
          <p>Your premium destination for modern electronics, fashion, and lifestyle essentials.</p>
          <Link to="/products" className="btn-primary">Shop All Products</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Explore ShopSphere</h2>
          <div className="divider"></div>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Featured Products</h3>
            <p>Discover our top-rated items handpicked just for you.</p>
            <Link to="/products" className="btn-outline">View Products</Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📁</div>
            <h3>Browse Categories</h3>
            <p>Find exactly what you need by exploring our departments.</p>
            <Link to="/categories" className="btn-outline">View Categories</Link>
          </div>
        </div>
      </section>

      {/* Promotional Section */}
      <section className="promo-section">
        <div className="promo-content">
          <h2>🔥 Weekly Deals</h2>
          <p>Get up to 30% off on all new tech gadgets and smart devices.</p>
          <Link to="/products?category=smartphones" className="btn-secondary">Shop Smartphones</Link>
        </div>
      </section>
    </div>
  );
}