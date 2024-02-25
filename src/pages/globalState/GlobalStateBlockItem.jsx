import React, { useEffect } from 'react';
import { countOb } from './createStore';

export default function GlobalStateBlockItem({ title, hideNumber = false }) {
  const count = countOb.useGlobalState();

  useEffect(() => {
    console.log(`count---구독---${title}`, count);
  }, [count]);

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
