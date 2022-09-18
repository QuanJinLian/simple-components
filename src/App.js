import React from 'react';
import { Toast, toastService } from './components/toast';
import './asset/css/main.scss';

function App() {
  const showToast = level => {
    const name = level === 1 ? 'normal' : level === 2 ? 'waring' : 'error';
    toastService.add(`this is a ${name} toast`, level);
  };

  return (
    <div className="container">
      <Toast />
      <div className="show-toast-button-wrapper">
        <button className="show-toast-button normal" onClick={() => showToast(1)}>
          normal toast
        </button>
        <button className="show-toast-button waring" onClick={() => showToast(2)}>
          waring toast
        </button>
        <button className="show-toast-button error" onClick={() => showToast(3)}>
          error toast
        </button>
      </div>
    </div>
  );
}

export default App;
