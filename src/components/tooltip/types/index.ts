import { JSX } from 'react';
import { GapProp } from '../../util';
import { TooltipPlacement } from '../type';

export const TooltipTriggerEnums = {
  hover: {
    trigger: 'onMouseEnter',
    deactivate: 'onMouseLeave',
  },
  focus: {
    trigger: 'onFocus',
    deactivate: 'onBlur',
  },
  click: {
    trigger: 'onClick',
    deactivate: 'onOutSideClick',
  },
  contextmenu: {
    trigger: 'onContextMenu',
    deactivate: 'onOutSideClick',
  },
} as const;

export type TooltipProps = {
  hidden?: boolean;
  targetRect?: DOMRect;
  title?: string | JSX.Element;
  maxWidth?: GapProp | '';
  placement?: TooltipPlacement;
  overlayClassName?: string;
  children?: JSX.Element;
  isHidden?: boolean;
  trigger?: keyof typeof TooltipTriggerEnums;
};

export type TTooltip = TooltipProps;
