export const _isFirstPage = (pageNo: number) => {
  return pageNo === 1;
};

export const _isFirstBlock = (pageNo: number, paginationSize: number) => {
  return pageNo <= paginationSize;
};

export const _isLastPage = (pageNo: number, totalPage: number) => {
  return totalPage === pageNo;
};

export const _isLastBlock = (pageNo: number, paginationSize: number, totalPage: number) => {
  return pageNo > totalPage - (totalPage % paginationSize);
};

export const getBlockIdx = (pageNo: number, paginationSize: number) => {
  return Math.ceil(pageNo / paginationSize);
};

export const getShowPageListByBlockIdx = (blockIdx: number, paginationSize: number, totalPage: number) => {
  const list: number[] = [];
  const last = blockIdx * paginationSize;

  for (let i = (blockIdx - 1) * paginationSize + 1; i <= (last > totalPage ? totalPage : last); i++) {
    list.push(i);
  }

  return list;
};

export const getShowPageListByPageNo = (pageNo: number, paginationSize: number, totalPage: number) => {
  const blockIdx = getBlockIdx(pageNo, paginationSize);
  return getShowPageListByBlockIdx(blockIdx, paginationSize, totalPage);
};
