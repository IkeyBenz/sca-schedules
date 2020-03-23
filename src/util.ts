import moment from 'moment';

import { DataFrame } from './types';

export const adjustExcelTime = string => {
    if (typeof string === 'string') return string;
    const timeInMiliSeconds = (string - (25567 + 1)) * 86400 * 1000;
    const fiveHours = 1000 * 60 * 60 * 5;
    const data = new Date(timeInMiliSeconds + fiveHours);
    console.log(data);
    return moment(data).format('LT');
};

export const cleanExcelData = (d: DataFrame) => 
    d.map(rows => rows.map(col => adjustExcelTime(col)));


export const convertJsonToArrayWithIds = (obj: object) =>
    Object.entries(obj).map(([_id, val]) => ({ _id, ...val }));
