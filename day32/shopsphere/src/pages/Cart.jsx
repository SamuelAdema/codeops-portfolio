import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  // NEW: Pulling clearCart from context
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    alert("✅ Checkout successful! Thank you for your purchase.");
    clearCart(); // This will empty the cart!
  };

  // ... (Leave the rest of the return statement exactly the same as before)

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2>Your Cart is Empty</h2>
        <p style={{ color: '#718096', marginBottom: '2rem' }}>Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Your Shopping Cart</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {cart.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #edf2f7', paddingBottom: '1rem' }}>
            <img src={item.thumbnail} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'contain', background: '#f8fafc', borderRadius: '8px' }} />
            
            <div style={{ flex: 1, margin: '0 1.5rem' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{item.title}</h3>
              <p style={{ margin: 0, fontWeight: 'bold', color: '#007bff' }}>${item.price}</p>
            </div>
            
            <button onClick={() => removeFromCart(item.id)} className="btn-secondary">
              Remove
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'right', padding: '2rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #edf2f7' }}>
        <h2 style={{ margin: '0 0 1rem 0' }}>Total: ${totalPrice.toFixed(2)}</h2>
        <button onClick={handleCheckout} className="btn-primary" style={{ width: '100%', maxWidth: '300px', fontSize: '1.1rem' }}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}