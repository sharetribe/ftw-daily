import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { types } from '../../util/sdkLoader';
import * as propTypes from '../../util/propTypes';
import { ensureCurrentUser, ensureUser } from '../../util/data';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import {
  Page,
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  AvatarLarge,
  NamedLink,
  ListingCard,
} from '../../components';
import { TopbarContainer } from '../../containers';
import { loadData } from './ProfilePage.duck';
import config from '../../config';

import css from './ProfilePage.css';

const { UUID } = types;

export const ProfilePageComponent = props => {
  const {
    scrollingDisabled,
    currentUser,
    user,
    userShowError,
    queryListingsError,
    listings,
    intl,
  } = props;
  const ensuredCurrentUser = ensureCurrentUser(currentUser);
  const profileUser = ensureUser(user);
  const isCurrentUser =
    ensuredCurrentUser.id && profileUser.id && ensuredCurrentUser.id.uuid === profileUser.id.uuid;
  const displayName = profileUser.attributes.profile.displayName;
  const bio = profileUser.attributes.profile.bio;
  const hasBio = !!bio;
  const hasListings = listings.length > 0;

  const editLinkMobile = isCurrentUser ? (
    <NamedLink className={css.editLinkMobile} name="ProfileSettingsPage">
      <FormattedMessage id="ProfilePage.editProfileLinkMobile" />
    </NamedLink>
  ) : null;
  const editLinkDesktop = isCurrentUser ? (
    <NamedLink className={css.editLinkDesktop} name="ProfileSettingsPage">
      <FormattedMessage id="ProfilePage.editProfileLinkDesktop" />
    </NamedLink>
  ) : null;

  const asideContent = (
    <div className={css.asideContent}>
      <AvatarLarge className={css.avatar} user={user} disableProfileLink />
      <h1 className={css.mobileHeading}>
        {displayName ? (
          <FormattedMessage id="ProfilePage.mobileHeading" values={{ name: displayName }} />
        ) : null}
      </h1>
      {editLinkMobile}
      {editLinkDesktop}
    </div>
  );

  const listingsContainerClasses = classNames(css.listingsContainer, {
    [css.withBioMissingAbove]: !hasBio,
  });

  const mainContent = (
    <div>
      <h1 className={css.desktopHeading}>
        <FormattedMessage id="ProfilePage.desktopHeading" values={{ name: displayName }} />
      </h1>
      {hasBio ? <p className={css.bio}>{bio}</p> : null}
      {hasListings ? (
        <div className={listingsContainerClasses}>
          <h2 className={css.listingsTitle}>
            <FormattedMessage id="ProfilePage.listingsTitle" values={{ count: listings.length }} />
          </h2>
          <ul className={css.listings}>
            {listings.map(l => (
              <li className={css.listing} key={l.id.uuid}>
                <ListingCard listing={l} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );

  let content;

  if (userShowError || queryListingsError) {
    content = (
      <p className={css.error}>
        <FormattedMessage id="ProfilePage.loadingDataFailed" />
      </p>
    );
  } else {
    content = mainContent;
  }

  const schemaTitle = intl.formatMessage(
    {
      id: 'ProfilePage.schemaTitle',
    },
    {
      name: displayName,
      siteTitle: config.siteTitle,
    }
  );

  return (
    <Page
      scrollingDisabled={scrollingDisabled}
      title={schemaTitle}
      schema={{
        '@context': 'http://schema.org',
        '@type': 'ProfilePage',
        name: schemaTitle,
      }}
    >
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer currentPage="ProfilePage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperSideNav className={css.aside}>{asideContent}</LayoutWrapperSideNav>
        <LayoutWrapperMain>{content}</LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page>
  );
};

ProfilePageComponent.defaultProps = {
  currentUser: null,
  user: null,
  userShowError: null,
  queryListingsError: null,
};

const { bool, arrayOf } = PropTypes;

ProfilePageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,
  currentUser: propTypes.currentUser,
  user: propTypes.user,
  userShowError: propTypes.error,
  queryListingsError: propTypes.error,
  listings: arrayOf(propTypes.listing).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  const { userId, userShowError, queryListingsError, userListingRefs } = state.ProfilePage;
  const userMatches = getMarketplaceEntities(state, [{ type: 'user', id: userId }]);
  const user = userMatches.length === 1 ? userMatches[0] : null;
  const listings = getMarketplaceEntities(state, userListingRefs);
  return {
    scrollingDisabled: isScrollingDisabled(state),
    currentUser,
    user,
    userShowError,
    queryListingsError,
    listings,
  };
};

const ProfilePage = compose(connect(mapStateToProps), injectIntl)(ProfilePageComponent);

ProfilePage.loadData = params => {
  const id = new UUID(params.id);
  return loadData(id);
};

export default ProfilePage;
