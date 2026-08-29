import { useState } from 'react';
import { dishes, categories } from './data';
import CategoryBar from './CategoryBar';
import DishList from './DishList';
import OrderForm from './OrderForm';

export default function Menu() {
  // Lifted States
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [orderTotal, setOrderTotal] = useState(0);

  // Derived state for filtering
  const filteredDishes = selectedCategory === 'All' 
    ? dishes 
    : dishes.filter(dish => dish.category === selectedCategory);

  // State handler to pass down
  const handleAddToTotal = (price) => {
    setOrderTotal(prevTotal => prevTotal + price);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Addis Eats 🇪🇹</h1>
      
      <CategoryBar 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelect={setSelectedCategory} 
      />
      
      <DishList 
        dishes={filteredDishes} 
        onAddToTotal={handleAddToTotal} 
      />
      
      <OrderForm total={orderTotal} />
    </div>
  );
}