import React, { useState } from 'react';
import { ScheduleCard, LiveItems } from '../components';

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
        <LiveItems schedules={schedules} />
      </div>
      <div className="container">
        <div className="row">
          <div className="input-group mt-3 col-md-3 col-sm-6">
            <label htmlFor="filter" className={filterType === 'topic' ? 'hidden' : 'header-title'}>
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
          <div className="input-group mt-3 col-md-3 col-sm-6">
            <label htmlFor="minaynim"><input type="checkbox" onChange={(e) => {if (e.target.checked) {setFilterVal('minyan'); setfilterType('topic')} else {setFilterVal(''); setfilterType('')}}}/>Show minyanim</label>
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

export default HomeScreen;