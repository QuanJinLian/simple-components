import React from 'react';
import GlobalStateBlockItem from './GlobalStateBlockItem';
import './_global.scss';

const lengthArr = new Array(4).fill(0);

export function GlobalStatePage() {
  return (
    <>
      <div className="global-page">
        {lengthArr.map((c, i) => (
          <GlobalStateBlockItem key={`${i}-${c}`} title={`${i + 1}st. Component `} />
        ))}
      </div>
      <GlobalStateBlockItem title="Global Button" hideNumber={true} />
    </>
  );
}
