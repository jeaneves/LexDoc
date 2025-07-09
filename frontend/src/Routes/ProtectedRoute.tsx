import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import type { JSX } from 'react';

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Se não estiver autenticado, redireciona para o login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }}  />;
  }
  console.log("ProtectedRoute: isAuthenticated:", isAuthenticated);

  //return isAuthenticated ? children : <Navigate to="/" />;
  return children;
}
 