import React from 'react';
import { Toast, toastService, Tooltip } from '../../components';

const TextTooltip = () => {
  return (
    <>
      <div>20초짜리 Error 토스트</div>
      <div>close 시 5초짜리 Success 토스트 뜸 </div>
    </>
  );
};

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
        <Tooltip title="5초짜리 Success 토스트">
          <button className="show-toast-button normal" style={{ width: '100px' }} onClick={() => showToast(1)}>
            normal toast
          </button>
        </Tooltip>
        <Tooltip title="5초짜리 Warning 토스트">
          <button className="show-toast-button warning" style={{ width: '100px' }} onClick={() => showToast(2)}>
            waring toast
          </button>
        </Tooltip>
        <Tooltip title="5초짜리 Error 토스트">
          <button className="show-toast-button error" style={{ width: '100px' }} onClick={() => showToast(3)}>
            error toast
          </button>
        </Tooltip>
        <Tooltip title={TextTooltip()} placement="bottom-right">
          <button
            className="show-toast-button error"
            style={{ width: '100px' }}
            onClick={() => showToast(3, 20, onClose)}
          >
            error toast 20s
          </button>
        </Tooltip>
      </div>
    </>
  );
}
