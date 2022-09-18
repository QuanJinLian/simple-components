import React from 'react';
import Menu from './Menu';
import SubMenu from './SubMenu';

/** 다중 중첩 메뉴일 경우 최하위 메뉴까지 노출을 위한 재귀함수
 *
 *  ex)
 *  [{
 *    name: '국가',
 *    subMenu: [{                           -[대제목]국가                                             ￣｜        ￣｜
 *      name : '한국',                         -[대제목]한국                                  ￣｜        ｜          ｜
 *      subMenu: [{                   =>         -[대제목]서울                   ￣｜           ｜-> Menu ｜ -> Menu  ｜  -> Menus
 *          name: '서울시',                           -[링크]서초     -> SubMenu    ｜ -> Menu  ｜        ｜          ｜
 *          subMenu: [{                             -[링크]방배     -> SubMenu   ＿｜        ＿｜       ＿｜        ＿｜
 *              name: '서초',
 *              path: '/seocho',
 *              },{
 *              name: '방배',
 *              path: '/bangbea'},],},],},],}]
 *
 * */
function Menus({ menu, settingMenu }) {
  return (
    <Menu key={menu.key} settingMenu={settingMenu} menu={menu}>
      {menu.subMenu?.map((sub, sub_i) =>
        sub.path ? (
          <SubMenu key={sub.key} settingMenu={settingMenu} subMenu={sub} />
        ) : (
          <Menus key={sub_i} menu={sub} settingMenu={settingMenu} />
        ),
      )}
    </Menu>
  );
}

export default React.memo(Menus);
