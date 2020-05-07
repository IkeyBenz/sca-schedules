import React, { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { getColumnIdxOfKey } from '../../util';
import { ScheduleCard, LiveItems } from '../components';

interface ClassesScreenProps {
  todaysClasses: DataFrame;
  minyanim: DataFrame;
  fullSchedule: DataFrame;
}

const ClassesScreen: React.FC<ClassesScreenProps> = ({
  todaysClasses,
  minyanim,
  fullSchedule: scheduleData,
}) => {
  const [filterType, setfilterType] = useState<string>('none');
  const [filterVal, setFilterVal] = useState<string>('');
  const location = useLocation();

  const calcAvailableTimes = () => {
    if (scheduleData.length === 0) {
      return [];
    }
    const validTime = /\d\d?:\d\d ([AP]M)/;
    const idxOfTime = getColumnIdxOfKey(scheduleData, 'time');
    const times =
      idxOfTime === -1
        ? []
        : scheduleData
            .map(row => row[idxOfTime])
            .filter(time => validTime.test(time))
            .map(time => time.match(validTime)[0]);

    return Array.from(new Set(times)).sort((a, b) => {
      const last = new Date(`1970/01/01 ${a}`);
      const next = new Date(`1970/01/01 ${b}`);
      return last > next ? 1 : last < next ? -1 : 0;
    });
  };

  const calcTeachers = useCallback(() => {
    let teachers = [];
    const idxOfTime = getColumnIdxOfKey(scheduleData, 'teacher');
    const moreTimes = scheduleData.map(row => row[idxOfTime]);
    teachers = teachers.concat(moreTimes);
    return Array.from(new Set(teachers)).sort();
  }, [scheduleData]);

  return (
    <>
      <div className="container pb-5">
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

      {scheduleData.length > 0 && (
        <div className="container">
          <div className={location.pathname === '/minyanim' ? 'd-none' : 'row'}>
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
                  {location.pathname !== '/today' && (
                    <option value="day">Day of week</option>
                  )}
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
          {location.pathname === '/today' && (
            <LiveItems
              schedule={{
                title: 'Classes',
                rows: todaysClasses,
              }}
              filter={
                !(filterType === 'none' || filterVal === '') && {
                  type: filterType,
                  match: filterVal,
                }
              }
            />
          )}
          {location.pathname === '/minyanim' && (
            <ScheduleCard
              schedule={{
                title: 'Minyanim',
                rows: minyanim,
              }}
            />
          )}
          {location.pathname === '/classes' && (
            <ScheduleCard
              schedule={{
                title: 'Classes & Minyanim',
                rows: scheduleData,
              }}
              filter={
                !(filterType === 'none' || filterVal === '') && {
                  type: filterType,
                  match: filterVal,
                }
              }
            />
          )}
        </div>
      )}
    </>
  );
};

export default ClassesScreen;
