import React, { useState, useEffect } from 'react';

import { SpreadSheetDropBox, ImageDropBox } from '../components';

interface SchedulePreviewItemProps {
  schedule: Schedule;
  isEditing: boolean;
  onUpdateBtnPressed: () => void;
  onDeleteBtnPressed: () => void;
}
const SchedulePreviewItem: React.FC<SchedulePreviewItemProps> = ({
  schedule,
  isEditing,
  onUpdateBtnPressed,
  onDeleteBtnPressed,
}) => (
  <li className="list-group-item d-flex justify-content-between my-2">
    <h3>{schedule.title}</h3>

    {isEditing ? (
      <button className="btn btn-danger m-1" onClick={onDeleteBtnPressed}>
        x
      </button>
    ) : (
      <button className="btn btn-warning" onClick={onUpdateBtnPressed}>
        <i className="fas fa-edit text-light"></i>
      </button>
    )}
  </li>
);

interface AdminScreenProps {
  schedules: Schedule[];
  createSchedule: (
    newSchedule: Schedule,
  ) => Promise<firebase.database.Reference> | void;
  deleteSchedule: (_id: firebase.database.Reference) => Promise<boolean>;
  updateSchedule: (
    _id: firebase.database.Reference,
    updatedSchedule: Schedule,
  ) => Promise<boolean>;
}

const AdminScreen: React.FC<AdminScreenProps> = ({
  schedules,
  createSchedule,
  deleteSchedule,
  updateSchedule,
}) => {
  const [scheduleBeingEdited, setScheduleBeingEdited] = useState<Schedule>(
    undefined,
  );
  const updateScheduleBeingEdited = updates =>
    setScheduleBeingEdited({ ...scheduleBeingEdited, ...updates });

  const onSaveBtnPressed = () => {
    const { title, rows, logo } = scheduleBeingEdited;
    const newSchedule = { title, rows, logo };
    if (!newSchedule.logo) {
      newSchedule.logo = '';
    }
    if (scheduleBeingEdited._id) {
      updateSchedule(scheduleBeingEdited._id, newSchedule);
    } else {
      createSchedule(newSchedule);
    }
    setScheduleBeingEdited(undefined);
  };

  useEffect(() => {
    console.log(scheduleBeingEdited);
  }, [scheduleBeingEdited]);
  return (
    <div className="admin-page-container">
      <div className="schedule-manager-widget row mt-5 py-5">
        <div className="col scroll-content">
          {schedules.map((schedule, idx) => (
            <SchedulePreviewItem
              key={idx}
              schedule={schedule}
              isEditing={scheduleBeingEdited?._id === schedule._id}
              onUpdateBtnPressed={() => setScheduleBeingEdited(schedule)}
              onDeleteBtnPressed={() => deleteSchedule(schedule._id)}
            />
          ))}
        </div>
        <div className="col schedule-upload-container">
          <div className="text-center">
            <h3 className="text-light">
              {!!scheduleBeingEdited
                ? 'Update Schedule:'
                : 'Upload Schedule Here:'}
            </h3>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Schedule Title"
            value={scheduleBeingEdited?.title || ''}
            onChange={e => updateScheduleBeingEdited({ title: e.target.value })}
          />
          <ImageDropBox
            onImageDropped={logo => updateScheduleBeingEdited({ logo })}
            currentImage={scheduleBeingEdited?.logo}
          />
          <SpreadSheetDropBox
            onSpreadSheetDropped={rows => updateScheduleBeingEdited({ rows })}
            currentSpreadSheet={scheduleBeingEdited?.rows}
          />

          <button className="btn btn-success" onClick={onSaveBtnPressed}>
            {scheduleBeingEdited?._id ? 'Save updates' : 'Upload Schedule'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;
