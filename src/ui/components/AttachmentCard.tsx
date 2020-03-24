import React from 'react';

import { Attachment } from '../../types';

interface AttachmentCardProps {
  attachment: Attachment;
}

const AttachmentCard: React.FC<AttachmentCardProps> = ({ attachment }) => {
  const { title, file, cover, body } = attachment;

  return (
    <div className="attachment-card my-5 col-md-4 col-sm-12">
      <a href={file} target="_blank">
        <div className="card-header">
          {!!cover && (
            <div className="w-100">
              <img src={cover} className="attachment-cover" />
            </div>
          )}
          <h3 className="attachment-title">{title}</h3>
          <p className="attachment-caption">{body}</p>
        </div>
      </a>
    </div>
  );
};

export default AttachmentCard;
