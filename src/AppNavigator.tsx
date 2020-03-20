import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import { HomeScreenCreator, AdminScreenCreator } from './factory';

const AppNavigator = () => (
  <HashRouter basename="sca-schedules">
    <Route exact path="/" component={HomeScreenCreator} />
    <Route exact path="/admin" component={AdminScreenCreator} />
  </HashRouter>
);

export default AppNavigator;
