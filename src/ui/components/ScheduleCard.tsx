import React from 'react';

import * as linkify from 'linkifyjs';
import { Schedule } from '../../types';

interface ScheduleCardProps {
  schedule: Schedule;
  stringToHighlight?: string;
}

interface SmartTextProps {
  input: string;
  highlight?: boolean;
}
/** If input contains a link, SmartText will replace it with a clickable ancor tag */
const SmartText = ({ input, highlight }) => {
  const urls = linkify.find(input);
  if (urls.length === 0) {
    return <p className={highlight && 'highlight'}>{input}</p>;
  }
  const { value, type } = urls[0];
  return <a href={value}>{type === 'url' ? 'Click me' : value}</a>;
};

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  schedule,
  stringToHighlight,
}) => {
  const { title, rows } = schedule;

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
                  <SmartText
                    input={col}
                    highlight={
                      stringToHighlight &&
                      col.toLowerCase().includes(stringToHighlight)
                    }
                  />
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
