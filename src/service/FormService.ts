import { convertJsonToArrayWithIds } from '../util';

class FormService {
  private storage: Database;

  constructor(database: Database) {
    this.storage = database;
  }

  async addForm(form: Form) {
    return this.storage.push('tehillim', form);
  }

  async removeForm(_id: firebase.database.Reference) {
    return this.storage.delete('tehillim', _id);
  }

  async updateForm(_id: firebase.database.Reference, newForm: Form) {
    return this.storage.write(`tehillim/${_id}`, newForm);
  }

  async getAllForms(): Promise<Form[]> {
    return this._alphabetize(await this.storage.findAll('tehillim'));
  }

  onFormsChanged(cb: (tehillim: Form[]) => void) {
    this.storage.onChange('tehillim', data =>
      cb(this._alphabetize(convertJsonToArrayWithIds(data)))
    );
  }

  _alphabetize(tehillim: Form[]) {
    return tehillim
      ? tehillim.sort((a, b) =>
          a.firstName > b.firstName ? 1 : a.firstName < b.firstName ? -1 : 0
        )
      : [];
  }
}

function createFormManager(persistedStorage: Database) {
  return new FormService(persistedStorage);
}

export default createFormManager;
