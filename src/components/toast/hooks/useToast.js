const service = (() => {
  const toastService = { keepSecond: 5 };

  // <Toast /> 내부에서 dispatch 함수를 할당 해줌
  return {
    add: (msg, level, item) => {
      if (toastService.dispatch) toastService.dispatch(addToast(msg, level, item));
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
      let newList = JSON.parse(JSON.stringify(state));
      newList.unshift(action.toastMsg);
      return newList;
    case CANCEL_TOASTMSG:
      return state.filter(toast => toast.key !== action.key);
    default:
      return state;
  }
}

let num = 0;
export const addToast = (msg, level, item) => {
  let timeStamp = Date.now() + '-' + num;
  num++;
  return {
    type: ADD_TOASTMSG,
    toastMsg: {
      key: timeStamp,
      msg: msg,
      level: level,
      item: item,
    },
  };
};
export const cancelToast = key => ({
  type: CANCEL_TOASTMSG,
  key,
});
