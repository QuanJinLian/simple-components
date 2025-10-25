import React, { HTMLAttributes } from 'react';
import { _isNumber } from '../../util';

type Props = {
  showNo?: boolean;
  checkbox?: boolean;
  columnsLength?: number;
  children?: React.ReactNode;
  tdProps?: HTMLAttributes<HTMLTableCellElement>;
} & HTMLAttributes<HTMLTableRowElement>;

export function TrItemColspan({ showNo, checkbox, columnsLength = 0, className, tdProps, children, ...props }: Props) {
  let colSpan = columnsLength + 1;
  if (_isNumber(colSpan)) {
    if (showNo) colSpan += 1;
    if (checkbox) colSpan += 1;
  }
  return (
    <tr className={`ikea-table-tr full-row ${className ?? ''}`} {...(props || {})}>
      <td colSpan={colSpan} {...(tdProps || {})}>
        {children}
      </td>
    </tr>
  );
}
