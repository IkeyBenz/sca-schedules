import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

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

export const mainRoutes: RouteMap = {
  '/': { exact: true, Component: IndexScreenCreator, pageName: ''},
  '/today': {
    exact: true,
    Component: ClassesScreenCreator,
    pageName: 'SCA Affiliate Synagogue - Virtual Classes Schedules',
  },
  '/classes': {
    exact: true,
    Component: ClassesScreenCreator,
    pageName: 'SCA Affiliate Synagogue - Virtual Classes Schedules',
  },
  '/minyanim': {
    exact: true,
    Component: ClassesScreenCreator,
    pageName: 'SCA Affiliate Synagogue - Virtual Minyanim Schedules',
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
};

const MainNavigator = () => (
  <HashRouter>
    <Header />
    {renderRoutes(mainRoutes)}
    <Footer />
  </HashRouter>
);

export default MainNavigator;
