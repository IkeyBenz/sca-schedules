import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { mainRoutes } from '../../AppNavigator';
import SCALogo from '../assets/SCALogo.png';

const Header: React.FC = props => {
  const location = useLocation();
  const pageName = mainRoutes[location.pathname]?.pageName;
  if (location.pathname.includes('wix')) {
    return null; // Hide the header if we're in the wix iframe
  }

  return (
    <>
      <header className="navbar navbar-expand-lg navbar-light fixed-top bg-light shadow">
        <a href="/#" className="navbar-brand">
          <img className="py-0" src={SCALogo} alt="SCA" height="60" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <nav className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup.show"
            className="navbar-nav ml-auto"
          >
            <li
              className={
                location.pathname === '/today' ? 'active nav-item' : 'nav-item'
              }
            >
              <a className="nav-link" href="/#/today">
                Classes
              </a>
            </li>
            <li
              className={
                location.pathname === '/minyanim'
                  ? 'active nav-item'
                  : 'nav-item'
              }
            >
              <a className="nav-link" href="/#/minyanim">
                Minyanim
              </a>
            </li>
            <li
              className={
                location.pathname === '/letters'
                  ? 'active nav-item'
                  : 'nav-item'
              }
            >
              <a className="nav-link" href="/#/letters">
                COVID-19
              </a>
            </li>
            <li
              className={
                location.pathname === '/tehillim'
                  ? 'active nav-item'
                  : 'nav-item'
              }
            >
              <a className="nav-link" href="/#/tehillim">
                Tehillim Requests
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="mailto:info@scaupdates.org">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <div className="header-spacing" />
      {!!pageName && (
        <h5 className="w-100 text-center header-title my-5">{pageName}</h5>
      )}
    </>
  );
};

export default Header;
