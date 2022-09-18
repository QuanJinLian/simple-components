import React from 'react';

function Menu({ menu, settingMenu, children }) {
  const colNumber = menu.key.split('-').length;
  const className_submain = 'fe-navigation-submain-' + colNumber;
  const className_subrow = 'fe-navigation-subrow-' + colNumber;

  const onClick = e => {
    if (!menu.selected) {
      settingMenu(menu.key);
      e.stopPropagation();
    }
  };

  return (
    <div className={`fe-navigation-row ${className_submain} ${menu.selected ? 'is-selected' : ''}`} onClick={onClick}>
      <div className={`fe-navigation-col ${menu.selected ? 'is-selected' : ''}`}>
        <img
          alt={`fe-navigation-${menu.icon}`}
          className={`fe-navigation-${menu.icon} ${menu.selected ? 'is-selected' : ''}`}
          src={null}
        />
        <span className={`fe-navigation-label`}>{menu.s_name || menu.d_name || menu.name}</span>
      </div>
      <div className={`fe-navigation-row ${className_subrow} ${menu.visible ? 'is-visible' : ''}`}>{children}</div>
    </div>
  );
}

export default React.memo(Menu);
