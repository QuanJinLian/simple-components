import { useCallback, useEffect, useState } from 'react';
import { _isFunction } from '../../common';

export const useModal = config => {
  const { defaultValue, closeFn, openFn } = config || {};
  const [isOpen, setIsOpen] = useState(defaultValue || false);

  useEffect(() => {
    setIsOpen(defaultValue);
  }, [defaultValue]);

  const openModal = useCallback(() => {
    if (_isFunction(openFn)) openFn();
    setIsOpen(true);
  }, [setIsOpen, openFn]);

  const closeModal = useCallback(() => {
    if (_isFunction(closeFn)) closeFn();
    setIsOpen(false);
  }, [closeFn]);

  return { isOpen, openModal, closeModal, setIsOpen };
};
