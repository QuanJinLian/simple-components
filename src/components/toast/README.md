# Toast Component

## 요구 사항

1. 토스트 컴포넌트는 최상위 컴포넌트내에서 한번만 사용되어야 함
2. 토스트 추가는 프로젝트 임의의 함수에서 호출되어야 함
3. 추가후 일정 시간 지나면 자동 삭제 되어야 하고 인위로도 삭제할 수 있어야 함
4. 토스트 레벨은 총 3개 normal, warning, error 세개면 충분

## 설계 아키텍쳐

![](https://user-images.githubusercontent.com/79301822/190897457-9971352e-5e1f-4251-937d-bcd03acc8375.png)

## 사용법

1. 최상위 컴포넌트에서 `<Toast />` 사용
2. 원하는 동작에서 toastService.add() 통해 토스트 띄움

## API

1. 컴포넌트
   ```
   <Toast />
   ```
2. toastService.add(msg, level, config) 토스트 추가
   1. msg: string
   2. level: number
      1. 1 => normal (color - blue)
      2. 2 => warning (color - yellow)
      3. 3 => error (color - red)
   3. config: object
      1. duration: number (개별 토스트 유지 초수)
      2. onClose : fn (토스트 없어 질때 실행하는 함수)
         - 넘겨 받는 props : {key, level, msg}
      3. wrapperClassName: string (개별 토스트 랩핑하는 div className)
         - ex) .[wrapperClassName] > div.msg-icon-box > div.msg-icon { background : url(...)}
3. toastService.getTimer() 현재 유지 시간 구함 (단위 초)
   1. default : 5s
4. toastService.setTimer(second) 전체 토스트 유지 초수 셋팅 (단위 초)
   1. second: number

## 최종 효과

![](https://user-images.githubusercontent.com/79301822/195764511-46af0545-fc44-439f-ac9d-3f0f652c9783.gif)
