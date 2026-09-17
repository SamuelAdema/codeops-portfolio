import { useCartStore } from '../store/useCartStore';

export function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  if (items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div style={{ background: '#f9f9f9', padding: '1rem', marginTop: '1rem' }}>
      <h3>Your Order</h3>
      {items.map((item) => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0' }}>
          <span>{item.name} (x{item.quantity})</span>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <button onClick={clearCart} style={{ marginTop: '0.5rem' }}>Clear Cart</button>
    </div>
  );
}