import firebase from 'firebase';

import { Database, FirebaseConfig } from '../types';

class FirebaseManager implements Database {
  db: firebase.database.Database;

  constructor(config: FirebaseConfig) {
    const app = firebase.initializeApp(config);
    this.db = app.database();
  }

  async read(path: string) {
    return this.db
      .ref(path)
      .once('value')
      .then(s => s && s.val());
  }

  async write(path: string, data: any) {
    return this.db.ref(path).set(data);
  }

  async delete(path: string) {
    return this.db.ref(path).remove();
  }

  onChange(path: string, cb: (data: any) => void) {
    this.db.ref(path).on('value', (s) => cb(s.val()));
  } 
}

function createFirebaseDbManager(config: FirebaseConfig) {
  return new FirebaseManager(config);
}

export default createFirebaseDbManager;
