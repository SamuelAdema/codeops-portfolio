import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // 1. Import the hook

export default function ProductCard({ product }) {
  // 2. Extract the addToCart function from our context
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={product.thumbnail} alt={product.title} />
      </div>
      
      <div className="product-details">
        <span className="product-badge">{product.category}</span>
        <h3 className="product-title">{product.title}</h3>
        
        <div className="product-meta">
          <span className="product-rating">⭐ {product.rating}</span>
          <span className="product-price">${product.price}</span>
        </div>
        
        <div className="product-actions">
          {/* Your routing and context functions remain the same! */}
          <Link to={`/products/${product.id}`} className="btn-outline-sm">
            View Details
          </Link>
          <button 
            onClick={() => {/* Keep your existing Add to Cart function here */}} 
            className="btn-primary-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
  
}