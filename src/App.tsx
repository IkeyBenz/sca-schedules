import React from 'react';

import AppNavigator from './AppNavigator';
import SCALogo from './ui/assets/SCALogo.png';

const App = () => (
  <>
    <header className="navbar fixed-top bg-light shadow">
      <img className="navbar-brand" src={SCALogo} alt="SCA" height="60" />
      <h5 className="w-100 text-center header-title m-0">
        Zoom Class Schedules:
      </h5>
    </header>
    <div className="header-spacing"></div>
    <AppNavigator />
  </>
);

export default App;
