import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const PrivateRoute = ({ element, ...rest }) => {
  const { currentUser } = getAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default PrivateRoute;
