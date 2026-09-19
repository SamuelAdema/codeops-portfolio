import { Link } from 'react-router-dom';

export default function Receipt() {
  return (
    <div style={{ textAlign: 'center', padding: '3rem', background: '#e6f4ea', borderRadius: '8px' }}>
      <h2 style={{ color: '#137333' }}>Order Confirmed! 🎉</h2>
      <p>Thank you for ordering with Addis Eats. Your food is on the way.</p>
      <Link to="/" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.75rem 1.5rem', background: '#1976d2', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>
        Return to Menu
      </Link>
    </div>
  );
}