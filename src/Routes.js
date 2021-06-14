import React from 'react';
import { Switch } from 'react-router-dom';

import RouteHandler from './RouteHandler';

import Home from './pages/Home/Home';
import Sobre from './pages/Sobre/Sobre';
import NotFound from './pages/NotFound/NotFound';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import AdPage from './pages/AdPage/AdPage';
import AddAd from './pages/AddAd/AddAd';
import Ads from './pages/Ads/Ads';

const Routes = () => {
  return (
    <Switch>
      <RouteHandler exact path="/">
        <Home />
      </RouteHandler>
      <RouteHandler exact path="/sobre">
        <Sobre />
      </RouteHandler>
      <RouteHandler exact path="/signin">
        <SignIn />
      </RouteHandler>
      <RouteHandler exact path="/signup">
        <SignUp />
      </RouteHandler>
      <RouteHandler exact path="/ad/:id">
        <AdPage />
      </RouteHandler>
      <RouteHandler private exact path="/post-an-ad">
        <AddAd />
      </RouteHandler>
      <RouteHandler exact path="/ads">
        <Ads />
      </RouteHandler>
      <RouteHandler>
        <NotFound />
      </RouteHandler>
    </Switch>
  );
};

export default Routes;
