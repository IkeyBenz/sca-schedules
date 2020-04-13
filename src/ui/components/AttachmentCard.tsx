import React from 'react';

import { Attachment } from '../../types';

interface AttachmentCardProps {
  attachment: Attachment;
}

const AttachmentCard: React.FC<AttachmentCardProps> = ({ attachment }) => {
  const { title, file, cover, body } = attachment;

  return (
    <div className="col-md-4 my-3">
      <div className="card text-center h-100">
        {!!cover && (
          <div className="card-img-top w-100">
            <img src={cover} className="attachment-cover" />
          </div>
        )}
        <a href={file} target="_blank" className="card-body d-flex flex-column align-items-center bg-aliceblue">
            <h3 className="card-title">{title}</h3>
            {!!body && (
              <p className="card-text">{body}</p>
            )}
          <span className="btn btn-primary d-inline-block mt-auto">Click to download</span>
        </a>
      </div>
    </div>
  );
};

export default AttachmentCard;
