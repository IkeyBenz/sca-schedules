import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { DataFrame } from '../../types';
import { dataframeFromExcelFile } from '../../util';

import ScheduleCard from './ScheduleCard';

interface SpreadSheetDropBoxProps {
  onSpreadSheetDropped: (data: DataFrame) => void;
}

const SpreadSheetDropBox: React.FC<SpreadSheetDropBoxProps> = ({
  onSpreadSheetDropped,
}) => {
  const [droppedFileName, setDroppedFileName] = useState(undefined);
  const [dataRows, setDataRows] = useState<DataFrame>(undefined);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files: File[]) => {
      const file = files[0];
      const excelExt = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
      if (!excelExt.test(file.name.toLowerCase())) {
        return alert(
          'Only files with .xlsx or .xls extentions are allowed here.',
        );
      }
      setDroppedFileName(file.name);
      dataframeFromExcelFile(file).then(rows => {
        setDataRows(rows);
        onSpreadSheetDropped(rows);
      });
    },
  });

  return (
    <div {...getRootProps()} className="file-dropper scroll-content p-4 my-2">
      <input {...getInputProps()} />
      {!droppedFileName && (
        <p>
          Drop excel file here
          <br />
          (or click to choose file)
        </p>
      )}
      {!!droppedFileName && <p>{droppedFileName}</p>}
      {!!dataRows && <ScheduleCard schedule={{ title: '', rows: dataRows }} />}
    </div>
  );
};

export default SpreadSheetDropBox;
