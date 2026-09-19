import { memo, useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { DishModal } from './DishModal';

export const DishCard = memo(function DishCard({ dish }) {
  const addItem = useCartStore((state) => state.addItem);
  const [forceError, setForceError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (forceError) throw new Error(`Crashed while rendering ${dish.name}!`);

  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
      <h3>{dish.name}</h3>
      <p>{dish.price} ETB</p>
      
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <button onClick={() => addItem(dish)} style={{ background: '#1976d2', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: '4px' }}>Add to Cart</button>
        <button onClick={() => setIsModalOpen(true)} style={{ background: '#eee', border: 'none', padding: '0.5rem', borderRadius: '4px' }}>Details</button>
        <button onClick={() => setForceError(true)} style={{ background: '#d32f2f', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: '4px' }}>Crash Me</button>
      </div>

      {isModalOpen && <DishModal dish={dish} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
});