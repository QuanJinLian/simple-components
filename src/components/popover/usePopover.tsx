import { MutableRefObject, RefObject, useEffect, useRef, useState } from 'react';
import { useClickOutSide } from '../hooks';
import { getClasses, nanoid } from '../util';
import { escEventService } from '../escEventContorl';
import { StyleText, TooltipPlacement } from '../tooltip';
import { checkPlacement, setPosition } from '../tooltip/service/tooltipService';

type UsePopoverProps<T extends HTMLElement> = {
  isOpen: boolean;
  close: () => void;
  targetRef?: RefObject<T | null>;
  popoverRef?: RefObject<HTMLDivElement | null>;
  className?: string;
  placement?: TooltipPlacement;
  hidden?: boolean;
  isMultiOpen?: boolean;
};

export function usePopover<T extends HTMLElement>(props: UsePopoverProps<T>) {
  const { isOpen, close, className = '', placement = 'top', hidden, isMultiOpen = false } = props || {};
  const targetRef = props?.targetRef ?? useRef<T | null>(null);
  const popoverRef = props?.popoverRef ?? useRef<HTMLDivElement | null>(null);
  const [popoverStyle, setPopoverStyle] = useState<StyleText>({});
  const [_placement, setPlacement] = useState<TooltipPlacement>(placement);
  const isHidden = hidden || !isOpen || (!popoverStyle?.top && !popoverStyle?.left);
  const _className = getClasses([className, isHidden && 'hidden']);

  const [isRendered, setIsRendered] = useState(isOpen);
  useEffect(() => {
    setIsRendered(pre => (pre ? pre : isOpen));
  }, [isOpen]);

  useClickOutSide<HTMLDivElement>({
    ref: isMultiOpen ? undefined : popoverRef,
    callback: isOpen ? close : undefined,
    ignoreDomList: [targetRef, popoverRef],
  });

  useEffect(() => {
    if (!isOpen || !isRendered) return;

    const rect_popover = popoverRef?.current?.getBoundingClientRect();
    if (!rect_popover?.width || !rect_popover?.height) return;

    const rect_target = targetRef?.current?.getBoundingClientRect();

    const direction = _placement ? _placement : checkPlacement(rect_popover, rect_target);
    const style_text = setPosition(direction, rect_popover, rect_target);

    setPopoverStyle(style_text);
    setPlacement(direction);
  }, [isOpen, isRendered]);

  // escEvent 등록
  const uniqueKey = useRef(`${new Date().toJSON()}-${nanoid()}`);

  useEffect(() => {
    if (isOpen) {
      escEventService.appendOpenId(uniqueKey.current);
    } else {
      escEventService.deleteOpenId(uniqueKey.current);
    }
  }, [isOpen]);

  useEffect(() => {
    escEventService?.addEvent(uniqueKey.current, close);
  }, [close]);

  useEffect(() => {
    const _uniqueKey = uniqueKey.current;
    return () => {
      escEventService?.deleteEvent(_uniqueKey);
    };
  }, []);

  return {
    targetRef: targetRef as MutableRefObject<T | null>,
    popoverRef: popoverRef as MutableRefObject<HTMLDivElement | null>,
    popoverStyle,
    placement: _placement,
    className: _className,
    isRendered,
  };
}
