import React from 'react';
import { useDropzone } from 'react-dropzone';

import { DataFrame } from '../../types';

interface AdminScreenProps {
  onCsvUploaded?: (title: string, data: DataFrame) => void;
}

const AdminScreen: React.FC<AdminScreenProps> = ({ onCsvUploaded }) => (
  <div className="h-100 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <h1>AdminScreen</h1>
  </div>
);

export default AdminScreen;
