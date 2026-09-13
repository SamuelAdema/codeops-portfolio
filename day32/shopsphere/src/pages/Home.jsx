import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container">
      {/* 1. Website Introduction */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to ShopSphere</h1>
          <p>Your ultimate destination for electronics, fashion, and everyday essentials.</p>
          <Link to="/products" className="btn-shop-now">Shop All Products</Link>
        </div>
      </section>

      {/* 2. Featured Products & Categories Links */}
      <section style={{ textAlign: 'center', margin: '3rem 0' }}>
        <h2>Explore ShopSphere</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1.5rem' }}>
          <Link to="/products" className="btn-shop-now" style={{ backgroundColor: '#28a745' }}>
            ⭐ View Featured Products
          </Link>
          <Link to="/categories" className="btn-shop-now" style={{ backgroundColor: '#17a2b8' }}>
            📁 Browse by Category
          </Link>
        </div>
      </section>

      {/* 3. Promotional Section */}
      <section className="promo-section">
        <h2>🔥 Weekly Deals!</h2>
        <p>Get up to 30% off on all new tech gadgets and smart devices.</p>
        <Link to="/products?category=smartphones" className="btn-promo">Shop Smartphones</Link>
      </section>
    </div>
  );
}