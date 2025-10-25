import { useCheckControl } from './useCheckControl';
import { useFilterControl } from './useFilterControl';
import { useSortControl } from './useSortControl';
import { useExpandControl } from './useExpandControl';
import { TableObj, TableType } from '../types';
import { usePagination } from './usePagination';
import { useColumnControl } from './useColumnControl';

export type UseTableControlProps<T extends TableObj> = TableType<T> & Parameters<typeof usePagination>[0];

export function useTableControl<T extends TableObj>(props: UseTableControlProps<T>) {
  const { columns, data } = props;
  const columnControl = useColumnControl({
    columns,
  });
  const checkControl = useCheckControl<T>({ showData: data, options: props });
  const filterControl = useFilterControl<T>({ columns: columnControl?.columnsState, options: props });
  const sortControl = useSortControl<T>({
    columns: columnControl?.columnsState,
    directions: props?.sort?.directions,
  });
  const expandControl = useExpandControl<T>(props);
  const pagingControl = usePagination(props);

  return {
    ...props,
    columns: columnControl?.columnsState,
    columnControl,
    checkControl,
    filterControl,
    sortControl,
    expandControl,
    pagingControl,
  };
}
