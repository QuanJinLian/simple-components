import { useEffect, useState } from 'react';

export const useGlobalStateImpl = (globalStore, name) => () => {
  const [state, setState] = useState(globalStore[name]?.state);

  useEffect(() => {
    if (!name || !globalStore[name]) return;

    globalStore[name].setStateFn.add(setState);

    return () => {
      globalStore?.[name]?.setStateFn.delete(setState);
    };
  }, []);

  return state;
};
