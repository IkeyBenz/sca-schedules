import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import { HomeScreenCreator, AdminScreenCreator, AttachmentsAdminScreenCreator, AttachmentsScreenCreator } from './factory';

const AppNavigator = () => (
  <HashRouter>
    <Route exact path="/" component={HomeScreenCreator} />
    <Route exact path="/letters" component={AttachmentsScreenCreator} />
    <Route exact path="/admin" component={AdminScreenCreator} />
    <Route exact path="/admin/letters" component={AttachmentsAdminScreenCreator} />
  </HashRouter>
);

export default AppNavigator;
