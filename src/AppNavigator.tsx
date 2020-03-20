import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { HomeScreenCreator, AdminScreenCreator } from './factory';

const AppNavigator = () => (
  <BrowserRouter basename="sca-schedules">
    <Route exact path="/" component={HomeScreenCreator} />
    <Route exact path="/admin" component={AdminScreenCreator} />
  </BrowserRouter>
);

export default AppNavigator;
