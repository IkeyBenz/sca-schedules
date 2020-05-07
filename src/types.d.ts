declare interface Schedule {
  title: string;
  rows: DataFrame;
  /** Intended to be a base64 encoded image string */
  logo?: string;
  _id?: firebase.database.Reference;
}

declare interface AllScheduleDatas {
  todaysClasses: DataFrame;
  minyanim: DataFrame;
  fullSchedule: DataFrame;
}

declare interface Attachment {
  title: string;
  cover?: string;
  file: string;
  body?: string;
  _id?: firebase.database.Reference;
}
declare interface Form {
  firstName: string;
  benbat: string;
  mothersName: string;
  _id?: firebase.database.Reference;
}
declare type DataFrame = string[][];
declare interface Database {
  read: (path: string) => Promise<any>;
  write: (path: string, data: any) => Promise<boolean>;
  delete: (path: string, _id: firebase.database.Reference) => Promise<boolean>;
  push: (path: string, data: any) => Promise<firebase.database.Reference>;
  findAll: (path: string) => Promise<any[]>
  onChange: (path: string, cb: (data: any) => void) => void;
}
declare interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}
