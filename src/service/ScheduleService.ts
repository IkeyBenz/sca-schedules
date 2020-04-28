import moment from 'moment-timezone';

class ScheduleService {
  private storage: Database;

  static scheduleRef = '1TS3fZHRPlhI4L_URhKJXGa48eOy6BiqM1GeSUJL9jFs/live-website-feed';

  constructor(database: Database) {
    this.storage = database;
  }

  async getAllSchedules(): Promise<DataFrame> {
    return this.storage.read(ScheduleService.scheduleRef).then((data) => this.convertTimesToLocalTimezone(data));
  }

  onSchedulesChanged(cb: (data: DataFrame) => void) {
    this.storage.onChange(ScheduleService.scheduleRef, (data: DataFrame) => {
      cb(this.convertTimesToLocalTimezone(data));
    });
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
