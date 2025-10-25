import React, { JSX, ReactNode } from 'react';
import { _isFunction } from '../../util';
import { StyleText, TooltipPlacement } from '../type';

const defaultDomRect: DOMRect = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  height: 0,
  y: 0,
  x: 0,
  width: 0,
  toJSON(): string {
    return '';
  },
};

export function setPosition(direction: TooltipPlacement, rect_text?: DOMRect, rect_children?: DOMRect) {
  rect_text = rect_text ?? defaultDomRect;
  rect_children = rect_children ?? defaultDomRect;
  const style_text: StyleText = {};
  let top_text = '0rem';
  let left_text = '0rem';

  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  const defaultLeft = (scrollX + rect_children.x) / rootFontSize;
  const defaultTop = (scrollY + rect_children?.y)/ rootFontSize;

  if (
    direction === 'top' ||
    direction === 'bottom' ||
    direction === 'top-left' ||
    direction === 'bottom-left' ||
    direction === 'top-right' ||
    direction === 'bottom-right'
  ) {
    /** 수평 위치  */
    if (direction === 'top' || direction === 'bottom') {
      left_text = defaultLeft + (rect_children.width - rect_text.width) / (2 * rootFontSize) + 'rem';
    } else if (direction === 'top-left' || direction === 'bottom-left') {
      left_text = defaultLeft + 'rem';
    } else if (direction === 'top-right' || direction === 'bottom-right') {
      left_text = defaultLeft + (rect_children.width - rect_text.width) / rootFontSize + 'rem';
    }

    /** 수직 위치  */
    if (direction === 'top' || direction === 'top-left' || direction === 'top-right') {
      top_text = defaultTop - rect_text.height / rootFontSize - 10 + 'rem'; // 5 + 3
    } else {
      // direction === 'bottom' || direction === 'bottom-left' || direction === 'bottom-right'
      top_text = defaultTop + rect_children.height / rootFontSize + 10 + 'rem';
    }
  } else if (
    direction === 'left' ||
    direction === 'right' ||
    direction === 'left-top' ||
    direction === 'right-top' ||
    direction === 'left-bottom' ||
    direction === 'right-bottom'
  ) {
    /** 수직 위치  */
    if (direction === 'left' || direction === 'right') {
      top_text = defaultTop + (rect_children.height - rect_text.height) / (2 * rootFontSize) + 'rem';
    } else if (direction === 'left-top' || direction === 'right-top') {
      top_text = defaultTop + 'rem';
    } else if (direction === 'left-bottom' || direction === 'right-bottom') {
      top_text = defaultTop + (rect_children.height - rect_text.height) / rootFontSize + 'rem';
    }

    /** 수평 위치  */
    if (direction === 'left' || direction === 'left-top' || direction === 'left-bottom') {
      left_text = defaultLeft - rect_text.width / rootFontSize - 10 + 'rem';
    } else {
      //  direction === 'right' || direction === 'right-top' || direction === 'right-bottom'
      left_text = defaultLeft + rect_children.width / rootFontSize + 10 + 'rem';
    }
  }

  // if (rect_text.width <= 50) {
  //   style_text.textAlign = 'center';
  // }

  style_text.top = top_text;
  style_text.left = left_text;

  return style_text;
}

export function checkPlacement(rect_text?: DOMRect, rect_children?: DOMRect): TooltipPlacement {
  rect_text = rect_text ?? defaultDomRect;
  rect_children = rect_children ?? defaultDomRect;

  if (rect_children.top > rect_text.height + 13) return 'top';
  else if (window.innerWidth - rect_children.x - rect_children.right > rect_text.width + 13) return 'right';
  else if (window.innerHeight - rect_children.y - rect_children.bottom > rect_text.height + 13) return 'bottom';
  else if (rect_children.left > rect_text.width + 13) return 'left';

  return 'top';
}

export function getChildrenDom(children: ReactNode): JSX.Element | null {
  if (children) {
    if (React.isValidElement(children)) {
      if (_isFunction(children.type)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const _children = children.type();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return getChildrenDom(_children);
      } else if (typeof children.type === 'symbol' && children.type === React.Fragment) {
        return <span>{children}</span>;
      } else {
        return children;
      }
    } else {
      return (<span>{children}</span>) as JSX.Element;
    }
  }
  return null;
}
