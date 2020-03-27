import React, { useState, useCallback } from 'react';
import { ScheduleCard, LiveItems } from '../components';

import { Schedule } from '../../types';
import { getColumnIdxOfKey } from '../../util';
import { useLocation } from 'react-router-dom';

interface ClassesScreenProps {
  schedules: Schedule[];
}

const ClassesScreen: React.FC<ClassesScreenProps> = ({ schedules }) => {
  const [filterType, setfilterType] = useState<string>('none');
  const [filterVal, setFilterVal] = useState<string>('');
  const [heading, setHeading] = useState<string>('Classes');
  const location = useLocation();

  if (location.pathname === '/minyanim' && filterType !== 'topic') {
    setHeading('Minyanim');
    setfilterType('topic');
    setFilterVal('minyan');
  }

  const calcAvailableTimes = useCallback(() => {
    const validTime = /\d\d?:\d\d ([AP]M)/;
    let times = [];
    schedules.forEach(({ rows }) => {
      const idxOfTime = getColumnIdxOfKey(rows, 'time');
      const moreTimes = rows
        .map(row => row[idxOfTime])
        .filter(time => validTime.test(time))
        .map(time => time.match(validTime)[0]);
      times = times.concat(moreTimes);
    });
    return Array.from(new Set(times)).sort((a, b) => {
      const _a = new Date('1970/01/01 ' + a);
      const _b = new Date('1970/01/01 ' + b);
      return _a > _b ? 1 : _a < _b ? -1 : 0;
    });
  }, [schedules]);

  return (
    <>
      <div className="container">
        <LiveItems
          schedules={schedules}
          filter={
            !(filterType === 'none' || filterVal === '') && {
              type: filterType,
              match: filterVal,
            }
          }
          heading={heading}
        />
      </div>
      <div className="container">
        <div className="row">
          <div className="input-group mt-3">
            <label
              htmlFor="filter"
              className={filterType === 'topic' ? 'hidden' : 'header-title'}>
              Filter By:{' '}
              <select
                name="filter"
                onChange={e => setfilterType(e.target.value)}
                id=""
                value={filterType}>
                <option value="none">No filter</option>
                <option value="time">Time of day</option>
                <option value="day">Day of week</option>
                <option value="class">Class</option>
                <option value="teacher">Teacher</option>
              </select>
              {filterType !== 'none' &&
                (filterType === 'day' ? (
                  <select
                    className="ml-2"
                    onChange={e => setFilterVal(e.target.value)}>
                    <option value="mon">Mon</option>
                    <option value="tues">Tues</option>
                    <option value="wed">Wed</option>
                    <option value="thurs">Thurs</option>
                    <option value="fri">Fri</option>
                    <option value="sun">Sun</option>
                  </select>
                ) : filterType === 'time' ? (
                  <select
                    className="ml-2"
                    onChange={e => setFilterVal(e.target.value.toLowerCase())}>
                    <option value="">Choose Time</option>
                    {calcAvailableTimes().map(time => (
                      <option value={time}>{time}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    className="ml-2"
                    onChange={e => setFilterVal(e.target.value.toLowerCase())}
                    placeholder={`Enter ${filterType}(s)`}
                  />
                ))}
            </label>
          </div>
        </div>
        {schedules.map((schedule, idx) => {
          return (
            <ScheduleCard
              key={idx}
              schedule={schedule}
              filter={
                !(filterType === 'none' || filterVal === '') && {
                  type: filterType,
                  match: filterVal,
                }
              }
            />
          );
        })}
      </div>
    </>
  );
};

export default ClassesScreen;
