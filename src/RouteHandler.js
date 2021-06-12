import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogged } from './helpers/AuthHandler';

const RouteHandler = ({ children, ...routeProps }) => {
  let logged = isLogged();
  let authorized = routeProps.private && !logged ? false : true;

  return (
    <Route
      {...routeProps}
      render={() => (authorized ? children : <Redirect to="/signin" />)}
    />
  );
};

export default RouteHandler;
