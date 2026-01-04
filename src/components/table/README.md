# Table (2025 ver) Typescript

## 개요
최신 테이블 컴포넌트


## 사용법
```tsx
function TabelTest() {
  const tableControl = useTableControl(tableOption);

  return (
    <Table {...tableControl} />
  )
}
```

## useTableControl Props
- **Type**: `TableType & Parameters<typeof usePagination>[0]`

| key | 설명                                | 타입                                                                                                                                                      | 필수 여부 | 기본값 | 비고 |
|-----|-----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|--------|------|
| columns | 테이블 컬럼 설정 옵션                      | TableColumnType                                                                                                                                         | X | - | 자세한 설명은 아래 TableColumnType 참조|
| align | 전체 테이블 내용 정렬                      | -                                                                                                                                                       | X | - | 개별 컬럼 따로 정렬 원할 경우 columns 에서 설정해야함 |
| data | 테이블에 보여줄 데이터 리스트                  | -                                                                                                                                                       | O | - | |
| checkbox | 체크박스 노출 여부                        | -                                                                                                                                                       | X | - | |
| checkbox.mode | 라디오 or 체크박스 모드 설정                 | TableCheckboxMode \| null                                                                                                                               | X | - | |
| checkbox.disabled | -                                 | -                                                                                                                                                       | X | - | 설계했으나 실제로 사용하지 않는 옵션 |
| checkbox.onChange | -                                 | -                                                                                                                                                       | X | - | 설계했으나 실제로 사용하지 않는 옵션 |
| showNo | 넘버링 관련 설정                         | -                                                                                                                                                       | X | - | |
| showNo.show | 넘버링 표현 여부                         | -                                                                                                                                                       | X | false | |
| showNo.title | 넘버링 타이틀 텍스트                       | -                                                                                                                                                       | X | 'No.' | |
| disable | 체크박스 비활성화 여부                      | (record: T, index: number) => boolean                                                                                                                   | X | - | |
| expandable | 테이블 행 접기/펴기 관련 설정 옵션              | Partial<TableExpandable<T>>                                                                                                                             | X | - | 자세한 설명은 아래 TableExpandable 참조 |
| row | 테이블 행 관련 설정                       | -                                                                                                                                                       | X | - | |
| row.key | 각 행의 unique 키 설정                  | (record: T, index: number) => string                                                                                                                    | X | - | **expandable 설정 시 해당 옵션 무조건 설정 권장**<br>해당 값은 expandedRowKeys 수집시 사용<br>페이지 이동 시 정확하게 펼쳤던 행 기억 |
| row.contextMenu | 각 행에 ContextMenu 설정               | ( record: T,  index: number, ) => {  component: (p: Record<string, any>) => JSX.Element;  props: Record<string, any>;}                                  | X | - | |
| onRow | tbody tr 에 설정할 custom 속성 값        | (record: T, index: number) => HTMLAttributes<HTMLTableRowElement>                                                                                       | X | - | 예제 아래 참조 |
| onHeaderRow | thead tr 에 설정할 custom 속성 값        | (columns: TableType<T>['columns'], index: number) => HTMLAttributes<HTMLTableRowElement>                                                                | X | - | |
| onCell | tbody td 에 설정할 custom 속성 값        | (column: NonNullable<TableType<T>['columns']>[number], record: T, rowIndex: number) => HTMLAttributes<HTMLTableCellElement> \| undefined;               | X | - | |
| onHeaderCell | thead td 에 설정할 custom 속성 값        | (column: NonNullable<TableType<T>['columns']>[number], index: number,) => HTMLAttributes<HTMLTableCellElement>                            \| undefined; | X | - | |
| filter | 필터 옵션                             | -                                                                                                                                                       | X | - | |
| filter.initialValue | 필터 초기 값 설정 옵션                     | Partial<Record<keyof T, any>>                                                                                                                           | X | - | key는 data key로 설정<br>filterControl form 초기값으로 저장 |
| sort | 솟팅 옵션                             | -                                                                                                                                                       | X | - | |
| sort.directions | 솟팅 방향 순서 집합                       | (TableSort \| null)[]                                                                                                                                   | X | ['ascend', 'descend', null] | 데이터 솟팅은 외부에서 처리 |
| highlight | 검색과 매칭되는 문구 하이라이트 관련 설정 옵션        | -                                                                                                                                                       | X | - | |
| highlight.isOn | 하이라이트 진행 여부                       | -                                                                                                                                                       | X | true | 컬럼별 설정 불가 |
| highlight.filterKeys | filterControl filter 값 중 key 의 값들 | -                                                                                                                                                       | X | {dataIndex} & "__all" | custom input 하이라이트용 |

**onRow 예제**:
```tsx
onRow: (record, index) => {
  return {
    className: `this-is-id-${record.id}`,
    style: record?.id % 7 === 0 ? { backgroundColor: '...' } : {},
    onClick: e => console.log(record.id, `---${e.type}`),
    onDoubleClick: e => console.log(record.id, `---${e.type}`),
    // ... 기타 이벤트
  };
}
```

**onHeaderRow 예제**:
```tsx
onHeaderRow: (columns, index) => {
  return {
    onClick: e => console.log(`Thead Tr row ${e.type}`),
    onDoubleClick: e => console.log(record.id, `---${e.type}`),
    // ...
  };
}
```

**onCell 예제**:
```tsx
onCell: (column, record, rowIndex) => {
  if (column.dataIndex !== 'guestOS') return;
  return {
    style: { cursor: 'pointer' },
    onClick: e => {
      e.stopPropagation();
      alert(record[column.dataIndex] + '----rowIndex: ' + rowIndex);
    },
  };
}
```

### useTableControl Return
- **...props**: 기존 useTableControl props 그대로 반환
  - UseTableControlProps
- **columns**: 받은 columns 값으로 visible 관련 데이터 셋팅된 데이터 반환
- **columnControl**: 컬럼 관련 state 와 컨트롤 함수 집합 
    - columnsState - 각 컬럼의 visible 값을 추가 한 convert 이후의 columns state
    - setColumnsState - columnsState 설정할 수 있는 함수
    - setColumnVisible - 특정 dataIndex 컬럼의 visible값 설정, true, false 모두 설정 가능
    - visibleColumns - visible true 인 columns 값 추출
    - getColumn - 특정 dataIndex 컬럼 값 추출
    - getColumnVisible - 특정 dataIndex 컬럼의 visible값 추출
    - checkAllVisible - 모든 컬럼 visible true 로변경
- **checkControl**: 체크박스 관련 (checkedItems, checkAll 등)
    - checkedItems - 체킹된 아이템의 집합 state
    - checkAll - 전체 데이터 체크/ 체크 해제 (disable된 데이터 제외)
    - checkRow - 특정 행의 데이터 체크/체크 해(checkbox?.mode에 따라 array에 추가 혹은 대체 동작)
    - status - 최상위 체크박스 상태 판단
        - EMPTY - 아무것도 체크 안됨
        - FULL - 전부 체크 됨
        - HALF - 부분 체크 됨
    - isChecked - 특정 행이 체크되었는지 판단하는 함수
- **filterControl**: 필터 관련 (form, filterValues, onFilter 등)
  - form - 필터 관련 input 값 저장 및 control 하는 집합 (aka.useForm return 값)
  - filterValues- 사용자가 실질적으로 원하는 검색 (onFilter 실행 후 form 값이 filterState 에 저장되는 구조)
  - filterState - 각 컬럼의 필터 모달 오픈 상( filter?.isClose)를 기록하는 state
  - onFilterStateChange - 특정 컬럼의 모달 오픈 상태를 변경하는 함수
  - isFiltered - 특정 컬럼이 필터링한적 있는지 판단하는 함수(필터링한 여부에 따라 필터 아이콘 다를게 표현 목적)
  - onFilter - 특정 컬럼의 필터 input 값(form 의 값)을filterValues 에 저장 하는 함수
  - isFilterClosed - 특정 컬럼 필터 모달이 닫혔는지판단 여부
  - getFilterStrings - filterValues 특정 복수의 key 값의 값을 array 로 추출하는 함수
  - setValueAndFilter - 특정 컬럼 관련 form 값과 filterValues 를 동시에 셋팅하는 함수
- **sortControl**: 솟팅 관련 (sortState, onSortStateChange 등)
  - sortState- 현재 솟팅중인 컬럼의 솟팅 관련 데이터 state
    - 초기 값 -columns 배열 중 첫번째 visible &&sort.sortOrder 값
  - onSortStateChange- 특정 컬럼의 솟팅값으로sortState 셋팅하는 함수
  - getSortOrder- 특정 컬럼의 현재 sortState 과 동일 컬럼일 경우 해당 sortOrder 값을 반환각 컬럼 헤더의 솟팅 아이콘 셋팅할때 사용 
- **expandControl**: expand 관련 (expandedRowKeys, toggleExpandedRow 등)
  - expandedRowKeys - 확장한 tr 관련 row.key 들 을 저장한 string[] state
  - _isRowExpanded - 특정 key 값의 tr이 확장되었는지 판단하는 함수(expandedRowKeys 에 키 있는지 판단)
  - collapseRow - 특정 key 값의 tr을 접는 함수(expandedRowKeys 에 키 삭제)
  - expandRow - 특정 key 값의 tr을 확장시키는 함수(expandedRowKeys 에 키 추가)
  - _hasExpandedColumn - expandable 관련 옵 션 설정 값이 있는지 판단(접기/펴기 아이콘 때문에 필요)
  - toggleExpandedRow - expand/collapse 상태 토글 함 수
- **pagingControl**: 페이징 관련 (pageNo, toNextPage 등)
  - pageNo- 현재 페이지 넘버 state
  - setPageNo - 현재 페이지 넘버 set state 함수
  - totalPage - 총 페이지 넘버 state
  - setTotalPage - 총 페이지 넘버 set state 함수
  - perPageSize - 매 페이지의 데이터 사이즈 넘버 state
  - setPerPageSize - 매 페이지의 데이터 사이즈 넘버 set state 함수
  - totalCount - 데이터 총 카운트 넘버 state
  - setTotalCount - 데이터 총 카운트 넘버 set state 함수
  - toFirstPage - setPageNo(1)
  - toLastPage - setPageNo(totalPage)
  - toPrevPage - nowPageNo - 1
  - toNextPage - nowPageNo + 1
  - pageOnClick - setPageNo(num)
  - pageNumbers - pageNo, paginationSize?? pagingStep, totalPage 로 현재 화면에 보여질 넘버 리스트 계산해서 기록
  - isFirstPage - 현재 페이지가 첫번째 페이지인지 여부 (boolean) < 버튼 활성화 여부
  - isFirstBlock - 현재 페이지가 첫번째 블록에 속해있는지 여부 (boolean) << 버튼 활성화 여부
  - isLastPage - 현재 페이지가 마지막 페이지인지 여(boolean) > 버튼 활성화 여부
  - isLastBlock - 현재 페이지가 마지막 블록에 속해있는지 여부 (boolean) >> 버튼 활성화 여부

## TableColumnType
개별 컬럼 관련 설정 값.

| key | 설명 | 타입 | 필수 여부 | 기본값 | 비고 |
|-----|------|------|-----------|--------|------|
| className | 해당 컬럼의 각 th, td 에 적용될 custom className | string | X | - | |
| title | 컬럼 타이틀 텍스트 | string | O | - | 내부적으로 번역 적용됨 |
| dataIndex | 각 행에서 표현할 data 의 key 값 | keyof T & string | O | - | |
| hiddenTitle | 타이틀 텍스트 숨김 처리 여부 | boolean | X | false | |
| align | 해당 컬럼 값들 정렬 상태 지정 | AlignType | X | - | |
| render | 각 td 에 표현하는 커스텀 컴포넌트 | (props: {value: T[K], record: T, index: number, ...}) => ReactNode | X | - | |
| width | 컬럼 고정 넓이 | number \| string | X | - | |
| minWidth | 컬럼 최소 넓이 | number \| string | X | - | |
| filter | 해당 컬럼 필터 관련 설정 | FilterType<T> | X | - | |
| sort | 해당 컬럼 솟팅 관련 설정 | SortType<T> | X | - | |
| visible | 해당 컬럼 노출 여부 | boolean | X | true | |

**FilterType**:
```tsx
type FilterType<T extends TableObj, K extends keyof T = keyof T> = {
  icon?: ReactNode | ((filtered: boolean) => ReactNode);
  isClose?: boolean;
  disabled?: boolean;
  component?: (props: ReturnType<typeof useFilterControl<T>> & { dataIndex: K; index: number }) => JSX.Element | null;
  placement?: TooltipPlacement;
  tooltip?: TooltipProps;
};
```

**SortType**:
```tsx
type SortType<T extends TableObj> = {
  icon?: ReactNode | ((sortOrder: SortType<T>['sortOrder']) => ReactNode);
  // sortOrder ascend | descend | null | 비교 함수
  sortOrder?: TableSort | ((valueA: unknown, valueB: unknown) => number) | null;
  // sortOrder 함수 경우 sortBy는 아무 소용없는 컨셉 (단 사용하고 싶으면 활용해도 됨)
  sortBy?: (string | boolean | number)[];
  tooltip?: TooltipProps & { target?: SortTooltipTargetType };
  disabled?: boolean;
};
```

## TableExpandable
테이블 expandable 관련 설정 값. 펼힘 행은 `<td colSpan={columnCount}>`로 모든 열 병합.

| key | 설명 | 타입 | 필수 여부 | 기본값 | 비고 |
|-----|------|------|-----------|--------|------|
| columnTitle | expand icon 표현 컬럼의 타이틀 지정 | - | X | - | |
| columnsWidth | expand icon 표현 컬럼의 넓이 지정 | - | X | '50rem' | |
| defaultExpandAllRows | 기본으로 모든행 펼침 처리 할지 여부 | - | X | false | |
| expandedRowClassName | expandable tr 의 커스텀 className | - | X | - | |
| expandedRowKeys | 펼쳐질 행의 키 모음 | - | X | - | |
| expandedRowRender | 펼쳤을때 표현할 컴포넌트 | - | X | - | |
| expandIcon | 아이콘 | - | X | - | |
| indentSize | - | - | X | - | 설계했으나 사용하지 않는 옵션 |
| onExpand | 펼힘/닫힘 이벤트 리스너 | - | X | - | |
| rowExpandable | 개별 행이 특별한 조건에 부합 시 펼힘/닫힘 기능 disable 처리 하는 함수 | - | X | - | |
| showExpandColumn | expand icon 컬럼 show 여부 | - | X | true | |

## 관련 Hooks
- `useTableControl`: 하위 모든 hooks wrapping 한 통합 hooks
    - useColumnControl
    - useCheckControl
    - useFilterControl
    - useSortControl
    - useExpandControl
    - usePagination

## TODO
- 타이틀 부분 컨포넌트 허용
- i18n 버전이 다를 할수 있는 대응 (option 으로 t 함수 받아서 사용하기)
- 헤더 사이즈 조절
