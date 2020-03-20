import React, { useCallback, useState } from 'react';
import xlsx from 'xlsx';

import { useDropzone } from 'react-dropzone';

import { DataFrame } from '../../types';

const dataframeFromExcelFile = (excelFile: File) =>
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
      resolve(rows);
    };

    reader.readAsArrayBuffer(excelFile);
  });

const SpreadSheetDropBox = ({ onSpreadSheetDropped }) => {
  const [droppedFileName, setDroppedFileName] = useState(undefined);

  const convertFileToDF = useCallback(
    (file: File) => {
      const excelExt = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;

      if (!excelExt.test(file.name.toLowerCase())) {
        return alert('Only files with .xlsx or .xls extentions are allowed');
      }
      setDroppedFileName(file.name);
      dataframeFromExcelFile(file).then(onSpreadSheetDropped);
    },
    [onSpreadSheetDropped],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files: File[]) => convertFileToDF(files[0]),
  });

  return (
    <div {...getRootProps()} className="file-dropper p-4 my-2">
      <input {...getInputProps()} />
      <p>{droppedFileName ? droppedFileName : 'Drop excel file here'}</p>
    </div>
  );
};

export default SpreadSheetDropBox;
