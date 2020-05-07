import React from 'react';
import moment from 'moment';
// import * as linkify from 'linkifyjs';

import ScheduleCard, { SmartText } from './ScheduleCard';
import { excludeFilterDataFrameRows, filterDataFrameRows } from '../../util';

interface LiveItemsProps {
  schedule: Schedule;
  filter?: {
    type: string;
    match: string;
  };
}

/** Displays three schedule cards for upcoming, ongoing, and elapsed classes.
 *
 */
const LiveItems: React.FC<LiveItemsProps> = ({ schedule, filter }) => {
  const { rows } = schedule;

  const headerRows = rows[0];
  const removeDayCol = df => {
    const dayIdx = df[0].findIndex(col => col.toLowerCase().includes('day'));
    return dayIdx !== -1
      ? rows.map(row => row.filter((_, i) => i !== dayIdx))
      : df;
  };

  if (rows.length < 2) {
    // No rows matched the filter criteria
    return null;
  }

  const timeIdx = headerRows.findIndex(data =>
    data.toLowerCase().includes('time')
  );

  // If can't categorize by times, display all in one
  if (timeIdx === -1) {
    return <ScheduleCard schedule={{ title: '', rows }} />;
  }

  const now = new Date();
  const live = [];
  const elapsed = [];
  const upcoming = [];

  rows.forEach(row => {
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
    <div>
      {live.length > 0 && (
        <ScheduleCard
          schedule={{
            rows: removeDayCol([headerRows].concat(live)),
            title: `Ongoing ${schedule.title}`,
          }}
          filter={filter}
        />
      )}
      {upcoming.length > 0 && (
        <ScheduleCard
          schedule={{
            rows: removeDayCol([headerRows].concat(upcoming)),
            title: `Upcoming ${schedule.title}`,
          }}
          filter={filter}
        />
      )}
      {elapsed.length > 0 && (
        <ScheduleCard
          schedule={{
            rows: removeDayCol([headerRows].concat(elapsed)),
            title: `Elapsed ${schedule.title}`,
          }}
          filter={filter}
        />
      )}
    </div>
  );
};

export default LiveItems;
