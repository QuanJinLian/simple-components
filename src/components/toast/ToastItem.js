import React from 'react';
import useToast from './hooks/useToast';

const defaultConfig = {
  onClose: () => {},
  duration: useToast.getTimer(),
  wrapperClassName: '',
};

const ToastItem = React.memo(function ToastItem({ toastMsg, close }) {
  const { key, level, msg, config = {} } = toastMsg;

  const {
    duration = defaultConfig.duration,
    onClose = defaultConfig.onClose,
    wrapperClassName = defaultConfig.wrapperClassName,
  } = config;

  let timer;
  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  const onClick = () => {
    close(key);
    clearTimer();
    onClose?.(toastMsg);
  };

  /*컴포넌트 마운트 될 때*/
  timer = setTimeout(() => {
    onClick();
  }, duration * 1000);

  const levelClassName = levelClass(level);

  return (
    <>
      <div className={`toast-box ${wrapperClassName} ${levelClassName}`}>
        <div className="msg-icon-box">
          <div className="msg-icon" />
        </div>
        <div className="msg-letter">{msg ?? ''}</div>
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
