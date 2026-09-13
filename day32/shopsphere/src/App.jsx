import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import all our pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import About from './pages/About';
import NotFound from './pages/NotFound';

import './index.css'; 

function App() {
  return (
    <div className="app-container">
      <Navbar />
      
      <main className="main-content">
        {/* The Routes component acts like a switchboard */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          
          {/* The * catches any URL that doesn't match the ones above */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;