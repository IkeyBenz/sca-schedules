import moment from 'moment';
import xlsx from 'xlsx';

import { DataFrame } from './types';

export const dataframeFromExcelFile = (excelFile: File) =>
  new Promise<DataFrame>(resolve => {
    var reader = new FileReader();

    reader.onload = function(e) {
      const data = e.target.result;
      const workbook = xlsx.read(data, { type: 'array' });
      const spreadSheet = workbook.Sheets[workbook.SheetNames[0]];

      const rowObjs = xlsx.utils.sheet_to_json(spreadSheet);
      const header = Object.keys(rowObjs[0]);
      const rows: DataFrame = [header].concat(
        rowObjs.map(obj => header.map(key => obj[key])),
      );
      resolve(cleanExcelData(rows));
    };

    reader.readAsArrayBuffer(excelFile);
  });

export const convertImageFileToBase64Str = (image: File) => 
  new Promise<string | ArrayBuffer>(resolve => {
    const reader = new FileReader();
    reader.onloadend = function (e) {
      resolve(e.target.result);
    }
    reader.readAsDataURL(image);
  });
    

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
    const searchableColIndex = getColumnIdxOfKey(data, filterType);
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

export const getColumnIdxOfKey = (data: DataFrame, key: string) => {
  const colIndex = data[0].findIndex(currKey =>
    currKey.toLowerCase().includes(key.toLowerCase())
  );
  return colIndex !== -1 ? colIndex : undefined;
}