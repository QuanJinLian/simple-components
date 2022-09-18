import React from 'react';
import useToast from './hooks/useToast';

const ToastItem = React.memo(function ToastItem({ toastMsg, close }) {
  const { key, level, msg, item } = toastMsg;
  let timer;
  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  /*컴포넌트 마운트 될 때*/
  timer = setTimeout(() => {
    close(key);
    clearTimer();
  }, useToast.getTimer() * 1000);

  const onClick = () => {
    clearTimer();
    close(key);
  };
  const levelClassName = levelClass(level);

  return (
    <>
      <div className={`toast-box ${levelClassName}`}>
        <div className="msg-icon-box">
          <div className="msg-icon" />
        </div>
        <div className="msg-letter">{item ? `${msg}.item:${item}` : msg}</div>
        <div className="toast-close cursor-pointer" onClick={onClick} />
      </div>
    </>
  );
});

function levelClass(level) {
  switch (level) {
    case 1:
      return 'toast-normal';
    case 2:
      return 'toast-warn';
    case 3:
      return 'toast-error';
    default:
      return 'toast-normal';
  }
}

export default ToastItem;
