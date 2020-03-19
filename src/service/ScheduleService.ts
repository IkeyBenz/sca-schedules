import { Schedule, Database } from '../types';

class ScheduleService {
  storage: Database;

  constructor(databse: Database) {
    this.storage = databse;
  }

  async addSchedule(schedule: Schedule) {
    return this.storage.write(schedule.title, schedule.rows);
  }

  async removeSchedule(title: string) {
    return this.storage.delete(title);
  }

  async getAllSchedules(): Promise<Schedule[]> {
    const schedules = (await this.storage.read('/')) || {};
    return Object.keys(schedules).map(title => ({
      title,
      rows: schedules[title],
    }));
  }
}

function createScheduleManager(persistedStorage: Database) {
  return new ScheduleService(persistedStorage);
}

export default createScheduleManager;
