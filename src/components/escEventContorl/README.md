# Esc event control

## 요구 사항

1. Esc 키 keydown 시 열렸던 페이지 혹 팝업이 열렸던 역순으로 하나씩 close 되어야 함

   ##### 예) a 페이지 열림=> b 모달 열림=> c 알림창 열림 => esc => c 알림창 닫힘 => esc => b 모달 닫힘=> esc => a 페이지 닫힘

2. close 하다가 예외 상황이 생기면 예외 상황 처리 후 다시 close적용해야 함

   ##### 토폴로지 편집모드 진입 => 노드 포지션 변경 => 저장 안하고 esc => 편집모드 빠져 나가기 중단 => 경고 alert 창 열림 => esc => alert창 닫힘 => 포지션 저장 => esc => 편집모드 빠져나옴

3. esc keydown 하지 않고 닫기 버튼 클릭 시 esc 순서에서 뺴버려야 함

## 설계 아키텍쳐

![](https://user-images.githubusercontent.com/79301822/195829377-1d6320bb-e0ce-4023-9dec-070ab8359f11.png)

## 사용법

```
import { useEffect, useRef, useState, useCallback } from 'react';
import { _isFunction, nanoid, escEventService } from '../../components';

export const useModalExam = config => {
  const { defaultValue, closeFn, openFn } = config || {};
  const [isOpen, setIsOpen] = useState(defaultValue || false);

  useEffect(() => {
    setIsOpen(defaultValue);
  }, [defaultValue]);

  const openModal = useCallback(() => {
    if (_isFunction(openFn)) openFn();
    setIsOpen(true);
  }, [setIsOpen, openFn]);

  const closeModal = useCallback(() => {
    if (_isFunction(closeFn)) closeFn();
    setIsOpen(false);
  }, [closeFn]);

  const uniqueKey = useRef(`${new Date().toJSON()}-${nanoid()}`);
  useEffect(() => {
    if (isOpen) {
      escEventService.appendOpenId(uniqueKey.current);
    } else {
      escEventService.deleteOpenId(uniqueKey.current);
    }
  }, [isOpen]);

  useEffect(() => {
    escEventService?.addEvent(uniqueKey.current, closeModal);
  }, [closeModal]);

  useEffect(() => {
    const _uniqueKey = uniqueKey.current;
    return () => {
      escEventService?.deleteEvent(_uniqueKey);
    };
  }, []);

  return { isOpen, openModal, closeModal, setIsOpen };
};

function App() {
  const { isOpen, openModal, closeModal } = useModalExam();

  return (
    <div className="container">
      <div className="modal-wrapper">
        <button className="test-button" onClick={openModal}>
          modal 1
        </button>
        {isOpen && (
          <div className="semi-modal">
            <button className="semi-modal-button__close" onClick={closeModal} />
            <span className="semi-modal-title"> modal 1</span>
            팝업 내용...
          </div>ㄴ
        )}
      </div>
    </div>
  );
}

export default App;
```

## API

| function     | description                                                                 | props                     | 주의점                                                                                                       |
| ------------ | --------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| addEvent     | escEventService 에 모달 혹은 페이지 닫는 함수 등록 하는 함수                | 1.uniqueKey <br>2.closeFn | ※ uniqueKey 는 무조건 unique 해야 함 <br>※ close 이벤트 실해에 예외 상황이 필요 할 때 throw err 를 해주면 됨 |
| deleteEvent  | escEventService 에 등록된 이벤트 삭제 및 esc 실행 순서에서 제외 시키는 함수 | 1.uniqueKey               |                                                                                                              |
| appendOpenId | escEventService에 오픈된 모달 혹은 페이지 esc 순서 등록 하는 함수           | 1.uniqueKey               |                                                                                                              |
| deleteOpenId | escEventService에 오픈된 모달 혹은 페이지 esc 순서에서 제외 시키는 함수     | 1.uniqueKey               |                                                                                                              |

## 최종 효과

![](https://user-images.githubusercontent.com/79301822/195829665-b932a96f-9420-464f-b4b8-83268dfedb64.gif)
