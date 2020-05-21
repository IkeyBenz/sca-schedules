import moment from 'moment-timezone';
import xlsx from 'xlsx';


export const dataframeFromExcelFile = (excelFile: File) =>
  new Promise<DataFrame>(resolve => {
    const reader = new FileReader();

    reader.onload = function (e) {
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
    };
    reader.readAsDataURL(image);
  });


export const adjustExcelTime = string => string.toString();

export const cleanExcelData = (d: DataFrame) =>
  d.map(rows => rows.map(col => adjustExcelTime(col)));


export const convertJsonToArrayWithIds = (obj: object) =>
  Object.entries(obj).map(([_id, val]) => ({ _id, ...val }));

export const getColumnIdxOfKey = (data: DataFrame, key: string) => {
  const colIndex = data[0].findIndex(currKey =>
    currKey.toLowerCase().includes(key.toLowerCase()));
  return colIndex;
};

export const excludeFilterDataFrameRows = (
  filterType: string,
  filterVal: string,
  data: DataFrame,
) => {
  const header = [...data[0]];
  const searchableColIndex = getColumnIdxOfKey(data, filterType);
  if (searchableColIndex === -1) { // This table doesn't have a column for specified filterType
    return [...data];
  }
  const filteredRows = data.slice(1).filter(row => {
    const cellText = row[searchableColIndex];
    // if (filterType === 'time') cellText = cellText.replace(':', '');
    return cellText && !cellText.toLowerCase().includes(filterVal.toLowerCase());
  });
  return [header].concat(filteredRows);
};

export const filterDataFrameRows = (filterType: string, filterVal: string, data: DataFrame) => {
  const header = [...data[0]];
  const searchableColIndex = getColumnIdxOfKey(data, filterType);
  if (searchableColIndex === -1) { // This table doesn't have a column for specified filterType
    return [header];
  }
  const filteredRows = data.slice(1).filter(row => {
    const cellText = row[searchableColIndex];
    // if (filterType === 'time') cellText = cellText.replace(':', '');
    return cellText && cellText.toLowerCase().includes(filterVal.toLowerCase());
  });
  return [header].concat(filteredRows);
};

// Time is intended to be formatted as '7:00 AM'
export const adjustToLocalTimezone = time => moment(time, 'h:mm A').tz('America/New_York').format('h:mm A');

export const filterByToday = (scheduleData: DataFrame) => {
  const dayIdx = scheduleData.length > 0
    && scheduleData[0].findIndex(data => data.toLowerCase().includes('days'));

  if (!dayIdx || dayIdx === -1) {
    return scheduleData;
  }

  const now = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return scheduleData.filter((row, i) => {
    let shouldInclude = i === 0;
    const dayCol = row[dayIdx];
    if (dayCol.toLowerCase().includes('daily')) {
      shouldInclude = true;
    } else if (dayCol.includes(days[now.getDay()])) {
      shouldInclude = true;
    } else if (dayCol.includes('-')) {
      const rowDaysArr = dayCol.split(/[^\w-]/);
      rowDaysArr.forEach(rowDay => {
        if (rowDay.includes('-')) {
          const leftRight = rowDay.split('-');
          const left = days.findIndex(v => leftRight[0].includes(v));
          const right = days.findIndex(v => leftRight[1].includes(v));
          if (left < now.getDay() && right > now.getDay()) {
            shouldInclude = true;
          }
        }
      });
    }
    return shouldInclude;
  });
};

export const removeHiddenColumns = (data: DataFrame) => {
  const indicesOfHidden = data[0]
    .map((col, idx) => ({ col, idx }))
    .filter(({ col }) => col.toLowerCase().includes('hide'))
    .map(({ idx }) => idx);

  return data.map(row => row.filter((_, colIdx) => !indicesOfHidden.includes(colIdx)));
};

export const convertZoomLinkToWebClient = (link: string) => {
  // https://us02web.zoom.us/j/84266335794?pwd=a05NbmN2SVU1VXdpSERvNHBDQ3JLdz09 - Example link
  if (!link.includes('/j/')) {
    return link;
  }
  const [domain, meetingParams] = link.split('/j/');
  const [meetingId] = meetingParams.split('?');
  return `${domain}/wc/join/${meetingId}`;
};
