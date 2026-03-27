import React, { memo } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../redux/authSlice';
import { ROUTES } from '../constants';

const PrivateRoute = memo(({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  
  return children;
});

PrivateRoute.displayName = 'PrivateRoute';

export default PrivateRoute;
