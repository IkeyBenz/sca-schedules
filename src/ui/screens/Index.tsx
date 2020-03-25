import React from 'react';
import { database } from '../../service/index';

const IndexScreen: React.FC = () => {
  return (
    <div className="w-100 d-flex align-items-center justify-content-center">
      <nav className="d-flex flex-column align-items-center my-3 site-nav-index">
        <a href="/#/classes" className="btn btn-primary btn-lg my-3">
          Schedule of Remote Classes
        </a>
        <a href="/#/minyanim" className="btn btn-primary btn-lg my-3">
          Schedule of Remote Minyanim
        </a>
        <a href="/#/letters" className="btn btn-primary btn-lg my-3">
          Letters to the Community
        </a>
        <a href="/#/tehillim" className="btn btn-primary btn-lg my-3">
          Request Tehillim for Refuah
        </a>
        <a href="mailto:info@scaupdates.org" className="btn btn-primary btn-lg my-3">
          Contact the SCA
        </a>
      </nav>
    </div>
  );
};

export default IndexScreen;
