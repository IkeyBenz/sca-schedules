import React from 'react';
import moment from 'moment';
import * as linkify from 'linkifyjs';
import { Schedule } from '../../types';

interface ScheduleCardProps {
  schedule: Schedule;
}

/** If input contains a link, SmartText will replace it with a clickable ancor tag */
const SmartText = ({ input }) => {
  const urls = linkify.find(input);
  if (urls.length === 0) {
    return <p>{input}</p>;
  }
  const { value, type } = urls[0];
  return <a href={value}>{type === 'url' ? 'Click me' : value}</a>;
};

const ScheduleCard: React.FC<ScheduleCardProps> = ({ schedule }) => {
  const { title, rows } = schedule;

  const fixTimes = string => {
    if (typeof string === 'string') return string;
    const timeInMiliSeconds = (string - (25567 + 1)) * 86400 * 1000;
    const fiveHours = 1000 * 60 * 60 * 5;
    const data = new Date(timeInMiliSeconds + fiveHours);
    return moment(data).format('LT');
  };

  return (
    <div className="schedule-card my-5">
      <h1>{title}</h1>
      <table className="table table-striped table-bordered table-hover shadow">
        <thead className="text-light">
          <tr>
            {rows[0].map((col, idx) => (
              <th key={idx}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(1).map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map((col, cIdx) => (
                <td key={cIdx}>
                  <SmartText input={fixTimes(col)} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleCard;
