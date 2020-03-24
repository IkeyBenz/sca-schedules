import { Attachment, Database } from '../types';

class AttachmentService {
  private storage: Database;

  constructor(database: Database) {
    this.storage = database;
  }

  async addAttachment(attachment: Attachment) {
    return this.storage.push('attachments', attachment);
  }

  async removeAttachment(_id: firebase.database.Reference) {
    return this.storage.delete('attachments', _id);
  }

  async updateAttachment(_id: firebase.database.Reference, newAttachment: Attachment) {
    return this.storage.write(`attachments/${_id}`, newAttachment);
  }

  async getAllAttachments(): Promise<Attachment[]> {
    return this._alphabetize(await this.storage.findAll('attachments'));
  }

  onAttachmentsChanged(cb: (attachments: Attachment[]) => void) {
    this.storage.onChange('attachments', data => cb(this._alphabetize(data)));
  }

  _alphabetize(attachments: Attachment[]) {
    return attachments ? attachments.sort((a, b) => a.title > b.title ? 1 : a.title < b.title ? -1 : 0) : [];
  }
}

function createAttachmentManager(persistedStorage: Database) {
  return new AttachmentService(persistedStorage);
}

export default createAttachmentManager;
