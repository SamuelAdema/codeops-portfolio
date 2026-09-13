import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Calculate total items by adding up all the quantities
  const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0); 

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">ShopSphere</Link>
      </div>

      <button 
        className="mobile-menu-btn" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        ☰
      </button>

      <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
        <Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
        <Link to="/categories" onClick={() => setIsMobileMenuOpen(false)}>Categories</Link>
        <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
        <Link to="/cart" className="cart-link" onClick={() => setIsMobileMenuOpen(false)}>
          🛒 Cart <span className="cart-badge">{totalItems}</span>
        </Link>
      </div>
    </nav>
  );
}