import React from 'react';
import { create } from '../../components/useGlobalState';
import { countOb } from './createStore';

export default function GlobalStateBlockItem({ title, hideNumber = false }) {
  const count = countOb.useGlobalState();

  return (
    <div className="global-block">
      {title && <p className="global-title">{title}</p>}
      {!hideNumber && <p className="global-number">{count}</p>}
      <div className="global-buttons">
        <button onClick={countOb.actions?.plus}>+</button>
        <button onClick={countOb.actions?.minus}>-</button>
        <button onClick={countOb.actions?.reset}>reset</button>
      </div>
    </div>
  );
}
