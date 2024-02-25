import { _isObject, _isString } from '../common/checkDataFunc';
import { deepClone } from '../common/cloneDataFunc';
import { useGlobalStateImpl } from './useGlobalStateImpl';

const _GlobalStore = {};

export function create(options) {
  if (!options || !_isObject(options)) throw Error('옵션을 넘겨주셔야죠 선생님~~');
  const { name, initialState, reducers } = options;

  if (!name || !_isString(name)) throw Error('구독하는 데이터에 대해 이름을 붙여주면 참 고맙겠습니다~');

  if (_GlobalStore[name])
    throw Error(`구독하는 데이터 중에 ${name}이라는 데이터가 이미 있는데요? 이름을 좀 바꿔주시면 어떨까요 선생님?`);

  if (!reducers || !_isObject(reducers)) throw Error('데이터를 컨트롤 할 수 있는 reducers 를 설정 안하셨습니다 선생님');

  // 구독하는 데이터 초기 셋팅

  const initState = {
    state: initialState,
    setStateFn: new Set(),
  };

  _GlobalStore[name] = initState;

  const actions = {};

  Object.entries(reducers).forEach(([key, reducer]) => {
    actions[key] = payload => {
      if (!_GlobalStore[name]) return;
      const _state = _GlobalStore[name].state;
      const cloneState = _isObject(_state) || Array.isArray(_state) ? deepClone(_state) : _state;
      const result = reducer(cloneState, payload);

      _GlobalStore[name].setStateFn.forEach(setState => setState?.(result));
      _GlobalStore[name].state = result;
    };
  });

  const disconnect = () => {
    if (!_GlobalStore[name]) return;
    delete _GlobalStore[name];
  };

  const reconnect = () => {
    if (_GlobalStore[name]) return;
    _GlobalStore[name] = initState;
  };

  return {
    name,
    actions,
    getInitialState: () => initialState,
    disconnect,
    reconnect,
    useGlobalState: useGlobalStateImpl(_GlobalStore, name),
  };
}
