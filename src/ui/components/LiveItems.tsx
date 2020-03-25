import React from 'react';

import moment from 'moment';
import * as linkify from 'linkifyjs';
import { Schedule } from '../../types';
import { excludeFilterDataFrameRows, filterDataFrameRows } from '../../util';

interface SmartTextProps {
  input: string;
}
/** If input contains a link, SmartText will replace it with a clickable ancor tag */
const SmartText: React.FC<SmartTextProps> = ({ input }) => {
  const urls = linkify.find(input);
  if (urls.length === 0) {
    return <p>{input}</p>;
  }
  const { value, type } = urls[0];
  return <a href={value}>{type === 'url' ? 'Click here' : value}</a>;
};

interface LiveItemsProps {
  schedules: Schedule[];
  filter?: {
    type: string,
    match: string,
  };
  heading: string;
}

const LiveItems: React.FC<LiveItemsProps> = ({ schedules, filter, heading }) => {
  const rows = [];
  schedules.forEach(schedule => {
    const filteredRows = filter?.match === 'minyan'
      ? filterDataFrameRows(filter.type, filter.match, schedule.rows)
      : excludeFilterDataFrameRows('topic', 'minyan', schedule.rows);
    rows.push(...filteredRows);
  });
  const headerRows = rows[0];

  if (rows.length === 1) {
    // No rows matched the filter criteria
    return null;
  }

  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ]

  const now = new Date();

  const filteredByDay = rows.filter((row) => {
    let flag = false;
    const rowDays = row[2];
    if (rowDays.includes('Daily')) {
      flag = true;
    } else if (rowDays.includes(days[now.getDay()])) {
      flag = true;
    } else if (rowDays.includes('-')) {
      const rowDaysArr = rowDays.split(/[^\w-]/);
      rowDaysArr.forEach(rowDay => {
        if (rowDay.includes('-')) {
          const leftRight = rowDay.split('-');
          const left = days.findIndex((v) => {
            return leftRight[0].includes(v);
          })
          const right = days.findIndex((v) => {
            return leftRight[1].includes(v);
          })
          if (left < now.getDay() && right > now.getDay()) {
            flag = true;
          }
        }
      });
    }
    return flag
  })

  const filteredByTime = filteredByDay.filter(row => {
    const rowTimes = row[3].match(/\d\d?:\d\d ?(?:[AP]M)?/g);
    if (!rowTimes[0].toLowerCase().includes('pm') && row[3].toLowerCase().includes('pm')) {
      rowTimes[0]+=' pm';
    }
    const startTime = moment(rowTimes[0], 'h:mm:ss a');
    const endTime = rowTimes.length > 1 ? moment(rowTimes[1], 'h:mm:ss a') : moment(startTime).add(1,'h');
    startTime.subtract(5, 'm')

    return moment(now).isBetween(startTime, endTime, null, '[)')
  })

  if (!filteredByTime.length) {
    return null;
  }

  return (
    <div className="schedule-card my-5">
      <div className="card-header row">
        <h1 className="schedule-title">{heading} Going on Right Now</h1>
      </div>
      <table className="table table-striped table-bordered table-hover shadow">
        <thead className="text-light">
          <tr>
            {headerRows.map((col, idx) => (
              <th key={idx}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredByTime.map((row, rowId) => (
            <tr key={rowId}>
              {row.map((cell, cellId) => (
                <td key={cellId}>
                  <SmartText
                    input={cell}
                  />
                </td>
              ))}
            </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LiveItems;