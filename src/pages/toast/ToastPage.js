import React from 'react';
import { Toast, toastService } from '../../components';

export function ToastPage() {
  const showToast = level => {
    const name = level === 1 ? 'normal' : level === 2 ? 'waring' : 'error';
    toastService.add(`this is a ${name} toast`, level);
  };

  return (
    <>
      <Toast />
      <div className="show-toast-button-wrapper">
        <button className="show-toast-button normal" style={{ width: '100px' }} onClick={() => showToast(1)}>
          normal toast
        </button>
        <button className="show-toast-button warning" style={{ width: '100px' }} onClick={() => showToast(2)}>
          waring toast
        </button>
        <button className="show-toast-button error" style={{ width: '100px' }} onClick={() => showToast(3)}>
          error toast
        </button>
      </div>
    </>
  );
}
