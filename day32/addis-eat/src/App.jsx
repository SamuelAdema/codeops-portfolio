import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { DishCard } from './components/DishCard';
import { CartBadge } from './components/CartBadge';
import { CartDrawer } from './components/CartDrawer';

const sampleDishes = [
  { id: '1', name: 'Burger', price: 10 },
  { id: '2', name: 'Pizza', price: 15 },
  { id: '3', name: 'Pasta', price: 12 },
];

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h1>My Restaurant App</h1>
            <CartBadge />
          </header>

          <main>
            <h2>Menu</h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {sampleDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
            
            <CartDrawer />
          </main>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}