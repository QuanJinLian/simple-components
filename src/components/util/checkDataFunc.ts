export const _isFunction = <T>(func: T): func is T extends (...args: any[]) => any ? T : never => {
  return typeof func === 'function';
};

export const _isNumber = (num: unknown): num is number => {
  return typeof num === 'number';
};

export const _isStringTypeNum = (str: unknown): str is `${number}` => {
  return typeof str === 'string' && !isNaN(Number(str));
};

export const _isString = (str: unknown): str is string => {
  return typeof str === 'string';
};

export const _isBoolean = (bool: unknown): bool is boolean => {
  return typeof bool === 'boolean';
};

export const _isNullOrUndefined = (data: unknown): data is null | undefined => {
  return data === null || data === undefined;
};

export const _isDefined = <T>(data: T): data is NonNullable<T> => {
  return data !== null && data !== undefined;
};

export const _isDateObject = (date: unknown): date is Date => {
  return date instanceof Date && !isNaN(date.valueOf());
};

export const _isObjectType = (obj: unknown): boolean => {
  return typeof obj === 'object';
};

export const _isObject = <T>(obj: T): obj is T extends Record<string, any> ? T : never => {
  return !_isNullOrUndefined(obj) && !_isDateObject(obj) && !Array.isArray(obj) && _isObjectType(obj);
};

export const _isEmptyObject = (obj: unknown): obj is Record<string, never> => {
  return _isObject(obj) && Object.keys(obj)?.length === 0;
};

export const _isUnEmptyObject = <T>(obj: T): obj is T extends Record<string, any> ? T : never => {
  return _isObject(obj) && Object.keys(obj)?.length > 0;
};

export const _isEmptyArray = <T>(arr: T): arr is T extends Array<never> ? T : never => {
  return Array.isArray(arr) && arr?.length === 0;
};

export const _isUnEmptyArray = <T>(arr: T): arr is T extends Array<any> ? T : never => {
  return Array.isArray(arr) && arr?.length > 0;
};

export const _isUnEmptyArray_effectiveValue = <T extends Array<any>>(
  arr: T,
): arr is T extends Array<any> ? T : never => {
  const filter = arr?.filter?.(a => _isDefined(a));
  return Array.isArray(arr) && filter?.length > 0;
};
export const _isEmptyArray_effectiveValue = <T extends Array<any>>(arr: T): arr is T extends Array<any> ? T : never => {
  const filter = arr?.filter?.(a => _isDefined(a));
  return Array.isArray(arr) && filter?.length === 0;
};

export const _isEqualObject = (source: any, compare: any): boolean => {
  let isSame = false,
    key;

  if (Object.keys(source).length === 0 && Object.keys(compare).length === 0) {
    isSame = true;
  } else if (Object.keys(source).length === Object.keys(compare).length) {
    for (key in source) {
      if (source[key] && compare[key] && typeof source[key] === 'object' && typeof compare[key] === 'object') {
        isSame = _isEqualObject(source[key], compare[key]);
      } else {
        isSame = key in compare && source[key] === compare[key];
        // isSame = compare.hasOwnProperty?.(key) && source[key] === compare[key];
      }

      if (!isSame) {
        break;
      }
    }
  }

  return isSame;
};
export const _indexOf = (source: Array<any>, compare: any, key?: string) => {
  let i, idx, keys, _source, _compare;
  const len = source.length;

  for (i = 0; i < len; i++) {
    if (typeof key === 'string' && typeof compare === 'object' && key in source[i] && key in compare) {
      if (key.indexOf('.') > -1) {
        keys = key.split('.');
        _source = source[i];
        _compare = compare;
        for (idx in keys) {
          if (_source && typeof _source === 'object' && keys[idx] in _source) {
            _source = _source[keys[idx]];
          }
          if (_compare && typeof _source === 'object' && keys[idx] in _compare) {
            _compare = _compare[keys[idx]];
          }
        }

        if (_source === _compare) {
          return i;
        }
      } else {
        if (
          _isDefined(source[i][key]) &&
          _isDefined(compare[key]) &&
          source[i][key].toString() === compare[key].toString()
        ) {
          return i;
        }
      }
    } else if (typeof key === 'string' && typeof compare !== 'object' && key.indexOf('.') > -1) {
      keys = key.split('.');
      _source = source[i];
      _compare = compare;

      for (idx in keys) {
        if (_source && typeof _source === 'object' && keys[idx] in _source) {
          _source = _source[keys[idx]];
        }
        if (_compare && typeof _source === 'object' && keys[idx] in _compare) {
          _compare = _compare[keys[idx]];
        }
      }

      if (_source === _compare) {
        return i;
      }
    } else if (typeof key === 'string' && typeof compare !== 'object' && key in source[i]) {
      if (_isDefined(source[i][key]) && source[i][key].toString() === compare.toString()) {
        return i;
      }
    } else if (
      typeof key === 'undefined' &&
      typeof compare === 'object' &&
      typeof source[i] === 'object' &&
      source[i]
    ) {
      if (_isEqualObject(source[i], compare)) {
        return i;
      }
    }
  }
  return -1;
};
