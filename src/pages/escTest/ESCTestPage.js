import React, { useState } from 'react';
import { Modal } from '../../components';
import './esc.scss';
import { useModalWithEsc } from './useModalWithEsc';

const text = (
  <div className="prompt-text-wrapper">
    <span className="prompt-text">prompt text </span>
    <span className="prompt-text">prompt text </span>
    <span className="prompt-text">prompt text </span>
  </div>
);

export function ESCTestPage() {
  const modalConf1 = useModalWithEsc();
  const modalConf2 = useModalWithEsc();
  const modalConf4 = useModalWithEsc();

  const [value, setValue] = useState('');
  const onChange = e => {
    setValue(e?.target?.value || '');
  };

  const modal3Close = () => {
    if (value) {
      modalConf4.openModal();
      throw 'err';
    }
  };

  const modalConf3 = useModalWithEsc({ closeFn: modal3Close });

  return (
    <div className="esc-demo">
      <div>
        <div className="modal-wrapper">
          <button className="test-button" onClick={modalConf1.openModal}>
            modal 1
          </button>
          {modalConf1.isOpen && (
            <div className="semi-modal">
              <button className="semi-modal-button__close" onClick={modalConf1.closeModal} />
              <span className="semi-modal-title"> modal 1</span>
              {text}
            </div>
          )}
        </div>

        <div className="modal-wrapper">
          <button className="test-button" onClick={modalConf2.openModal}>
            modal 2
          </button>
          {modalConf2.isOpen && (
            <div className="semi-modal">
              <button className="semi-modal-button__close" onClick={modalConf2.closeModal} />
              <span className="semi-modal-title"> modal 2</span>
              {text}
            </div>
          )}
        </div>

        <div className="modal-wrapper">
          <button className="test-button" onClick={modalConf3.openModal}>
            modal 3
          </button>
          <Modal open={modalConf3.isOpen} close={modalConf3.closeModal} header="modal 3">
            <div className="modal-inner-wrapper">
              <input type="text" value={value} onChange={onChange}></input>
              <button className="test-button" onClick={() => onChange(null)}>
                reset
              </button>
            </div>
          </Modal>
        </div>
      </div>

      <Modal open={modalConf4.isOpen} close={modalConf4.closeModal} header="alert">
        <div className="modal-inner-wrapper">input 내용이 있으면 모달을 닫을 수 없습니다.</div>
      </Modal>
    </div>
  );
}
