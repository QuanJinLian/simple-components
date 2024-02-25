import { create } from '../../components/useGlobalState';

export const countOb = create({
  name: 'count',
  initialState: 0,
  reducers: {
    plus: state => {
      return state + 1;
    },
    minus: state => {
      return state - 1;
    },
    reset: () => {
      return 0;
    },
  },
});

const initForm = {
  id: '초기값',
  genderYN: true,
  gender: '여자',
  event: ['이메일'],
  agree: false,
};

export const formObserve = create({
  name: 'user-info',
  initialState: initForm,
  reducers: {
    upateForm: (state, payload) => {
      return payload;
    },
    resetForm: state => {
      return initForm;
    },
  },
});
