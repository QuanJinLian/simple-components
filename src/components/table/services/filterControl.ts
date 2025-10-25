import { FilterValuesType } from '../types';

export function getFilterStrings(filterValues: FilterValuesType, dataIndexArr: string[]) {
  const filtered = filterValues?.filter(fv => dataIndexArr?.includes?.(fv.column)) ?? [];

  return filtered?.reduce((pre, cur) => {
    pre.push(cur.value);
    return pre;
  }, [] as string[]);
}
