# Tooltip component



## 요구 사항
1. 방향은 상하좌우 4개 방향이면 충분 (나중에 필요에 의해 8개 방향 추가)
2. 툴팁으로 감싸진 컴포넌트에 마우스 오버 시 툴팁이 나타나야 함
3. 경우에 따라 mouse leave 시 delay 되며 사자질 수 있어야 함
4. 툴팁 내부에 상황에 따라 string, number, icon & string 등 여러 타입이 표현될 수 있어야 함
5. ...


## 설계 아키텍쳐
### 사용법   > >   효과
![](https://user-images.githubusercontent.com/79301822/192125714-a282815a-c6cf-4685-9bcc-52c781d58f25.png)

#### 공통 position
####x => children.getBoundingClientRect().x +  window.scrollX ;
####y => children.getBoundingClientRect().y +  window.scrollY ;


#### 경우의 수 - placement = 'top-...'  ( 수직 위치 )
![](https://user-images.githubusercontent.com/79301822/192125711-e035fc5d-04ab-4a87-9230-5b6f8bfc1cdd.png)

#### 경우의 수 - placement = 'bottom-...' ( 수직 위치 )
![](https://user-images.githubusercontent.com/79301822/192125710-08c23ce0-66ef-48b3-93bb-94af4adca25a.png)

#### 경우의 수 - placement = 'top-center' / 'bottom-center' ( 수평 위치 )
![](https://user-images.githubusercontent.com/79301822/192125709-c23521b2-4282-412f-b773-f0ddddb86d87.png)
![](https://user-images.githubusercontent.com/79301822/192125708-326c9ddb-e8cb-4d01-be15-ca4fcf738f46.png)

### 경우의 수 - placement = 'left-...' ( 수평 위치 )
![](https://user-images.githubusercontent.com/79301822/192125707-2e0deeb9-a713-47ff-a6c8-12a3988f19ee.png)

### 경우의 수 - placement = 'right-...' ( 수평 위치 )
![](https://user-images.githubusercontent.com/79301822/192125705-11951f04-436c-44ca-b721-d3fdbe987258.png)

### 경우의 수 - placement = 'left-center' / 'right-center' ( 수직 위치 )
![](https://user-images.githubusercontent.com/79301822/192125704-d0a9157f-3228-4060-948f-ad7a00278807.png)
![](https://user-images.githubusercontent.com/79301822/192125703-90ab547d-e816-4c6f-bdf2-f52e325485b2.png)

## API
| 변수명     | 설명                                                                                                                                                                       | 필수 여부 | 타입 | default 값                                                                                        |
|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------|-------|--------------------------------------------------------------------------------------------------|
| title   | tooltip 에 보여 질 text 혹은 컴포넌트 내용                                                                                                                                           | O     |string / number/ component  | -                                                                                                |
| placement    | tooltip 이 보여 질 위치 [ 'top' , 'left' , 'right' , 'bottom' ,'top-left', 'top-right', 'left-top', 'left-bottom', 'right-top', 'right-bottom', 'bottom-left', 'bottom-right'] | X     |string  | 	값이 없을 경우 'top' >> 'right' >> 'bottom' >> 'left' 순서로 rendering 할 공간이 있는지 판단하여 placement 값 return |
| overlayClassName    | tooltip-container 영역에 추가 할 className                                                                                                                                     | X     |string  | 'tooltip-container'                                                                              |
| maxWidth    | tooltip 의 최대 넓이를 지정하고 싶을 때 사용 함                                                                                                                                          | X     |string  | -                                                                                                |
| isHidden    | 툴팁 포지션 계산 안되고 숨김 처리 됨. false => 정상 표현 ( default ) true => 숨김                                                                                                             | X     |boolean  | false                                                                                            |

## 사용법
```
import { Tooltip } from '../../components';


function App() {
	return (
 		 <>
			<Tooltip title="this is description">description</Tooltip>
			<Tooltip 
				title="여기는 라벨 인풋 / 여기는 라벨 인풋/ 여기는 라벨 인풋/ 여기는 라벨 인풋/ 여기는 라벨 인풋/ 여기는 라벨 인풋" 
				placement='bottom' 
				maxWidth='450px'
			>
  				<button> 버튼 <button />
			</Tooltip>
			...
 		</>
	);
}
```
#### scss 로 mouseEnterDelay, mouseLeaveDelay, tooltip mouse hover 시 hidden 안되게 하는 법

```
.tooltip-container {
  /* target mouseEnter delay  =>  overlayClassName="enter-delay".  */
  &.enter-delay { 
    transition-delay: 1s;
    visibility: visible;

    &.hidden {
      transition-delay: 0s;
      visibility: hidden;
    }
  }

  /* target mouseLeave delay  =>  overlayClassName="leave-delay".  */
  &.leave-delay {
    transition-delay: 0s;
    visibility: visible;

    &.hidden {
      transition-delay: 1s;
      visibility: hidden;
    }
  }

  /* tooltip 부분 mouseOver 시 툴팁 사라지지 않게 함   =>  overlayClassName="hover-view". */
  &.hover-view {
    transition-delay: 0s;
    visibility: visible;

    &.hidden {
      transition-delay: 0.5s;
      visibility: hidden;
    }

    &:hover.hidden {
      visibility: visible;
    }

    &:not(:hover).hidden {
      visibility: hidden;
    }
  }
}
```

### 사용 효과
![](https://user-images.githubusercontent.com/79301822/192127518-a8f2c97c-93ce-4c67-b38d-6223442dfa86.gif)