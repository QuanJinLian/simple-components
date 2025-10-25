import { TableObj, TableType } from '../types';
import { useEffect, useState } from 'react';
import { getRowKey } from '../services';

export function useExpandControl<T extends TableObj>({ row, data, expandable }: TableType<T>) {
  const { expandedRowKeys: defaultExpandedRowKeys } = expandable || {};
  const [expandedRowKeys, setExpandedRowKeys] = useState(defaultExpandedRowKeys ?? []);

  useEffect(() => {
    if (expandable?.defaultExpandAllRows) {
      const keys: typeof expandedRowKeys = [];
      /** TODO showData로 변경 필요*/
      data?.forEach((record, i) => keys.push(getRowKey(row?.key, record, i)));
      setExpandedRowKeys(keys);
    } else {
      setExpandedRowKeys(defaultExpandedRowKeys ?? []);
    }
  }, [expandable?.defaultExpandAllRows]);

  const _isRowExpanded = (key: string) => {
    return !!expandedRowKeys?.find(k => key === k)?.length;
  };

  const collapseRow = (key: string) => {
    setExpandedRowKeys(pre => [...(pre || []).filter(i => i !== key)]);
  };

  const expandRow = (key: string) => {
    setExpandedRowKeys(pre => [...(pre || []), key]);
  };

  const toggleExpandedRow = (key: string, expanded: boolean) => {
    if (expanded) {
      collapseRow(key);
    } else {
      expandRow(key);
    }
  };

  const _hasExpandedColumn = expandable && expandable.showExpandColumn !== false;

  return {
    expandedRowKeys,
    _isRowExpanded,
    collapseRow,
    expandRow,
    _hasExpandedColumn,
    toggleExpandedRow,
  };
}
