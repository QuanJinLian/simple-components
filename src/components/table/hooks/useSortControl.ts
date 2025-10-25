import { useState } from 'react';
import { SortType, TableColumnType, TableObj, TableType } from '../types';
import { TableSort } from '../defines';
import { _isFunction } from '../../util';

type Directions = NonNullable<TableType<any>['sort']>['directions'];

type UseSortControlProps<T extends TableObj> = {
  columns: TableType<T>['columns'];
  directions?: Directions;
};

const defaultDirections: NonNullable<Directions> = ['ascend', 'descend', null];

export function useSortControl<T extends TableObj, K extends keyof T & string = keyof T & string>({
  columns,
  directions,
}: UseSortControlProps<T>) {
  const mergeData: SortType<T> & {
    index: number;
    dataIndex: keyof T & string;
    columnData: TableColumnType<T, keyof T & string> | null;
  } = { index: -1, dataIndex: '---' as keyof T & string, columnData: null };
  const firstDirectionColumn = columns?.find((column, i) => {
    mergeData.index = i;
    mergeData.dataIndex = column.dataIndex;
    mergeData.columnData = column;
    return column?.visible !== false && column?.sort?.sortOrder;
  })?.sort;
  const [sortState, setSortState] = useState({
    ...firstDirectionColumn,
    ...mergeData,
  });
  const sortDirections = directions ?? defaultDirections;

  const onSortStateChange = (dataIndex: K, i: number, state?: typeof firstDirectionColumn) => {
    if (!columns) return;
    if (!columns[i]) return;
    if (!columns[i].sort) return;
    if (columns[i].sort?.disabled) return;

    if (columns[i].dataIndex !== dataIndex) {
      console.error(
        `useSortControl - columns[i].dataIndex !== dataIndex, columns[i].dataIndex value is ${columns[i].dataIndex}, dataIndex value is ${dataIndex}`,
      );
      return;
    }

    setSortState(pre => {
      if (state) return { ...state, index: i, dataIndex: dataIndex, columnData: columns[i] };

      if (dataIndex === pre.dataIndex) {
        const clone = { ...(pre || {}) };
        if (!_isFunction(clone.sortOrder)) {
          const index = sortDirections.indexOf((clone.sortOrder ?? null) as TableSort | null);
          const nextIndex = index >= sortDirections.length - 1 ? 0 : index + 1;
          clone.sortOrder = sortDirections[nextIndex];
        }

        return clone;
      } else {
        return {
          ...columns[i].sort,
          dataIndex: dataIndex,
          index: i,
          sortOrder: sortDirections[0],
          columnData: columns[i],
        };
      }
    });
  };

  const getSortOrder = (dataIndex: K, i: number) => {
    if (sortState.dataIndex !== dataIndex || sortState.index !== i) return '';

    return sortState?.sortOrder ?? '';
  };

  return {
    sortState,
    onSortStateChange,
    getSortOrder,
  };
}
