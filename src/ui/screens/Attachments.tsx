import React, { useState } from 'react';
import { AttachmentCard } from '../components';

import { Attachment } from '../../types';

interface AttachmentScreenProps {
  attachments: Attachment[];
}

const AttachmentScreen: React.FC<AttachmentScreenProps> = ({ attachments }) => {
  return (
    <>
      <div className="container">
        <div className="row">
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
