import React from 'react';
import SCALogo from '../assets/SCALogo.png';

import { LiveClassesCarousel } from '../components';

interface IndexScreenProps {
  schedules: Schedule[];
}

const IndexScreen: React.FC<IndexScreenProps> = ({ schedules }) => {
  return (
    <>
      <div className="bg-pesah py-5">
        <img
          src={SCALogo}
          className="centered-image img-fluid"
          height="150"
          alt=""
        />
      </div>
      <LiveClassesCarousel
        schedules={schedules}
        filter={{ type: '', match: '' }}
        heading="Classes"
      />
      <div className="bg-pesah-recordings pb-5">
        <h4 className="h3 text-white text-center pt-2 bg-gradient-dark pb-5 font-weight-bold">
          Pesah Recordings
        </h4>
        <a
          href="https://www.youtube.com/playlist?list=PLS3KTNjJqUepUQ3quLa-UYoypBlfcAlcc"
          target="_blank"
          className="d-block h1 text-white text-center my-5 font-weight-light"
        >
          To view our library of recorded 
{' '}
<br />
          pesah classes, click here.
        </a>
      </div>
      <LiveClassesCarousel
        schedules={schedules}
        filter={{ type: 'type', match: 'minyan' }}
        heading="Minyanim"
      />
      <div className="d-flex align-items-center justify-content-center my-3 site-nav-index">
        <a
          href="https://chat.whatsapp.com/FUQrLPQSXlZ8EeB0F1kHLJ"
          className="btn btn-primary btn-whatsapp btn-lg m-3"
        >
          Join Chat for Class Updates
        </a>
        <a
          href="mailto:info@scaupdates.org"
          className="btn btn-primary btn-lg m-3 btn-email"
        >
          Contact the SCA
        </a>
      </div>
    </>
  );
};

export default IndexScreen;
