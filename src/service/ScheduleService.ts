import moment from 'moment-timezone';

class ScheduleService {
  private storage: Database;
  static scheduleRef = '1TS3fZHRPlhI4L_URhKJXGa48eOy6BiqM1GeSUJL9jFs/live-website-feed';

  constructor(database: Database) {
    this.storage = database;
  }

  async getAllSchedules(): Promise<DataFrame> {
    return await this.storage.read(ScheduleService.scheduleRef).then((data) => {
      return this.convertTimesToLocalTimezone(data);
    });
  }

  onSchedulesChanged(cb: (data: DataFrame) => void) {
    this.storage.onChange(ScheduleService.scheduleRef, (data: DataFrame) => {
      cb(this.convertTimesToLocalTimezone(data));
    });
  }

  private convertTimesToLocalTimezone = (data: DataFrame) => {
    // const adjustTime = time => moment(time, 'h:mm A').tz('America/New_York').format('h:mm A');
    // const idxOfTime = data[0].findIndex(col => col.toLowerCase().includes('time'));
    // data.forEach((row, i) => i && (row[idxOfTime] = adjustTime(row[idxOfTime])));
    return data;
  }
}

function createScheduleManager(persistedStorage: Database) {
  return new ScheduleService(persistedStorage);
}

export default createScheduleManager;
