import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (dish) => set((state) => {
        const existing = state.items.find((i) => i.id === dish.id);
        if (existing) {
          return { items: state.items.map(i => i.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i) };
        }
        return { items: [...state.items, { ...dish, quantity: 1 }] };
      }),
      removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'addis-eats-cart' }
  )
);