import firebase from 'firebase/app';
import 'firebase/database';

export interface Schedule {
  title: string;
  rows: DataFrame;
  /** Intended to be a base64 encoded image string */
  logo?: string;
  _id?: firebase.database.Reference;
}

export interface Attachment {
  title: string;
  cover?: string;
  file: string;
  body?: string;
  _id?: firebase.database.Reference;
}
export interface Form {
  firstName: string;
  benbat: string;
  mothersName: string;
  _id?: firebase.database.Reference;
}
export type DataFrame = string[][];
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
