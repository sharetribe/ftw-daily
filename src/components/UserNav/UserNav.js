import React from 'react';
import PropTypes from 'prop-types';
//import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { ACCOUNT_SETTINGS_PAGES } from '../../routeConfiguration';
import { LinkTabNavHorizontal } from '../../components';

import { currentUserHasProviderAccess } from '../../ducks/user.duck';

import css from './UserNav.css';

const UserNavComponent = props => {
  const { className, rootClassName, selectedPageName } = props;
  const classes = classNames(rootClassName || css.root, className);


  /*TODO: only display add listing if user is authorized to do so (account has type "coach" ) */

  const tabs = [{
      text: <FormattedMessage id="TopbarDesktop.createListing" />,
      selected: selectedPageName === "NewListingPage",
      linkProps: {
        name: 'NewListingPage',
      }
    },
    {
      text: <FormattedMessage id="ManageListingsPage.yourListings" />,
      selected: selectedPageName === 'ManageListingsPage',
      linkProps: {
        name: 'ManageListingsPage',
      },
    },
    {
      text: <FormattedMessage id="ManageListingsPage.profileSettings" />,
      selected: selectedPageName === 'ProfileSettingsPage',
      disabled: false,
      linkProps: {
        name: 'ProfileSettingsPage',
      },
    },
    {
      text: <FormattedMessage id="ManageListingsPage.accountSettings" />,
      selected: ACCOUNT_SETTINGS_PAGES.includes(selectedPageName),
      disabled: false,
      linkProps: {
        name: 'ContactDetailsPage',
      },
    },
  ];

  if(!props.hasProviderAccess) {
    tabs.shift();
  }

  return (
    <LinkTabNavHorizontal className={classes} tabRootClassName={css.tab} tabs={tabs} skin="dark" />
  );
};

UserNavComponent.defaultProps = {
  className: null,
  rootClassName: null,
};

const { string } = PropTypes;

UserNavComponent.propTypes = {
  className: string,
  rootClassName: string,
  selectedPageName: string.isRequired,
};

const mapStateToProps = state => {
  return {
    hasProviderAccess: currentUserHasProviderAccess(state),
  }
}

const UserNav = connect(mapStateToProps)(UserNavComponent);

export default UserNav;
