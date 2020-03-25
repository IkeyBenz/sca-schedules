import React, { useEffect, useState } from 'react';
import { Schedule } from '../types';
import { ClassesScreen } from '../ui';
import { scheduleManager } from '../service';

const ClassesScreenCreator = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    scheduleManager.onSchedulesChanged(setSchedules);
  }, []);

  return <ClassesScreen schedules={schedules} />;
};

export default ClassesScreenCreator;
