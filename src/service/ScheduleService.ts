class ScheduleService {
  private storage: Database;

  static scheduleRef =
    '1TS3fZHRPlhI4L_URhKJXGa48eOy6BiqM1GeSUJL9jFs/live-website-feed';

  constructor(database: Database) {
    this.storage = database;
  }

  async getAllSchedules(): Promise<DataFrame> {
    return await this.storage.read(ScheduleService.scheduleRef);
  }

  onSchedulesChanged(cb: (data: DataFrame) => void) {
    this.storage.onChange(ScheduleService.scheduleRef, cb);
  }
}

function createScheduleManager(persistedStorage: Database) {
  return new ScheduleService(persistedStorage);
}

export default createScheduleManager;
