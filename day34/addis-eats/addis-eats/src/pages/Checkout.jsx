import { CheckoutForm } from '../components/CheckoutForm';
import { Link } from 'react-router-dom';

export default function Checkout() {
  return (
    <div>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '1rem', textDecoration: 'none', color: '#1976d2' }}>&larr; Back to Menu</Link>
      <CheckoutForm />
    </div>
  );
}