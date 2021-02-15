import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';

const ProtectedRoute = ({ ...rest }) => {
  const user = getCurrentUser();
  if (user) {
    return <Route {...rest} />;
  } else {
    return <Redirect to='/auth' />;
  }
};

export default ProtectedRoute;
