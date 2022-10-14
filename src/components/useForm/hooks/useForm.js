import { checkValidation_default } from '../services/formServices';
import { useFormState } from './useFormState';
import { useFormEvents } from './useFormEvents';
import { useRegister } from './useRegister';

export function useForm(configure) {
  const _checkValidation_default = JSON.parse(JSON.stringify(checkValidation_default));
  const checkValidation = Object.assign(_checkValidation_default, configure?.checkValidation);
  const stateObj = useFormState(configure?.initialValues);
  const { handleChange, handleBlur, handleSubmit, handleReset } = useFormEvents(stateObj, checkValidation);
  const register = useRegister(stateObj, { handleChange, handleBlur });

  return {
    values: stateObj.values,
    errors: stateObj.errors,
    isDirty: stateObj.isDirty,
    setIsDirty: stateObj.setIsDirty,
    isValidate: stateObj.isValidate,
    isSubmitting: stateObj.isSubmitting,
    isSubmitSuccessful: stateObj.isSubmitSuccessful,
    dirtyFields: stateObj.dirtyFields,
    touchedFields: stateObj.touchedFields,
    setValues: stateObj.setValuesState,
    setInitialValues: stateObj.setInitialValues,
    handleSubmit,
    handleReset,
    register,
  };
}
