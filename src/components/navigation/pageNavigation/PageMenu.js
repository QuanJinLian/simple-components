import React from 'react';
import { Link } from 'react-router-dom';

function PageMenu({ sub }) {
  if (!sub.path) {
    return null;
  }

  return (
    <div className="fe-page-submenu">
      <span>|</span>
      <Link
        to={sub.path}
        className={`${sub.selected ? 'fe-page-title-subUrl-selected ' : ''}fe-title-name cursor-pointer`}
      >
        {sub.s_name || sub.d_name || sub.name}
      </Link>
    </div>
  );
}

export default React.memo(PageMenu);
