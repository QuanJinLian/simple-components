import React, { useReducer } from 'react';
import useToast, { toastReducer } from './hooks/useToast';
import ToastItem from './ToastItem';
import './css/toast.scss';

export function Toast() {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  useToast.setDispatch(dispatch);

  return (
    <div className="toast-msg">
      {toasts?.map(toast => (
        <ToastItem key={toast.key} toastMsg={toast} close={useToast.cancel} />
      ))}
    </div>
  );
}
