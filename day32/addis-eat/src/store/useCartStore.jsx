import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      
      addItem: (dish) => set((state) => {
        const existingIndex = state.items.findIndex((i) => i.id === dish.id);
        if (existingIndex > -1) {
          const updatedItems = [...state.items];
          updatedItems[existingIndex].quantity += 1;
          return { items: updatedItems };
        }
        return { items: [...state.items, { ...dish, quantity: 1 }] };
      }),

      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'restaurant-cart-storage', // Key used in localStorage
    }
  )
);