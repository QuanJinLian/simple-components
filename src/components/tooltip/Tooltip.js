import React, { useRef, useState } from 'react';
import './style/tooltip.scss';
import TooltipContent from './TooltipContent';
import { TooltipPortal } from './TooltipPortal';
import { getChildrenDom } from './service/tooltipService';

function Tooltip({ placement, title, maxWidth, children, overlayClassName, isHidden = false, ...props }) {
  const [targetRect, setTargetRect] = useState(null);
  const [isHiddenInnerState, setIsHiddenInnerState] = useState(false);
  const ref = useRef(null);
  const _children = getChildrenDom(children);

  const Children = _children
    ? React.cloneElement(_children, {
        ref: ref,
        onMouseEnter: e => {
          const rect = ref?.current?.getBoundingClientRect();
          const _targetRect = rect ? JSON.parse(JSON.stringify(rect)) : null;
          setTargetRect(_targetRect);
          setIsHiddenInnerState(false);

          if (children?.props?.onMouseEnter) children.props.onMouseEnter(e);
        },
        onMouseLeave: e => {
          setIsHiddenInnerState(true);

          if (children?.props?.onMouseLeave) children.props.onMouseLeave(e);
        },
      })
    : '';

  return (
    <>
      {Children}
      <TooltipPortal>
        {targetRect && title && (
          <TooltipContent
            hidden={isHiddenInnerState || isHidden}
            title={title}
            targetRect={targetRect}
            placement={placement}
            maxWidth={maxWidth}
            overlayClassName={overlayClassName}
            {...props}
          />
        )}
      </TooltipPortal>
    </>
  );
}
export default React.memo(Tooltip);
