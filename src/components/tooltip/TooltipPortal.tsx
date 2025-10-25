import ReactDOM from 'react-dom';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function TooltipPortal({ children }: Props) {
  const modalElement = document.querySelector('body');
  return modalElement ? ReactDOM.createPortal(children, modalElement) : null;
}
