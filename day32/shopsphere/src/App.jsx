import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Import Components
import Navbar from './components/Navbar';

// Import Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <CartProvider>
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </CartProvider>
  );
}

export default App;