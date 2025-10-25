import React, { useRef, useState, JSX, RefObject, MouseEvent } from 'react';
import './style/tooltip.scss';
import TooltipContent from './TooltipContent';
import { TooltipPortal } from './TooltipPortal';
import { getChildrenDom } from './service/tooltipService';
import { TooltipProps, TooltipTriggerEnums } from './types';
import { useClickOutSide } from '../hooks';

type Props = TooltipProps & {
  [key: string]: any;
};

export function Tooltip({
  placement = 'top',
  title,
  maxWidth,
  children,
  overlayClassName,
  isHidden = false,
  trigger = 'hover',
  ...props
}: Props): JSX.Element {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isHiddenInnerState, setIsHiddenInnerState] = useState(true);
  const ref =
    children && 'ref' in children && children.ref
      ? (children.ref as RefObject<HTMLElement>)
      : useRef<HTMLElement>(null);
  const triggerEventName = TooltipTriggerEnums[trigger].trigger;
  const deactivateEventName = TooltipTriggerEnums[trigger].deactivate;

  useClickOutSide<HTMLElement>({
    ref: ref,
    callback:
      !isHiddenInnerState && deactivateEventName === 'onOutSideClick'
        ? () => {
            setIsHiddenInnerState(true);
          }
        : undefined,
    ignoreDomList: [ref],
  });
  const _children = getChildrenDom(children);

  const showTooltip = (e: MouseEvent<HTMLElement>) => {
    if (triggerEventName === 'onContextMenu') {
      e.preventDefault();
    }
    const rect = ref?.current?.getBoundingClientRect();
    const _targetRect = rect ?? null;
    setTargetRect(_targetRect);
    setIsHiddenInnerState(false);

    if (children?.props?.[triggerEventName]) children.props[triggerEventName](e);
  };

  const hideTooltip = (e: MouseEvent<HTMLElement>) => {
    setIsHiddenInnerState(true);

    if (children?.props?.[deactivateEventName]) children.props[deactivateEventName](e);
  };

  const events = {
    [triggerEventName]: triggerEventName !== 'onClick' ? showTooltip : isHiddenInnerState ? showTooltip : hideTooltip,
  };
  if (deactivateEventName !== 'onOutSideClick') {
    events[deactivateEventName] = hideTooltip;
  }

  const Children = _children
    ? React.cloneElement(_children, {
        ref: ref,
        ...events,
      })
    : '';

  return (
    <>
      {Children}
      <TooltipPortal>
        {targetRect && title && (
          <TooltipContent
            title={title}
            targetRect={targetRect}
            placement={placement}
            maxWidth={maxWidth}
            overlayClassName={overlayClassName}
            {...props}
            hidden={isHiddenInnerState || isHidden}
          />
        )}
      </TooltipPortal>
    </>
  );
}
