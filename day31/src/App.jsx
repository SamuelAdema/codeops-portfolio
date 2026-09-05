import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Menu from './pages/Menu';
import Dish from './pages/Dish';
import Checkout from './pages/Checkout';
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="menu" element={<Menu />} />
          <Route path="menu/:id" element={<Dish />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="checkout" element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          } />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;