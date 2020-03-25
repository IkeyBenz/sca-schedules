import React from 'react';

import { Attachment } from '../../types';

interface AttachmentCardProps {
  attachment: Attachment;
}

const AttachmentCard: React.FC<AttachmentCardProps> = ({ attachment }) => {
  const { title, file, cover, body } = attachment;

  return (
    <div className="attachment-card px-0 col-md-4">
      <a href={file} target="_blank" className="d-flex flex-column align-items-center justify-content-center">
        <div className="card-header">
          {!!cover && (
            <div className="w-100">
              <img src={cover} className="attachment-cover" />
            </div>
          )}
          <h3 className="attachment-title">{title}</h3>
          {!!body && (
            <p className="attachment-caption">{body}</p>
          )}
        </div>
        <span className="btn btn-secondary">Click to download</span>
      </a>
    </div>
  );
};

export default AttachmentCard;
