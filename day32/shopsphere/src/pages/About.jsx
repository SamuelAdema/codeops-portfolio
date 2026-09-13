export default function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About ShopSphere</h1>
        <div className="divider"></div>
        <p className="lead-text">
          ShopSphere is a modern e-commerce platform designed to provide a seamless, lightning-fast shopping experience without page reloads.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <h3>🎯 Our Mission</h3>
          <p>To connect people with the products they love through an intuitive, accessible, and beautiful web experience.</p>
        </div>
        
        <div className="about-card">
          <h3>💻 Technology</h3>
          <p>Built completely from scratch using React 18, Vite, and React Router to demonstrate the power of Single Page Applications.</p>
        </div>
        
        <div className="about-card">
          <h3>🛒 Features</h3>
          <p>Featuring live search, dynamic category filtering, price sorting, and a fully functional global shopping cart.</p>
        </div>
      </div>
    </div>
  );
}