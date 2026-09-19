import { useCartStore } from '../store/useCartStore';

export function CartBadge() {
  const itemCount = useCartStore((state) => 
    state.items.reduce((sum, i) => sum + i.quantity, 0)
  );

  return <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>🛒 Cart ({itemCount})</span>;
}