import React from 'react';
import { DIRECTION } from '../TooltipContent';

export function setPosition(direction, rect_text, rect_children) {
  let style_text = {};
  let top_text = '0px';
  let left_text = '0px';
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  const defaultLeft = scrollX + rect_children.x;
  const defaultTop = scrollY + rect_children?.y;

  if (
    direction === DIRECTION.TOP ||
    direction === DIRECTION.BOTTOM ||
    direction === DIRECTION.TOP_LEFT ||
    direction === DIRECTION.BOTTOM_LEFT ||
    direction === DIRECTION.TOP_RIGHT ||
    direction === DIRECTION.BOTTOM_RIGHT
  ) {
    /** 수평 위치  */
    if (direction === 'top' || direction === DIRECTION.BOTTOM) {
      left_text = defaultLeft + (rect_children.width - rect_text.width) / 2 + 'px';
    } else if (direction === DIRECTION.TOP_LEFT || direction === DIRECTION.BOTTOM_LEFT) {
      left_text = defaultLeft + 'px';
    } else if (direction === DIRECTION.TOP_RIGHT || direction === DIRECTION.BOTTOM_RIGHT) {
      left_text = defaultLeft + rect_children.width - rect_text.width + 'px';
    }

    /** 수직 위치  */
    if (direction === 'top' || direction === DIRECTION.TOP_LEFT || direction === DIRECTION.TOP_RIGHT) {
      top_text = defaultTop - rect_text.height - 10 + 'px'; // 5 + 3
    } else {
      // direction === DIRECTION.BOTTOM || direction === DIRECTION.BOTTOM_LEFT || direction === DIRECTION.BOTTOM_RIGHT
      top_text = defaultTop + rect_children.height + 10 + 'px';
    }
  } else if (
    direction === DIRECTION.LEFT ||
    direction === DIRECTION.RIGHT ||
    direction === DIRECTION.LEFT_TOP ||
    direction === DIRECTION.RIGHT_TOP ||
    direction === DIRECTION.LEFT_BOTTOM ||
    direction === DIRECTION.RIGHT_BOTTOM
  ) {
    /** 수직 위치  */
    if (direction === DIRECTION.LEFT || direction === DIRECTION.RIGHT) {
      top_text = defaultTop + (rect_children.height - rect_text.height) / 2 + 'px';
    } else if (direction === DIRECTION.LEFT_TOP || direction === DIRECTION.RIGHT_TOP) {
      top_text = defaultTop + 'px';
    } else if (direction === DIRECTION.LEFT_BOTTOM || direction === DIRECTION.RIGHT_BOTTOM) {
      top_text = defaultTop + rect_children.height - rect_text.height + 'px';
    }

    /** 수평 위치  */
    if (direction === DIRECTION.LEFT || direction === DIRECTION.LEFT_TOP || direction === DIRECTION.LEFT_BOTTOM) {
      left_text = defaultLeft - rect_text.width - 10 + 'px';
    } else {
      //  direction === DIRECTION.RIGHT || direction === DIRECTION.RIGHT_TOP || direction === DIRECTION.RIGHT_BOTTOM
      left_text = defaultLeft + rect_children.width + 10 + 'px';
    }
  }

  style_text.top = top_text;
  style_text.left = left_text;

  return style_text;
}

export function checkPlacement(rect_text, rect_children) {
  if (rect_children.top > rect_text.height + 13) return 'top';
  if (window.innerWidth - rect_children.x - rect_children.right > rect_text.width + 13) return DIRECTION.RIGHT;
  if (window.innerHeight - rect_children.y - rect_children.bottom > rect_text.height + 13) return DIRECTION.BOTTOM;
  if (rect_children.left > rect_text.width + 13) return DIRECTION.LEFT;
}

export function getChildrenDom(children) {
  const isArray = Array.isArray(children) && children?.length;
  const isIncludeTag = isArray && children?.filter(child => typeof child === 'object')?.length;

  if (children) {
    if (children.$$typeof) {
      if (typeof children.type === 'function') return <div>{children}</div>;
      else return children;
    } else if (isIncludeTag) {
      return <div>{children}</div>;
    } else {
      return <span>{children}</span>;
    }
  }
  return null;
}
