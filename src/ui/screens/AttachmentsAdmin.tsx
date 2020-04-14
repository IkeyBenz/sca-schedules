import React, { useState, useEffect } from 'react';
import FileUploader from 'react-firebase-file-uploader';

import { ImageDropBox } from '../components';
import { database } from '../../service/index';
import spinner from '../assets/spinner.gif';

interface AttachmentPreviewItemProps {
  attachment: Attachment;
  isEditing: boolean;
  onUpdateBtnPressed: () => void;
  onDeleteBtnPressed: () => void;
}
const AttachmentPreviewItem: React.FC<AttachmentPreviewItemProps> = ({
  attachment,
  isEditing,
  onUpdateBtnPressed,
  onDeleteBtnPressed,
}) => (
  <li className="list-group-item d-flex justify-content-between my-2">
    <h3>{attachment.title}</h3>

    {isEditing ? (
      <button className="btn btn-danger m-1" onClick={onDeleteBtnPressed}>
        x
      </button>
    ) : (
      <button className="btn btn-warning" onClick={onUpdateBtnPressed}>
        <i className="fas fa-edit text-light"></i>
      </button>
    )}
  </li>
);

interface AttachmentsAdminScreenProps {
  attachments: Attachment[];
  createAttachment: (
    newAttachment: Attachment,
  ) => Promise<firebase.database.Reference> | void;
  deleteAttachment: (_id: firebase.database.Reference) => Promise<boolean>;
  updateAttachment: (
    _id: firebase.database.Reference,
    updatedAttachment: Attachment,
  ) => Promise<boolean>;
}

const AdminScreen: React.FC<AttachmentsAdminScreenProps> = ({
  attachments,
  createAttachment,
  deleteAttachment,
  updateAttachment,
}) => {
  const [attachmentBeingEdited, setAttachmentBeingEdited] = useState<Attachment>(
    undefined,
  );
  const updateAttachmentBeingEdited = updates =>
  setAttachmentBeingEdited({ ...attachmentBeingEdited, ...updates });
  let uploading = false;

  const onSaveBtnPressed = () => {
    const { title, file, cover, body } = attachmentBeingEdited;
    const newAttachment = { title, file, cover: cover || '', body: body || ''};
    if (attachmentBeingEdited._id) {
      updateAttachment(attachmentBeingEdited._id, newAttachment);
    } else {
      createAttachment(newAttachment);
    }
    setAttachmentBeingEdited(undefined);
  };

  const handleUploadSuccess = (file) => {
    database
      .storage
      .ref("/attachments")
      .child(file)
      .getDownloadURL()
      .then(url => {
        updateAttachmentBeingEdited({file: url as string});
        uploading = false;
      });
  };

  const handleUploadStart = (file) => {
    uploading = true;
  };

  useEffect(() => {
    console.log(attachmentBeingEdited);
  }, [attachmentBeingEdited]);
  return (
    <div className="admin-page-container">
      <div className="schedule-manager-widget row mt-5 py-5">
        <div className="col scroll-content">
          {attachments.map((attachment, idx) => (
            <AttachmentPreviewItem
              key={idx}
              attachment={attachment}
              isEditing={attachmentBeingEdited?._id === attachment._id}
              onUpdateBtnPressed={() => setAttachmentBeingEdited(attachment)}
              onDeleteBtnPressed={() => deleteAttachment(attachment._id)}
            />
          ))}
        </div>
        <div className="col schedule-upload-container">
          <div className="text-center">
            <h3 className="text-light">
              {!!attachmentBeingEdited
                ? 'Update Attachment:'
                : 'Upload Attachment Here:'}
            </h3>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Attachment Title"
            value={attachmentBeingEdited?.title || ''}
            onChange={e => updateAttachmentBeingEdited({ title: e.target.value })}
          />
          <ImageDropBox
            onImageDropped={cover => updateAttachmentBeingEdited({ cover })}
            currentImage={attachmentBeingEdited?.cover}
          />
          
          <div className="image-dropper mt-2">
            <form>
              <FileUploader
                randomizeFilename
                metadata={{cacheControl: 'max-age=2592000'}}
                storageRef={database.storage.ref("/attachments")}
                onUploadStart={handleUploadStart}
                onUploadSuccess={handleUploadSuccess}
                id="file-drop"
              />
              <label htmlFor="file-drop">
                <p>
                  Drop attachment here
                  <br />
                  (or click to choose file)
                </p>
              </label>
            </form>
            {!!uploading && <img src={spinner} />}
            {!!attachmentBeingEdited?.file && <a href={attachmentBeingEdited.file} target="_blank">Preview</a>}
          </div>

          <textarea
            className="form-control mt-2"
            placeholder="Caption"
            value={attachmentBeingEdited?.body || ''}
            onChange={e => updateAttachmentBeingEdited({ body: e.target.value })}
          />

          <button className="btn btn-success mt-2" onClick={onSaveBtnPressed}>
            {attachmentBeingEdited?._id ? 'Save updates' : 'Upload Attachment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;
