import React from 'react';
import { FormTest } from '../form/FormTest';
import { formObserve } from './createStore';

export function EditForm() {
  const onValueChange = values => {
    formObserve.actions.upateForm(values);
  };

  return (
    <div className="edit-form-component">
      <div className="subscribe-button-wrapper">
        <button className="test-button cancel" onClick={formObserve.disconnect}>
          구독 취소
        </button>
        <button className="test-button" onClick={formObserve.reconnect}>
          구독 다시 시작
        </button>
      </div>
      <div className="edit-form-wrapper">
        <h1>여긴 EditForm 컴포넌트</h1>
        <FormTest onValueChange={onValueChange} initialValues={formObserve.getInitialState()} />
      </div>
    </div>
  );
}
