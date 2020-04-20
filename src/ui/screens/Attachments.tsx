import React, { useState } from 'react';
import { AttachmentCard } from '../components';


interface AttachmentScreenProps {
  attachments: Attachment[];
}

const AttachmentScreen: React.FC<AttachmentScreenProps> = ({ attachments }) => {
  return (
    <>
      <div className="container">
        <div className="row align-items-stretch">
          {attachments.map((attachment, idx) => {
            return (
              <AttachmentCard
                key={idx}
                attachment={attachment}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AttachmentScreen;
