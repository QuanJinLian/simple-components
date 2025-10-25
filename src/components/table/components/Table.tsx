import React from 'react';
import { TableObj, TableProps } from '../types';
import { ThItem } from './ThItem';
import { TableCheckboxModeEnums, TableCheckboxStatusEnums } from '../defines';
import { TableCheckbox } from './TableCheckbox';
import { TrItemInTbody } from './TrItemInTbody';
import { getAlignClass } from '../services';
import '../style/table-new.scss';
import { TrItemColspan } from './TrItemColspan';
import { getClasses } from '../../util';

export function Table<T extends TableObj>(props: TableProps<T>) {
  const {
    className,
    data,
    columns,
    checkbox,
    showNo,
    checkControl,
    sortControl,
    filterControl,
    expandControl,
    pagingControl,
    empty,
  } = props;
  const { pageNo, perPageSize } = pagingControl || {};
  const { checkAll, status } = checkControl || {};

  const headerRow = props?.onHeaderRow?.(props?.columns, 0) || {};
  const classes = getClasses([getAlignClass(props?.align), data?.length === 0 ? 'empty' : '', className]);

  return (
    <div className="ikea-table-wrapper">
      <table className={`ikea-table ${classes}`}>
        <thead className="ikea-table-thead">
          <tr {...headerRow} className={`ikea-table-thead-tr ${headerRow.className ?? ''}`}>
            {checkbox?.mode === TableCheckboxModeEnums.CHECKBOX && (
              <th className="ikea-table-th checkbox">
                <TableCheckbox
                  className={status}
                  onChange={e => {
                    e.stopPropagation();
                    checkAll(e.target.checked);
                  }}
                  onClick={e => e.stopPropagation()}
                  checked={status === TableCheckboxStatusEnums.FULL}
                />
              </th>
            )}
            {checkbox?.mode === TableCheckboxModeEnums.RADIO && <th className="ikea-table-th radioBox"></th>}
            {expandControl?._hasExpandedColumn && (
              <th
                className={`ikea-table-th expandable-icon`}
                style={{ width: props?.expandable?.columnsWidth ?? undefined }}
              >
                {props?.expandable?.columnTitle}
              </th>
            )}
            {showNo?.show && <th className="ikea-table-th No">{showNo?.title ?? 'No.'}</th>}
            {columns?.map((column, i) => (
              <ThItem
                key={`${column.dataIndex ?? ''}-${i}`}
                index={i}
                {...column}
                filterControl={filterControl}
                sortControl={sortControl}
                onHeaderCell={props?.onHeaderCell}
              />
            ))}
          </tr>
        </thead>
        <tbody className="ikea-table-tbody">
          {data?.length > 0 ? (
            <>
              {data?.map((record, i) => (
                <TrItemInTbody
                  key={`tr-${i}`}
                  index={i}
                  record={record}
                  number={((pageNo ?? 1) - 1) * (perPageSize ?? 0) + i + 1}
                  options={props}
                  checkControl={checkControl}
                  expandControl={expandControl}
                  filterControl={filterControl}
                />
              ))}
            </>
          ) : (
            <TrItemColspan
              showNo={!!showNo}
              checkbox={!!checkbox}
              columnsLength={columns?.filter(column => column.visible !== false)?.length ?? 0}
            >
              {empty}
            </TrItemColspan>
          )}
        </tbody>
      </table>
    </div>
  );
}
