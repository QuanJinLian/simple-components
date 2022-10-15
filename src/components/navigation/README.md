# Navigation

## 요구 사항

    1. 왼쪽에 있는 네이비게이션과 매 페이지 상측에 있는 세션별 네이비게이션이 필요
    2. 세션별 네이비게이션은 별도 셋팅 필요없이 알아서 config에서 찾아서 렌더링해야 함
    3. 왼쪽 사이드 네이비게이션은 클릭 시 펼쳐지고 선택 안하고 mouse leave하면 다시 접히고 현재 location path와 일치하게 선택이 되어야함
    4. 왼쪽 사이드 네이비게이션 과 상측 네이베이션 선택 시 상호 sync 맞게 선택이 되어야 함
    5. location path 가 네이비게이션 주소의 자식 라우터 주소일때 네이비게이션 선택이 유지되어야 함

## 사용법

```
import { Navigation, navigationService} from './components';

/** 다중 중첩 메뉴 트리 예제 */
let initialMenu_example= [
  {
    id: 1,
    name: 'Country',
    d_name: 'main.text.country',
    icon: 'user',
    subMenu: [
      {
        name: 'Korea',
        path: '/country/kr',
      },
      {
        name: 'China',
        path: '/country/cn',
      },
      {
        name: 'USA',
        path: '/country/us',
      },
      {
        name: 'Total',
        path: '/country/total',
      },
    ],
  },
  {
    id: 2,
    name: 'Category',
    d_name: 'main.text.category',
    icon: 'monitoring',
    subMenu: [
      {
        s_name: 'main.text.general',
        name: 'General',
        path: '/category/general',
      },
      {
        s_name: 'main.text.sports',
        name: 'Sports',
        path: '/category/sports',
      },
      {
        d_name: 'main.text.entertainment',
        name: 'Category.Entertainment',
        icon: 'event',
        subMenu: [                // ***서브메뉴 안에서 메인 메뉴 역할 한다면 (하위 subMenu 있으면)  path 생략하여야 함***
          {
            s_name: 'main.text.general_1',
            name: 'Category.Entertainment.General_1',
            path: '/category/entertainment/general_1',
          },
          {
            s_name: 'main.text.sports_1',
            name: 'Sports_1',
            path: '/category/entertainment/sports_1',
          },
          {
            s_name: 'main.text.entertainment_1',
            name: 'Entertainment_1',
            icon: 'service',
            subMenu: [
              {
                s_name: 'main.text.enter_1_1',
                name: 'Entertainment_1_1',
                path: '/category/entertainment/entertainment_1/detail',
              },
            ],
          },
        ],
      },
    ],
  },
];

function App() {
	navigationService.setInitialMenu(initialMenu_example);
	return (
		<>
			{/* 왼쪽 사이드 네비게이션 */}
			<Navigation />


			{/* 페이지 상단 카테고리별 네비게이션 */}
			<PageNavigation  />
		</>
	);
}
```

## 주의할 점

routerService 랑 셋트로 사용해야 함

## config

메뉴 트리 만들 때 주의 해야 할 점: type: Array[]

꼭 필요한 필드 :

    1. s_name || d_name : 우선 순위 대로 적용, s_name 과 d_name 은 국제화 사용 시 적용 될 예정이고 코드 상 구별 되는 기능은 없음
    2.name :      <PageNavigation /> 에서 title 역할을 함, 국제화 적용가능

특수 필드 :

    1. path:
        1.써야 할 경우             : 서브 메뉴에 속해있고 클릭 시 location 주소가 바뀌어야 하는 메뉴에 필수
        2.쓰지 말아야 할 경우 : 서브 메뉴에 속해 있지만 하위 subMenu가 또 있고 서브 메뉴 안에서 메인 메뉴 역할 할 때 ( 위 예제 참고)

생략 가능한 필드:

    1. icon          : 예) icon: 'user' 로 입력 시 className='fe-navigation-user' 로 렌더링 해 줌, icon을 지정하지 않았거나 해당 폴더에서 해당 이름의 아이콘을 못 찾았을 경우 className='fe-navigation-undefined' 로 렌더링이 됨
                     파일 경로 는 css 중 content: url(...) 로 설정해야 함
    2.subMenu   : 통상[{obj1}, {obj2}, ...] 이런 식으로 설정해야 함 ( obj 필드는 위 예제 참고)

## 사용 효과 (Demo)

![](https://user-images.githubusercontent.com/79301822/195978356-c4e261d1-857c-4500-957c-6cd7b021c5d1.gif)

## className 구조

### -SideNavigation

```
<nav class='fe-navigation' >
    <div class='fe-navigation-container'>
        <div class='fe-navigation-navmenu'>
            <div class='fe-navigation-row fe-navigation-submain-1 is-selected'>
                <div class='fe-navigation-col is-selected'>
                    <img class='fe-navigation-아이콘명 is-selected' />
                    <span class='fe-navigation-label' />
                </div>
                <div class='fe-navigation-row fe-navigation-subrow-1 is_visible'>
                    <a class='fe-navigation-aTag'>
                        <div class-'fe-navigation-submenu is-selected'>
                            <img class='fe-navigation-subicon' />
                            <span class='fe-navigation-col fe-navigation-subcol-1' />
                        </div>
                    </a>
                    ...
                </div>
            </div>
            ...
        </div>
    </div>
</nav>
```

### -SideNavigation

```
<div class='fe-page-head-panel'>
    <span class='fe-page-title-font channel' />


    <div class='fe-page-submenu'>
        <span> | </span>
        <a class='fe-title-name cursor-pointer' />
    </div>

    <div class='fe-page-submenu'>
        <span> | </span>
        <a class='fe-title-name cursor-pointer' />
    </div>


    ...
</div>
```
