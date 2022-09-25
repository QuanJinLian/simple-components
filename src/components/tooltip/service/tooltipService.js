import React from 'react';

export function setPosition(direction, rect_text, rect_children) {
  let style_text = {};
  let top_text = '0px';
  let left_text = '0px';
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  const defaultLeft = scrollX + rect_children.x;
  const defaultTop = scrollY + rect_children?.y;

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
      left_text = defaultLeft + (rect_children.width - rect_text.width) / 2 + 'px';
    } else if (direction === 'top-left' || direction === 'bottom-left') {
      left_text = defaultLeft + 'px';
    } else if (direction === 'top-right' || direction === 'bottom-right') {
      left_text = defaultLeft + rect_children.width - rect_text.width + 'px';
    }

    /** 수직 위치  */
    if (direction === 'top' || direction === 'top-left' || direction === 'top-right') {
      top_text = defaultTop - rect_text.height - 10 + 'px'; // 5 + 3
    } else {
      // direction === 'bottom' || direction === 'bottom-left' || direction === 'bottom-right'
      top_text = defaultTop + rect_children.height + 10 + 'px';
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
      top_text = defaultTop + (rect_children.height - rect_text.height) / 2 + 'px';
    } else if (direction === 'left-top' || direction === 'right-top') {
      top_text = defaultTop + 'px';
    } else if (direction === 'left-bottom' || direction === 'right-bottom') {
      top_text = defaultTop + rect_children.height - rect_text.height + 'px';
    }

    /** 수평 위치  */
    if (direction === 'left' || direction === 'left-top' || direction === 'left-bottom') {
      left_text = defaultLeft - rect_text.width - 10 + 'px';
    } else {
      //  direction === 'right' || direction === 'right-top' || direction === 'right-bottom'
      left_text = defaultLeft + rect_children.width + 10 + 'px';
    }
  }

  style_text.top = top_text;
  style_text.left = left_text;

  return style_text;
}

export function checkPlacement(rect_text, rect_children) {
  if (rect_children.top > rect_text.height + 13) return 'top';
  if (window.innerWidth - rect_children.x - rect_children.right > rect_text.width + 13) return 'right';
  if (window.innerHeight - rect_children.y - rect_children.bottom > rect_text.height + 13) return 'bottom';
  if (rect_children.left > rect_text.width + 13) return 'left';
}

export function getChildrenDom(children) {
  const isArray = Array.isArray(children) && children?.length;
  const isIncludeTag = isArray && children?.filter(child => typeof child === 'object')?.length;

  if (children) {
    if (children.$$typeof) {
      return children;
    } else if (isIncludeTag) {
      return <div>{children}</div>;
    } else {
      return <span>{children}</span>;
    }
  }
  return null;
}
