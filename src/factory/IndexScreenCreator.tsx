import React, { useEffect, useState } from 'react';
import ReactGa from 'react-ga';

import { IndexScreen } from '../ui';
import { scheduleManager } from '../service';

const IndexScreenCreator = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    scheduleManager.onSchedulesChanged(({ fullSchedule }) => {
      setSchedules([{ title: 'All Schedules', rows: fullSchedule }]);
    });

    ReactGa.pageview('/');
  }, []);

  return <IndexScreen schedules={schedules} />;
};

export default IndexScreenCreator;
