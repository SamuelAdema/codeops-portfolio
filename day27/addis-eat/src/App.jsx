// src/App.jsx
import React from 'react';
import Menu from './Menu';
import { menuData } from './data'; // Import your raw data array

function App() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Addis Eats</h1>
      
      {/* We are asking the Menu to only show 'Main' dishes */}
      <Menu dishes={menuData} category="Main" />
    </div>
  );
}

export default App;