import { useSearchParams, Link } from 'react-router-dom';

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  const dishes = [
    { id: '1', name: 'Shiro Wot', category: 'vegan' },
    { id: '2', name: 'Doro Wot', category: 'meat' },
    { id: '3', name: 'Misir Wot', category: 'vegan' }
  ];

  const displayedDishes = categoryFilter 
    ? dishes.filter(dish => dish.category === categoryFilter)
    : dishes;

  return (
    <div>
      <h2>Our Menu</h2>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setSearchParams({ category: 'vegan' })}>Vegan</button>
        <button onClick={() => setSearchParams({ category: 'meat' })}>Meat</button>
        <button onClick={() => setSearchParams({})}>All</button>
      </div>
      <ul>
        {displayedDishes.map(dish => (
          <li key={dish.id}>
            <Link to={`/menu/${dish.id}`}>{dish.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;