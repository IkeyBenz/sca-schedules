import React from 'react';
import { useLocation } from 'react-router-dom';

import { mainRoutes } from '../../AppNavigator';
import SCALogo from '../assets/SCALogo.png';

const Header: React.FC = props => {
  const location = useLocation();
  const pageName = mainRoutes[location.pathname]?.pageName;

  /* React.useEffect(() => {
    ga.send(["pageview", location.pathname]);
  }, [location]); */

  return (
    <>
      <header className="navbar navbar-expand-lg navbar-light fixed-top bg-light shadow">
        <a href="/#" className="navbar-brand">
          <img
            className="py-0"
            src={SCALogo}
            alt="SCA"
            height="60"
          />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <nav className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul data-toggle="collapse" data-target="#navbarNavAltMarkup.show" className="navbar-nav ml-auto">
            <li className={location.pathname === '/today' ? 'active nav-item' : 'nav-item'}>
              <a className="nav-link" href="/#/today">Classes</a>
            </li>
            <li className={location.pathname === '/minyanim' ? 'active nav-item' : 'nav-item'}>
              <a className="nav-link" href="/#/minyanim">Minyanim</a>
            </li>
            <li className={location.pathname === '/letters' ? 'active nav-item' : 'nav-item'}>
              <a className="nav-link" href="/#/letters">Letters</a>
            </li>
            <li className={location.pathname === '/tehillim' ? 'active nav-item' : 'nav-item'}>
              <a className="nav-link" href="/#/tehillim">Tehillim Request</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="mailto:info@scaupdates.org">Contact</a>
            </li>
          </ul>
        </nav>
      </header>
      <div className="header-spacing"></div>
      <h5 className="w-100 text-center header-title my-5">
        {pageName ? pageName : ''}
      </h5>
    </>
  );
};

export default Header;
