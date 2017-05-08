import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { NamedLink } from '../../components';

import css from './TabNav.css';

const Tab = props => {
  const { text, selected, linkProps } = props;
  const classes = classNames(css.tab, {
    [css.selected]: selected,
  });
  return (
    <div className={classes}>
      <NamedLink className={css.link} {...linkProps}>{text}</NamedLink>
    </div>
  );
};

Tab.defaultProps = { selected: false };

const { arrayOf, object, string, bool } = PropTypes;

Tab.propTypes = {
  text: string.isRequired,
  selected: bool,
  linkProps: object.isRequired,
};

const TabNav = props => {
  const { className, tabs } = props;
  return (
    <nav className={className}>
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
