import React, { useState, useCallback } from 'react';
import { ScheduleCard } from '../components';

import { Schedule } from '../../types';

interface HomeScreenProps {
  schedules: Schedule[];
}

type FilterPreference = 'none' | 'time' | 'day' | 'rabbi' | 'class';

const HomeScreen: React.FC<HomeScreenProps> = ({ schedules: allSchedules }) => {
  const [filterPref, setFilterPref] = useState<FilterPreference>('none');
  const [filterVal, setFilterVal] = useState<string>('');
  const onFilterSet = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.value as FilterPreference;
    setFilterPref(filter);
  };

  const filterSchedules = useCallback(
    (schedules: Schedule[]) => {
      if (filterPref === 'none' || filterVal === '') {
        return schedules;
      }

      return schedules.filter(schedule => {
        const headerKeys = schedule.rows[0];
        const searchableColIndex = headerKeys.findIndex(key =>
          key
            .toString()
            .toLowerCase()
            .includes(filterPref),
        );
        return (
          searchableColIndex !== -1 &&
          schedule.rows
            .slice(1)
            .findIndex(row =>
              row[searchableColIndex].toLowerCase().includes(filterVal),
            ) !== -1
        );
      });
    },
    [filterVal, filterPref],
  );

  return (
    <>
      <div className="container">
        <div className="input-group mt-3">
          <label htmlFor="filter" className="header-title">
            Filter By:{' '}
            <select
              name="filter"
              onChange={onFilterSet}
              id=""
              value={filterPref}>
              <option value="none">No filter</option>
              <option value="time">Time of day</option>
              <option value="day">Day of week</option>
              <option value="class">Class</option>
              <option value="rabbi">Rabbi</option>
            </select>
            {filterPref !== 'none' && (
              <input
                type="text"
                className="ml-2"
                onChange={e => setFilterVal(e.target.value.toLowerCase())}
                placeholder={`Enter ${filterPref}(s)`}
              />
            )}
          </label>
        </div>
        {filterSchedules(allSchedules).map(schedule => {
          console.log(schedule);
          return <ScheduleCard key={schedule.title} schedule={schedule} />;
        })}
      </div>
    </>
  );
};

export default HomeScreen;
