import ReactDOM from 'react-dom';

export function ModalPortal({ children }) {
  const modalElement = document.querySelector('#root');
  return ReactDOM.createPortal(children, modalElement);
}
