import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageMenu from './PageMenu';
import { navigationService } from '../service/navigationService';

function PageNavigation() {
  const [mainMenu, setMainMenu] = useState({});
  const [subList, setSubList] = useState([]);
  const location = useLocation();
  const key = navigationService.findKeyByPathname(location.pathname);

  /* 항상 주소값과 네비게이션 상태 동기화 유지*/
  useEffect(() => {
    if (key) {
      const mainIndex = key.split('-')[0];
      const menu_main = navigationService.getMenu()?.[mainIndex];
      const list = getPageMenuList(menu_main.subMenu);
      setMainMenu(menu_main);
      setSubList(list);
    } else {
      setMainMenu({});
      setSubList([]);
    }
  }, [key]);

  return (
    <div className="fe-page-head-panel">
      <span className="fe-page-title-font channel">{mainMenu.name || ''}</span>
      {subList || ''}
    </div>
  );
}

export default PageNavigation;

/** 중첩되어 들어간 subMenu 들을 1차원으로 풀어주고 array 에 담는 작업
 *
 *  ex)  Menus.js 의  예제 설정
 *  결과) [대제목]국가 | [링크]서초 | [링크]방배
 *
 * */
export function getPageMenuList(menu, list = []) {
  for (let i = 0; i < menu?.length; i++) {
    if (menu[i].path) {
      list.push(<PageMenu key={menu[i].path} sub={menu[i]} />);
    } else {
      getPageMenuList(menu[i].subMenu, list);
    }
  }
  return list;
}
