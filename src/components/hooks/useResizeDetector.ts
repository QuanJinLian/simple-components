import { useLayoutEffect, useRef, useState } from 'react';

type Rect = {
  bottom?: number;
  height?: number;
  left?: number;
  right?: number;
  top?: number;
  width?: number;
  x?: number;
  y?: number;
};

const initialState = {
  bottom: undefined,
  height: undefined,
  left: undefined,
  right: undefined,
  top: undefined,
  width: undefined,
  x: undefined,
  y: undefined,
};
export function useResizeDetector<T extends HTMLElement>(props?: { skipOnMount: boolean }) {
  const { skipOnMount = false } = props || {};
  const ref = useRef<T | null>(null);
  const skipResize = useRef(skipOnMount);
  const [rect, setRect] = useState<Rect>(initialState);

  useLayoutEffect(() => {
    const resizeObserve = new window.ResizeObserver(entries => {
      const entry = entries[0];
      const { width, height, top, bottom, left, right, x, y } = (entry && entry.contentRect) || {};

      const shouldSetSize = !skipResize.current;
      if (shouldSetSize) {
        setRect({ width, height, top, bottom, left, right, x, y });
      }
      skipResize.current = false;
    });

    if (ref.current) resizeObserve.observe(ref.current);

    return () => {
      resizeObserve.disconnect();
      setRect(initialState);
    };
  }, []);

  return { ref, rect };
}
