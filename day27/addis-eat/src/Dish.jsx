import React from 'react';
import PropTypes from 'prop-types';
import Card from './card';


function Dish({ name, price, spicy, currency = "ETB" }) {
  return (
    <Card>
      <h3>{name}</h3>
      <p>{price} {currency}</p>
      {spicy && <span style={{ color: 'red', fontWeight: 'bold' }}>🌶️ Spicy</span>}
    </Card>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string
};

export default Dish;