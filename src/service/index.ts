import { FirebaseConfig } from '../types';

import createScheduleManager from './ScheduleService';
import createFirebaseDbManager from './DatabaseService';

const fbConfig: FirebaseConfig = JSON.parse(
  process.env.REACT_APP_FIREBASE_CONFIG,
);

const database = createFirebaseDbManager(fbConfig);
const scheduleManager = createScheduleManager(database);

export { scheduleManager };
