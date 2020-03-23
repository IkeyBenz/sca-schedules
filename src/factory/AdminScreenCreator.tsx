import React, { useEffect, useState } from 'react';

import { AdminScreen } from '../ui';
import { scheduleManager } from '../service';
import { Schedule, DataFrame } from '../types';

const AdminScreenCreator = () => {
  const [currentSchedules, setCurrentSchedules] = useState<Schedule[]>([]);

  const [scheduleData, setScheduleData] = useState<DataFrame>(undefined);
  const [scheduleTitle, setScheduleTitle] = useState<string>('');
  const [scheduleLogo, setScheduleLogo] = useState<string>(undefined);

  useEffect(() => {
    scheduleManager.onSchedulesChanged(setCurrentSchedules);
  }, []);

  const uploadSchedule = () => {
    if (!scheduleData) {
      return alert('Please upload a spreadsheet first');
    }
    if (!scheduleTitle) {
      return alert('Please enter the title of this table');
    }

    scheduleManager.addSchedule({
      title: scheduleTitle,
      rows: scheduleData,
      logo: scheduleLogo,
    });
  };

  const removeSchedule = _id => {
    return scheduleManager.removeSchedule(_id);
  };

  return (
    <AdminScreen
      schedules={currentSchedules}
      onNewScheduleTitleSet={setScheduleTitle}
      onNewScheduleDataSet={setScheduleData}
      onNewScheduleLogoSet={setScheduleLogo}
      onUploadBtnPressed={uploadSchedule}
      onScheduleDelete={removeSchedule}
    />
  );
};

export default AdminScreenCreator;
