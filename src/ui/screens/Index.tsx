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
          <a href="/#/classes" className="btn btn-primary btn-lg my-3">
            Schedule of Live Classes
          </a>
          <a href="/#/minyanim" className="btn btn-primary btn-lg my-3">
            Schedule of Live Minyanim
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
          <a
            href="https://firebasestorage.googleapis.com/v0/b/sca-rab-schedules.appspot.com/o/attachments%2FSCA_Pre-Pesah%20Day%20of%20Learning.pdf?alt=media&token=9552d20f-b3a4-4751-b843-e5f99ebf32dc"
            target="_blank"
            className="btn btn-secondary btn-lg my-3">
            Pre Pesach Day of Learning
          </a>
        </nav>
      </div>
    </>
  );
};

export default IndexScreen;
