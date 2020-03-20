import React, { useEffect, useState } from 'react';
import { Schedule } from '../types';
import { HomeScreen } from '../ui';
import { scheduleManager } from '../service';

const HomeScreenCreator = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    scheduleManager.onSchedulesChanged(setSchedules);
  }, []);

  return <HomeScreen schedules={schedules} />;
};

export default HomeScreenCreator;
