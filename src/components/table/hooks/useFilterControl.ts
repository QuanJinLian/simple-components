import { FilterValuesType, TableObj, TableType } from '../types';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { assignFilterState, getFilterStrings } from '../services';

type UseFilterControlProps<T extends TableObj> = {
  columns: TableType<T>['columns'];
  isMultiFilter?: boolean; // 나중에 개발할 예정
  options?: TableType<T>;
};

type UnionPrivateString<K extends string> = K | `__${string}`;

export function useFilterControl<T extends TableObj, K extends keyof T & string = keyof T & string>({
  columns,
  isMultiFilter = false,
  options,
}: UseFilterControlProps<T>) {
  const form = useForm<Record<string, any>>({
    defaultValues: options?.filter?.initialValue || {},
  });
  const [filterState, setFilterState] = useState(assignFilterState(columns));
  const initialFilterValues = Object.keys(options?.filter?.initialValue ?? {}).reduce((pre, cur) => {
    pre.push({ column: cur, value: options?.filter?.initialValue?.[cur] });
    return pre;
  }, [] as NonNullable<FilterValuesType>);
  const [filterValues, setFilterValues] = useState<FilterValuesType>(initialFilterValues);

  useEffect(() => {
    setFilterState(assignFilterState(columns));
    setFilterValues(pre => {
      const columnKeys = columns?.reduce((pre, cur) => {
        if (cur.visible !== false) pre[cur.dataIndex] = true;

        return pre;
      }, {} as Record<keyof T & string, true>);

      return [...(pre || [])].filter(fv => {
        const hasColumn = columnKeys?.[fv.column];
        if (!hasColumn) form?.resetField(fv.column);

        return columnKeys?.[fv.column];
      });
    });
  }, [columns]);

  const onFilterStateChange = (dataIndex: UnionPrivateString<K>, i: number, state?: boolean) => {
    if (!columns) return;
    if (!columns[i]) return;
    if (!columns[i].filter) return;
    if (columns[i].filter?.disabled) return;

    if (columns[i].dataIndex !== dataIndex) {
      console.error(
        `useFilterControl - columns[i].dataIndex !== dataIndex, columns[i].dataIndex value is ${columns[i].dataIndex}, dataIndex value is ${dataIndex}`,
      );
      return;
    }
    setFilterState(pre => ({ ...(pre || {}), [dataIndex]: state || !pre?.[dataIndex] }));
  };

  const isFiltered = (dataIndex: UnionPrivateString<K>) => {
    const find = filterValues?.find(fv => fv.column === dataIndex);
    return find && !!find?.value;
  };

  const isFilterClosed = (dataIndex: K) => {
    return filterState && filterState[dataIndex] !== false;
  };

  const onFilter = (dataIndex: UnionPrivateString<K>) => {
    const value = form?.getValues(dataIndex);
    if (!isMultiFilter) {
      setFilterValues(pre => {
        const cur = [...(pre || [])].filter(fv => fv.column !== dataIndex);

        if (value) cur.push({ column: dataIndex, value: value });

        return cur;
      });
    } else {
      /**
       * TODO isMultiFilter 버전 - add remove 분리
       * */
    }
  };

  const setValueAndFilter = (dataIndex: UnionPrivateString<K>, value: any) => {
    form.setValue(dataIndex, value);
    onFilter(dataIndex);
  };

  return {
    form,
    filterState,
    filterValues,
    onFilterStateChange,
    isFiltered,
    onFilter,
    isFilterClosed,
    getFilterStrings: (dataIndexArr: Parameters<typeof getFilterStrings>[1]) =>
      getFilterStrings(filterValues, dataIndexArr),
    setValueAndFilter,
  };
}
