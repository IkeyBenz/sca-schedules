import React, { useEffect, useState } from 'react';

import { IndexScreen } from '../ui';
import { scheduleManager } from '../service';

const IndexScreenCreator = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    scheduleManager.onSchedulesChanged((data: DataFrame) => {
      setSchedules([{ title: 'All Schedules', rows: data }]);
    });
  }, []);

  return <IndexScreen schedules={schedules} />;
};

export default IndexScreenCreator;
