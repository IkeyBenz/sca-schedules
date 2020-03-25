import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import { HomeScreenCreator, AdminScreenCreator, AttachmentsAdminScreenCreator, AttachmentsScreenCreator, FormScreenCreator, IndexScreenCreator } from './factory';

const AppNavigator = () => (
  <HashRouter>
    <Route exact path="/" component={IndexScreenCreator} />
    <Route exact path="/classes" component={HomeScreenCreator} />
    <Route exact path="/minyanim" component={HomeScreenCreator} />
    <Route exact path="/letters" component={AttachmentsScreenCreator} />
    <Route exact path="/tehillim" component={FormScreenCreator} />
    <Route exact path="/admin" component={AdminScreenCreator} />
    <Route exact path="/admin/letters" component={AttachmentsAdminScreenCreator} />
  </HashRouter>
);

export default AppNavigator;
