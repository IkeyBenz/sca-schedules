import React from 'react';
import { AttachmentCard } from '../components';

interface AttachmentScreenProps {
  attachments: Attachment[];
}

// eslint-disable-next-line react/prop-types
const AttachmentScreen: React.FC<AttachmentScreenProps> = ({ attachments }) => (
  <>
    <div className="container">
      <div className="row align-items-stretch">
        {attachments.map((attachment, idx) => (
          <AttachmentCard key={idx} attachment={attachment} />
        ))}
      </div>
    </div>
  </>
);

export default AttachmentScreen;
