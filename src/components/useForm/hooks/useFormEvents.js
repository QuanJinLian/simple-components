import { useCallback, useEffect } from 'react';
import {
  changeValue,
  constraintValidation,
  getEffectiveValue,
  resetFields_default,
  trimData,
  valueAs_default,
} from '../services/formServices';

export function useFormEvents(stateObj, checkValidation) {
  const {
    getInitialValues,
    setValuesState,
    getRealTimeValues,
    setErrorsState,
    deleteErrorState,
    getRealTimeErrors,
    checkValidationAndSetError,
    isSubmitting,
    setIsSubmitting,
    setIsSubmitSuccessful,
    isValidate,
    setIsValidate,
    setIsDirty,
    setTouchedFields,
    dirtyFields,
    setDirtyFields,
    valueAs,
    customOnChange,
    customOnBlur,
    customValidates,
    getCustomOnSubmit,
    setCustomOnSubmit,
    getIsMount,
  } = stateObj;

  const handleChange = useCallback(
    e => {
      const { name, value, type } = e.target;
      let _value = changeValue(customValidates[name], value); // auto 값을 지정 해줬을때 min, max 값에 따라 자동 값 셋팅

      if (type === 'checkbox') {
        const _checked = e.target.checked;
        if (valueAs[name] === valueAs_default.VALUEASTOGGLE) {
          _value = _checked;
        } else {
          const realTimeValues = getRealTimeValues();
          _value = Array.isArray(realTimeValues[name]) ? realTimeValues[name].filter(v => v !== value) : [];

          if (_checked) _value.push(value);
        }
      }
      if (type === 'radio' && valueAs[name] === valueAs_default.VALUEASTOGGLE) {
        if (_value === 'true') {
          _value = true;
        } else if (_value === 'false') {
          _value = false;
        }
      }

      setValuesState(name, _value);

      // set dirtyFields
      setDirtyFields(name, true);
      setIsDirty(true);

      // onchange 일때 validation 이 필요하고 체크할 것이 있으면 validation check
      if (checkValidation.onChange && customValidates[name]) {
        checkValidationAndSetError(e.target || e.ref, customValidates[name]);
      }

      // custom onChange 함수를 지정 시 사용자의 함수 실행
      if (customOnChange[name] && typeof customOnChange[name] === 'function') {
        customOnChange[name](e);
      }
    },
    [
      setDirtyFields,
      setValuesState,
      checkValidation,
      checkValidationAndSetError,
      customOnChange,
      setIsDirty,
      customValidates,
      getRealTimeValues,
      valueAs,
    ],
  );

  const handleBlur = useCallback(
    e => {
      const { name } = e.target;
      // set touchedFields
      setTouchedFields(name, true);
      setIsDirty(true);

      // onBlur 일때 validation 이 필요하면 validation check
      if (checkValidation.onBlur && customValidates[name]) {
        checkValidationAndSetError(e.target, customValidates[name]);
      }

      // custom onBlur 함수를 지정 시 사용자의 함수 실행
      if (customOnBlur[name] && typeof customOnBlur[name] === 'function') {
        customOnBlur[name](e);
      }
    },
    [customOnBlur, setIsDirty, setTouchedFields, customValidates, checkValidation, checkValidationAndSetError],
  );

  // submit 이벤트 발생 시 첫번째로 실행하는 함수
  const startSubmit = useCallback(
    e => {
      e.preventDefault();
      // console.log('startSubmit');
      let elements;
      if (e.target?.length) {
        elements = e.target?.elements;
      } else if (e.currentTarget?.parentElement?.tagName === 'FORM') {
        elements = e.currentTarget?.parentElement;
      }

      // value 를 굳이 여기서 한번 더 셋팅하는 이유는 initialValues 가 정의 되지 않았을 때 동적으로 보여졌다 숨겼다 하는 input 들의 값을 정확하게 캐치하기 위해
      // check validations and set errors
      const _values = {};
      const _errors = {};
      const elementsObj = {};
      const initialValues = getInitialValues();
      // if (elements?.length) {
      //   for (let ele of elements) {
      //     const name = ele.name;
      //     elementsObj[name] = ele;
      //     if (name && !initialValues[name]) {
      //       if (ele.type === 'checkbox') {
      //         const _checked = ele.checked;
      //         if (valueAs[name] === valueAs_default.VALUEASTOGGLE) {
      //           _values[name] = _checked;
      //         } else {
      //           _values[name] = Array.isArray(_values[name]) ? _values[name].filter(v => v !== ele.value) : [];
      //           if (_checked) _values[name].push(ele.value);
      //         }
      //       } else if (ele.type === 'radio' && valueAs[name] === valueAs_default.VALUEASTOGGLE) {
      //         if (_values[name] === 'true') {
      //           _values[name] = true;
      //         } else if (_values[name] === 'false') {
      //           _values[name] = false;
      //         }
      //       } else {
      //         _values[name] = ele.value;
      //       }
      //     }
      //   }
      //   // 다중 선택 checkbox 때문에 분리 함
      //   for (let [key, value] of Object.entries(_values)) {
      //     const ele = elementsObj[key];
      //     const error = constraintValidation(ele, customValidates[key], valueAs[key], value);
      //     if (error.type) {
      //       _errors[key] = error;
      //     }
      //   }
      //   setErrorsState('_all', _errors);
      // }

      // if (!Object.keys(initialValues).length) {
      //   setValuesState('_all', trimData(_values));
      // } else {
      const realTimeValues = getRealTimeValues();
      setValuesState('_all', trimData(realTimeValues));
      // }

      setIsSubmitting(true);
      setIsSubmitSuccessful(false);
      if (!checkValidation.onSubmit) setIsValidate(true);
      else {
        if (Object.keys(_errors)?.length) setIsValidate(false);
      }
    },
    [
      getInitialValues,
      setIsSubmitting,
      setIsSubmitSuccessful,
      checkValidation.onSubmit,
      setIsValidate,
      setErrorsState,
      valueAs,
      customValidates,
      setValuesState,
      getRealTimeValues,
    ],
  );

  // 커스텀 submit 함수를 등록하고 startSubmit 을 리턴 해줌
  const handleSubmit = useCallback(
    onSubmit => {
      if (onSubmit) setCustomOnSubmit(onSubmit);

      return startSubmit;
    },
    [startSubmit, setCustomOnSubmit],
  );

  // 실제로 custom submit 할수가 동작하는 곳
  useEffect(() => {
    if (isSubmitting) {
      const customOnSubmit = getCustomOnSubmit();
      const values = getRealTimeValues();
      if (isValidate) {
        if (customOnSubmit) customOnSubmit(values);
        setIsSubmitSuccessful(true);
      }
      setIsSubmitting(false);
    }
  }, [isSubmitting, isValidate, getCustomOnSubmit, getRealTimeValues, setIsSubmitSuccessful, setIsSubmitting]);

  const handleReset = useCallback(
    _resetFields => {
      const isMount = getIsMount();
      if (isMount) {
        const resetFields = _resetFields || resetFields_default;
        const _values = getRealTimeValues();
        const initialValues = getInitialValues();

        if (resetFields === '_all') {
          Object.keys(_values).forEach(filed => (_values[filed] = getEffectiveValue(initialValues[filed])));
        } else if (typeof resetFields === 'string') {
          _values[resetFields] = getEffectiveValue(initialValues[resetFields]);
        } else if (Array.isArray(resetFields)) {
          resetFields?.forEach(filed => {
            _values[filed] = getEffectiveValue(initialValues[filed]);
          });
        }

        setValuesState('_all', _values);
        deleteErrorState(resetFields);
        setTouchedFields(resetFields, false);
        setDirtyFields(resetFields, false);

        const isDirtyFiled = Object.values(dirtyFields)?.filter(value => value)?.length;
        if (!isDirtyFiled) setIsDirty(false);
        return { values: _values, errors: getRealTimeErrors() };
      }
    },
    [
      getIsMount,
      getInitialValues,
      dirtyFields,
      deleteErrorState,
      getRealTimeValues,
      getRealTimeErrors,
      setDirtyFields,
      setTouchedFields,
      setIsDirty,
      setValuesState,
    ],
  );

  return { handleChange, handleBlur, handleSubmit, handleReset };
}
