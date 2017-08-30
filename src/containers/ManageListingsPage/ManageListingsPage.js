import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import * as propTypes from '../../util/propTypes';
import { parse } from '../../util/urlHelpers';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { ManageListingCard, PageLayout, PaginationLinks, Topbar, UserNav } from '../../components';

import {
  closeListing,
  openListing,
  getListingsById,
  queryOwnListings,
} from './ManageListingsPage.duck';
import css from './ManageListingsPage.css';

// Pagination page size might need to be dynamic on responsive page layouts
// Current design has max 3 columns 42 is divisible by 2 and 3
// So, there's enough cards to fill all columns on full pagination pages
const RESULT_PAGE_SIZE = 42;

export class ManageListingsPageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { listingMenuOpen: null };
    this.onToggleMenu = this.onToggleMenu.bind(this);
  }

  onToggleMenu(listing) {
    this.setState({ listingMenuOpen: listing });
  }

  render() {
    const {
      authInfoError,
      authInProgress,
      currentUser,
      currentUserHasListings,
      history,
      isAuthenticated,
      listings,
      location,
      logoutError,
      notificationCount,
      onCloseListing,
      onOpenListing,
      onLogout,
      onManageDisableScrolling,
      pagination,
      queryInProgress,
      queryListingsError,
      queryParams,
      openingListing,
      closingListing,
    } = this.props;

    // TODO Handle openingListingError, closingListingError,

    const hasPaginationInfo = !!pagination && pagination.totalItems != null;
    const listingsAreLoaded = !queryInProgress && hasPaginationInfo;

    const loadingResults = (
      <h2>
        <FormattedMessage id="ManageListingsPage.loadingOwnListings" />
      </h2>
    );

    const queryError = (
      <h2 className={css.error}>
        <FormattedMessage id="ManageListingsPage.queryError" />
      </h2>
    );

    const noResults = listingsAreLoaded && pagination.totalItems === 0
      ? <h1 className={css.title}>
          <FormattedMessage id="ManageListingsPage.noResults" />
        </h1>
      : null;

    const title = listingsAreLoaded && pagination.totalItems > 0
      ? <h1 className={css.title}>
          <FormattedMessage
            id="ManageListingsPage.youHaveListings"
            values={{ count: pagination.totalItems }}
          />
        </h1>
      : noResults;

    const page = queryParams ? queryParams.page : 1;
    const paginationLinks = listingsAreLoaded && pagination && pagination.totalPages > 1
      ? <PaginationLinks
          className={css.pagination}
          pageName="ManageListingsPage"
          pageSearchParams={{ page }}
          pagination={pagination}
        />
      : null;

    const listingMenuOpen = this.state.listingMenuOpen;

    return (
      <PageLayout authInfoError={authInfoError} logoutError={logoutError} title="Manage listings">
        <Topbar
          authInProgress={authInProgress}
          currentUser={currentUser}
          currentUserHasListings={currentUserHasListings}
          currentPage="ManageListingsPage"
          history={history}
          isAuthenticated={isAuthenticated}
          location={location}
          notificationCount={notificationCount}
          onLogout={onLogout}
          onManageDisableScrolling={onManageDisableScrolling}
        />
        <UserNav selectedPageName="ManageListingsPage" />
        {queryInProgress ? loadingResults : null}
        {queryListingsError ? queryError : null}
        <div className={css.listingPanel}>
          {title}
          <div className={css.listingCards}>
            {listings.map(l => (
              <ManageListingCard
                className={css.listingCard}
                key={l.id.uuid}
                listing={l}
                isMenuOpen={!!listingMenuOpen && listingMenuOpen.id.uuid === l.id.uuid}
                actionsInProgressListingId={openingListing || closingListing}
                onToggleMenu={this.onToggleMenu}
                onCloseListing={onCloseListing}
                onOpenListing={onOpenListing}
              />
            ))}
          </div>
          {paginationLinks}
        </div>

      </PageLayout>
    );
  }
}

ManageListingsPageComponent.defaultProps = {
  authInfoError: null,
  currentUser: null,
  listings: [],
  logoutError: null,
  notificationCount: 0,
  pagination: null,
  queryListingsError: null,
  queryParams: null,
  closingListing: null,
  openingListing: null,
};

const { arrayOf, bool, func, instanceOf, number, object, shape, string } = PropTypes;

ManageListingsPageComponent.propTypes = {
  authInfoError: instanceOf(Error),
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
  isAuthenticated: bool.isRequired,
  listings: arrayOf(propTypes.ownListing),
  logoutError: instanceOf(Error),
  notificationCount: number,
  onCloseListing: func.isRequired,
  onOpenListing: func.isRequired,
  onLogout: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  pagination: propTypes.pagination,
  queryInProgress: bool.isRequired,
  queryListingsError: instanceOf(Error),
  queryParams: object,
  closingListing: shape({ uuid: string.isRequired }),
  openingListing: shape({ uuid: string.isRequired }),

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({ state: object }).isRequired,
};

const mapStateToProps = state => {
  const {
    currentPageResultIds,
    pagination,
    queryInProgress,
    queryListingsError,
    queryParams,
    openingListing,
    openingListingError,
    closingListing,
    closingListingError,
  } = state.ManageListingsPage;
  const listings = getListingsById(state, currentPageResultIds);
  // PageLayout needs authInfoError and logoutError, Topbar needs isAuthenticated
  const { authInfoError, isAuthenticated, logoutError } = state.Auth;
  // Topbar needs user info.
  const {
    currentUser,
    currentUserHasListings,
    currentUserNotificationCount: notificationCount,
  } = state.user;
  return {
    authInfoError,
    authInProgress: authenticationInProgress(state),
    currentPageResultIds,
    currentUser,
    currentUserHasListings,
    currentUserNotificationCount: notificationCount,
    isAuthenticated,
    listings,
    logoutError,
    pagination,
    queryInProgress,
    queryListingsError,
    queryParams,
    scrollingDisabled: isScrollingDisabled(state),
    openingListing,
    openingListingError,
    closingListing,
    closingListingError,
  };
};

const mapDispatchToProps = dispatch => ({
  onCloseListing: listingId => dispatch(closeListing(listingId)),
  onOpenListing: listingId => dispatch(openListing(listingId)),
  onLogout: historyPush => dispatch(logout(historyPush)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
});

const ManageListingsPage = compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(
  ManageListingsPageComponent
);

ManageListingsPage.loadData = (params, search) => {
  const queryParams = parse(search);
  const page = queryParams.page || 1;
  return queryOwnListings({
    ...queryParams,
    page,
    perPage: RESULT_PAGE_SIZE,
    include: ['images'],
  });
};

export default ManageListingsPage;
