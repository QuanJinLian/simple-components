import React, { useCallback, useEffect, useRef, useState } from 'react';
import { checkPlacement, setPosition } from './service/tooltipService';
import { getClasses } from '../util';
import { StyleText, TooltipPlacement } from './type';
import { TooltipProps } from './types';

function TooltipContent({ hidden, targetRect, title, maxWidth, placement = 'top', overlayClassName }: TooltipProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [textStyle, setTextStyle] = useState<StyleText>({});
  const [_placement, setPlacement] = useState<TooltipPlacement>(placement);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const _hidden = hidden || (!textStyle?.left && !textStyle?.top) ? 'hidden' : '';

  const setMouseOver = useCallback((e: React.MouseEvent) => {
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

      if (rect_text?.width && rect_text?.height) {
        const direction = _placement ? _placement : checkPlacement(rect_text, rect_children);
        const style_text = setPosition(direction, rect_text, rect_children);

        setTextStyle(style_text);
        setPlacement(direction);
      }
    } else {
      setTextStyle({ left: '0', top: '0' });
    }
  }, [isMouseOver, hidden, targetRect, ref.current, _placement]);

  const noPositionClass =
    (!textStyle?.top && !textStyle?.left) || (textStyle?.top === '0' && textStyle?.left === '0')
      ? 'tooltip-no-position'
      : '';

  const className = getClasses(['tooltip-container', _hidden, noPositionClass, overlayClassName]);

  return (
    <div style={{ position: 'absolute', top: '0', left: '0', width: '0' }}>
      <div className={className} style={textStyle} onMouseEnter={setMouseOver} onMouseLeave={setMouseOver}>
        <span className={`arrow-border border-${_placement}`} />
        <div className="tooltip-inner" ref={ref} style={{ maxWidth: maxWidth }}>
          {title}
        </div>
      </div>
    </div>
  );
}

export default TooltipContent;
