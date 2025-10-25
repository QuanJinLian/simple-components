import { useCallback, useEffect, useRef, useState } from 'react';
import { constraintValidation, getEffectiveValue, setValueInnerObj } from '../services/formServices';
import { _isDefined, _isEmptyObject } from '../../common';

export function useFormState(initialValues) {
  const _initialValues = useRef(initialValues || {});
  const [values, setValues] = useState(initialValues || {});
  const valuesRef = useRef(values); // onChange 함수 내부에서 handelReset 호출 시 비동기 값 설정때문에 잘못 작동 되는것 방지
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [errors, setErrors] = useState({});
  const errorsRef = useRef({}); // onChange 함수 내부에서 handelReset 호출 시 비동기 값 설정때문에 잘못 작동 되는것 방지
  const [isDirty, setIsDirty] = useState(false);
  const [isValidate, setIsValidate] = useState(false); // 각 필드별 값들이 validation 통과 했는지 check
  const touchedFields = useRef({});
  const dirtyFields = useRef({});
  const isMount = useRef(false);
  const customOnSubmit = useRef();

  //  register 실행될때 값이 셋팅되는 것들 valueAs, customOnChange, customOnBlur, customValidates
  const valueAs = useRef({}); // this is method collection(object) to convert value before validation but Does not transform defaultValue or defaultValues.
  const customOnChange = useRef({});
  const customOnBlur = useRef({});
  const customValidates = useRef({}); // 각 필드의 필요한 validation name 과 check 여부 저장
  customValidates.current = {}; // 리렌더링 시 리셋하기

  const setValuesState = useCallback((field, value) => {
    let _values = { ...valuesRef.current };

    if (field === '_all' || !field) {
      _values = value || {};
    } else if (typeof field === 'string') {
      _values[field] = getEffectiveValue(value);
    } else if (Array.isArray(field)) {
      field?.forEach(_field => {
        _values[_field] = getEffectiveValue(value[_field]);
      });
    }

    setValues(_values);
    valuesRef.current = _values;
  }, []);

  const getRealTimeValues = useCallback(() => {
    return { ...valuesRef.current };
  }, []);

  const getInitialValues = useCallback(() => {
    return { ..._initialValues.current };
  }, []);

  const setErrorsState = useCallback((field, error) => {
    let _errors = { ...errorsRef.current };

    if (field === '_all' || !field) {
      _errors = error || {};
    } else if (typeof field === 'string') {
      _errors[field] = getEffectiveValue(error);
    } else if (Array.isArray(field)) {
      field?.forEach(_field => {
        _errors[_field] = getEffectiveValue(error[_field]);
      });
    }

    setErrors(_errors);
    errorsRef.current = _errors;
  }, []);

  const deleteErrorState = useCallback(field => {
    let _errors = { ...errorsRef.current };

    if (field === '_all' || !field) {
      _errors = {};
    } else if (typeof field === 'string') {
      delete _errors[field];
    } else if (Array.isArray(field)) {
      field?.forEach(_field => {
        delete _errors[field];
      });
    }

    // 현재 값 이전 값 둘 다 빈값이 아닐때 셋팅 해줌
    if (!(_isEmptyObject(_errors) && _isEmptyObject(errorsRef.current))) {
      setErrors(_errors);
      errorsRef.current = _errors;
    }
  }, []);

  const getRealTimeErrors = useCallback(() => {
    return { ...errorsRef.current };
  }, []);

  const setDirtyFields = useCallback((field, value) => {
    setValueInnerObj(dirtyFields.current, field, value);
  }, []);

  const setTouchedFields = useCallback((field, value) => {
    setValueInnerObj(touchedFields.current, field, value);
  }, []);

  const checkValidationAndSetError = useCallback(
    (ele, validate) => {
      const customValue = getRealTimeValues()[ele.name];
      const error = constraintValidation(ele, validate, valueAs.current[ele.name], customValue);
      if (error?.type) {
        setErrorsState(ele.name, error);
      } else {
        deleteErrorState(ele.name);
      }
    },
    [setErrorsState, deleteErrorState, valueAs, getRealTimeValues],
  );

  const getIsMount = useCallback(() => {
    return isMount.current;
  }, [isMount]);

  const setIsMount = useCallback(
    value => {
      isMount.current = value;
    },
    [isMount],
  );

  const getCustomOnSubmit = useCallback(() => {
    return customOnSubmit.current;
  }, []);

  const setCustomOnSubmit = useCallback(onSubmit => {
    customOnSubmit.current = onSubmit;
  }, []);

  // 데이터 검사를 통해 isValid 값 셋팅 해줌
  useEffect(() => {
    const valueKeys = Object.keys(values);
    const validatesKeys = Object.keys(customValidates.current);
    const _isMount = getIsMount();
    if (_isMount) {
      if (valueKeys.length && validatesKeys.length) {
        for (let key of validatesKeys) {
          const ele = { name: key, value: _isDefined(values[key]) ? values[key] : '' };
          const error = constraintValidation(ele, customValidates.current[key]);
          if (error.type) {
            setIsValidate(false);
            return;
          }
        }
      }
      setIsValidate(true);
    }
  }, [values, getIsMount]);

  const setInitialValues = useCallback(
    initialValues => {
      if (initialValues) {
        _initialValues.current = initialValues;
        setValuesState('_all', initialValues);

        const err = getRealTimeErrors();
        if (Object.keys(err)?.length) setErrorsState('_all');
      }
    },
    [setValuesState, setErrorsState, getRealTimeErrors],
  );

  // unmount 시 데이터 날림
  useEffect(() => {
    // return () => {
    //   setValues({});
    //   valuesRef.current = {};
    //   setIsSubmitting(false);
    //   setIsSubmitSuccessful(false);
    //   errorsRef.current = {};
    //   setIsDirty(false);
    //   setIsValidate(false);
    // };
  }, []);

  return {
    getInitialValues,
    setInitialValues,
    values,
    setValuesState,
    getRealTimeValues,
    errors,
    setErrorsState,
    deleteErrorState,
    getRealTimeErrors,
    checkValidationAndSetError,
    isSubmitting,
    setIsSubmitting,
    isSubmitSuccessful,
    setIsSubmitSuccessful,
    isValidate,
    setIsValidate,
    isDirty,
    setIsDirty,
    touchedFields: touchedFields.current,
    setTouchedFields,
    dirtyFields: dirtyFields.current,
    setDirtyFields,
    valueAs: valueAs.current,
    customOnChange: customOnChange.current,
    customOnBlur: customOnBlur.current,
    customValidates: customValidates.current,
    getCustomOnSubmit,
    setCustomOnSubmit,
    getIsMount,
    setIsMount,
  };
}
