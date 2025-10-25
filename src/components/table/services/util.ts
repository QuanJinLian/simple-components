import { TableType } from '../types';

export function getAlignClass(align: TableType<any>['align']) {
  return align ? `align-${align}` : undefined;
}
