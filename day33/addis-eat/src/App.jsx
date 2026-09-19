import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { DishCard } from './components/DishCard';
import { CartBadge } from './components/CartBadge';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutForm } from './components/CheckoutForm';

const sampleDishes = [
  { id: '1', name: 'Doro Wat Combo', price: 350 },
  { id: '2', name: 'Kitfo Special', price: 400 },
  { id: '3', name: 'Shiro Beyaynetu', price: 200 },
];

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', background: '#fdfdfd' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
            <h1>Addis Eats</h1>
            <CartBadge />
          </header>

          <main>
            <section style={{ marginBottom: '2rem' }}>
              <h2>Menu</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {sampleDishes.map((dish) => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
              </div>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <CartDrawer />
            </section>

            <section>
              <CheckoutForm />
            </section>
          </main>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}