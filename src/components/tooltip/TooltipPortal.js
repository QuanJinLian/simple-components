import ReactDOM from 'react-dom';

export function TooltipPortal({ children }) {
  const modalElement = document.querySelector('body');
  return ReactDOM.createPortal(children, modalElement);
}
