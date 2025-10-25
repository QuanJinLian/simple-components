import { _isNumber, _isObject, _isString } from './checkDataFunc';
import { ObjType } from './types';
import Decimal from 'decimal.js';

export function deepObjectAssign<T extends ObjType>(tar: T, src: ObjType): T {
  const newObj: T = {} as T;
  for (const key in tar) {
    if (_isObject(tar[key]) && _isObject(src[key])) {
      newObj[key] = deepObjectAssign(tar[key], src[key]);
    } else if (Object.prototype.hasOwnProperty.call(src, key)) {
      newObj[key] = src[key];
    } else {
      newObj[key] = tar[key];
    }
  }

  return newObj;
}

export function getRandomInt(min = 0, max = 100000000) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

export function numberFormatEnUS(d: unknown) {
  return _isNumber(d) ? new Intl.NumberFormat('en-US').format(d) : '';
}

export function formatBytes(bytes: number | null, decimals = 1, down = false) {
  if (typeof bytes !== 'number' || bytes === 0) return { number: 0, unit: '', string: '0' };

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const num = parseFloat(new Decimal(bytes / Math.pow(k, i)).toFixed(dm, down ? Decimal.ROUND_DOWN : Decimal.ROUND_UP));
  const number = isNaN(num) ? '' : num;
  const unit = sizes[i] || '';

  return { number, unit, string: `${number}${unit}` };
}

export function percentStringToNumber(str: `${number}%` | undefined, toRate = true) {
  if (!str || !str.endsWith('%') || !_isString(str)) return;

  const num = Number(str.replace('%', ''));

  return toRate && !isNaN(num) ? num / 100 : num;
}
