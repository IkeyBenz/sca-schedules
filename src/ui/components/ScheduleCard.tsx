import React from 'react';

import * as linkify from 'linkifyjs';
import { Schedule } from '../../types';
import { filterDataFrameRows } from '../../util';

interface ScheduleCardProps {
  schedule: Schedule;
  filter?: {
    /** The column in the header to look for */
    type: string;
    /** The string to compare cells with */
    match: string;
  };
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

const ScheduleCard: React.FC<ScheduleCardProps> = ({ schedule, filter }) => {
  const { title, rows } = schedule;

  const filteredRows = filter
    ? filterDataFrameRows(filter.type, filter.match, rows)
    : rows;

  if (filteredRows.length === 1) {
    // No rows matched the filter criteria
    return null;
  }

  const filterColIdx =
    filter && rows[0].findIndex(col => col.toLowerCase().includes(filter.type));

  const shouldHighlight = (colText: string, colIdx) => {
    const text = colText.toLowerCase();
    return filterColIdx === colIdx
      ? filter.type === 'time'
        ? text.replace(':', '').includes(filter.match)
        : text.includes(filter.match)
      : false;
  };

  return (
    <div className="schedule-card my-5">
      <h1>{title}</h1>
      <table className="table table-striped table-bordered table-hover shadow">
        <thead className="text-light">
          <tr>
            {filteredRows[0].map((col, idx) => (
              <th key={idx}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredRows.slice(1).map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map((col, cIdx) => (
                <td key={cIdx}>
                  <SmartText
                    input={col}
                    highlight={shouldHighlight(col, cIdx)}
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
