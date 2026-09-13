import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  // 1. Pull the cart array and the remove function from Context
  const { cart, removeFromCart } = useCart();

  // 2. Calculate the total price of all items
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // 3. Conditional rendering: If the cart is empty, show a friendly message
  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Your cart is empty!</h2>
        <Link to="/products" style={{ color: '#007bff', textDecoration: 'none', fontSize: '1.2rem' }}>
          Go find some great products ←
        </Link>
      </div>
    );
  }

  // 4. Render the cart items
  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.thumbnail} alt={item.title} className="cart-image" />
            
            <div className="cart-details">
              <h3>{item.title}</h3>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            
            <div className="cart-actions">
              <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
              <button 
                className="btn-remove" 
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <h2>Total: ${totalPrice.toFixed(2)}</h2>
        <button className="btn-checkout">Proceed to Checkout</button>
      </div>
    </div>
  );
}