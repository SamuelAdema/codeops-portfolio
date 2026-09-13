import { Link } from 'react-router-dom';

export default function Categories() {
  const categories = [
    { id: "smartphones", label: "Smartphones", icon: "📱" },
    { id: "laptops", label: "Laptops", icon: "💻" },
    { id: "fragrances", label: "Fragrances", icon: "🌸" },
    { id: "skincare", label: "Skincare", icon: "✨" },
    { id: "groceries", label: "Groceries", icon: "🍎" },
    { id: "home-decoration", label: "Home Decoration", icon: "🏡" }
  ];

  return (
    <div className="categories-container">
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Shop by Category</h1>
      
      <div className="categories-grid">
        {categories.map((cat, index) => (
          <Link 
            to={`/products?category=${cat.id}`} 
            key={index} 
            className="category-card-link"
          >
            <div className="category-card-ui">
              <div className="category-icon">{cat.icon}</div>
              <h3>{cat.label}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}