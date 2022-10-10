export const _isFunction = func => {
  return typeof func === 'function';
};

export const _isNumber = num => {
  return typeof num === 'number';
};

export const _isString = str => {
  return typeof str === 'string';
};

export const _isBoolean = bool => {
  return typeof bool === 'boolean';
};

export const _isNullOrUndefined = data => {
  return data === null || data === undefined;
};

export const _isDefined = data => {
  return data !== null && data !== undefined;
};

export const _isDateObject = date => {
  return date instanceof Date && !isNaN(date.valueOf());
};

export const _isObjectType = obj => {
  return typeof obj === 'object';
};

export const _isObject = obj => {
  return !_isNullOrUndefined(obj) && !_isDateObject(obj) && !Array.isArray(obj) && _isObjectType(obj);
};

export const _isEmptyObject = obj => {
  return _isObject(obj) && Object.keys(obj)?.length === 0;
};

export const _isUnEmptyObject = obj => {
  return _isObject(obj) && Object.keys(obj)?.length > 0;
};

export const _isEmptyArray = arr => {
  return Array.isArray(arr) && arr?.length === 0;
};

export const _isUnEmptyArray = arr => {
  return Array.isArray(arr) && arr?.length > 0;
};

export const _isEqualObject = (source, compare) => {
  let isSame = false,
    key;

  if (Object.keys(source).length === 0 && Object.keys(compare).length === 0) {
    isSame = true;
  } else if (Object.keys(source).length === Object.keys(compare).length) {
    for (key in source) {
      if (source[key] && compare[key] && typeof source[key] === 'object' && typeof compare[key] === 'object') {
        isSame = _isEqualObject(source[key], compare[key]);
      } else {
        isSame = compare.hasOwnProperty(key) && source[key] === compare[key];
      }

      if (!isSame) {
        break;
      }
    }
  }

  return isSame;
};
