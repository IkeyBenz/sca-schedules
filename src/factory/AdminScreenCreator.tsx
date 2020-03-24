import React, { useEffect, useState } from 'react';

import { AdminScreen } from '../ui';
import { scheduleManager } from '../service';
import { Schedule, DataFrame } from '../types';

const AdminScreenCreator = () => {
  const [currentSchedules, setCurrentSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    scheduleManager.onSchedulesChanged(setCurrentSchedules);
  }, []);

  const uploadSchedule = schedule => {
    if (!schedule.rows) {
      return alert('Please upload a spreadsheet first');
    }
    if (!schedule.title) {
      return alert('Please enter the title of this table');
    }
    return scheduleManager.addSchedule(schedule);
  };

  const removeSchedule = _id => {
    return scheduleManager.removeSchedule(_id);
  };

  const updateSchedule = (_id, updatedSchedule) => {
    return scheduleManager.updateSchedule(_id, updatedSchedule);
  };

  return (
    <AdminScreen
      schedules={currentSchedules}
      createSchedule={uploadSchedule}
      updateSchedule={updateSchedule}
      deleteSchedule={removeSchedule}
    />
  );
};

export default AdminScreenCreator;
