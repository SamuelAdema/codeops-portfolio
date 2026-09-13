import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function ProductCard({ product }) {
  // Pull the addToCart function from your context
  const { addToCart } = useContext(CartContext);

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
          <Link to={`/products/${product.id}`} className="btn-outline-sm">
            View Details
          </Link>
          
          {/* Fixed Button: Now actually calls addToCart */}
          <button 
            onClick={() => addToCart(product)} 
            className="btn-primary-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}