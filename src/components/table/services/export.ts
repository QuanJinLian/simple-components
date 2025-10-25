import { TableObj, TableType } from '../types';
import { TFunction } from 'i18next/typescript/t';

// CSV 형식으로 변환하는 함수
export const convertToCSV = (data: Record<string, any>[], columns: string[], t?: TFunction): string => {
  const header = t ? columns?.map(c => t(c)).join(',') : columns.join(','); // 컬럼명을 CSV 헤더로 변환
  const rows = data.map(row => columns.map(col => `"${row[col]}"`).join(',')); // 체크된 데이터들을 하나씩 문자열로 변환
  return [header, ...rows].join('\n');
};

// CSV 파일 다운로드 함수
export const downloadCSV = (csvData: string, filename: string) => {
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};


function getCheckedColumnsString<T extends TableObj>(columns: TableType<T>['columns']) {
  const checkedColumns = columns?.filter(col => col.visible).map(col => col.dataIndex);
  return checkedColumns?.length && checkedColumns?.length > 0
    ? checkedColumns
    : columns?.map(col => col.dataIndex) ?? [];
}

export function httpDownloadCSV<T extends TableObj>(
  sources: T[] | undefined,
  option:
    | {
        filename: string;
      }
    | undefined,
  columns: TableType<T>['columns'],
  t: TFunction,
) {
  const columnString = getCheckedColumnsString(columns ?? []);
  downloadCSV(convertToCSV(sources ?? [], columnString, t), option?.filename ?? 'export.csv');
}
