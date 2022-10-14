import { _isDefined, _isEmptyArray, _isUnEmptyObject } from '../../common';

export const resetFields_default = '_all'; // '_all' or undefined 전부 리셋 / 'id' 아이디만 리셋 / ['id','status'] 아이디랑 상태만 리셋

export const checkValidation_default = {
  onBlur: true,
  onChange: true,
  onSubmit: true,
};
export const valueAs_default = {
  VALUEASSTRING: 'valueAsString',
  VALUEASNUMBER: 'valueAsNumber',
  VALUEASDATE: 'valueAsDate',
  VALUEASTOGGLE: 'valueAsToggle',
};

export const validationKeys = {
  REQUIRED: 'required',
  PATTERN: 'pattern',
  MIN: 'min',
  MAX: 'max',
  MINLENGTH: 'minLength',
  MAXLENGTH: 'maxLength',
  VALIDATE: 'validate',
  AUTO: 'auto',
};
const { REQUIRED, PATTERN, MIN, MAX, MINLENGTH, MAXLENGTH, AUTO } = validationKeys;

export const getEffectiveValue = value => {
  if (value === null || value === undefined) return '';
  else return value;
};

export const changeValue = (validate, value) => {
  if (validate) {
    const auto = validate[AUTO] === true || validate[AUTO] === 'true';
    if (isFinite(value) && auto) {
      if (!isNaN(Number(validate[MIN])) && Number(validate[MIN]) > Number(value)) {
        return Number(validate[MIN]);
      }
      if (!isNaN(Number(validate[MAX])) && Number(validate[MAX]) < Number(value)) {
        return Number(validate[MAX]);
      }
    }
  }
  return value;
};

export const constraintValidation = (element, validate, valueAs, customValue) => {
  const error = { type: null, message: null, ref: element };
  const originValue = _isDefined(customValue) ? trimData(customValue) : trimData(element?.value);
  const value = valueConvert(originValue, valueAs);
  const validates_element = validate || {};

  if (validates_element && validates_element[REQUIRED] && (originValue === '' || _isEmptyArray(value))) {
    error.type = REQUIRED;
    error.message = '필수 사항입니다.';
    return error;
  }

  if (_isDefined(originValue) && originValue !== '' && validates_element) {
    if (validates_element[PATTERN] && !validates_element[PATTERN]?.test(value)) {
      error.type = PATTERN;
      error.message = '패턴이 유효하지 않습니다.';
      return error;
    }

    if (
      _isDefined(validates_element[MIN]) &&
      typeof validates_element[MIN] === 'number' &&
      Number(value) < validates_element[MIN]
    ) {
      error.type = MIN;
      error.message = `값은 ${validates_element[MIN]} 이상이어야 합니다.`;
      return error;
    }

    if (_isDefined(validates_element[MIN]) && typeof validates_element[MIN] === 'string' && value) {
      const min = new Date(validates_element[MIN]);
      const v = new Date(value);
      if (v < min) {
        error.type = MIN;
        error.message = `값은 ${validates_element[MIN]} 이상이어야 합니다.`;
        return error;
      }
    }

    if (
      _isDefined(validates_element[MAX]) &&
      typeof validates_element[MAX] === 'number' &&
      Number(value) > validates_element[MAX]
    ) {
      error.type = MAX;
      error.message = `값은 ${validates_element[MAX]} 이하이어야 합니다.`;
      return error;
    }

    if (_isDefined(validates_element[MAX]) && typeof validates_element[MAX] === 'string' && value) {
      const max = new Date(validates_element[MAX]);
      const v = new Date(value);
      if (v > max) {
        error.type = MAX;
        error.message = `값은 ${validates_element[MAX]} 이하이어야 합니다.`;
        return error;
      }
    }

    if (
      _isDefined(validates_element[MINLENGTH]) &&
      typeof validates_element[MINLENGTH] === 'number' &&
      typeof value === 'string' &&
      value.length < validates_element[MINLENGTH]
    ) {
      error.type = MINLENGTH;
      error.message = `이 텍스트를 ${validates_element[MINLENGTH]}자 이상으로 늘리세요.`;
      return error;
    }

    if (
      _isDefined(validates_element[MAXLENGTH]) &&
      typeof validates_element[MAXLENGTH] === 'number' &&
      typeof value === 'string' &&
      value.length > validates_element[MAXLENGTH]
    ) {
      error.type = MAXLENGTH;
      error.message = `이 텍스트를 ${validates_element[MAXLENGTH]}자 이하로 줄이세요.`;
      return error;
    }

    if (
      (valueAs === valueAs_default.VALUEASNUMBER && isNaN(value)) ||
      (valueAs === valueAs_default.VALUEASDATE && value.toString() === 'Invalid Date')
    ) {
      error.type = 'typeError';
      error.message = valueAs === valueAs_default.VALUEASNUMBER ? `숫자를 입력하세요` : '날짜 형식대로 입력하세요';
      return error;
    }

    const validate_custom = checkCustomValidation('validate', validates_element, value);

    if (validate_custom?.type) {
      error.type = validate_custom.type;
      return error;
    }
  }

  return error;
};

// 재귀 함수
export const checkCustomValidation = (key, validate, value) => {
  if (typeof validate === 'object') {
    for (let key of Object.keys(validate)) {
      const vali = validate[key];
      const resultObj = checkCustomValidation(key, vali, value);
      if (resultObj) {
        return resultObj;
      }
    }
  } else if (typeof validate === 'function') {
    const result = validate(value);
    if (!result) {
      return { type: key, validity: validate(value) };
    }
  }
  return null;
};

export const valueConvert = (value, setValueAs) => {
  if (typeof setValueAs === 'string') {
    switch (setValueAs) {
      case valueAs_default.VALUEASSTRING:
        return value?.toString();
      case valueAs_default.VALUEASNUMBER:
        return Number(value);
      case valueAs_default.VALUEASDATE:
        return value ? new Date(value) : '';
      default:
        return value;
    }
  } else if (typeof setValueAs === 'function') {
    return setValueAs(value);
  }
  return value;
};

export const setValueInnerObj = (obj, key = '_all', value) => {
  if (key === '_all') Object.keys(obj)?.forEach(oKey => (obj[oKey] = value));
  else if (typeof key === 'string') obj[key] = value;
  else if (Array.isArray(key))
    key?.forEach(k => {
      setValueInnerObj(obj, k, value);
    });
};

export const trimData = values => {
  if (_isUnEmptyObject(values)) {
    const cloneData = { ...values };
    Object.keys(cloneData)?.forEach(key => {
      const value = cloneData[key];
      cloneData[key] = trimData(value);
    });
    return cloneData;
  } else if (Array.isArray(values)) {
    const newArr = [];
    values?.forEach(value => {
      newArr.push(trimData(value));
    });
    return newArr;
  } else if (typeof values === 'string') {
    return values.trim();
  } else {
    return values;
  }
};
