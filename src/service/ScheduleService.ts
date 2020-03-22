import { Schedule, Database } from '../types';

class ScheduleService {
  storage: Database;

  constructor(database: Database) {
    this.storage = database;
  }

  async addSchedule(schedule: Schedule) {
    return this.storage.push('schedules', schedule);
  }

  async removeSchedule(_id: firebase.database.Reference) {
    console.log(typeof this);
    return this.storage.delete('schedules', _id);
  }

  async getAllSchedules(): Promise<Schedule[]> {
    return this._alphabetize(await this.storage.findAll('schedules'));

  }

  onSchedulesChanged(cb: (schedules: Schedule[]) => void) {
    this.storage.onChange('schedules', data => cb(this._alphabetize(data)));
  }

  _alphabetize(schedules: Schedule[]) {
    return schedules ? schedules.sort((a, b) => a.title > b.title ? 1 : a.title < b.title ? -1 : 0) : [];
  }
}

function createScheduleManager(persistedStorage: Database) {
  return new ScheduleService(persistedStorage);
}

export default createScheduleManager;
