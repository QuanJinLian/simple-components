import { useState } from 'react';
import { _isFirstBlock, _isFirstPage, _isLastBlock, _isLastPage, getShowPageListByPageNo } from '../services';

type Props = {
  paginationSize?: number;
  pagingStep: number;
  defaultPerPageSize: number;
};

export function usePagination({ pagingStep, defaultPerPageSize, paginationSize }: Props) {
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [perPageSize, setPerPageSize] = useState(defaultPerPageSize ?? 0);
  const [totalCount, setTotalCount] = useState(0);

  const toFirstPage = () => {
    setPageNo(1);
  };

  const toLastPage = () => {
    setPageNo(totalPage);
  };

  const toPrevPage = () => {
    setPageNo(pre => (pre <= 1 ? pre : pre - 1));
  };

  const toNextPage = () => {
    setPageNo(pre => (pre >= totalPage ? totalPage : pre + 1));
  };

  const toPrevBlock = () => {
    setPageNo(pre => (pre - pagingStep <= 1 ? 1 : pre - pagingStep));
  };

  const toNextBlock = () => {
    setPageNo(pre => (pre + pagingStep >= totalPage ? totalPage : pre + pagingStep));
  };

  const pageOnClick = (idx: number) => {
    setPageNo(idx);
  };

  const pageNumbers = getShowPageListByPageNo(pageNo, paginationSize ?? pagingStep, totalPage);
  const isFirstPage = _isFirstPage(pageNo);
  const isFirstBlock = _isFirstBlock(pageNo, pagingStep);
  const isLastPage = _isLastPage(pageNo, totalPage);
  const isLastBlock = _isLastBlock(pageNo, paginationSize ?? pagingStep, totalPage);

  return {
    pageNo,
    setPageNo,
    totalPage,
    setTotalPage,
    perPageSize,
    setPerPageSize,
    totalCount,
    setTotalCount,
    toFirstPage,
    toLastPage,
    toPrevPage,
    toNextPage,
    toPrevBlock,
    toNextBlock,
    pageOnClick,
    pageNumbers,
    isFirstPage,
    isFirstBlock,
    isLastPage,
    isLastBlock,
  };
}
