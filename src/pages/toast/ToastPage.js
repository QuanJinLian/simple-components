import React from 'react';
import { Toast, toastService } from '../../components';

let num = 0;
export function ToastPage() {
  const showToast = (level, duration, onClose) => {
    const name = level === 1 ? 'normal' : level === 2 ? 'waring' : 'error';
    num++;
    toastService.add(`this is a ${name} - ${num} toast`, level, { duration, onClose });
  };

  const onClose = toastMsg => {
    // console.log('toastMsg', toastMsg);
    toastService.add(`${toastMsg.key} toast is closed`, 1);
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
        <button
          className="show-toast-button error"
          style={{ width: '100px' }}
          onClick={() => showToast(3, 20, onClose)}
        >
          error toast 20s
        </button>
      </div>
    </>
  );
}
