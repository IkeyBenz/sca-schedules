import React from 'react';
import { useLocation } from 'react-router-dom';
import * as linkify from 'linkifyjs';
import { Schedule } from '../../types';
import { excludeFilterDataFrameRows, filterDataFrameRows } from '../../util';

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
  row?: string[];
  passwordCol: number;
}
/** If input contains a link, SmartText will replace it with a clickable ancor tag */
const SmartText: React.FC<SmartTextProps> = ({ input, highlight, row, passwordCol }) => {
  const urls = linkify.find(input);
  let password = '';
  if (~passwordCol && row[passwordCol] !== '-') {
    password = `Password: ${row[passwordCol]}`;
  }
  if (urls.length === 0) {
    return <p className={highlight && 'highlight'}>{input}</p>;
  }
  const { value, type } = urls[0];
  return <p><a href={value} className={value.includes('zoom') && type === 'url' ? 'zoomIcon' : value.includes('gotomeeting') && type === 'url' ? 'gtmIcon' : ''}>{type === 'url' ? 'Click here' : value}</a> <span className="password">{password}</span></p>;
};

const ScheduleCard: React.FC<ScheduleCardProps> = ({ schedule, filter }) => {
  const location = useLocation();
  const { title, rows, logo } = schedule;

  const filteredRows = filter
    ? filterDataFrameRows(filter.type, filter.match, rows)
    : excludeFilterDataFrameRows('type', 'minyan', rows);

  if (filteredRows.length === 1) {
    // No rows matched the filter criteria
    return null;
  }

  const headerRow = filteredRows[0];

  const filteredCols = headerRow.reduce((acc, cur, idx) => {
    if (cur.toString().toLowerCase().startsWith('hide')) {
      acc.push(idx)
    }
    return acc;
  }, []);

  const filterColIdx =
    filter && rows[0].findIndex(col => col.toLowerCase().includes(filter.type));

  const passwordColIdx =
    rows[0].findIndex(col => col.toLowerCase().includes('password'));

  const shouldHighlight = (colText: string, colIdx) => {
    if (filter?.type === 'topic' && location.pathname === '/bekhorot') {
      return false;
    }
    const text = colText.toLowerCase();
    return filterColIdx === colIdx && text.includes(filter.match);
  };

  return (
    <div className="schedule-card my-5">
      <div className="card-header">
        {!!logo && (
          <div className="w-100">
            <img src={logo} className="logo ml-4" />
          </div>
        )}
        <h1 className="schedule-title">{title}</h1>
      </div>
      <table className="table table-striped table-bordered table-hover shadow">
        <thead className="text-light">
          <tr>
            {filteredRows[0].map((col, idx) => {
              if (!filteredCols.includes(idx)) {
                return <th key={idx}>{col}</th>
              }
            })}
          </tr>
        </thead>
        <tbody>
          {filteredRows.slice(1).map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map((col, cIdx) => {
                if (!filteredCols.includes(cIdx)) {
                  return <td key={cIdx}>
                    <SmartText
                      input={col}
                      row={row}
                      passwordCol={passwordColIdx}
                      highlight={shouldHighlight(col, cIdx)}
                    />
                  </td>
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleCard;
