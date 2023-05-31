import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { ACCOUNT_SETTINGS_PAGES } from '../../routeConfiguration';
import { LinkTabNavHorizontal} from '../../components';

import css from './UserNav.module.css';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { connect } from 'react-redux';

const UserNavComponent = props => {
  const { className, rootClassName, selectedPageName, currentUserHasOneListings } = props;

  const classes = classNames(rootClassName || css.root, className);

  const tabs = [
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
    <>
      <LinkTabNavHorizontal className={classes} tabRootClassName={css.tab} tabs={tabs} skin="dark" currentUserHasOneListings={currentUserHasOneListings} />
    </>
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
  const {
    currentUserHasOneListings,
  } = state.user;

  return {
    currentUserHasOneListings,
  };
};

const UserNav = compose(
  withRouter,
  connect(
    mapStateToProps,

  )
)(UserNavComponent);

export default UserNav;


