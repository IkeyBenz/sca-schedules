import React from 'react';
import { ScheduleCard } from '../components';

import { Schedule } from '../../types';
import SCALogo from '../assets/SCALogo.png';

interface HomeScreenProps {
  schedules: Schedule[];
}

const HomeScreen: React.FC<HomeScreenProps> = ({ schedules }) => {
  return (
    <>
      <header className="navbar fixed-top bg-light shadow">
        <img className="navbar-brand" src={SCALogo} alt="SCA" height="60" />
        <h5 className="w-100 text-center header-title m-0">
          Zoom Class Schedules:
        </h5>
      </header>
      <div className="header-spacing"></div>
      <div className="container">
        {schedules.map(schedule => (
          <ScheduleCard key={schedule.title} schedule={schedule} />
        ))}
      </div>
    </>
  );
};

export default HomeScreen;
