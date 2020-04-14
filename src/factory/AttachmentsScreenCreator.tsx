import React, { useEffect, useState } from 'react';

import { AttachmentsScreen } from '../ui';
import { attachmentManager } from '../service';

const AttachmentsScreenCreator = () => {
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  useEffect(() => {
    attachmentManager.onAttachmentsChanged(setAttachments);
  }, []);

  return <AttachmentsScreen attachments={attachments} />;
};

export default AttachmentsScreenCreator;