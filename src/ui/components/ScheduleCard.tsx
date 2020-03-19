import React from 'react';

import { Schedule } from '../../types';

interface ScheduleCardProps {
  schedule: Schedule;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ schedule }) => {
  const { title, rows } = schedule;

  return (
    <div>
      <h1>{title}</h1>
      <table className="table">
        <thead>
          <tr>
            {rows[0].map(col => (
              <th>{col}</th>
            ))}
          </tr>
        </thead>
        {rows.slice(1).map(row => (
          <tr>
            {row.map(col => (
              <td>{col}</td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ScheduleCard;
