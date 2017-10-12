import React, { PropTypes } from 'react'; // eslint-disable-line react/no-deprecated
import classNames from 'classnames';
import { NamedLink } from '../../components';

import css from './TabNavHorizontal.css';

export const LIGHT_SKIN = 'light';
export const DARK_SKIN = 'dark';

const Tab = props => {
  const { className, disabled, text, selected, linkProps, isDark } = props;
  const darkSkinClasses = isDark
    ? classNames(css.linkDarkSkin, {
        [css.selectedLinkDarkSkin]: selected,
        [css.disabledDarkSkin]: disabled,
      })
    : null;

  const linkClasses = classNames(
    css.link,
    {
      [css.selectedLink]: selected,
      [css.disabled]: disabled,
    },
    darkSkinClasses
  );

  return (
    <div className={className}>
      <NamedLink className={linkClasses} {...linkProps}>{text}</NamedLink>
    </div>
  );
};

Tab.defaultProps = { className: null, disabled: false, selected: false };

const { arrayOf, bool, node, object, oneOf, string } = PropTypes;

Tab.propTypes = {
  className: string,
  text: node.isRequired,
  disabled: bool,
  selected: bool,
  linkProps: object.isRequired,
  isDark: bool.isRequired,
};

const TabNavHorizontal = props => {
  const { className, rootClassName, tabRootClassName, tabs, skin } = props;
  const isDark = skin === DARK_SKIN;
  const classes = classNames(rootClassName || css.root, { [css.darkSkin]: isDark }, className);
  const tabClasses = tabRootClassName || css.tab;
  return (
    <nav className={classes}>
      {tabs.map((tab, index) => {
        const key = typeof tab.text === 'string' ? tab.text : index;
        return <Tab key={key} className={tabClasses} {...tab} isDark={isDark} />;
      })}
    </nav>
  );
};

TabNavHorizontal.defaultProps = {
  className: null,
  rootClassName: null,
  tabRootClassName: null,
  tabClassName: null,
  skin: LIGHT_SKIN,
};

TabNavHorizontal.propTypes = {
  className: string,
  rootClassName: string,
  tabRootClassName: string,
  tabs: arrayOf(object).isRequired,
  skin: oneOf([LIGHT_SKIN, DARK_SKIN]),
};

export default TabNavHorizontal;
