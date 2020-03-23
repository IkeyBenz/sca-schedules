import firebase from 'firebase';

import { Database, FirebaseConfig } from '../types';
import { convertJsonToArrayWithIds } from '../util';

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
      .then(s => s.val());
  }

  async write(path: string, data: any) {
    return this.db.ref(path).set(data);
  }

  async push(basePath: string, data: any) {
    return this.db.ref(basePath).push(data);
  }

  /** Gets all documents with their id's in collection */
  async findAll(path: string) {
    return this.db.ref(path).once('value')
    .then(s => s.val() || {}).then(convertJsonToArrayWithIds)
  }

  async delete(path: string, _id: firebase.database.Reference) {
    return this.db.ref(`${path}/${_id}`).remove();
  }

  onChange(path: string, cb: (data: any) => void) {
    this.db.ref(path).on('value', (s) => cb(convertJsonToArrayWithIds(s.val())));
  }

}

function createFirebaseDbManager(config: FirebaseConfig) {
  return new FirebaseManager(config);
}

export default createFirebaseDbManager;
