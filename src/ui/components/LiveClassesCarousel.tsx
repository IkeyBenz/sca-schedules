import React, { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/css/swiper.css';

import moment from 'moment';

import { SmartText } from './ScheduleCard';
import { excludeFilterDataFrameRows, filterDataFrameRows } from '../../util';


interface LiveClassesProps {
  schedules: Schedule[];
  filter?: {
    type: string;
    match: string;
  };
  heading: string;
}

const LiveClasses: React.FC<LiveClassesProps> = ({
  schedules,
  filter,
  heading,
}) => {
  useEffect(() => {
    new Swiper('.swiper-container',{
      slidesPerView: 'auto',
      centeredSlides: true,
      grabCursor: true
    });
  });

  const rows = [];
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

  const dayIdx = headerRows.findIndex(data => data.toLowerCase().includes('days'));
  const timeIdx = headerRows.findIndex(data => data.toLowerCase().includes('time'));
  const joinIdx = headerRows.findIndex(data => data.toLowerCase().includes('join'));
  const topicIdx = headerRows.findIndex(data => data.toLowerCase().includes('topic'));
  const teacherIdx = headerRows.findIndex(data => data.toLowerCase().includes('teacher'));
  const passwordIdx = headerRows.findIndex(data => data.toLowerCase().includes('password'));

  const filteredCols = headerRows.reduce((acc, cur, idx) => {
    if (cur.toString().toLowerCase().startsWith('hide') || cur.toString().toLowerCase().startsWith('days')) {
      acc.push(idx)
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
          const left = days.findIndex(v => {
            return leftRight[0].includes(v);
          });
          const right = days.findIndex(v => {
            return leftRight[1].includes(v);
          });
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

    if (moment(now).isBetween(startTime, endTime, null, '[)')) {
      live.push(row);
    } else if (moment(now).isSameOrAfter(endTime)) {
      elapsed.push(row);
    } else if (moment(now).isBefore(startTime)) {
      upcoming.push(row);
    }
  });

  return (
    (() => (
      live.length > 0 &&
      <>
        <div className={heading === 'Minyanim' ? 'h3 shadow-lg p-3 mb-5 bg-secondary text-center font-weight-bold text-white' : 'h3 shadow-lg p-3 mb-5 bg-primary text-center font-weight-bold text-white'}>
          Ongoing {heading}
        </div>
        <div className="swiper-container live-classes d-flex justify-content-center mb-5">
          <div className="swiper-wrapper">
            {live.map((row, rowId) => {
              const time = row[timeIdx];
              const topic = row[topicIdx];
              const teacher = row[teacherIdx];
              const url = row[joinIdx];

              return (
                <div className="swiper-slide card mb-3 flex-grow-1 mx-1" key={rowId} style={{maxWidth: "400px"}}>
                  <div className="row no-gutters align-items-center">
                    <div className="col-8">
                      <div className="card-body">
                        <p className="card-text my-0">{time}</p>
                        <p className="card-text my-0"><small className="text-muted">{teacher}</small></p>
                        <h5 className="card-title text-bold mt-2">{topic}</h5>
                      </div>
                    </div>
                    <div className="col-4">
                      <SmartText input={url} row={row} passwordCol={passwordIdx} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </>
    ))()
  );
};

export default LiveClasses;
