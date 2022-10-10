import { _isObject } from './checkDataFunc';

/**
 *  JSON.parse(JSON.stringify(data)) 안쓰는 이유
 *  값 중에 함수가 있으면 함수가 날아감
 * */
export const deepClone = data => {
  if (Array.isArray(data)) {
    const newData = [];
    data?.forEach(d => {
      if (Array.isArray(d) || _isObject(d)) newData.push(deepClone(d));
      else newData.push(d);
    });
    return newData;
  } else if (_isObject(data)) {
    const newData = {};
    Object.keys(data)?.forEach(key => (newData[key] = deepClone(data[key])));
    return newData;
  } else {
    return data;
  }
};
