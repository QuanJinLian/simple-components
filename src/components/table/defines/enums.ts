import { EnumType } from '../../util';

export const TableSortEnums = {
  ASC: 'ascend',
  DESC: 'descend',
} as const;

export type TableSort = EnumType<typeof TableSortEnums>;

export const TableCheckboxModeEnums = {
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
} as const;

export type TableCheckboxMode = EnumType<typeof TableCheckboxModeEnums>;

export const TableCheckboxStatusEnums = {
  EMPTY: 'empty',
  HALF: 'half',
  FULL: 'full',
} as const;

export type TableCheckboxStatus = EnumType<typeof TableCheckboxStatusEnums>;

export const AlignEnums = {
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center',
} as const;

export type AlignType = EnumType<typeof AlignEnums>;

export const SortTooltipTargetEnums = {
  FULL_HEADER: 'full-header',
  SORT_ICON: 'sort-icon',
} as const;

export type SortTooltipTargetType = EnumType<typeof SortTooltipTargetEnums>;
