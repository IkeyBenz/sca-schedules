import React from 'react';

import { Schedule } from '../../types';

interface ScheduleCardProps {
  schedule: Schedule;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ schedule }) => {
  const { title, rows } = schedule;

  return (
    <div className="schedule-card">
      <h1>{title}</h1>
      <table className="table table-striped table-bordered table-hover shadow">
        <thead className="text-light">
          <tr>
            {rows[0].map(col => (
              <th>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(1).map(row => (
            <tr>
              {row.map(col => (
                <td>{col}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleCard;
