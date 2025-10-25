import React, { useCallback } from 'react';
import { TableObj, ThItemProps } from '../types';
import { Tooltip } from '../../tooltip';
import { Popover, usePopover } from '../../popover';

export function Filter<T extends TableObj>(props: Omit<ThItemProps<T>, 'title' | 'sortControl'>) {
  const { filter, filterControl, dataIndex, index } = props;
  const filtered = filterControl?.isFiltered(dataIndex);
  const { icon: filterIcon, tooltip: filterTooltip, placement = 'bottom-right' } = filter || {};
  const { filterValues, isFilterClosed, onFilterStateChange, form } = filterControl || {};

  const isClosed = !!isFilterClosed(dataIndex);
  const closeFunc = useCallback(() => {
    onFilterStateChange(dataIndex, index, false);

    // // 나중에 커스텀하게 받게 설계해야.....
    const find = filterValues?.find(fv => fv.column === dataIndex);
    form.setValue(dataIndex, find?.value ?? '');
  }, [dataIndex, index, filterValues, form]);

  const popoverControl = usePopover<HTMLSpanElement>({
    className: 'ikea-table-filter-component',
    isOpen: !isClosed,
    close: closeFunc,
    placement: placement,
    hidden: filterControl?.isFilterClosed(dataIndex),
  });

  return (
    <>
      <Tooltip {...(filterTooltip || {})} hidden={!filterTooltip || filterTooltip.hidden}>
        <span
          ref={popoverControl.targetRef}
          className={`ikea-table-th-button filter ${filtered ? 'filtered' : ''}`}
          onClick={e => {
            e.stopPropagation();
            filterControl?.onFilterStateChange(dataIndex, index);
          }}
        >
          {typeof filterIcon === 'function' ? filterIcon(filtered ?? false) : filterIcon}
        </span>
      </Tooltip>
      <Popover {...popoverControl}>
        {typeof filter?.component === 'function' &&
          filter.component({
            dataIndex,
            index,
            ...filterControl,
          })}
      </Popover>
    </>
  );
}
