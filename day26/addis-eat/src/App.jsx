import React from 'react';
import Dish from './Dish';

// Header Component
const Header = () => {
  return (
    <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
      <h1>Addis Eats Menu</h1>
      <p>Authentic Ethiopian Cuisine</p>
    </header>
  );
};

// Static array of dishes
const menuData = [
  { id: 'd1', name: 'Doro Wat', price: 18.99 },
  { id: 'd2', name: 'Shiro', price: 14.50 },
  { id: 'd3', name: 'Kitfo', price: 20.00 },
  { id: 'd4', name: 'Awaze Tibs', price: 17.75 }
];

function App() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <Header />
      
      <main>
        {/* Render the array of dishes using map and unique keys */}
        {menuData.map((dish) => (
          <Dish 
            key={dish.id} 
            name={dish.name} 
            price={dish.price} 
          />
        ))}
      </main>
    </div>
  );
}

export default App;