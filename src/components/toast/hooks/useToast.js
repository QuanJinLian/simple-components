import { nanoid, deepClone } from '../../common';

const service = (() => {
  const toastService = { keepSecond: 5 };

  // <Toast /> 내부에서 dispatch 함수를 할당 해줌
  return {
    add: (msg, level, config) => {
      if (toastService.dispatch) toastService.dispatch(addToast(msg, level, config));
    },
    cancel: key => {
      if (toastService.dispatch) toastService.dispatch(cancelToast(key));
    },
    setDispatch: dispatch => {
      toastService.dispatch = dispatch;
    },
    getTimer: () => {
      return toastService.keepSecond;
    },
    setTimer: second => {
      toastService.keepSecond = second;
    },
  };
})();

export default service;

const ADD_TOASTMSG = 'toast/ADD_TOASTMSG';
const CANCEL_TOASTMSG = 'toast/TOASTMSG';

export function toastReducer(state, action) {
  switch (action.type) {
    case ADD_TOASTMSG:
      let newList = deepClone(state);
      newList.unshift(action.toastMsg);
      return newList;
    case CANCEL_TOASTMSG:
      return state.filter(toast => toast.key !== action.key);
    default:
      return state;
  }
}

export const addToast = (msg, level, config) => {
  let timeStamp = nanoid();
  return {
    type: ADD_TOASTMSG,
    toastMsg: {
      key: timeStamp,
      msg: msg,
      level: level,
      config: config,
    },
  };
};
export const cancelToast = key => ({
  type: CANCEL_TOASTMSG,
  key,
});
