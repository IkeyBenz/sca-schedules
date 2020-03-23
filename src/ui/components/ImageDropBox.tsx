import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { convertImageFileToBase64Str } from '../../util';

interface ImageDropBoxProps {
  onImageDropped: (image: string | ArrayBuffer) => void;
}
const ImageDropBox: React.FC<ImageDropBoxProps> = ({ onImageDropped }) => {
  const [previewImage, setPreviewImage] = useState(undefined);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files: File[]) => {
      const file = files[0];
      const imageExt = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;
      if (!imageExt.test(file.name.toLowerCase())) {
        return alert(
          'Only files with .jpg or .jpeg or .png extensions are allowed here.',
        );
      }
      convertImageFileToBase64Str(file).then(base64URL => {
        setPreviewImage(base64URL);
        onImageDropped(base64URL);
      });
    },
  });

  return (
    <div {...getRootProps()} className="image-dropper mt-2">
      <input {...getInputProps()} />
      <p>
        Drop logo here
        <br />
        (or click to choose file)
      </p>
      {!!previewImage && <img src={previewImage} className="logo" />}
    </div>
  );
};

export default ImageDropBox;
