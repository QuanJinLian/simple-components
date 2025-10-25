import { TableObj, TableType } from '../types';
import { useEffect, useMemo, useState } from 'react';
import { _isBoolean } from '../../util';
import { assignColumns } from '../services';

type UseColumnControl<T extends TableObj> = {
  columns: TableType<T>['columns'];
  limitColumnCount?: number;
};

export function useColumnControl<T extends TableObj, K extends keyof T & string = keyof T & string>({
  columns,
  limitColumnCount = 1,
}: UseColumnControl<T>) {
  const [columnsState, setColumnsState] = useState(assignColumns(columns));
  const visibleColumns = useMemo(() => columnsState?.filter(column => column?.visible), [columnsState]);

  useEffect(() => {
    setColumnsState(assignColumns(columns));
  }, [columns]);

  const setColumnVisible = (dataIndex: K | '_all', visible?: boolean) => {
    const _columns = columnsState?.map((column, i) => {
      const _column = { ...column };
      if (column.dataIndex === dataIndex || dataIndex === '_all')
        _column.visible = _isBoolean(visible) ? (visible ? visible : i < limitColumnCount) : !_column.visible;

      return _column;
    });

    const count = _columns?.filter(column => column?.visible)?.length || 0;
    if (count < limitColumnCount) {
      console.warn(
        `visible column count가 limitColumnCount(${limitColumnCount})보다 작아서 setColumnVisible 함수가 동작하지 않음`,
      );
      return;
    }

    setColumnsState(_columns);
  };

  const getColumn = (dataIndex: K) => {
    return columnsState?.find(column => column.dataIndex === dataIndex);
  };

  const getColumnVisible = (dataIndex: K) => {
    return getColumn(dataIndex)?.visible;
  };

  const checkAllVisible = (visible = true) => {
    return !columnsState?.find(column => column.visible === !visible);
  };

  return {
    columnsState,
    setColumnsState,
    setColumnVisible,
    visibleColumns,
    getColumn,
    getColumnVisible,
    checkAllVisible,
  };
}
