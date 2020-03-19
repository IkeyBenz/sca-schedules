import React from 'react';
import { ScheduleCard } from '../components';

import { Schedule } from '../../types';

interface HomeScreenProps {
  schedules: Schedule[];
}

const HomeScreen: React.FC<HomeScreenProps> = ({ schedules }) => {
  return (
    <div className="container">
      {schedules.map(schedule => (
        <ScheduleCard key={schedule.title} schedule={schedule} />
      ))}
    </div>
  );
};

export default HomeScreen;
