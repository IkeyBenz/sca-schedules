import React from 'react';

import AppNavigator from './AppNavigator';
import SCALogo from './ui/assets/SCALogo.png';

const App = () => (
  <>
    <header className="navbar fixed-top bg-light shadow">
      <a href="/#">
        <img className="navbar-brand py-0" src={SCALogo} alt="SCA" height="60" />
      </a>
      <h5 className="w-100 text-center header-title m-0">
        SCA Affiliate Synagogue Virtual Classes
      </h5>
    </header>
    <div className="header-spacing"></div>
    <AppNavigator />
  </>
);

export default App;
