import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { InlineTextButton, NamedLink } from '../../components';

import css from './TabNavHorizontal.module.css';

export const LIGHT_SKIN = 'light';
export const DARK_SKIN = 'dark';

const { arrayOf, bool, func, node, object, oneOf, string, shape } = PropTypes;

const Tab = props => {
  const { className, disabled, text, selected, onClick, linkProps, isDark } = props;
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

  const buttonClasses = classNames(
    css.tabContent,
    css.button,
    {
      [css.selectedTabContent]: selected,
      [css.disabled]: disabled,
    },
    darkSkinClasses
  );

  const isButton = !!onClick;

  return (
    <div className={className}>
      {isButton ? (
        <InlineTextButton rootClassName={buttonClasses} onClick={onClick}>
          {text}
        </InlineTextButton>
      ) : (
        <NamedLink className={linkClasses} {...linkProps}>
          {text}
        </NamedLink>
      )}
    </div>
  );
};

Tab.defaultProps = { className: null, disabled: false, selected: false };

Tab.propTypes = {
  className: string,
  text: node.isRequired,
  disabled: bool,
  selected: bool,
  onClick: func,
  linkProps: object,
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

/**
 * A tab navigation element with buttons. Requires onClick
 * function param for tab objects passed as parameter.
 */
export const ButtonTabNavHorizontal = props => <TabNavHorizontal {...props} />;

ButtonTabNavHorizontal.defaultProps = {
  className: null,
  rootClassName: null,
  tabRootClassName: null,
  tabClassName: null,
  skin: LIGHT_SKIN,
};

ButtonTabNavHorizontal.propTypes = {
  className: string,
  rootClassName: string,
  tabRootClassName: string,
  tabs: arrayOf(
    shape({
      text: node.isRequired,
      disabled: bool,
      selected: bool,
      onClick: func.isRequired,
    })
  ).isRequired,
  skin: oneOf([LIGHT_SKIN, DARK_SKIN]),
};

/**
 * A tab navigation element with links. Requires linkProps
 * object param for tab objects passed as parameter.
 */
export const LinkTabNavHorizontal = props => <TabNavHorizontal {...props} />;

LinkTabNavHorizontal.defaultProps = {
  className: null,
  rootClassName: null,
  tabRootClassName: null,
  tabClassName: null,
  skin: LIGHT_SKIN,
};

LinkTabNavHorizontal.propTypes = {
  className: string,
  rootClassName: string,
  tabRootClassName: string,
  tabs: arrayOf(
    shape({
      text: node.isRequired,
      disabled: bool,
      selected: bool,
      linkProps: object.isRequired,
    })
  ).isRequired,
  skin: oneOf([LIGHT_SKIN, DARK_SKIN]),
};
