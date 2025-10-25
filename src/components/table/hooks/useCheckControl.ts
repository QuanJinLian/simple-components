import { TableObj, TableType } from '../types';
import { useEffect, useState } from 'react';
import { TableCheckboxStatusEnums } from '../defines';

type useCheckControlProps<T extends TableObj> = {
  showData: T[] | undefined | null;
  options?: TableType<T>;
};

export function useCheckControl<T extends TableObj>({ showData, options }: useCheckControlProps<T>) {
  const [checkedItemsSet, setCheckedItemsSet] = useState<Set<T>>(new Set<T>());
  const checkedItems = Array.from(checkedItemsSet);

  useEffect(() => {
    setCheckedItemsSet(new Set<T>());
  }, [showData]);

  const filteredData = options?.disable
    ? showData?.filter((record, i) => !!options?.disable && !options.disable(record, i)) ?? []
    : showData;

  const status =
    checkedItems.length === 0
      ? TableCheckboxStatusEnums.EMPTY
      : checkedItems.length === filteredData?.length
      ? TableCheckboxStatusEnums.FULL
      : TableCheckboxStatusEnums.HALF;

  const checkAll = (checked: boolean) => {
    if (checked) {
      setCheckedItemsSet(new Set(filteredData));
    } else {
      setCheckedItemsSet(new Set());
    }
  };

  const checkRow = (d: T, checked: boolean) => {
    if (options?.checkbox?.mode === 'checkbox')
      if (checked) {
        setCheckedItemsSet(pre => new Set(pre.add(d)));
      } else {
        setCheckedItemsSet(pre => new Set([...pre].filter(record => record !== d)));
      }
    else {
      if (checked) {
        setCheckedItemsSet(new Set([d]));
      } else {
        setCheckedItemsSet(new Set());
      }
    }
  };

  const isChecked = (d: T) => {
    return checkedItemsSet.has(d);
  };

  return {
    checkedItems,
    checkAll,
    checkRow,
    status,
    isChecked,
  };
}
