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
    return await this.storage.findAll('schedules') || [];

  }

  onSchedulesChanged(cb: (schedules: Schedule[]) => void) {
    console.log(this);
    this.storage.onChange('schedules', data => cb(data || []));
  }
}

function createScheduleManager(persistedStorage: Database) {
  return new ScheduleService(persistedStorage);
}

export default createScheduleManager;
