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
