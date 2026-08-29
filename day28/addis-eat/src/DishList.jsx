import Dish from './Dish';

export default function DishList({ dishes, onAddToTotal }) {
  return (
    <div className="dish-list">
      {dishes.length > 0 ? (
        dishes.map(dish => (
          <Dish key={dish.id} dish={dish} onAdd={onAddToTotal} />
        ))
      ) : (
        <p>No dishes found for this category.</p>
      )}
    </div>
  );
}