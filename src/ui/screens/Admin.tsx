import React from 'react';

import SpreadSheetDropBox from '../components/SpreadSheetDropBox';
import { Schedule, DataFrame } from '../../types';

interface SchedulePreviewItemProps {
  schedule: Schedule;
  onDeleteBtnPressed: () => void;
}
const SchedulePreviewItem: React.FC<SchedulePreviewItemProps> = ({
  schedule,
  onDeleteBtnPressed,
}) => (
  <div className="justify-content-between m-2 row">
    <h3>
      {schedule.title} ({schedule._id})
    </h3>
    <button className="btn btn-md btn-danger" onClick={onDeleteBtnPressed}>
      x
    </button>
  </div>
);

interface AdminScreenProps {
  schedules: Schedule[];
  onNewScheduleTitleSet: (title: string) => void;
  onNewScheduleDataSet: (rows: DataFrame) => void;
  onUploadBtnPressed: () => void;
  onScheduleDelete: (_id: firebase.database.Reference) => Promise<boolean>;
}

const AdminScreen: React.FC<AdminScreenProps> = ({
  schedules,
  onNewScheduleTitleSet,
  onNewScheduleDataSet,
  onUploadBtnPressed,
  onScheduleDelete,
}) => {
  return (
    <div className="admin-page-container">
      <div className="schedule-manager-widget row">
        <div className="col scroll-content">
          {schedules.map((schedule, idx) => (
            <SchedulePreviewItem
              key={idx}
              schedule={schedule}
              onDeleteBtnPressed={() => onScheduleDelete(schedule._id)}
            />
          ))}
        </div>
        <div className="col p-0">
          <input
            type="text"
            className="form-control"
            placeholder="Schedule Title"
            onChange={e => onNewScheduleTitleSet(e.target.value)}
          />
          <SpreadSheetDropBox onSpreadSheetDropped={onNewScheduleDataSet} />
          <button className="btn btn-success" onClick={onUploadBtnPressed}>
            Upload Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;
