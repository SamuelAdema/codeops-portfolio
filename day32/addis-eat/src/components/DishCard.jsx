import { useCartStore } from '../store/useCartStore';

export function DishCard({ dish }) {
  // Selecting actions never causes unnecessary re-renders
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem' }}>
      <h3>{dish.name}</h3>
      <p>${dish.price}</p>
      <button onClick={() => addItem(dish)}>Add to Cart</button>
    </div>
  );
}