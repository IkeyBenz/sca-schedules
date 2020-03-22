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
  <li className="list-group-item d-flex justify-content-between my-2">
    <h3>{schedule.title}</h3>
    <button className="btn btn-md btn-danger" onClick={onDeleteBtnPressed}>
      x
    </button>
  </li>
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
    <div className="admin-page-container bg-dark">
      <div className="schedule-manager-widget row mt-5 py-5">
        <div className="col scroll-content">
          {schedules.map((schedule, idx) => (
            <SchedulePreviewItem
              key={idx}
              schedule={schedule}
              onDeleteBtnPressed={() => onScheduleDelete(schedule._id)}
            />
          ))}
        </div>
        <div className="col py-2">
          <input
            type="text"
            className="form-control mb-2"
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