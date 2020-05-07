import React, { useEffect, useState } from 'react';

import { ClassesScreen } from '../ui';
import { scheduleManager } from '../service';

const ClassesScreenCreator = () => {
  const defaultScheduleDatas: AllScheduleDatas = {
    todaysClasses: Array(20).fill(Array(6).fill('')),
    minyanim: Array(20).fill(Array(6).fill('')),
    fullSchedule: Array(20).fill(Array(6).fill('')),
  };
  const [
    { todaysClasses, minyanim, fullSchedule },
    setScheduleDatas,
  ] = useState<AllScheduleDatas>(defaultScheduleDatas);

  useEffect(() => {
    scheduleManager.onSchedulesChanged(setScheduleDatas);
  }, []);

  return (
    <ClassesScreen
      todaysClasses={todaysClasses}
      minyanim={minyanim}
      fullSchedule={fullSchedule}
    />
  );
};

export default ClassesScreenCreator;
