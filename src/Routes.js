import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Sobre from './pages/Sobre/Sobre';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/sobre">
        <Sobre />
      </Route>
    </Switch>
  );
};

export default Routes;
