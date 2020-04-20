import React, { useEffect, useState } from 'react';

import { AttachmentsAdminScreen } from '../ui';
import { attachmentManager } from '../service';

const AttachmentsAdminScreenCreator = () => {
  const [currentAttachments, setCurrentAttachments] = useState<Attachment[]>(
    []
  );

  useEffect(() => {
    attachmentManager.onAttachmentsChanged(setCurrentAttachments);
  }, []);

  const uploadAttachment = attachment => {
    if (!attachment.file) {
      return alert('Please upload an attachment first');
    }
    if (!attachment.title) {
      return alert('Please enter the title of this table');
    }
    return attachmentManager.addAttachment(attachment);
  };

  const removeAttachment = _id => {
    return attachmentManager.removeAttachment(_id);
  };

  const updateAttachment = (_id, updatedAttachment) => {
    return attachmentManager.updateAttachment(_id, updatedAttachment);
  };

  return (
    <AttachmentsAdminScreen
      attachments={currentAttachments}
      createAttachment={uploadAttachment}
      updateAttachment={updateAttachment}
      deleteAttachment={removeAttachment}
    />
  );
};

export default AttachmentsAdminScreenCreator;
