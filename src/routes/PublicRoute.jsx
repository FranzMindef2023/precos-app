import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PublicRoute = ({ children }) => {
  const token = Cookies.get('token');

  // Si ya está autenticado, redirigir al dashboard
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  // Si no hay token, permitir el acceso a la ruta pública
  return children;
};

export default PublicRoute;
