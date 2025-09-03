import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext.js';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(ProductsContext);
  const location = useLocation();

  if (!token) {
    toast.error("Please log in to access this page");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
