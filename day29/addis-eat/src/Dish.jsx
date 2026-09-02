import React from 'react';
import PropTypes from 'prop-types';
import Card from './card';
import { useState } from 'react';

export default function Dish({ dish, onAdd }) {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount(c => c + 1);
    onAdd(dish.price);
  };

  return (
    <div className="dish-card" style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem 0' }}>
      <h3>{dish.name} {dish.spicy && '🌶️'}</h3>
      <p>Price: <strong>{dish.price} ETB</strong></p>
      <p>Quantity in cart: {count}</p>
      <button onClick={handleAdd}>Add to Order</button>
    </div>
  );
}