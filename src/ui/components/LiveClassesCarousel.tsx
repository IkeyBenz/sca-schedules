import React, { useEffect, useState } from 'react';
import Swiper from 'swiper';
import 'swiper/css/swiper.css';

import moment from 'moment';

import { SmartText } from './ScheduleCard';
import { excludeFilterDataFrameRows, filterDataFrameRows } from '../../util';
import OnAirIndicator from '../assets/on-air-indicator.png';

interface LiveClassesProps {
  schedules: Schedule[];
  filter?: {
    type: string;
    match: string;
  };
  heading: string;
}

const AnimatedSwipeIndicator = () => (
  <div style={{ position: 'relative' }}>
    <div className="swipe-indicator-icon"></div>
  </div>
);

const LiveClasses: React.FC<LiveClassesProps> = ({
  schedules,
  filter,
  heading,
}) => {
  const [shouldShowSwipeIndicator, setShouldShowSwipeIndicator] = useState(
    true,
  );
  useEffect(() => {
    new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      centeredSlides: true,
      grabCursor: true,
    });
  });

  let rows = [];
  schedules.forEach((schedule) => {
    const filteredRows =
      filter?.match === 'minyan'
        ? filterDataFrameRows(filter.type, filter.match, schedule.rows)
        : excludeFilterDataFrameRows('type', 'minyan', schedule.rows);
    rows.push(...filteredRows);
  });
  const headerRows = rows[0];

  if (rows.length < 2) {
    return null;
  }

  const dayIdx = headerRows.findIndex((data) =>
    data.toLowerCase().includes('days'),
  );
  const timeIdx = headerRows.findIndex((data) =>
    data.toLowerCase().includes('time'),
  );
  const joinIdx = headerRows.findIndex((data) =>
    data.toLowerCase().includes('join'),
  );
  const topicIdx = headerRows.findIndex((data) =>
    data.toLowerCase().includes('topic'),
  );
  const teacherIdx = headerRows.findIndex((data) =>
    data.toLowerCase().includes('teacher'),
  );
  const passwordIdx = headerRows.findIndex((data) =>
    data.toLowerCase().includes('password'),
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

  const filteredByDay = (day) =>
    rows.filter((row) => {
      let flag = false;
      const rowDays = row[dayIdx];
      if (rowDays.includes('Daily')) {
        flag = true;
      } else if (rowDays.includes(days[day])) {
        flag = true;
      } else if (rowDays.includes('-')) {
        const rowDaysArr = rowDays.split(/[^\w-]/);
        rowDaysArr.forEach((rowDay) => {
          if (rowDay.includes('-')) {
            const leftRight = rowDay.split('-');
            const left = days.findIndex((v) => {
              return leftRight[0].includes(v);
            });
            const right = days.findIndex((v) => {
              return leftRight[1].includes(v);
            });
            if (left < day && right > day) {
              flag = true;
            }
          }
        });
      }
      return flag;
    });

  let live = [];
  const elapsed = [];
  let upcoming = [];

  filteredByDay(new Date().getDay()).forEach((row) => {
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

  // If there are no classes happening live, show 6 on deck
  let isShowingFuture = false;
  if (live.length === 0) {
    if (upcoming.length === 0) {
      const tomorrowsClasses = filteredByDay((new Date().getDay() + 1) % 7);
      live = tomorrowsClasses.slice(
        0,
        tomorrowsClasses.length > 6 ? 6 : tomorrowsClasses.length,
      );
    } else {
      live = upcoming.slice(0, upcoming.length > 6 ? 6 : upcoming.length);
    }
    isShowingFuture = true;
  }

  return (
    <div onClick={() => setShouldShowSwipeIndicator(false)}>
      <div
        className={
          heading === 'Minyanim'
            ? 'h3 shadow-lg p-3 mb-5 bg-secondary text-center font-weight-bold text-white'
            : 'h3 shadow-lg p-3 mb-5 bg-primary text-center font-weight-bold text-white'
        }>
        Ongoing {heading}
      </div>
      <div className="text-center">
        {isShowingFuture && <h2 className="mr-2 font-weight-bold">Up Next:</h2>}
      </div>
      <div className="swiper-container live-classes d-flex justify-content-center mb-5">
        <div className="swiper-wrapper align-items-center">
          {shouldShowSwipeIndicator && <AnimatedSwipeIndicator />}
          {live.map((row, rowId) => {
            const time = row[timeIdx];
            const topic = row[topicIdx];
            const teacher = row[teacherIdx];
            const url = row[joinIdx];

            return (
              <div
                className="swiper-slide card mb-3 flex-grow-1 mx-1"
                key={rowId}
                style={{ maxWidth: '400px' }}>
                <div
                  className="row no-gutters align-items-center"
                  style={{ border: '4px solid #1E4169', height: 165 }}>
                  <div className="col-7">
                    <div className="card-body">
                      <p className="card-text my-0">{time}</p>
                      <p className="card-text my-0">
                        <small className="text-muted">{teacher}</small>
                      </p>
                      <h5 className="card-title text-bold mt-2">{topic}</h5>
                    </div>
                  </div>
                  <div className="col-5">
                    <img
                      src={OnAirIndicator}
                      width="40"
                      height="40"
                      style={{ position: 'absolute', right: 8, top: 8 }}
                      alt=""
                    />
                    <div className="pt-5 pr-3">
                      <SmartText
                        input={url}
                        row={row}
                        passwordCol={passwordIdx}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LiveClasses;
