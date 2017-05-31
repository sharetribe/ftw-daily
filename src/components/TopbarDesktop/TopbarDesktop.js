import React, { PropTypes } from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import classNames from 'classnames';
import {
  Avatar,
  InlineButton,
  Menu,
  MenuLabel,
  MenuContent,
  MenuItem,
  NamedLink,
} from '../../components';
import { TopbarSearchForm } from '../../containers';

import logo from './images/saunatime-logo.png';
import css from './TopbarDesktop.css';

const TopbarDesktop = props => {
  const {
    className,
    firstName,
    lastName,
    rootClassName,
    currentUserHasListings,
    intl,
    isAuthenticated,
    onLogout,
    onSearchSubmit,
    initialSearchFormValues,
  } = props;

  const rootClass = rootClassName || css.root;
  const classes = classNames(rootClass, className);

  const search = (
    <TopbarSearchForm
      className={css.searchLink}
      form="TopbarSearchFormDesktop"
      onSubmit={onSearchSubmit}
      initialValues={initialSearchFormValues}
    />
  );

  const inboxLink = isAuthenticated
    ? <NamedLink
        className={css.inboxLink}
        name="InboxPage"
        params={{ tab: currentUserHasListings ? 'sales' : 'orders' }}
      >
        <span className={css.inbox}><FormattedMessage id="TopbarDesktop.inbox" /></span>
      </NamedLink>
    : null;

  const profileMenu = isAuthenticated
    ? <Menu>
        <MenuLabel className={css.profileMenuLabel}>
          <Avatar className={css.avatar} firstName={firstName} lastName={lastName} />
        </MenuLabel>
        <MenuContent className={css.profileMenuContent}>
          <MenuItem key="logout">
            <InlineButton className={css.logoutButton} onClick={onLogout}>
              <FormattedMessage id="TopbarDesktop.logout" />
            </InlineButton>
          </MenuItem>
        </MenuContent>
      </Menu>
    : null;

  const signupLink = isAuthenticated
    ? null
    : <NamedLink name="SignupPage" className={css.signupLink}>
        <span className={css.signup}><FormattedMessage id="TopbarDesktop.signup" /></span>
      </NamedLink>;

  const loginLink = isAuthenticated
    ? null
    : <NamedLink name="LoginPage" className={css.loginLink}>
        <span className={css.login}><FormattedMessage id="TopbarDesktop.login" /></span>
      </NamedLink>;

  return (
    <nav className={classes}>
      <NamedLink className={css.logoLink} name="LandingPage">
        <img
          className={css.logo}
          src={logo}
          alt={intl.formatMessage({ id: 'TopbarDesktop.logo' })}
        />
      </NamedLink>
      {search}
      <NamedLink className={css.createListingLink} name="NewListingPage">
        <span className={css.createListing}>
          <FormattedMessage id="TopbarDesktop.createListing" />
        </span>
      </NamedLink>
      {inboxLink}
      {profileMenu}
      {signupLink}
      {loginLink}
    </nav>
  );
};

const { bool, func, string, object } = PropTypes;

TopbarDesktop.defaultProps = {
  firstName: '',
  lastName: '',
  className: null,
  rootClassName: null,
  initialSearchFormValues: {},
};

TopbarDesktop.propTypes = {
  className: string,
  currentUserHasListings: bool.isRequired,
  isAuthenticated: bool.isRequired,
  onLogout: func.isRequired,
  firstName: string,
  lastName: string,
  rootClassName: string,
  onSearchSubmit: func.isRequired,
  initialSearchFormValues: object,
  intl: intlShape.isRequired,
};

export default TopbarDesktop;
