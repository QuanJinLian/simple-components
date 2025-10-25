import { ChangeEvent, HTMLAttributes, ReactNode, MouseEvent, JSX } from "react";
import { TooltipProps } from '../../tooltip/types';
import { AlignType, SortTooltipTargetType, TableCheckboxMode, TableSort } from '../defines';
import { useCheckControl, useExpandControl, useFilterControl, usePagination, useSortControl } from '../hooks';
import { NullUndefined } from '../../util';
import { TooltipPlacement } from '../../tooltip';

export type TableObj = Record<string, any>;

export type FilterType<T extends TableObj, K extends keyof T = keyof T> = {
  icon?: ReactNode | ((filtered: boolean) => ReactNode);
  isClose?: boolean;
  disabled?: boolean;
  component?: (props: ReturnType<typeof useFilterControl<T>> & { dataIndex: K; index: number }) => JSX.Element | null;
  placement?: TooltipPlacement;
  tooltip?: TooltipProps;
};

export type FilterValuesType = { column: string; value: any }[] | undefined;

export type SortType<T extends TableObj> = {
  icon?: ReactNode | ((sortOrder: SortType<T>['sortOrder']) => ReactNode);
  // sortOrder ascend | descend | null | 비교 함수
  sortOrder?: TableSort | ((valueA: unknown, valueB: unknown) => number) | null;
  // sortOrder 함수 경우 sortBy는 아무 소용없는 컨셉 (단 사용하고 싶으면 활용해도 됨)
  sortBy?: (string | boolean | number)[];
  tooltip?: TooltipProps & { target?: SortTooltipTargetType };
  disabled?: boolean;
};

export type TableColumnTitleNode<T extends TableObj> = ((props: ThItemProps<T>) => JSX.Element) & {
  toString?: () => string;
};

export type TableColumnType<T extends TableObj, K extends keyof T & string = keyof T & string> = {
  className?: string; // th, td 적용
  title: string | TableColumnTitleNode<T>; // td 적용
  dataIndex: K; // td 적용
  hiddenTitle?: boolean; // th 적용
  align?: AlignType; // th, td 적용
  //   td 적용
  render?: (props: {
    value: T[K];
    record: T;
    index: number;
    filterControl: ReturnType<typeof useFilterControl<T>>;
    column: TableColumnType<T>;
  }) => ReactNode;
  width?: number | string; // th 적용
  minWidth?: number | string; // th  적용
  filter?: FilterType<T>; // th  적용
  sort?: SortType<T>; // th  적용
  visible?: boolean; // column 전체 숨김 여부
};

export type ThItemProps<T extends TableObj> = TableColumnType<T> & {
  index: number;
  filterControl: ReturnType<typeof useFilterControl<T>>;
  sortControl: ReturnType<typeof useSortControl<T>>;
  onHeaderCell?: TableType<T>['onHeaderCell'];
};

export type TrItemInTbodyProps<T extends TableObj> = {
  index: number;
  number: number;
  options: TableType<T>;
  record: T;
  checkControl: ReturnType<typeof useCheckControl<T>>;
  expandControl: ReturnType<typeof useExpandControl<T>>;
  filterControl: ReturnType<typeof useFilterControl<T>>;
};

export type TableType<T extends TableObj> = {
  columns?: TableColumnType<T>[] | null | undefined;
  align?: AlignType; // th, td 적용
  data: T[];
  checkbox?: {
    mode?: TableCheckboxMode | null;
    disabled?: boolean | ((record: T, index: number) => boolean);
    onChange?: (e: ChangeEvent<HTMLInputElement>, record: T, index: number) => void;
  };
  showNo?: {
    show?: boolean;
    title?: string;
  };
  disable?: (record: T, index: number) => boolean;
  expandable?: Partial<TableExpandable<T>>;
  row?: {
    key?: (record: T, index: number) => string;
    contextMenu?: (
      record: T,
      index: number,
    ) => {
      component: (p: Record<string, any>) => JSX.Element;
      props: Record<string, any>;
    };
  };
  onHeaderRow?: (columns: TableType<T>['columns'], index: number) => HTMLAttributes<HTMLTableRowElement> | undefined;
  onRow?: (record: T, index: number) => HTMLAttributes<HTMLTableRowElement> | undefined;
  onCell?: (
    column: NonNullable<TableType<T>['columns']>[number],
    record: T,
    rowIndex: number,
  ) => HTMLAttributes<HTMLTableCellElement> | undefined;
  onHeaderCell?: (
    column: NonNullable<TableType<T>['columns']>[number],
    index: number,
  ) => HTMLAttributes<HTMLTableCellElement> | undefined;
  filter?: {
    initialValue?: Partial<Record<keyof T, any>>;
  };
  sort?: {
    directions?: (TableSort | null)[];
  };
  highlight?: {
    isOn?: boolean; // default is true
    filterKeys?: string[]; // default is dataIndex & __all
  };
};

export type TableProps<T extends TableObj> = TableType<T> & {
  sortControl: ReturnType<typeof useSortControl<T>>;
  checkControl: ReturnType<typeof useCheckControl<T>>;
  expandControl: ReturnType<typeof useExpandControl<T>>;
  filterControl: ReturnType<typeof useFilterControl<T>>;
  pagingControl?: Pick<ReturnType<typeof usePagination>, 'pageNo' | 'perPageSize'>;
  empty: ReactNode;
  className?: string;
};

export type TableExpandable<T extends TableObj> = {
  columnTitle: ReactNode;
  columnsWidth: string | number;
  defaultExpandAllRows: boolean;
  expandedRowClassName: string | ((record: T, index: number, indent: TableExpandable<T>['indentSize']) => string);
  expandedRowKeys: string[];
  expandedRowRender: (
    record: T,
    index: number,
    indent: TableExpandable<T>['indentSize'],
    expanded: boolean,
  ) => ReactNode;
  expandIcon: (props: {
    record: T;
    index: number;
    expanded: boolean;
    onExpand: (e?: MouseEvent<HTMLElement>) => void;
  }) => ReactNode;
  indentSize: number; //Indent size in pixels of tree data   TODO 해당 기능 개발
  onExpand: (record: T, expanded: boolean) => void;
  rowExpandable: (record: T) => boolean;
  showExpandColumn: boolean; // expand icon 컬럼 show 여부
};

export type ExportFileType<T extends TableObj> = {
  filename?: string;
  dataConverter?: (data: T[] | NullUndefined) => { [k in keyof T]?: string | number | boolean | NullUndefined }[];
};
