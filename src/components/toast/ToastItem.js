import React, { useCallback, useEffect, useRef } from 'react';
import useToast from './hooks/useToast';

const defaultConfig = {
  onClose: () => {},
  duration: useToast.getTimer(),
  wrapperClassName: '',
};

function ToastItem({ toastMsg, close }) {
  const { key, level, msg, config = {} } = toastMsg;
  const {
    duration = defaultConfig.duration,
    onClose = defaultConfig.onClose,
    wrapperClassName = defaultConfig.wrapperClassName,
  } = config;

  const timer = useRef(null);
  const clearTimer = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const onClick = useCallback(() => {
    close(key);
    onClose?.({ key, level, msg });
    clearTimer();
  }, [close, key, clearTimer, onClose, level, msg]);

  /*컴포넌트 마운트 될 때*/
  useEffect(() => {
    timer.current = setTimeout(() => {
      onClick();
    }, duration * 1000);

    return () => {
      clearTimer();
    };
  }, [clearTimer, onClick, duration, key]);

  const levelClassName = levelClass(level);

  return (
    <div className="toast-item-wrapper">
      <div className={`toast-box ${wrapperClassName} ${levelClassName}`}>
        <div className="msg-icon-box">
          <div className="msg-icon" />
        </div>
        <div className="msg-letter">{msg ?? ''}</div>
        <div className="toast-close cursor-pointer" onClick={onClick} />
      </div>
    </div>
  );
}

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
