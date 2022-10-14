import { useEffect, useRef } from 'react';
import { useModal, nanoid, escEventService } from '../../components';

export const useModalWithEsc = config => {
  const { isOpen, openModal, closeModal, setIsOpen } = useModal(config);
  const uniqueKey = useRef(`${new Date().toJSON()}-${nanoid()}`);

  useEffect(() => {
    if (isOpen) {
      escEventService?.appendOpenId(uniqueKey.current);
    } else {
      escEventService?.deleteOpenId(uniqueKey.current);
    }
  }, [isOpen]);

  useEffect(() => {
    escEventService?.addEvent(uniqueKey.current, closeModal);
  }, [closeModal]);

  useEffect(() => {
    const _uniqueKey = uniqueKey.current;
    return () => {
      escEventService?.deleteEvent(_uniqueKey);
    };
  }, []);

  return { isOpen, openModal, closeModal, setIsOpen };
};
