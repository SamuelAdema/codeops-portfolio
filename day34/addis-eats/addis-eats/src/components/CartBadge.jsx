import { useCartStore } from '../store/useCartStore';

export function CartBadge() {
  const count = useCartStore((state) => state.items.reduce((sum, i) => sum + i.quantity, 0));
  return <span style={{ fontWeight: 'bold' }}>🛒 Cart ({count})</span>;
}