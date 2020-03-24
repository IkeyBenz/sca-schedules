import React from 'react';
import SCALogo from '../assets/SCALogo.png';

const Header: React.FC = props => (
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

      <nav className="w-100 d-flex justify-content-center my-3">
        <a href="/#/letters" className="btn btn-primary btn-sm mx-2">
          Letters
        </a>
        <a href="mailto:info@scaupdates.org" className="btn btn-primary btn-sm mx-2">
          Contact
        </a>
        <a href="mailto:info@scaupdates.org?subject=Tehillim%20Name%20Submission" className="btn btn-primary btn-sm mx-2">
          Tehillim Request
        </a>
      </nav>

      <h5 className="w-100 text-center header-title m-0">
        SCA Affiliate Synagogue Virtual Classes
      </h5>
    </header>
    <div className="header-spacing"></div>
  </>
);

export default Header;
