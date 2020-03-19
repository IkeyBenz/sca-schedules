export interface Schedule {
  title: string;
  rows: DataFrame;
}
export type DataFrame = Array<Array<string | number>>;
export interface Database {
  read: (path: string) => Promise<any>;
  write: (path: string, data: any) => Promise<boolean>;
  delete: (path: string) => Promise<boolean>;
}
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  strageBucket: string;
  messagingSenderId: string;
  appId: string;
}
