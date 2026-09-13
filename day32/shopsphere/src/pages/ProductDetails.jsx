import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams(); // Get the dynamic ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Correctly import addToCart from the Context!
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
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

  if (loading) return <div style={{ textAlign: 'center', marginTop: '3rem' }}><h2>Loading product details...</h2></div>;
  if (error) return <div style={{ textAlign: 'center', marginTop: '3rem', color: '#e53e3e' }}><h2>Error: {error}</h2><Link to="/products" className="btn-outline">Back to Products</Link></div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '1rem' }}>
      <Link to="/products" className="btn-outline" style={{ marginBottom: '2rem', display: 'inline-block' }}>
        ← Back to Products
      </Link>
      
      <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #edf2f7' }}>
        
        {/* Left Side: Image */}
        <div style={{ flex: '1 1 400px', backgroundColor: '#f8fafc', borderRadius: '12px', padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={product.thumbnail} alt={product.title} style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} />
        </div>
        
        {/* Right Side: Details */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
          <span className="product-badge" style={{ alignSelf: 'flex-start' }}>{product.category}</span>
          <h1 style={{ fontSize: '2.2rem', color: '#2d3748', margin: '0.5rem 0 1rem 0' }}>{product.title}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: '800', color: '#007bff' }}>${product.price}</span>
            <span style={{ fontSize: '1.1rem', color: '#718096' }}>⭐ {product.rating} / 5</span>
          </div>
          
          <p style={{ color: '#4a5568', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
            {product.description}
          </p>
          
          {/* Add to Cart Button */}
          <button 
            onClick={() => addToCart(product)} 
            className="btn-primary" 
            style={{ padding: '1rem', fontSize: '1.2rem', marginTop: 'auto', border: 'none' }}
          >
            Add to Cart
          </button>
        </div>
        
      </div>
    </div>
  );
}