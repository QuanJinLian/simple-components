import React from 'react';
import { FormTest } from '../form/FormTest';
import { formObserve } from './createStore';

export function EditForm() {
  const onValueChange = values => {
    formObserve.actions.upateForm(values);
  };

  return (
    <div className="edit-form-wrapper">
      <h1>여긴 EditForm 컴포넌트</h1>
      <FormTest onValueChange={onValueChange} initialValues={formObserve.getInitialState()} />
    </div>
  );
}
