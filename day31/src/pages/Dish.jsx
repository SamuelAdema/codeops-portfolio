import { useParams, Link } from 'react-router-dom';

function Dish() {
  const { id } = useParams();
  return (
    <div>
      <h2>Dish Details</h2>
      <p>You are viewing the details for dish ID: {id}</p>
      <Link to="/menu">&larr; Back to Menu</Link>
    </div>
  );
}

export default Dish;