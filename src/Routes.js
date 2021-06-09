import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Sobre from './pages/Sobre/Sobre';
import NotFound from './pages/NotFound/NotFound';
import SignIn from './pages/SignIn/SignIn';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/sobre">
        <Sobre />
      </Route>
      <Route exact path="/signin">
        <SignIn />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
