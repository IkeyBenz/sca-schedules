import React from 'react';

import sca from '../assets/sca-white.svg';

const Footer: React.FC = props => {
  return (
    <>
      <footer className="bg-dark d-flex">
        <a href="/#" className="my-5 mx-auto d-block">
          <img className="py-0" src={sca} alt="SCA" height="60" width="177" />
        </a>
      </footer>
    </>
  );
};

export default Footer;
