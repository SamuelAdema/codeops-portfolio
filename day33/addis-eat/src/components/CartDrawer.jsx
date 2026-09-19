import { useCartStore } from '../store/useCartStore';

export function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  if (items.length === 0) return <p style={{ color: '#666' }}>Your cart is empty.</p>;

  return (
    <div style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '8px', border: '1px solid #eee' }}>
      <h3>Your Order Summary</h3>
      {items.map((item) => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.5rem 0', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>
          <span>{item.name} (x{item.quantity}) - {item.price * item.quantity} ETB</span>
          <button 
            onClick={() => removeItem(item.id)}
            style={{ background: '#d32f2f', color: '#fff', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '4px', cursor: 'pointer' }}
          >
            Remove
          </button>
        </div>
      ))}
      <button 
        onClick={clearCart} 
        style={{ marginTop: '0.5rem', background: '#616161', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
      >
        Clear Cart
      </button>
    </div>
  );
}