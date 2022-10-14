import React from 'react';
import './css/modal.scss';
import { ModalPortal } from './ModalPortal';

export const Modal = props => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, isFooterVisible } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <ModalPortal>
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            {header && (
              <header>
                {header}
                <button className="modal-button__close" onClick={close} />
              </header>
            )}
            <main>{props.children}</main>
            {isFooterVisible && (
              <footer>
                <button className="close" onClick={close}>
                  닫기
                </button>
              </footer>
            )}
          </section>
        ) : null}
      </div>
    </ModalPortal>
  );
};
