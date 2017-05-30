import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { NamedLink } from '../../components';

import css from './TabNav.css';

const Tab = props => {
  const { disabled, text, selected, linkProps } = props;
  const linkClasses = classNames(css.link, {
    [css.selectedLink]: selected,
    [css.disabled]: disabled,
  });

  return (
    <div className={css.tab}>
      <NamedLink className={linkClasses} {...linkProps}>{text}</NamedLink>
    </div>
  );
};

Tab.defaultProps = { disabled: false, selected: false };

const { arrayOf, object, string, bool } = PropTypes;

Tab.propTypes = {
  text: string.isRequired,
  disabled: bool,
  selected: bool,
  linkProps: object.isRequired,
};

const TabNav = props => {
  const { className, tabs } = props;
  const classes = classNames(css.root, className);
  return (
    <nav className={classes}>
      {tabs.map(tab => <Tab key={tab.text} {...tab} />)}
    </nav>
  );
};

TabNav.defaultProps = { className: '' };

TabNav.propTypes = {
  className: string,
  tabs: arrayOf(object).isRequired,
};

export default TabNav;
