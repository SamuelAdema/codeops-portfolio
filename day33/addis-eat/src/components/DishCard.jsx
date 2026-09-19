import { useCartStore } from '../store/useCartStore';

export function DishCard({ dish }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', background: '#fff' }}>
      <h3>{dish.name}</h3>
      <p style={{ fontWeight: 'bold', color: '#2e7d32' }}>{dish.price} ETB</p>
      <button 
        onClick={() => addItem(dish)}
        style={{ padding: '0.5rem 1rem', background: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Add to Cart
      </button>
    </div>
  );
}