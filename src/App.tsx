import React from 'react';

import AppNavigator from './AppNavigator';
import SCALogo from './ui/assets/SCALogo.png';

// import * as linkify from 'linkifyjs';
// import Linkify from 'linkifyjs/react';

const App = () => (
  <>
    <header className="navbar fixed-top bg-light shadow">
      <img className="navbar-brand py-0" src={SCALogo} alt="SCA" height="60" />
      <h5 className="w-100 text-center header-title m-0">
        Zoom Class Schedules:
      </h5>
    </header>
    <div className="header-spacing"></div>
    {/* <Linkify
      options={{
        onClick: () => console.log('Link has been clicked'),
      }}> */}
    <AppNavigator />
    {/* </Linkify> */}
  </>
);

export default App;
