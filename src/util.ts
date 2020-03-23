import moment from 'moment';

import { DataFrame } from './types';

export const adjustExcelTime = string => {
    if (typeof string === 'string') return string;
    const timeInMiliSeconds = (string - (25567 + 1)) * 86400 * 1000;
    const fiveHours = 1000 * 60 * 60 * 5;
    const data = new Date(timeInMiliSeconds + fiveHours);
    return moment(data).format('LT');
};

export const cleanExcelData = (d: DataFrame) => 
    d.map(rows => rows.map(col => adjustExcelTime(col)));


export const convertJsonToArrayWithIds = (obj: object) =>
    Object.entries(obj).map(([_id, val]) => ({ _id, ...val }));

export const filterDataFrameRows = (filterType: string, filterVal: string, data: DataFrame) => {
    const header = [...data[0]];
    const searchableColIndex = header.findIndex(key =>
        key.toLowerCase().includes(filterType)
    );
    if (searchableColIndex === -1) { // This table doesn't have a column for specified filterType
        return [header];
    }
    const filteredRows = data.slice(1).filter(row => {
        let cellText = row[searchableColIndex];
        if (filterType === 'time') cellText = cellText.replace(':', '');
        return cellText.toLowerCase().includes(filterVal.toLowerCase());
    });
    return [header].concat(filteredRows);
}