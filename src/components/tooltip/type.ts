export const TooltipPlacementEnum = {
  top: 'top',
  bottom: 'bottom',
  topLeft: 'top-left',
  bottomLeft: 'bottom-left',
  topRight: 'top-right',
  bottomRight: 'bottom-right',
  left: 'left',
  right: 'right',
  leftTop: 'left-top',
  rightTop: 'right-top',
  leftBottom: 'left-bottom',
  rightBottom: 'right-bottom',
} as const;

export type TooltipPlacement = (typeof TooltipPlacementEnum)[keyof typeof TooltipPlacementEnum];

export type StyleText = {
  left?: string;
  top?: string;
};
