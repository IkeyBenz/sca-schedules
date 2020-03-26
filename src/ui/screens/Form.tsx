import React, { useState, useEffect } from 'react';

import { Form } from '../../types';
import { database } from '../../service/index';

interface FormScreenProps {
  forms: Form[];
}

const FormScreen: React.FC<FormScreenProps> = ({ forms }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [benbat, setBenbat] = useState<string>('');
  const [mothersName, setMothersName] = useState<string>('');
  const [formMessage, setFormMessage] = useState<string>('');

  const success = (e) => {
    setFirstName('');
    setBenbat('');
    setMothersName('');
    setFormMessage('Submitted!');
    setTimeout(() => {
      setFormMessage('');
    }, 2000);
  }

  const fail = (e) => {
    setFormMessage('Error');
  }

  const submit = (e) => {
    e.preventDefault();
    database.push('tehillim', {firstName, benbat, mothersName}).then(success, fail);
  }
  
  return (
    <>
      <div className="container">
        <p>
          We are compiling a list of those who have fallen ill to share with the community so that we may dedicate our prayers and learning in the merit of their complete and speedy recovery.
        </p>
        <form onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="firstName">Hebrew First Name</label>
            <input type="text" id="firstName" className="form-control" onChange={e => setFirstName(e.target.value)} value={firstName} required />
          </div>
          <div className="form-group">
            <label>Ben/Bat</label>
            <div className="form-check">
              <input type="radio" id="ben" name="benbat" value="ben" checked={!!(benbat === 'ben')} onChange={e => e.target.checked && setBenbat(e.target.value)} required />
              <label htmlFor="ben"> Ben</label>
            </div>
            <div className="form-check">
              <input type="radio" id="bat" name="benbat" value="bat" checked={!!(benbat === 'bat')} onChange={e => e.target.checked && setBenbat(e.target.value)} />
              <label htmlFor="bat"> Bat</label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="mothersName">Mother's Hebrew Name</label>
            <input type="text" id="mothersName" className="form-control" onChange={e => setMothersName(e.target.value)} value={mothersName} required />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg">Submit</button>
            {!!formMessage && (<span className="alert">{formMessage}</span>)}
          </div>
        </form>
      </div>
      <div className="container my-5">
        <table className="table table-striped table-bordered table-hover shadow">
          <thead className="text-light">
            <tr>
              <th>Please dedicate prayers and learning in the merit of their complete and speedy recovery.</th>
            </tr>
          </thead>
          <tbody>
          {forms.map((person, idx) => {
            let hebrew = ~person.firstName.search(/[\u0590-\u05FF]/) && ~person.mothersName.search(/[\u0590-\u05FF]/);
            let benbat = person.benbat;
            if (hebrew) {
              benbat = benbat === 'ben' ? 'בן' : 'בת'
            }
            return (
              <tr key={idx}>
                <td dir={hebrew && 'rtl'}>{person.firstName} {benbat} {person.mothersName}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>

    </>
  );
};

export default FormScreen;
