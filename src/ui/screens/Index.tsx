import React from 'react';
import SCALogo from '../assets/SCALogo.png';

const IndexScreen: React.FC = () => {
  return (
    <>
      <div className="container">
        <img
          src={SCALogo}
          className="centered-image my-3"
          height="150"
          alt=""
        />
      </div>
      <div className="w-100 d-flex align-items-center justify-content-center">
        <nav className="d-flex flex-column align-items-center my-3 site-nav-index">
          <a
            href="https://www.youtube.com/playlist?list=PLS3KTNjJqUepUQ3quLa-UYoypBlfcAlcc"
            target="_blank"
            className="btn btn-secondary btn-lg my-3">
            Pre Pesah Day of Learning Class Recordings
          </a>
          <a href="/#/classes" className="btn btn-primary btn-lg my-3">
            Schedule of Live Classes
          </a>
          <a href="/#/minyanim" className="btn btn-primary btn-lg my-3">
            Schedule of Live Minyanim
          </a>
          <a href="https://chat.whatsapp.com/FUQrLPQSXlZ8EeB0F1kHLJ" className="btn btn-primary btn-whatsapp btn-lg my-3">
            Join Chat for Class Updates
          </a>
          <a href="/#/letters" className="btn btn-primary btn-lg my-3">
            Letters to the Community
          </a>
          <a href="/#/tehillim" className="btn btn-primary btn-lg my-3">
            Request Tehillim for Refuah
          </a>
          <a
            href="mailto:info@scaupdates.org"
            className="btn btn-primary btn-lg my-3">
            Contact the SCA
          </a>
        </nav>
      </div>
    </>
  );
};

export default IndexScreen;
