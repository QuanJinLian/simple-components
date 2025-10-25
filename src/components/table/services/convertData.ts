import { TableObj, TableType } from '../types';
import { _isBoolean } from '../../util';

export function assignColumns<T extends TableObj>(columns: TableType<T>['columns']) {
  return columns?.map(column => {
    const _column = { ...column };

    _column.visible = _isBoolean(_column.visible) ? _column.visible : true;

    return _column;
  });
}

export function assignFilterState<T extends TableObj>(columns: TableType<T>['columns']) {
  const initVal = {} as { [key in keyof T & string]?: boolean };

  return (
    columns?.reduce(
      (pre, cur) => ({ ...pre, [cur.dataIndex]: _isBoolean(cur.filter?.isClose) ? cur.filter?.isClose : true }),
      initVal,
    ) ?? initVal
  );
}

export function getRowKey<T extends TableObj>(
  rowKeyFunc: NonNullable<TableType<T>['row']>['key'],
  record: T,
  index: number,
) {
  return rowKeyFunc?.(record, index) ?? `tr-item-${index}`;
}
