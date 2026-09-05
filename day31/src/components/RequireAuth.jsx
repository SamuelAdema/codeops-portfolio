import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }) {
  const isAuthenticated = false; // Change to true to let users into Checkout
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  return children;
}

export default RequireAuth;