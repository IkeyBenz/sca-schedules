import createScheduleManager from './ScheduleService';
import createAttachmentManager from './AttachmentService';
import createFirebaseDbManager from './DatabaseService';
import createFormManager from './FormService';

const firebaseConfig: FirebaseConfig = {
  apiKey: 'AIzaSyDUNiNW3dfplmHAq65wfKIGGSHS8MGXgzM',
  authDomain: 'sca-rab-schedules.firebaseapp.com',
  databaseURL: 'https://sca-rab-schedules.firebaseio.com',
  projectId: 'sca-rab-schedules',
  storageBucket: 'sca-rab-schedules.appspot.com',
  messagingSenderId: '893196040077',
  appId: '1:893196040077:web:75ee18b5d771028f616fc4',
};

const database = createFirebaseDbManager(firebaseConfig);
const scheduleManager = createScheduleManager(database);
const attachmentManager = createAttachmentManager(database);
const formManager = createFormManager(database);

export { database, scheduleManager, attachmentManager, formManager };
