import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import { Header } from './ui/components';
import {
  ClassesScreenCreator,
  AdminScreenCreator,
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
  '/': { exact: true, Component: AdminScreenCreator },
  '/edit-letters': { exact: true, Component: AttachmentsAdminScreenCreator },
};

const AdminNavigator = () => (
  <HashRouter basename="/admin">{renderRoutes(adminRoutes)}</HashRouter>
);

export const mainRoutes: RouteMap = {
  '/': { exact: true, Component: IndexScreenCreator },
  '/classes': {
    exact: true,
    Component: ClassesScreenCreator,
    pageName: 'Virtual Classes Schedules',
  },
  '/minyanim': {
    exact: true,
    Component: ClassesScreenCreator,
    pageName: 'Virtual Minyanim Schedules',
  },
  '/letters': {
    exact: true,
    Component: AttachmentsScreenCreator,
    pageName: 'Covid-19 Letters',
  },
  '/tehillim': {
    exact: true,
    Component: FormScreenCreator,
    pageName: 'Tehilim Request',
  },
  '/admin': { Component: AdminNavigator },
};

const MainNavigator = () => (
  <HashRouter>
    <Header />
    {renderRoutes(mainRoutes)}
  </HashRouter>
);

export default MainNavigator;
