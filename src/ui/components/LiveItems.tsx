import React from 'react';
import moment from 'moment';
// import * as linkify from 'linkifyjs';

import { SmartText } from './ScheduleCard';
import { excludeFilterDataFrameRows, filterDataFrameRows } from '../../util';

interface LiveItemsProps {
  schedules: Schedule[];
  filter?: {
    type: string;
    match: string;
  };
  heading: string;
}

const LiveItems: React.FC<LiveItemsProps> = ({
  schedules,
  filter,
  heading,
}) => {
  let rows = [];
  schedules.forEach(schedule => {
    const filteredRows =
      filter?.match === 'minyan'
        ? filterDataFrameRows(filter.type, filter.match, schedule.rows)
        : excludeFilterDataFrameRows('type', 'minyan', schedule.rows);
    rows.push(...filteredRows);
  });
  const headerRows = rows[0];

  if (rows.length < 2) {
    // No rows matched the filter criteria
    return null;
  }

  // Only show the rows whose data in column 'HIDE-Toggle' contains 'show'
  rows = filterDataFrameRows('toggle', 'show', rows);

  const dayIdx = headerRows.findIndex(data =>
    data.toLowerCase().includes('days')
  );
  const timeIdx = headerRows.findIndex(data =>
    data.toLowerCase().includes('time')
  );
  const passwordIdx = headerRows.findIndex(data =>
    data.toLowerCase().includes('password')
  );

  const filteredCols = headerRows.reduce((acc, cur, idx) => {
    if (
      cur.toString().toLowerCase().startsWith('hide') ||
      cur.toString().toLowerCase().startsWith('days')
    ) {
      acc.push(idx);
    }
    return acc;
  }, []);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const now = new Date();

  const filteredByDay = rows.filter(row => {
    let flag = false;
    const rowDays = row[dayIdx];
    if (rowDays.includes('Daily')) {
      flag = true;
    } else if (rowDays.includes(days[now.getDay()])) {
      flag = true;
    } else if (rowDays.includes('-')) {
      const rowDaysArr = rowDays.split(/[^\w-]/);
      rowDaysArr.forEach(rowDay => {
        if (rowDay.includes('-')) {
          const leftRight = rowDay.split('-');
          const left = days.findIndex(v => leftRight[0].includes(v));
          const right = days.findIndex(v => leftRight[1].includes(v));
          if (left < now.getDay() && right > now.getDay()) {
            flag = true;
          }
        }
      });
    }
    return flag;
  });

  const live = [];
  const elapsed = [];
  const upcoming = [];

  filteredByDay.forEach(row => {
    const rowTimes = row[timeIdx].match(/\d\d?:\d\d ?(?:[AP]M)?/g);
    if (!rowTimes) return false;
    if (
      !rowTimes[0].toLowerCase().includes('pm') &&
      row[3].toLowerCase().includes('pm')
    ) {
      rowTimes[0] += ' pm';
    }
    const startTime = moment(rowTimes[0], 'h:mm:ss a');
    const endTime =
      rowTimes.length > 1
        ? moment(rowTimes[1], 'h:mm:ss a')
        : moment(startTime).add(1, 'h');
    startTime.subtract(10, 'm');

    if (moment(now).isBetween(startTime, endTime, null, '[)')) {
      live.push(row);
    } else if (moment(now).isSameOrAfter(endTime)) {
      elapsed.push(row);
    } else if (moment(now).isBefore(startTime)) {
      upcoming.push(row);
    }
  });

  return (
    <div className="schedule-card my-2">
      {(() =>
        live.length > 0 && (
          <>
            <div className="card-header">
              <h1 className="schedule-title">Ongoing {heading}</h1>
            </div>
            <table className="table table-striped table-bordered table-hover shadow">
              <thead className="text-light">
                <tr>
                  {headerRows.map((col, idx) => {
                    if (!filteredCols.includes(idx)) {
                      return <th key={idx}>{col}</th>;
                    }
                  })}
                </tr>
              </thead>
              <tbody>
                {live.map((row, rowId) => (
                  <tr key={rowId}>
                    {row.map((cell, cellId) => {
                      if (!filteredCols.includes(cellId)) {
                        return (
                          <td key={cellId}>
                            <SmartText
                              input={cell}
                              passwordCol={passwordIdx}
                              row={row}
                            />
                          </td>
                        );
                      }
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ))()}
      {(() =>
        upcoming.length > 0 && (
          <>
            <div className="card-header">
              <h1 className="schedule-title">Upcoming {heading}</h1>
            </div>
            <table className="table table-striped table-bordered table-hover shadow">
              <thead className="text-light">
                <tr>
                  {headerRows.map((col, idx) => {
                    if (!filteredCols.includes(idx)) {
                      return <th key={idx}>{col}</th>;
                    }
                  })}
                </tr>
              </thead>
              <tbody>
                {upcoming.map((row, rowId) => (
                  <tr key={rowId}>
                    {row.map((cell, cellId) => {
                      if (!filteredCols.includes(cellId)) {
                        return (
                          <td key={cellId}>
                            <SmartText
                              input={cell}
                              passwordCol={passwordIdx}
                              row={row}
                            />
                          </td>
                        );
                      }
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ))()}

      {(() =>
        elapsed.length > 0 && (
          <>
            <div className="card-header">
              <h1 className="schedule-title">Completed {heading}</h1>
            </div>
            <table className="table table-striped table-bordered table-hover shadow">
              <thead className="text-light">
                <tr>
                  {headerRows.map((col, idx) => {
                    if (!filteredCols.includes(idx)) {
                      return <th key={idx}>{col}</th>;
                    }
                  })}
                </tr>
              </thead>
              <tbody>
                {elapsed.map((row, rowId) => (
                  <tr key={rowId}>
                    {row.map((cell, cellId) => {
                      if (!filteredCols.includes(cellId)) {
                        return (
                          <td key={cellId}>
                            <SmartText
                              input={cell}
                              passwordCol={passwordIdx}
                              row={row}
                            />
                          </td>
                        );
                      }
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ))()}
    </div>
  );
};

export default LiveItems;
