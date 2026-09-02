import { useState, useEffect, useRef } from 'react';
import CategoryBar from './CategoryBar';
import DishList from './DishList';
import OrderForm from './OrderForm';

// We hardcode categories here since we are fetching the dishes
const categories = ["All", "Appetizer", "Main", "Drink"];

export default function Menu() {
  const [dishes, setDishes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [orderTotal, setOrderTotal] = useState(0);
  
  // Day 28: New loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Day 28: Ref for the search input
  const searchInputRef = useRef(null);

  // 1. Auto-focus the search input when the component first loads
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []); // Empty array means this runs only once on mount

  // 2. Fetch data whenever the selectedCategory changes
  useEffect(() => {
    // AbortController lets us cancel the fetch if the user clicks a new category really fast
    const controller = new AbortController();
    
    const fetchDishes = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const res = await fetch('/menu.json', { signal: controller.signal });
        
        // Check res.ok and throw a clear message
        if (!res.ok) {
          throw new Error(`Failed to load menu: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        
        // Simulate a database filter based on category
        if (selectedCategory === 'All') {
          setDishes(data);
        } else {
          setDishes(data.filter(dish => dish.category === selectedCategory));
        }
        
      } catch (err) {
        // Ignore the error if it was just us intentionally aborting the request
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDishes();

    // Cleanup function: Abort the previous request if category changes before fetch finishes
    return () => {
      controller.abort();
    };
  }, [selectedCategory]); // Refetch when category changes

  const handleAddToTotal = (price) => {
    setOrderTotal(prevTotal => prevTotal + price);
  };

  // Day 28: Early returns for loading and error states
  if (error) {
    return <div style={{ color: 'red', padding: '20px' }}><h2>Error!</h2><p>{error}</p></div>;
  }

  if (isLoading) {
    return <div style={{ padding: '20px' }}><h2>Loading fresh ingredients... 🍳</h2></div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Addis Eats 🇪🇹</h1>
      
      {/* Day 28: Auto-focused Search Field */}
      <input 
        type="text"
        ref={searchInputRef}
        placeholder="Search menu... (Auto-focused!)"
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />
      
      <CategoryBar 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelect={setSelectedCategory} 
      />
      
      <DishList 
        dishes={dishes} 
        onAddToTotal={handleAddToTotal} 
      />
      
      <OrderForm total={orderTotal} />
    </div>
  );
}