import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // 1. Import our custom hook

export default function Navbar() {
  // 2. Grab the totalItems from our context
  const { totalItems } = useCart(); 

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>ShopSphere</h2>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/categories">Categories</Link></li>
        
        {/* 3. Display the dynamic totalItems variable */}
        <li><Link to="/cart">Cart ({totalItems})</Link></li>
        
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}