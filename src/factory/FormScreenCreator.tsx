import React, { useEffect, useState } from 'react';

import { FormScreen } from '../ui';
import { formManager } from '../service';

const FormScreenCreator = () => {
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    formManager.onFormsChanged(setForms);
  }, []);

  return <FormScreen forms={forms} />;
};

export default FormScreenCreator;
