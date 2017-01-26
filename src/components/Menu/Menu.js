import React from 'react';
import css from './Menu.css';

const Menu = () => (
  <div className={css.container}>
     New York, Jan 2nd – Jan 4th <span className={css.openIndicator}>▼</span>
  </div>
);

export default Menu;
