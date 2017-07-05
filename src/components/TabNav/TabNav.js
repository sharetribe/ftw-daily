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

const { arrayOf, bool, node, object, string } = PropTypes;

Tab.propTypes = {
  text: node.isRequired,
  disabled: bool,
  selected: bool,
  linkProps: object.isRequired,
};

const TabNav = props => {
  const { className, rootClassName, tabs } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <nav className={classes}>
      {tabs.map((tab, index) => {
        const key = typeof tab.text === 'string' ? tab.text : index;
        return <Tab key={key} {...tab} />;
      })}
    </nav>
  );
};

TabNav.defaultProps = { className: null, rootClassName: null };

TabNav.propTypes = {
  className: string,
  rootClassName: string,
  tabs: arrayOf(object).isRequired,
};

export default TabNav;
