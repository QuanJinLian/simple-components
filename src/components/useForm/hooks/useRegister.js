import { validationKeys, valueAs_default } from '../services/formServices';
import { useCallback } from 'react';

export function useRegister(stateObj, events) {
  const { values, valueAs, customOnChange, customOnBlur, customValidates, setIsMount } = stateObj;
  const { handleChange, handleBlur } = events;

  const register = useCallback(
    (field = '', registerConfigure) => {
      const returnObj = {};
      const _registerConfigure = { ...registerConfigure } || {};

      // const values = stateObj.values;
      // value setting
      let value;
      if (values[field] !== null && values[field] !== undefined) {
        value = values[field];
      } else if (registerConfigure?.value) {
        value = registerConfigure?.value;
      } else {
        value = '';
      }

      // save validate
      for (let key of Object.keys(_registerConfigure)) {
        if (Object.values(validationKeys).includes(key)) {
          if (!customValidates[field]) {
            customValidates[field] = {};
          }
          customValidates[field][key] = _registerConfigure[key];

          if (key === validationKeys.MAXLENGTH)
            returnObj[validationKeys.MAXLENGTH] = _registerConfigure[validationKeys.MAXLENGTH];

          delete _registerConfigure[key];
        }
      }

      // save custom valueAs
      if (registerConfigure?.valueAsString) valueAs[field] = valueAs_default.VALUEASSTRING;
      if (registerConfigure?.valueAsNumber) valueAs[field] = valueAs_default.VALUEASNUMBER;
      if (registerConfigure?.valueAsDate) {
        returnObj.min = '1900-01-01';
        returnObj.max = '9999-01-01';
        valueAs[field] = valueAs_default.VALUEASDATE;
      }
      if (registerConfigure?.valueAsToggle) valueAs[field] = valueAs_default.VALUEASTOGGLE;
      delete _registerConfigure.valueAsString;
      delete _registerConfigure.valueAsNumber;
      delete _registerConfigure.valueAsDate;
      delete _registerConfigure.valueAsToggle;

      // save custom onChange event
      if (registerConfigure?.onChange) customOnChange[field] = registerConfigure.onChange;

      // save custom onBlur event
      if (registerConfigure?.onBlur) customOnBlur[field] = registerConfigure.onBlur;

      setIsMount(true);

      // console.log('register', field, value);

      returnObj.name = field;
      returnObj.value = value;
      returnObj.onChange = handleChange;
      returnObj.onBlur = handleBlur;

      return Object.assign(_registerConfigure, returnObj);
    },
    [values, handleChange, handleBlur, customOnBlur, customOnChange, customValidates, setIsMount, valueAs],
  );

  return register;
}
