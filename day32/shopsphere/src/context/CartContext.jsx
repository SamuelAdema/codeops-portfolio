import { createContext, useState } from 'react';

// Create the Context
export const CartContext = createContext();

// Create the Provider Component
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Function to add an item
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`✅ ${product.title} has been added to your cart!`);
  };

  // Function to remove an item
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  // Function to empty the cart after checkout
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}