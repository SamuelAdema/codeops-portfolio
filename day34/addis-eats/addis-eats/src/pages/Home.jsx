import { Link } from 'react-router-dom';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { DishCard } from '../components/DishCard';
import { CartDrawer } from '../components/CartDrawer';

const sampleDishes = [
  { id: '1', name: 'Doro Wat Combo', price: 350 },
  { id: '2', name: 'Kitfo Special', price: 400 },
  { id: '3', name: 'Shiro Beyaynetu', price: 200 },
];

export default function Home() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
      <ErrorBoundary>
        <section>
          <h2>Menu</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {sampleDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        </section>
      </ErrorBoundary>

      <ErrorBoundary>
        <section>
          <CartDrawer />
          <Link to="/checkout" style={{ display: 'block', marginTop: '1rem', textAlign: 'center', padding: '0.75rem', background: '#2e7d32', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>
            Proceed to Checkout
          </Link>
        </section>
      </ErrorBoundary>
    </div>
  );
}