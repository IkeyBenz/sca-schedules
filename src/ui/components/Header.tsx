import React from 'react';
import SCALogo from '../assets/SCALogo.png';

const Header: React.FC = props => (
  <>
    <header className="navbar fixed-top bg-light shadow">
      <div className="w-100 d-flex justify-content-between">
        <img
          className="navbar-brand py-0"
          src={SCALogo}
          alt="SCA"
          height="60"
        />
        <a href="mailto:info@scaupdates.org" className="btn btn-primary pt-3">
          Contact Us
        </a>
      </div>

      <h5 className="w-100 text-center header-title m-0">
        Zoom Class Schedules:
      </h5>
    </header>
    <div className="header-spacing"></div>
  </>
);

export default Header;
