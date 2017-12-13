/**
 * A horizontal tab bar.
 *
 * Tabs can be of links or buttons, denoted by the type param
 * which accepts values 'link' and 'button'.
 *
 * The required tab params vary based on the main component type. For
 * link tab bar linkProps is required for the tabs. For a button type
 * of tab bar onClick function is required.
 *
 * By default the type of TabNavHorizontal is 'link'.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { InlineTextButton, NamedLink } from '../../components';

import css from './TabNavHorizontal.css';

export const LIGHT_SKIN = 'light';
export const DARK_SKIN = 'dark';

export const TAB_TYPE_LINK = 'link';
export const TAB_TYPE_BUTTON = 'button';

const { arrayOf, bool, func, node, object, oneOf, string } = PropTypes;

const ButtonTab = props => {
  const { className, disabled, text, selected, onClick, isDark } = props;
  const darkSkinClasses = isDark
    ? classNames(css.tabContentDarkSkin, {
        [css.selectedTabContentDarkSkin]: selected,
        [css.disabledDarkSkin]: disabled,
      })
    : null;

  const buttonClasses = classNames(
    css.tabContent,
    {
      [css.selectedTabContent]: selected,
      [css.disabled]: disabled,
    },
    darkSkinClasses
  );

  return (
    <div className={className}>
      <InlineTextButton className={buttonClasses} onClick={onClick}>
        {text}
      </InlineTextButton>
    </div>
  );
};

ButtonTab.defaultProps = { className: null, disabled: false, selected: false };

ButtonTab.propTypes = {
  className: string,
  text: node.isRequired,
  disabled: bool,
  selected: bool,
  onClick: func.isRequired,
  isDark: bool.isRequired,
};

const LinkTab = props => {
  const { className, disabled, text, selected, linkProps, isDark } = props;
  const darkSkinClasses = isDark
    ? classNames(css.tabContentDarkSkin, {
        [css.selectedTabContentDarkSkin]: selected,
        [css.disabledDarkSkin]: disabled,
      })
    : null;

  const linkClasses = classNames(
    css.tabContent,
    {
      [css.selectedTabContent]: selected,
      [css.disabled]: disabled,
    },
    darkSkinClasses
  );

  return (
    <div className={className}>
      <NamedLink className={linkClasses} {...linkProps}>
        {text}
      </NamedLink>
    </div>
  );
};

LinkTab.defaultProps = { className: null, disabled: false, selected: false };

LinkTab.propTypes = {
  className: string,
  text: node.isRequired,
  disabled: bool,
  selected: bool,
  linkProps: object.isRequired,
  isDark: bool.isRequired,
};

const TabNavHorizontal = props => {
  const { className, rootClassName, tabRootClassName, tabs, skin, type } = props;
  const isDark = skin === DARK_SKIN;
  const isButton = type === TAB_TYPE_BUTTON;
  const classes = classNames(rootClassName || css.root, { [css.darkSkin]: isDark }, className);
  const tabClasses = tabRootClassName || css.tab;
  return (
    <nav className={classes}>
      {tabs.map((tab, index) => {
        const key = typeof tab.text === 'string' ? tab.text : index;
        return isButton ? (
          <ButtonTab key={key} className={tabClasses} {...tab} isDark={isDark} />
        ) : (
          <LinkTab key={key} className={tabClasses} {...tab} isDark={isDark} />
        );
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
  type: TAB_TYPE_LINK,
};

TabNavHorizontal.propTypes = {
  className: string,
  rootClassName: string,
  tabRootClassName: string,
  tabs: arrayOf(object).isRequired,
  skin: oneOf([LIGHT_SKIN, DARK_SKIN]),
  type: oneOf([TAB_TYPE_LINK, TAB_TYPE_BUTTON]),
};

export default TabNavHorizontal;
