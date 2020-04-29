import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { getColumnIdxOfKey } from '../../util';
import { ScheduleCard, LiveItems } from '../components';

interface ClassesScreenProps {
  schedules: Schedule[];
}

const ClassesScreen: React.FC<ClassesScreenProps> = ({ schedules }) => {
  const [filterType, setfilterType] = useState<string>('none');
  const [filterVal, setFilterVal] = useState<string>('');
  const [heading, setHeading] = useState<string>('Classes');
  const location = useLocation();

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    if (location.pathname.includes('/minyanim')) {
      setHeading('Minyanim');
      setfilterType('type');
      setFilterVal('minyan');
    } else if (location.pathname.includes('/today')) {
      const now = new Date();
      const today = days[now.getDay()];
      setfilterType('day');
      setFilterVal(today);
    }
  }, [days, location.pathname]);

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
      const _a = new Date(`1970/01/01 ${a}`);
      const _b = new Date(`1970/01/01 ${b}`);
      return _a > _b ? 1 : _a < _b ? -1 : 0;
    });
  }, [schedules]);

  const calcTeachers = useCallback(() => {
    let teachers = [];
    schedules.forEach(({ rows }) => {
      const idxOfTime = getColumnIdxOfKey(rows, 'teacher');
      const moreTimes = rows.map(row => row[idxOfTime]);
      teachers = teachers.concat(moreTimes);
    });
    return Array.from(new Set(teachers)).sort();
  }, [schedules]);

  return (
    <>
      <div className="container">
        <div className="row">
          <ul className="nav nav-pills nav-justified m-3 w-100">
            <li className="nav-item">
              <a
                href="/sca-schedules/#/today"
                className={
                  location.pathname.includes('/today')
                    ? 'nav-link active'
                    : 'nav-link'
                }
              >
                Today&apos;s Classes
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/sca-schedules/#/minyanim"
                className={
                  location.pathname.includes('/minyanim')
                    ? 'nav-link active'
                    : 'nav-link'
                }
              >
                Minyanim
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/sca-schedules/#/classes"
                className={
                  location.pathname.includes('/classes')
                    ? 'nav-link active'
                    : 'nav-link'
                }
              >
                Full Schedule
              </a>
            </li>
            <li className="nav-item">
              <a
                href="https://www.youtube.com/channel/UCsHn2xQEscv11QaNHpPf37A"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                Recordings
              </a>
            </li>
          </ul>
        </div>
      </div>

      {location.pathname === '/today' && (
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
      )}

      <div className="container">
        <div className={location.pathname !== '/classes' ? 'd-none' : 'row'}>
          <div className="input-group mt-3 mx-3">
            <label htmlFor="filter" className="header-title">
              Filter By:{' '}
              <select
                name="filter"
                onChange={e => {
                  setfilterType(e.target.value);
                  setFilterVal('');
                }}
                id=""
                value={filterType}
              >
                <option value="none">No filter</option>
                <option value="time">Time of day</option>
                <option value="day">Day of week</option>
                <option value="topic">Topic</option>
                <option value="teacher">Teacher</option>
              </select>
              {filterType !== 'none' &&
                (filterType === 'day' ? (
                  <select
                    className="ml-2"
                    onChange={e => setFilterVal(e.target.value)}
                  >
                    <option value="">Choose Day</option>
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
                    onChange={e => setFilterVal(e.target.value.toLowerCase())}
                  >
                    <option value="">Choose Time</option>
                    {calcAvailableTimes().map(time => (
                      <option value={time}>{time}</option>
                    ))}
                  </select>
                ) : filterType === 'teacher' ? (
                  <select
                    className="ml-2"
                    onChange={e => setFilterVal(e.target.value.toLowerCase())}
                  >
                    <option value="">Choose Teacher</option>
                    {calcTeachers().map(time => (
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
        {location.pathname !== '/today' &&
          schedules.map((schedule, idx) => (
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
          ))}
      </div>
    </>
  );
};

export default ClassesScreen;
