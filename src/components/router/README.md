# Router

## 요구 사항 (원하는 형태?)

    1. config 파일이 따로 있고 컴포넌트는 원하는 위치에서 props 없이 사용하면 알아서 해당 위치에 <Switch><Route>  렌더링 되어야 함
    2. config 에서 설정하지 않은 url 입력 받았을 시 defaultUrl 로 자동 라우팅

## 사용된 라이브러리

"react-router-dom": "^5.2.0"

## 사용법

```
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';


/** 다중 중첩 메뉴 트리 예제 */
const routesConfig_example = [
  {
    name: 'country',
    path: '/country',
    component: Page,
    childRoutes: [
      {
        name: 'country.kr',
        path: '/kr',
        component: OtherPage,
      },
      {
        name: 'country.cn',
        path: '/cn',
        component: OtherPage,
      },
      {
        name: 'country.usa',
        path: '/us',
        component: OtherPage,
      },
      {
        name: 'country.total',
        path: '/total',
        component: OtherPage,
      },
    ],
  },
  {
    name: 'category',
    path: '/category',
    component: Page,
    childRoutes: [
      {
        name: 'category.general',
        path: '/general',
        component: OtherPage,
      },
      {
        name: 'category.sports',
        path: '/sports',
        component: OtherPage,
      },
      {
        name: 'category.entertainment',
        path: '/entertainment',
        component: Page,
        childRoutes: [
          {
            name: 'category.entertainment.general_1',
            path: '/general_1',
            component: OtherPage,
          },
          {
            name: 'category.entertainment.sports_1',
            path: '/sports_1',
            component: OtherPage,
          },
          {
            name: 'category.entertainment.entertainment_1',
            path: '/entertainment_1',
            component: Page,
            childRoutes: [
              {
                name: 'category.entertainment.entertainment_1.entertainment_1_1',
                path: '/detail',
                component: OtherPage,
              },
            ],
          },
        ],
      },
    ],
  },
];

ReactDOM.render(
    <HashRouter>
      <App />
    </HashRouter>,
  document.getElementById('root'),
);


function App() {
  routerService.setInitRoutes(routesConfig_example, '/country/kr');

  return (
    <div className="container">
      <Header />
      <Container>
        <Navigation />
        <section>
          <UiView className="section" isHighest />  // 라우터 사용 1차
        </section>
      </Container>
    </div>
  );
}

export default App;
```

## 단점

로그인 로직이 포함되지 않음. 그러므로 로그인 로직은 따로 래핑해야함
