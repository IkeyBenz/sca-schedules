import React from 'react';
import { useLocation } from 'react-router-dom';

import { mainRoutes } from '../../AppNavigator';
import SCALogo from '../assets/SCALogo.png';

const Header: React.FC = props => {
  const location = useLocation();
  return (
    <>
      <header className="navbar fixed-top bg-light shadow">
        <div className="w-100 d-flex justify-content-between">
          <a href="/#">
            <img
              className="navbar-brand py-0"
              src={SCALogo}
              alt="SCA"
              height="60"
            />
          </a>
        </div>
        <nav className="site-nav w-100 d-flex my-3">
          <a href="/#/classes">Classes</a>
          <a href="/#/minyanim">Minyanim</a>
          <a href="/#/letters">Letters</a>
          <a href="/#/tehillim">Tehillim Request</a>
          <a href="mailto:info@scaupdates.org">Contact</a>
        </nav>

        <h5 className="w-100 text-center header-title m-0">
          SCA Affiliate Synagogue - {mainRoutes[location.pathname].pageName}
        </h5>
      </header>
      <div className="header-spacing"></div>
    </>
  );
};

export default Header;
