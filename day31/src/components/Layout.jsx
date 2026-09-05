import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <h1>Addis Eats</h1>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/checkout">Checkout</Link>
        </nav>
      </header>
      <main style={{ padding: '1rem' }}>
        {/* Outlet is where the individual pages will appear */}
        <Outlet /> 
      </main>
    </div>
  );
}

export default Layout;