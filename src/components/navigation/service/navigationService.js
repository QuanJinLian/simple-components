import { routerService } from '../../router';

export const navigationService = (() => {
  let menu = [];
  let menu_flat;

  const setInitialMenu = initMenu => {
    menu = JSON.parse(JSON.stringify(initMenu));
    menu_flat = [];
    setFlatMenu(menu);
    return menu;
  };

  /** 메뉴의 key 값으로 menu.selected 와 menu.visible 값을 셋팅해주는 작업 */
  const settingMenuByKey = key => {
    let index_key = key + '';
    for (let i = menu_flat?.length; i > 0; i--) {
      let m = menu_flat[i - 1];
      m.selected = m.key === index_key;
      m.visible = m.selected;
      if (m.selected) {
        index_key = m.parentKey;
      }
    }
    return JSON.parse(JSON.stringify(menu));
  };

  const getMenu = () => {
    return JSON.parse(JSON.stringify(menu));
  };

  /** 초기 셋팅할때 중첩 배열을 1차원으로 풀어주는 작업
   *  menu[1].submenu[2].submenu[0] 의 key 와 parentKey 가 아래와 같이 할당이 됨
   *  key = '1-2-0'
   *  parentKey = '1-2'
   * */
  const setFlatMenu = (menu, parentKey = '') => {
    for (let i = 0; i < menu.length; i++) {
      let m = menu[i];
      if (parentKey === '') {
        m.key = i + '';
      } else {
        m.parentKey = parentKey;
        m.key = parentKey + '-' + i;
      }
      menu_flat.push(m);
      if (m.subMenu) {
        setFlatMenu(m.subMenu, m.key);
      }
    }
  };

  const findKeyByPathnameFromMenu = pathname => {
    for (let i = 0; i < menu_flat?.length; i++) {
      const menu = menu_flat[i];
      if (menu.path === pathname) {
        return menu.key;
      }
    }
    return null;
  };

  /** 현재 location.pathname 으로 해당되는 메뉴의 key 값을 찾기 */
  const findKeyByPathname = pathname => {
    // 먼저 route 와 매칭되는 값이 있는지 찾아 보고, route 설정을 안했을 경우 그냥 menu 설정에서 찾아 봄
    // 라우터에서 찾은 key 값을 우선 순위로 리턴
    const match = routerService?.getMatchPathByPathname(pathname);
    const key = findKeyByPathnameFromMenu(pathname);

    if (!match && !key) {
      return null;
    }
    if (match) {
      for (let i = 0; i < menu_flat?.length; i++) {
        const m = menu_flat[i];
        const regexp = '^\\' + m.path + '\\/';
        const keepSelectedRegexp = '^\\' + m.keepSelectedPath + '\\/';
        if (
          m.path === match.path ||
          match.path.match(regexp) ||
          m.keepSelectedPath === match.path ||
          match.path.match(keepSelectedRegexp)
        ) {
          return m.key;
        }
      }
    }
    return key;
  };

  /** export 객체 */

  return {
    getMenu,
    setInitialMenu,
    settingMenuByKey,
    findKeyByPathname,
  };
})();
