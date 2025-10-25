import React from 'react';
import App from './App';
import './reset.css';
import { HashRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
