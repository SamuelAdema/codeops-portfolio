import { useCartStore } from '../store/useCartStore';

export function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  if (items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '8px', border: '1px solid #eee' }}>
      <h3>Your Order</h3>
      {items.map((item) => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0' }}>
          <span>{item.name} (x{item.quantity})</span>
          <button onClick={() => removeItem(item.id)} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: '4px' }}>Remove</button>
        </div>
      ))}
      <button onClick={clearCart} style={{ marginTop: '1rem', padding: '0.5rem' }}>Clear Cart</button>
    </div>
  );
}