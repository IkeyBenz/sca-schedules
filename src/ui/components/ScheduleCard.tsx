import React from 'react';
import moment from 'moment';

import { Schedule } from '../../types';

interface ScheduleCardProps {
  schedule: Schedule;
}

const interactiveText = (() => {
  var url = new RegExp(
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
  );

  const replaceUrlsWithAnchorTag = (text: string) => {
    const out = text
      .split(' ')
      .map(t => (url.test(t) ? `<a href="${t}">${t}</a>` : t));
    console.log(out);
    return out;
  };

  return text => {
    if (typeof text === 'string' && url.test(text)) {
      return replaceUrlsWithAnchorTag(text);
    }
    return text;
  };
})();

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
            {rows[0].map(col => (
              <th>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(1).map(row => (
            <tr>
              {row.map(col => (
                <td>{fixTimes(col)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleCard;
