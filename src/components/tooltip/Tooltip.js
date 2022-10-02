import React, { useRef, useState } from 'react';
import './style/tooltip.scss';
import TooltipContent from './TooltipContent';
import { TooltipPortal } from './TooltipPortal';
import { getChildrenDom } from './service/tooltipService';

/**
 *
 * @param placement 툴팁 & border 방향 <br>
 * 'top', 'top-left', 'top-right', 'left', 'left-top', 'left-bottom', 'bottom', 'bottom-left', 'bottom-right', 'right', 'right-top', 'right-bottom'
 *
 * @param title 툴팁 내부 내용 <br>
 * string, number, component ...
 *
 * @param maxWidth 툴팁의 최대 넓이 <br>
 * ex) '80px'
 *
 * @param overlayClassName 툴팁 내부 wrapper의 클래스 명
 *
 * @param isHidden 툴팁 숨김 여부
 *
 * @param children 툴팁이 필요한 태그 혹 컴포넌트
 *
 *
 * */

function Tooltip({ placement, title, maxWidth, children, overlayClassName, isHidden = false }) {
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
          />
        )}
      </TooltipPortal>
    </>
  );
}
export default React.memo(Tooltip);
