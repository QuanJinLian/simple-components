import React, { useCallback, useEffect, useRef, useState } from 'react';
import { checkPlacement, setPosition } from './service/tooltipService';

export const DIRECTION = {
  TOP: 'top',
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  LEFT: 'left',
  LEFT_TOP: 'left-top',
  LEFT_BOTTOM: 'left-bottom',
  BOTTOM: 'bottom',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  RIGHT: 'right',
  RIGHT_TOP: 'right-top',
  RIGHT_BOTTOM: 'right-bottom',
};

function TooltipContent({ hidden, targetRect, title, maxWidth, placement, overlayClassName }) {
  const ref = useRef(null);
  const [textStyle, setTextStyle] = useState({});
  const [_placement, setPlacement] = useState(placement);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const _hidden = hidden || (!textStyle.left && !textStyle.top) ? 'hidden' : '';

  const setMouseOver = useCallback(e => {
    if (e.type === 'mouseenter') {
      setIsMouseOver(true);
    } else {
      setIsMouseOver(false);
    }
  }, []);

  useEffect(() => {
    setPlacement(prev => (prev !== placement ? placement : prev));
  }, [placement]);

  useEffect(() => {
    if (!hidden || isMouseOver) {
      const rect_text = ref?.current?.getBoundingClientRect();
      const rect_children = targetRect;

      if (rect_text.width && rect_text.height) {
        const direction =
          _placement && Object.values(DIRECTION).includes(_placement)
            ? _placement
            : checkPlacement(rect_text, rect_children);
        const style_text = setPosition(direction, rect_text, rect_children);

        setTextStyle(style_text);
        setPlacement(direction);
      }
    } else {
      setTextStyle({ left: 0, top: 0 });
    }
  }, [isMouseOver, hidden, targetRect, _placement]);

  return (
    <div style={{ position: 'absolute', top: '0', left: '0', width: '0' }}>
      <div
        className={`tooltip-container ${_hidden} ${overlayClassName ?? ''}`}
        style={textStyle}
        onMouseEnter={setMouseOver}
        onMouseLeave={setMouseOver}
      >
        <span className={`arrow-border border-${_placement}`} />
        <div className="tooltip-inner" ref={ref} style={{ maxWidth: maxWidth }}>
          {title}
        </div>
      </div>
    </div>
  );
}

export default TooltipContent;
