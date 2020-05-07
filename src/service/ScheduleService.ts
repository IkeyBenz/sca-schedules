import moment from 'moment-timezone';
import { filterDataFrameRows, excludeFilterDataFrameRows, filterByToday, removeHiddenColumns } from '../util';


class ScheduleService {
  private storage: Database;

  static scheduleRef = '1TS3fZHRPlhI4L_URhKJXGa48eOy6BiqM1GeSUJL9jFs/live-website-feed';

  constructor(database: Database) {
    this.storage = database;
  }

  async getAllSchedules(): Promise<AllScheduleDatas> {
    return this.storage.read(ScheduleService.scheduleRef).then(this.makeSchedules);
  }

  onSchedulesChanged(cb: (schedules: AllScheduleDatas) => void) {
    this.storage.onChange(ScheduleService.scheduleRef, data => {
      cb(this.makeSchedules(data));
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private makeSchedules(data: DataFrame) {
    const withoutHiddenRows = filterDataFrameRows('toggle', 'show', data);
    const withoutMinyanim = excludeFilterDataFrameRows('type', 'minyan', withoutHiddenRows);
    const todaysClasses = filterByToday(withoutMinyanim);

    const removeDayCol = (df: DataFrame) => {
      const dayIdx = df[0].findIndex(col => col.toLowerCase().includes('day'));
      if (dayIdx === -1) {
        return df;
      }
      return df.map(row => row.filter((_, idx) => dayIdx !== idx));
    };

    return {
      todaysClasses: removeDayCol(todaysClasses),
      minyanim: filterDataFrameRows('type', 'minyan', withoutHiddenRows),
      fullSchedule: withoutHiddenRows,
    };
  }


  private convertTimesToLocalTimezone = (data: DataFrame) => {
    const adjustTime = (time) => moment(time, 'h:mm A').local().format('h:mm A');
    const idxOfTime = data[0].findIndex((col) => col.toLowerCase().includes('time'));
    const formatted = data.map((row, i) => {
      const newRow = [...row];
      if (i > 0) { // skip header
        const timeRange = newRow[idxOfTime].split('-').map((time) => time.trim());
        newRow[idxOfTime] = timeRange.map(adjustTime).join(' - \n');
      }
      return newRow;
    });
    return formatted;
  }
}

function createScheduleManager(persistedStorage: Database) {
  return new ScheduleService(persistedStorage);
}

export default createScheduleManager;
