import { ObjType } from './types';

export type TScrollMoveEvent = {
  target: ObjType;
};
export const scrollMove = (e: TScrollMoveEvent, movement: number) => {
  const target = e.target;
  const parent = target.parentNode;
  const offsetParent = target.offsetParent;
  const movedDown = offsetParent.scrollTop - parent.offsetTop + offsetParent.clientHeight;
  const movedUp = offsetParent.scrollTop - parent.offsetTop;
  const movedBottom = offsetParent.scrollTop + offsetParent.clientHeight;

  if (movedDown < 40 && movedBottom < offsetParent.scrollHeight) {
    offsetParent.scrollTop = offsetParent.scrollTop + movement;
  } else if (movedUp > -10 && offsetParent.scrollTop > 0) {
    offsetParent.scrollTop = offsetParent.scrollTop - movement;
  }
};
