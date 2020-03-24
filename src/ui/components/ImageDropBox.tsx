import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import FileUploader from 'react-firebase-file-uploader';
import { database } from '../../service/index';
import spinner from '../assets/spinner.gif';

interface ImageDropBoxProps {
  onImageDropped: (image: string) => void;
  currentImage?: string;
}
const ImageDropBox: React.FC<ImageDropBoxProps> = ({
  onImageDropped,
  currentImage,
}) => {
  const [previewImage, setPreviewImage] = useState(currentImage);

  useEffect(() => setPreviewImage(currentImage), [currentImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files: File[]) => {
      const file = files[0];
      const imageExt = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;
      if (!imageExt.test(file.name.toLowerCase())) {
        return alert(
          'Only files with .jpg or .jpeg or .png extensions are allowed here.',
        );
      }
      /* convertImageFileToBase64Str(file).then(base64URL => {
        setPreviewImage(base64URL as string);
        onImageDropped(base64URL as string);
      }); */
    },
  });

  const handleUploadStart = (file) => {
    setPreviewImage(spinner as string);
  };

  const handleUploadSuccess = (file) => {
    database
      .storage
      .ref("/logos")
      .child(file)
      .getDownloadURL()
      .then(url => {
        setPreviewImage(url as string);
        onImageDropped(url as string);
      });
  };

  return (
    <div className="image-dropper mt-2">
      <form>
        <FileUploader
          accept="image/*"
          randomizeFilename
          storageRef={database.storage.ref("/logos")}
          onUploadStart={handleUploadStart}
          onUploadSuccess={handleUploadSuccess}
          id="image-drop"
        />
        <label htmlFor="image-drop">
          <p>
            Drop logo here
            <br />
            (or click to choose file)
          </p>
        </label>
      </form>
      {!!previewImage && <img src={previewImage} className="logo" />}
    </div>
  );
};

export default ImageDropBox;
