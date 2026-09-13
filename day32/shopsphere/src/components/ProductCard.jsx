import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // 1. Import the hook

export default function ProductCard({ product }) {
  // 2. Extract the addToCart function from our context
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} className="product-image" />
      <h3>{product.title}</h3>
      <p className="category">{product.category}</p>
      <p className="rating">⭐ {product.rating}</p>
      <p className="price">${product.price.toFixed(2)}</p>
      
      <div className="card-buttons">
        <Link to={`/products/${product.id}`} className="btn-details" style={{ display: 'block', textDecoration: 'none', textAlign: 'center' }}>
          View Details
        </Link>
        
        {/* 3. Add the onClick event listener */}
        <button 
          className="btn-add" 
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}