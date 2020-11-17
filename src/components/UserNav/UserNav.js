import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { ACCOUNT_SETTINGS_PAGES } from '../../routeConfiguration';
import { LinkTabNavHorizontal } from '../../components';

import css from './UserNav.module.css';

const UserNav = props => {
  const { className, rootClassName, selectedPageName } = props;
  const classes = classNames(rootClassName || css.root, className);

  const tabs = [
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

  return (
    <LinkTabNavHorizontal className={classes} tabRootClassName={css.tab} tabs={tabs} skin="dark" />
  );
};

UserNav.defaultProps = {
  className: null,
  rootClassName: null,
};

const { string } = PropTypes;

UserNav.propTypes = {
  className: string,
  rootClassName: string,
  selectedPageName: string.isRequired,
};

export default UserNav;
