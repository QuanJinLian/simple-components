import React from 'react';
import { Link } from 'react-router-dom';

/** ACCESS 1.8.4 기준  spine, leaf, 사용자 로그 등와 같은 디테일 메뉴 */
function SubMenu({ subMenu }) {
  const colNumber = subMenu.key.split('-').length - 1;
  const className = 'fe-navigation-subcol-' + colNumber;

  return (
    <>
      <Link to={subMenu.path} className="fe-navigation-aTag">
        <div className={`fe-navigation-submenu${subMenu.selected ? ' is-selected' : ''}`}>
          <img alt="fe-navigation-subicon" className="fe-navigation-subicon" src={null} />
          <span className={`fe-navigation-col ${className}`}>{subMenu.s_name || subMenu.d_name || subMenu.name}</span>
        </div>
      </Link>
    </>
  );
}

export default React.memo(SubMenu);
