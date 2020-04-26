import React from 'react';
import SCALogo from '../assets/SCALogo.png';

import { LiveClassesCarousel } from '../components';

interface IndexScreenProps {
  schedules: Schedule[];
}

const IndexScreen: React.FC<IndexScreenProps> = ({ schedules }) => {
  return (
    <>
      <div className="home-bg-img">
        <div className="opaque-overlay"></div>
      </div>
      <div className="bg-pesah py-5 block shadow">
        <img
          src={SCALogo}
          className="centered-image img-fluid"
          height="150"
          alt=""
        />
      </div>
      <div className="block">
        <LiveClassesCarousel
          schedules={schedules}
          filter={{ type: '', match: '' }}
          heading="Classes"
        />
      </div>
      <a href="https://www.dol.scatorah.org/">
        <div className="shadow" style={{ backgroundColor: '#BEE3F4' }}>
          <div className="bg-pesah-recordings pb-5 block"></div>
        </div>
      </a>

      <div className="block">
        <LiveClassesCarousel
          schedules={schedules}
          filter={{ type: 'type', match: 'minyan' }}
          heading="Minyanim"
        />
      </div>

      <div className="d-flex align-items-center justify-content-center my-3 site-nav-index">
        <a
          href="https://chat.whatsapp.com/FUQrLPQSXlZ8EeB0F1kHLJ"
          className="btn btn-primary btn-whatsapp btn-lg m-3">
          Join Chat for Class Updates
        </a>
        <a
          href="mailto:info@scaupdates.org"
          className="btn btn-primary btn-lg m-3 btn-email">
          Contact the SCA
        </a>
      </div>
    </>
  );
};

export default IndexScreen;
