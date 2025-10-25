import React from 'react';
import { MouseEvent } from 'react';
import { TableCheckboxModeEnums } from '../defines';
import { TableCheckbox } from './TableCheckbox';
import { TableObj, TrItemInTbodyProps } from '../types';
import { _isObjectType, _isString, getClasses } from '../../util';
import { getAlignClass, getRowKey } from '../services';
import Highlighter from 'react-highlight-words';
import { TrItemColspan } from './TrItemColspan';
import { RadioInput } from '../../input';

export function TrItemInTbody<T extends TableObj>({
  index,
  number,
  options,
  checkControl,
  record,
  expandControl,
  filterControl,
}: TrItemInTbodyProps<T>) {
  const { checkbox, showNo, columns, disable, expandable, row, onRow, onCell } = options || {};
  const { checkRow, isChecked } = checkControl || {};
  const rowProps = onRow?.(record, index) || {};

  // expandable 기능
  const { expandedRowClassName, rowExpandable, indentSize, onExpand } = options?.expandable || {};
  const { _isRowExpanded, _hasExpandedColumn, toggleExpandedRow } = expandControl || {};

  const rowKey = getRowKey(row?.key, record, index);
  const isRowExpanded = _isRowExpanded(rowKey);
  const isRowExpandable = rowExpandable?.(record) ?? true;
  const expandableClassName = getClasses(
    expandable
      ? [isRowExpanded ? 'expanded' : 'collapsed', isRowExpandable ? 'row-expandable' : 'row-disExpandable']
      : [],
  );
  const _disabled = disable ? disable(record, index) : undefined;
  const rowClass = getClasses([_disabled ? 'row-disabled' : '']);
  const _expandedRowClassName = _isString(expandedRowClassName)
    ? expandedRowClassName
    : expandedRowClassName?.(record, index, indentSize ?? 15);

  const _toggleExpanded = (e?: MouseEvent<HTMLElement>) => {
    e?.stopPropagation();
    toggleExpandedRow(rowKey, isRowExpanded);
    onExpand?.(record, !isRowExpanded);
  };

  const TrDom = (
    <tr {...rowProps} className={`ikea-table-tr ${expandableClassName} ${rowClass} ${rowProps.className ?? ''}`}>
      {checkbox?.mode === TableCheckboxModeEnums.CHECKBOX && (
        <td className="ikea-table-td checkbox">
          <TableCheckbox
            onChange={e => {
              e.stopPropagation();
              checkRow?.(record, e.target.checked);
            }}
            checked={isChecked?.(record)}
            onClick={e => e.stopPropagation()}
            disabled={_disabled}
          />
        </td>
      )}
      {checkbox?.mode === TableCheckboxModeEnums.RADIO && (
        <td className="ikea-table-td radioBox">
          <RadioInput
            className="ikea-table-td-input label-input__radiobox radioBox"
            id={rowKey}
            option={{
              disabled: _disabled,
            }}
            checked={isChecked?.(record)}
            onChange={e => {
              e.stopPropagation();
              checkRow?.(record, e.target.checked);
            }}
            onClick={e => e.stopPropagation()}
          />
        </td>
      )}

      {_hasExpandedColumn && (
        <td className={`ikea-table-td expandable-icon`}>
          {expandable?.expandIcon ? (
            expandable.expandIcon({
              record,
              index,
              expanded: isRowExpanded,
              onExpand: _toggleExpanded,
            })
          ) : (
            <span className="expandable-icon_span" onClick={_toggleExpanded}></span>
          )}
        </td>
      )}

      {showNo?.show && <td className="ikea-table-td No">{number ?? ''}</td>}

      {columns?.map((column, columnIndex) => {
        if (column.visible === false) return null;

        const cellProps = onCell?.(column, record, index) || {};
        const className = getClasses([column?.className, cellProps?.className, getAlignClass(column?.align)]);

        const customFilterKeys = options?.highlight?.filterKeys;
        const searchWords = filterControl?.getFilterStrings([column?.dataIndex, '__all', ...(customFilterKeys || [])]);

        const _value = record?.[column?.dataIndex];

        return (
          <td key={columnIndex} {...cellProps} className={`ikea-table-td ${className}`}>
            {options?.highlight?.isOn !== false && !column.render && !_isObjectType(_value) ? (
              <Highlighter searchWords={searchWords} textToHighlight={`${_value ?? ''}`} />
            ) : column?.render ? (
              column.render({ record, index, value: _value, filterControl, column })
            ) : (
              _value
            )}
          </td>
        );
      })}
    </tr>
  );

  const contextMenu = options?.row?.contextMenu?.(record, index);

  const expandClass = getClasses([
    'expandable-tr',
    expandableClassName,
    _expandedRowClassName,
    expandable?.expandedRowRender && isRowExpandable ? null : 'hidden',
  ]);

  return (
    <>
      {contextMenu?.component ? contextMenu.component({ ...contextMenu.props, children: TrDom }) : TrDom}
      <TrItemColspan
        showNo={!!showNo}
        checkbox={!!checkbox}
        columnsLength={columns?.filter(column => column.visible !== false)?.length ?? 0}
        className={expandClass}
        style={{ display: isRowExpanded ? '' : 'none' }}
        tdProps={{
          className: 'ikea-table-td-expand expand-row-render',
        }}
      >
        {expandable?.expandedRowRender?.(record, index, expandable?.indentSize ?? 15, isRowExpanded)}
      </TrItemColspan>
    </>
  );
}
