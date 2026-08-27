// src/Menu.jsx
import React from 'react';
import Dish from './Dish';

function Menu({ dishes, category }) {
  // 1. Filter the dishes by the requested category
  const shownDishes = dishes.filter((dish) => dish.category === category);

  // 2. EARLY RETURN: If the filtered list is empty, show a fallback message
  if (shownDishes.length === 0) {
    return <p>No {category} dishes available right now.</p>;
  }

  // 3. RENDER LIST: Map through the filtered list and pass the data to Dish
  return (
    <div>
      <h2>{category} Menu</h2>
      {shownDishes.map((dish) => (
        <Dish 
          key={dish.id} // STABLE KEY: Required by React for lists
          {...dish}     // SPREAD: Passes all object properties (name, price, spicy) as props
        />
      ))}
    </div>
  );
}

export default Menu;