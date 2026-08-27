import React from 'react';

function Dish({ name, price }) {
  return (
    <div style={styles.card}>
      <h2>{name}</h2>
      <p>${price.toFixed(2)}</p>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '12px 0',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }
};

export default Dish;