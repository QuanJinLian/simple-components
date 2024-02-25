import React, { useEffect } from 'react';
import GlobalStateBlockItem from './GlobalStateBlockItem';
import './_global.scss';
import { EditForm } from './EditForm';
import { ShowForm } from './ShowForm';
import { countOb } from './createStore';

const lengthArr = new Array(4).fill(0);

export function GlobalStatePage() {
  const count = countOb.useGlobalState();

  useEffect(() => {
    console.log('count---구독', count);
  }, [count]);

  return (
    <>
      <div className="global-page">
        {lengthArr.map((c, i) => (
          <GlobalStateBlockItem key={`${i}-${c}`} title={`${i + 1}st. Component `} />
        ))}
      </div>
      <GlobalStateBlockItem title="Global Button" hideNumber={true} />
      <p className="line" />

      <div className="form-exam">
        <EditForm />
        <ShowForm />
      </div>
    </>
  );
}
