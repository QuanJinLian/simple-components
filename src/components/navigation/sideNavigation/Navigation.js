import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { navigationService } from '../service/navigationService';
import Menus from './Menus';

function Navigation({ className, ...props }) {
  const [menu, setMenu] = useState(null);
  const location = useLocation();
  const _key = navigationService.findKeyByPathname(location.pathname);

  const setMenuByKey = useCallback(key => {
    navigationService.settingMenuByKey(key);
    const _menu = navigationService.getMenu();
    setMenu(_menu);
  }, []);

  const syncWithLocationPath = useCallback(() => {
    setMenuByKey(_key);
  }, [_key, setMenuByKey]);

  /* 초기 메뉴 셋팅 */
  useEffect(() => {
    const initialMenu = navigationService.getMenu();
    if (!menu && initialMenu) {
      setMenu(initialMenu);
    }
  }, [menu]);

  /* 항상 주소값과 네비게이션 상태 동기화 유지*/
  useEffect(() => {
    syncWithLocationPath();
  }, [syncWithLocationPath]);

  return (
    <nav className={className ?? 'fe-navigation'} {...props}>
      <div className="fe-navigation-container" onMouseLeave={syncWithLocationPath}>
        <div className="fe-navigation-navmenu">
          {menu?.map((m, i) => (
            <Menus key={i} menu={m} settingMenu={setMenuByKey} />
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
