import React, { PropTypes } from 'react'; // eslint-disable-line react/no-deprecated
import classNames from 'classnames';
import { NamedLink } from '../../components';

import css from './TabNav.css';

const Tab = props => {
  const { className, disabled, text, selected, linkProps } = props;
  const linkClasses = classNames(css.link, {
    [css.selectedLink]: selected,
    [css.disabled]: disabled,
  });

  return (
    <div className={className}>
      <NamedLink className={linkClasses} {...linkProps}>{text}</NamedLink>
    </div>
  );
};

Tab.defaultProps = { className: null, disabled: false, selected: false };

const { arrayOf, bool, node, object, string } = PropTypes;

Tab.propTypes = {
  className: string,
  text: node.isRequired,
  disabled: bool,
  selected: bool,
  linkProps: object.isRequired,
};

const TabNav = props => {
  const { className, rootClassName, tabRootClassName, tabs } = props;
  const classes = classNames(rootClassName || css.root, className);
  const tabClasses = tabRootClassName || css.tab;
  return (
    <nav className={classes}>
      {tabs.map((tab, index) => {
        const key = typeof tab.text === 'string' ? tab.text : index;
        return <Tab key={key} className={tabClasses} {...tab} />;
      })}
    </nav>
  );
};

TabNav.defaultProps = {
  className: null,
  rootClassName: null,
  tabRootClassName: null,
  tabClassName: null,
};

TabNav.propTypes = {
  className: string,
  rootClassName: string,
  tabRootClassName: string,
  tabs: arrayOf(object).isRequired,
};

export default TabNav;
