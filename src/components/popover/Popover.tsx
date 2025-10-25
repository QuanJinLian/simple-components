import React, { LegacyRef, ReactNode } from 'react';
import { usePopover } from './usePopover';
import { TooltipPortal } from "../tooltip/TooltipPortal";

export type PopoverProps = ReturnType<typeof usePopover> & {
  children?: ReactNode;
};

export function Popover(props: PopoverProps) {
  const { popoverStyle, placement, popoverRef, children, className, isRendered } = props;
  if (!isRendered) return null;

  return (
    <TooltipPortal>
      <div style={{ position: 'absolute', top: '0', left: '0', width: '0' }}>
        <div className={`ikea-popover-wrapper ${className}`} style={popoverStyle}>
          <span className={`arrow-border border-${placement}`} />
          <div className="popover-inner" ref={popoverRef as LegacyRef<HTMLDivElement>}>
            {children}
          </div>
        </div>
      </div>
    </TooltipPortal>
  );
}
