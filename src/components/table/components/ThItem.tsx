import React from 'react';
import { TableObj, ThItemProps } from '../types';
import { useTranslation } from 'react-i18next';
import { CSSProperties } from 'react';
import { Tooltip } from '../../tooltip';
import { Filter } from './Filter';
import { _isString, getClasses } from '../../util';
import { getAlignClass } from '../services';
import { SortTooltipTargetEnums } from '../defines';

export function ThItem<T extends TableObj>(props: ThItemProps<T>) {
  const { index, filterControl, sortControl, onHeaderCell, ...columnProps } = props;
  const {
    className = '',
    title = '',
    hiddenTitle = false,
    filter,
    sort,
    width,
    minWidth,
    dataIndex,
    visible = true,
    align,
  } = columnProps || {};

  if (!visible) return null;

  const { t } = useTranslation();

  const { icon: sortIcon, sortOrder = null, tooltip: sortTooltip } = sort || {};
  const headerProps = onHeaderCell?.(columnProps, index);

  const classes = getClasses([
    className,
    dataIndex,
    filterControl?.isFiltered(dataIndex) ? 'filtered' : undefined,
    columnProps?.sort ? 'has-sort' : undefined,
    sortControl?.getSortOrder(dataIndex, index),
    headerProps?.className,
    getAlignClass(align),
  ]);

  const showTooltipFull = !sortTooltip?.target || sortTooltip?.target === SortTooltipTargetEnums.FULL_HEADER;

  return (
    <th
      {...headerProps}
      className={`ikea-table-th ${classes}`}
      style={{ ...(headerProps?.style || {}), width: width, minWidth: minWidth } as CSSProperties}
    >
      <div className="ikea-table-th-content-wrapper">
        <Tooltip
          {...(showTooltipFull ? sortTooltip : {})}
          isHidden={!sortTooltip || sortTooltip.hidden || !showTooltipFull}
        >
          <div
            className="ikea-table-th-title-wrapper"
            onClick={e => {
              if (!sort) return;
              e.stopPropagation();
              sortControl?.onSortStateChange(dataIndex, index);
            }}
          >
            {!hiddenTitle && (
              <span className="ikea-table-th-title">{_isString(title) ? t(title) : title?.(props)}</span>
            )}

            {sort && (
              <span className={`ikea-table-th-button sort`}>
                <Tooltip
                  {...(!showTooltipFull ? sortTooltip : {})}
                  isHidden={!sortTooltip || sortTooltip.hidden || showTooltipFull}
                >
                  <span className="sort-inner">{typeof sortIcon === 'function' ? sortIcon(sortOrder) : sortIcon}</span>
                </Tooltip>
              </span>
            )}
          </div>
        </Tooltip>
        <div className="ikea-table-th-button-container">
          {filter && <Filter {...columnProps} index={index} filterControl={filterControl} />}
        </div>
      </div>
    </th>
  );
}
