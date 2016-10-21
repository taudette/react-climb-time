import React from 'react';
import { Route } from 'react-router';
import App from './components/App';
import Login from './components/Login';
import Home from './components/Home';
import Climbers from './components/Climbers'
import AddClimber from './components/AddClimber';
import AuthService from './utils/AuthService'


const auth = new AuthService('MIEC7uTda0Vz75qw3ZK8RX4fKysfxDtX', 'tyleraudette.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
  }
};

export default (
  <Route component={App} auth={auth}>
    <Route path='/' component={Home} />
    <Route path='/login' component={Login} auth={auth} />
    <Route path='/post' component={AddClimber} />
    <Route path='/climbers' component={Climbers} />
  </Route>
);