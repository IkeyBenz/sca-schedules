import React, { useState } from 'react';
import { ScheduleCard } from '../components';

import { Schedule } from '../../types';

interface HomeScreenProps {
  schedules: Schedule[];
}

const HomeScreen: React.FC<HomeScreenProps> = ({ schedules }) => {
  const [filterType, setfilterType] = useState<string>('none');
  const [filterVal, setFilterVal] = useState<string>('');

  return (
    <>
      <div className="container">
        <div className="input-group mt-3">
          <label htmlFor="filter" className="header-title">
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
              <option value="rabbi">Rabbi</option>
            </select>
            {filterType !== 'none' && (
              <input
                type="text"
                className="ml-2"
                onChange={e => setFilterVal(e.target.value.toLowerCase())}
                placeholder={`Enter ${filterType}(s)`}
              />
            )}
          </label>
        </div>
        {schedules.map(schedule => {
          return (
            <ScheduleCard
              key={schedule.title}
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

export default HomeScreen;
