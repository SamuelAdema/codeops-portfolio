import { createContext, useContext, useState } from 'react';

// 1. Create the Context
const CartContext = createContext();

// 2. Create the Provider Component
export function CartProvider({ children }) {
  // State to hold our cart items
  const [cart, setCart] = useState([]);

  // Function to add an item to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if the item is already in the cart
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // If it is, increase the quantity
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      
      // If it's not, add it to the cart with a quantity of 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  // Calculate the total number of items in the cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // 3. Provide the state and functions to the rest of the app
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

// 4. Create a custom hook to easily use this context anywhere
export function useCart() {
  return useContext(CartContext);
}