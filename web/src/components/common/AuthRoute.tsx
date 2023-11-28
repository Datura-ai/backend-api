import React from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';

type AuthRouteProps = {
  isAuth: boolean; // Boolean indicating if the user is authenticated
} & RouteProps;

const AuthRoute: React.FC<AuthRouteProps> = ({ isAuth, ...rest }) => {
  return isAuth ? <Route {...rest} /> : <Navigate to="/login" />;
};

export default AuthRoute;
