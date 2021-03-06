import React, { useEffect } from 'react';
import { HashRouter, Route, Redirect, useHistory } from 'react-router-dom';
import ReactGa from 'react-ga';

import { Header, Footer } from './ui/components';
import {
  ClassesScreenCreator,
  AttachmentsAdminScreenCreator,
  AttachmentsScreenCreator,
  FormScreenCreator,
  IndexScreenCreator,
} from './factory';

interface RouteMap {
  [path: string]: RouteConfig;
}
interface RouteConfig {
  exact?: boolean;
  pageName?: string; // For display purposes
  Component: React.ComponentType;
}

const renderRoutes = (routes: RouteMap) =>
  Object.entries(routes).map(([path, { exact, Component }]) => (
    <Route path={path} exact={exact} component={Component} />
  ));

export const adminRoutes: RouteMap = {
  '/edit-letters': { exact: true, Component: AttachmentsAdminScreenCreator },
};

const AdminNavigator = () => (
  <HashRouter basename="/admin">{renderRoutes(adminRoutes)}</HashRouter>
);

const CompThatTracksLocation = () => {
  const history = useHistory();
  useEffect(
    () =>
      history.listen(location => {
        ReactGa.pageview(location.pathname);
      }),
    [history]
  );

  return null;
};

export const mainRoutes: RouteMap = {
  '/': { exact: true, Component: IndexScreenCreator, pageName: '' },
  '/today': {
    exact: true,
    Component: ClassesScreenCreator,
    // pageName: 'SCA Affiliate Synagogue - Virtual Classes Schedules',
  },
  '/classes': {
    exact: true,
    Component: ClassesScreenCreator,
    // pageName: 'SCA Affiliate Synagogue - Virtual Classes Schedules',
  },
  '/minyanim': {
    exact: true,
    Component: ClassesScreenCreator,
    // pageName: 'SCA Affiliate Synagogue - Virtual Minyanim Schedules',
  },
  '/bekhorot': {
    exact: true,
    Component: ClassesScreenCreator,
    pageName: 'SCA Affiliate Synagogue - Siyum Bekhorot Schedules',
  },
  '/letters': {
    exact: true,
    Component: AttachmentsScreenCreator,
    pageName: 'COVID-19 Letters',
  },
  '/tehillim': {
    exact: true,
    Component: FormScreenCreator,
    pageName: 'SCA Tehilim Requests',
  },
  '/admin': { Component: AdminNavigator },
  // '/wix/today': { Component: ClassesScreenCreator },
};

const NavigatorForWix = () => (
  <HashRouter>
    <CompThatTracksLocation />
    <Redirect from="/" to="/today" />
    <Route path="/today" component={ClassesScreenCreator} />
    <Route path="/minyanim" component={ClassesScreenCreator} />
    <Route path="/classes" component={ClassesScreenCreator} />
  </HashRouter>
);

const MainNavigator = () => (
  <HashRouter>
    <CompThatTracksLocation />
    <Header />
    {renderRoutes(mainRoutes)}
    <Footer />
  </HashRouter>
);

export default NavigatorForWix;
