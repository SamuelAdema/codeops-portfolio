import { useCartStore } from '../store/useCartStore';

export function CartBadge() {
  // Narrow selector: recalculates item count only when items change
  const itemCount = useCartStore((state) => 
    state.items.reduce((sum, i) => sum + i.quantity, 0)
  );

  return <span style={{ fontWeight: 'bold' }}>🛒 Cart ({itemCount})</span>;
}