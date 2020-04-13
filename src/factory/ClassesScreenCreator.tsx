import React, { useEffect, useState } from 'react';
import { Schedule, DataFrame } from '../types';
import { ClassesScreen } from '../ui';
import { scheduleManager } from '../service';

const ClassesScreenCreator = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    scheduleManager.onSchedulesChanged((data: DataFrame) => {
      setSchedules([{ title: 'All Schedules', rows: data }]);
    });
  }, []);

  return <ClassesScreen schedules={schedules} />;
};

export default ClassesScreenCreator;
