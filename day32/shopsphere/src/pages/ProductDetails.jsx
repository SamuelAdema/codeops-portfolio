import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // 1. Import the hook

export default function ProductDetails() {
  const { id } = useParams(); 
  const { addToCart } = useCart(); // 2. Extract the function
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch product details');
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}><h2>Loading product...</h2></div>;
  if (error) return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}><h2>Error: {error}</h2></div>;

  return (
    <div className="product-details-container">
      <Link to="/products" className="back-link">← Back to Products</Link>
      
      <div className="details-grid">
        <img src={product.thumbnail} alt={product.title} className="details-image" />
        
        <div className="details-info">
          <h2>{product.title}</h2>
          <p className="category">Category: {product.category}</p>
          <p className="rating">Rating: ⭐ {product.rating}</p>
          <p className="price">${product.price.toFixed(2)}</p>
          
          <h3>Description:</h3>
          <p className="description">{product.description}</p>
          
          {/* 3. Add the onClick event listener */}
          <button 
            className="btn-add" 
            style={{ marginTop: '20px', padding: '10px 20px', fontSize: '1.1rem' }}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}