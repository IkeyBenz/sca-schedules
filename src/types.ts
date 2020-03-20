import firebase from 'firebase';

export interface Schedule {
  title: string;
  rows: DataFrame;
  _id?: firebase.database.Reference;
}
export type DataFrame = (string | number)[][];
export interface Database {
  read: (path: string) => Promise<any>;
  write: (path: string, data: any) => Promise<boolean>;
  delete: (path: string, _id: firebase.database.Reference) => Promise<boolean>;
  push: (path: string, data: any) => Promise<firebase.database.Reference>;
  findAll: (path: string) => Promise<any[]>
  onChange: (path: string, cb: (data: any) => void) => void;
}
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}
