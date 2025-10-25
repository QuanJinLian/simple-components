import { _isObject } from './index';

/**
 *  JSON.parse(JSON.stringify(data)) 안쓰는 이유
 *  값 중에 함수가 있으면 함수가 날아가는 현상이 있음
 * */
export const deepClone = <T>(data: T): T => {
  if (Array.isArray(data)) {
    const newData = [] as T extends any[] ? T : never;
    data?.forEach((d: T extends any[] ? T[number] : never) => {
      if (Array.isArray(d) || _isObject(d)) newData.push(deepClone(d));
      else newData.push(d);
    });
    return newData;
  } else if (_isObject(data)) {
    const newData = {} as T extends { [K in keyof T & (string | number | symbol)]: T[K] } ? T : never;
    Object.keys(data)?.forEach(key => (newData[key as keyof T] = deepClone(data[key])));
    return newData;
  } else {
    return data;
  }
};
