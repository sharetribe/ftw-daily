import React, { Component, PropTypes } from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { debounce, isEqual, unionWith } from 'lodash';
import classNames from 'classnames';
import config from '../../config';
import { withFlattenedRoutes } from '../../util/contextHelpers';
import { googleLatLngToSDKLatLng, googleBoundsToSDKBounds } from '../../util/googleMaps';
import { createResourceLocatorString } from '../../util/routes';
import { createSlug, parse, stringify } from '../../util/urlHelpers';
import * as propTypes from '../../util/propTypes';
import { getListingsById } from '../../ducks/marketplaceData.duck';
import { sendVerificationEmail } from '../../ducks/user.duck';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { SearchMap, ModalInMobile, Page, SearchResultsPanel, Topbar } from '../../components';

import { searchListings, searchMapListings } from './SearchPage.duck';
import MapIcon from './MapIcon';
import css from './SearchPage.css';

// Pagination page size might need to be dynamic on responsive page layouts
// Current design has max 3 columns 12 is divisible by 2 and 3
// So, there's enough cards to fill all columns on full pagination pages
const RESULT_PAGE_SIZE = 12;
const SHARETRIBE_API_MAX_PAGE_SIZE = 100;
const MAX_SEARCH_RESULT_PAGES_ON_MAP = 5; // 100 * 5 = 500 listings are shown on a map.
const MODAL_BREAKPOINT = 768; // Search is in modal on mobile layout
const SEARCH_WITH_MAP_DEBOUNCE = 300; // Little bit of debounce before search is initiated.

const pickSearchParamsOnly = params => {
  const { address, origin, bounds } = params || {};
  return { address, origin, bounds };
};

export class SearchPageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearchMapOpenOnMobile: props.tab === 'map',
    };

    // Initiating map creates 'bounds_changes' event
    // we listen to that event to make new searches
    // So, if the search comes from location search input,
    // we need to by pass 2nd search created by initial 'bounds_changes' event
    this.useLocationSearchBounds = true;
    this.modalOpenedBoundsChange = false;
    this.searchMapListingsInProgress = false;

    this.onIdle = debounce(this.onIdle.bind(this), SEARCH_WITH_MAP_DEBOUNCE);
    this.fetchMoreListingsToMap = this.fetchMoreListingsToMap.bind(this);
  }

  componentDidMount() {
    this.fetchMoreListingsToMap(this.props.location);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.location, nextProps.location)) {
      this.fetchMoreListingsToMap(nextProps.location);

      // If no boundsChanged url parameter is given, this is original location search
      const { boundsChanged } = parse(location.search, {
        latlng: ['origin'],
        latlngBounds: ['bounds'],
      });
      if (!boundsChanged) {
        this.useLocationSearchBounds = true;
      }
    }
  }

  // We are using Google Maps idle event instead of bounds_changed, since it will not be fired
  // too often (in the middle of map's pan or zoom activity)
  onIdle(googleMap) {
    const { flattenedRoutes, history, location } = this.props;

    const { address, country, boundsChanged } = parse(location.search, {
      latlng: ['origin'],
      latlngBounds: ['bounds'],
    });

    // If boundsChanged url param is given (and we have not just opened mobile map modal)
    // or original location search is rendered once,
    // we start to react to 'bounds_changed' event by generating new searches
    if ((boundsChanged && !this.modalOpenedBoundsChange) || !this.useLocationSearchBounds) {
      const viewportBounds = googleMap.getBounds();
      const bounds = googleBoundsToSDKBounds(viewportBounds);
      const origin = googleLatLngToSDKLatLng(viewportBounds.getCenter());

      const searchParams = { address, origin, bounds, country, boundsChanged: true };
      history.push(createResourceLocatorString('SearchPage', flattenedRoutes, {}, searchParams));
    } else {
      this.useLocationSearchBounds = false;
      this.modalOpenedBoundsChange = false;
    }
  }

  fetchMoreListingsToMap(location) {
    const { onSearchMapListings } = this.props;
    const searchInURL = parse(location.search, {
      latlng: ['origin'],
      latlngBounds: ['bounds'],
    });
    const perPage = SHARETRIBE_API_MAX_PAGE_SIZE;
    const page = 1;
    const searchParamsForMapResults = { ...searchInURL, include: ['images'], page, perPage };
    this.searchMapListingsInProgress = true;

    // Search more listings for map
    onSearchMapListings(searchParamsForMapResults)
      .then(response => {
        const hasNextPage = page < response.data.meta.totalPages &&
          page < MAX_SEARCH_RESULT_PAGES_ON_MAP;
        if (hasNextPage) {
          onSearchMapListings({ ...searchParamsForMapResults, page: page + 1 });
        } else {
          this.searchMapListingsInProgress = false;
        }
      })
      .catch(error => {
        // In case of error, stop recursive loop and report error.
        // TODO: Show a flash message
        // eslint-disable-next-line no-console
        console.error(`An error (${error} occured while trying to retrieve map listings`);
      });
  }

  render() {
    const {
      authInfoError,
      authInProgress,
      currentUser,
      currentUserHasListings,
      currentUserHasOrders,
      flattenedRoutes,
      history,
      intl,
      isAuthenticated,
      listings,
      location,
      logoutError,
      mapListings,
      notificationCount,
      onLogout,
      onManageDisableScrolling,
      pagination,
      scrollingDisabled,
      searchInProgress,
      searchListingsError,
      searchParams,
      sendVerificationEmailInProgress,
      sendVerificationEmailError,
      onResendVerificationEmail,
    } = this.props;
    // eslint-disable-next-line no-unused-vars
    const { boundsChanged, page, ...searchInURL } = parse(location.search, {
      latlng: ['origin'],
      latlngBounds: ['bounds'],
    });

    // Page transition might initially use values from previous search
    const searchParamsInURL = stringify(pickSearchParamsOnly(searchInURL));
    const searchParamsInProps = stringify(pickSearchParamsOnly(searchParams));
    const searchParamsMatch = searchParamsInURL === searchParamsInProps;

    const { address, bounds, origin } = searchInURL || {};

    const hasPaginationInfo = !!pagination && pagination.totalItems != null;
    const totalItems = searchParamsMatch && hasPaginationInfo ? pagination.totalItems : 0;
    const listingsAreLoaded = !searchInProgress && searchParamsMatch && hasPaginationInfo;

    const searchError = (
      <h2 className={css.error}>
        <FormattedMessage id="SearchPage.searchError" />
      </h2>
    );

    const resultsFoundNoAddress = (
      <h2>
        <FormattedMessage id="SearchPage.foundResults" values={{ count: totalItems }} />
      </h2>
    );
    const addressNode = address
      ? <span className={css.searchString}>{searchInURL.address.split(', ')[0]}</span>
      : null;
    const resultsFoundWithAddress = (
      <h2>
        <FormattedMessage
          id="SearchPage.foundResultsWithAddress"
          values={{ count: totalItems, address: addressNode }}
        />
      </h2>
    );
    const resultsFound = address && !boundsChanged
      ? resultsFoundWithAddress
      : resultsFoundNoAddress;

    const noResults = (
      <h2>
        <FormattedMessage id="SearchPage.noResults" />
      </h2>
    );

    const loadingResults = (
      <h2>
        <FormattedMessage id="SearchPage.loadingResults" />
      </h2>
    );

    const searchMap = (
      <SearchMap
        bounds={bounds}
        center={origin}
        listings={mapListings || []}
        onIdle={this.onIdle}
        isOpenOnModal={this.state.isSearchMapOpenOnMobile}
        onCloseAsModal={() => {
          onManageDisableScrolling('SearchPage.map', false);
        }}
        useLocationSearchBounds={this.useLocationSearchBounds}
      />
    );
    const showSearchMapInMobile = this.state.isSearchMapOpenOnMobile ? searchMap : null;
    const isWindowDefined = typeof window !== 'undefined';
    const searchMapMaybe = isWindowDefined && window.innerWidth < MODAL_BREAKPOINT
      ? showSearchMapInMobile
      : searchMap;

    const searchParamsForPagination = parse(location.search);

    // Schema for search engines (helps them to understand what this page is about)
    // http://schema.org
    // We are using JSON-LD format
    const siteTitle = config.siteTitle;
    const searchAddress = address || intl.formatMessage({ id: 'SearchPage.schemaMapSearch' });
    const schemaTitle = intl.formatMessage(
      { id: 'SearchPage.schemaTitle' },
      { searchAddress, siteTitle }
    );
    const schemaDescription = intl.formatMessage({ id: 'SearchPage.schemaDescription' });
    const schemaListings = listings.map((l, i) => {
      const title = l.attributes.title;
      const pathToItem = createResourceLocatorString('ListingPage', flattenedRoutes, {
        id: l.id.uuid,
        slug: createSlug(title),
      });
      return {
        '@type': 'ListItem',
        position: i,
        url: `${config.canonicalRootURL}${pathToItem}`,
        name: title,
      };
    });
    const schemaMainEntity = JSON.stringify({
      '@type': 'ItemList',
      name: searchAddress,
      itemListOrder: 'http://schema.org/ItemListOrderAscending',
      itemListElement: schemaListings,
    });

    // N.B. openMobileMap button is sticky.
    // For some reason, stickyness doesn't work on Safari, if the element is <button>
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <Page
        authInfoError={authInfoError}
        logoutError={logoutError}
        scrollingDisabled={scrollingDisabled}
        description={schemaDescription}
        title={schemaTitle}
        schema={
          `
          {
            "@context": "http://schema.org",
            "@type": "SearchResultsPage",
            "description": "${schemaDescription}",
            "name": "${schemaTitle}",
            "mainEntity": [${schemaMainEntity}]
          }
        `
        }
      >
        <Topbar
          className={css.topbar}
          isAuthenticated={isAuthenticated}
          authInProgress={authInProgress}
          currentUser={currentUser}
          currentUserHasListings={currentUserHasListings}
          currentUserHasOrders={currentUserHasOrders}
          notificationCount={notificationCount}
          history={history}
          location={location}
          onLogout={onLogout}
          onManageDisableScrolling={onManageDisableScrolling}
          onResendVerificationEmail={onResendVerificationEmail}
          sendVerificationEmailInProgress={sendVerificationEmailInProgress}
          sendVerificationEmailError={sendVerificationEmailError}
        />
        <div className={css.container}>
          <div className={css.searchResultContainer}>
            <div className={css.searchResultSummary}>
              {searchListingsError ? searchError : null}
              {listingsAreLoaded && totalItems > 0 ? resultsFound : null}
              {listingsAreLoaded && totalItems === 0 ? noResults : null}
              {searchInProgress ? loadingResults : null}
            </div>
            <div
              className={classNames(css.listings, {
                [css.newSearchInProgress]: !listingsAreLoaded,
              })}
            >
              <SearchResultsPanel
                className={css.searchListingsPanel}
                listings={listings}
                pagination={listingsAreLoaded ? pagination : null}
                search={searchParamsForPagination}
              >
                <div
                  className={css.openMobileMap}
                  onClick={() => {
                    this.useLocationSearchBounds = true;
                    this.modalOpenedBoundsChange = true;
                    this.setState({ isSearchMapOpenOnMobile: true });
                  }}
                >
                  <MapIcon className={css.openMobileMapIcon} />
                  <FormattedMessage id="SearchPage.openMapView" />
                </div>
              </SearchResultsPanel>
            </div>
          </div>
          <ModalInMobile
            className={css.mapPanel}
            id="SearchPage.map"
            isModalOpenOnMobile={this.state.isSearchMapOpenOnMobile}
            onClose={() => this.setState({ isSearchMapOpenOnMobile: false })}
            showAsModalMaxWidth={MODAL_BREAKPOINT}
            onManageDisableScrolling={onManageDisableScrolling}
          >
            <div className={css.map}>
              {searchMapMaybe}
            </div>
          </ModalInMobile>
        </div>
      </Page>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

SearchPageComponent.defaultProps = {
  authInfoError: null,
  currentUser: null,
  currentUserHasOrders: null,
  listings: [],
  logoutError: null,
  mapListings: [],
  notificationCount: 0,
  pagination: null,
  searchListingsError: null,
  searchParams: {},
  tab: 'listings',
  sendVerificationEmailError: null,
};

const { array, arrayOf, bool, func, instanceOf, number, oneOf, object, shape, string } = PropTypes;

SearchPageComponent.propTypes = {
  authInfoError: instanceOf(Error),
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
  currentUserHasOrders: bool,
  isAuthenticated: bool.isRequired,
  listings: array,
  mapListings: array,
  logoutError: instanceOf(Error),
  notificationCount: number,
  onLogout: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onSearchMapListings: func.isRequired,
  pagination: propTypes.pagination,
  scrollingDisabled: bool.isRequired,
  searchInProgress: bool.isRequired,
  searchListingsError: instanceOf(Error),
  searchParams: object,
  tab: oneOf(['filters', 'listings', 'map']).isRequired,
  sendVerificationEmailInProgress: bool.isRequired,
  sendVerificationEmailError: instanceOf(Error),
  onResendVerificationEmail: func.isRequired,

  // from withFlattenedRoutes
  flattenedRoutes: arrayOf(propTypes.route).isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const {
    currentPageResultIds,
    pagination,
    searchInProgress,
    searchListingsError,
    searchParams,
    searchMapListingIds,
  } = state.SearchPage;
  const { authInfoError, isAuthenticated, logoutError } = state.Auth;
  const {
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    currentUserNotificationCount: notificationCount,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  } = state.user;
  const pageListings = getListingsById(state, currentPageResultIds);
  const mapListings = getListingsById(
    state,
    unionWith(currentPageResultIds, searchMapListingIds, (id1, id2) => id1.uuid === id2.uuid)
  );

  return {
    authInfoError,
    authInProgress: authenticationInProgress(state),
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    isAuthenticated,
    listings: pageListings,
    logoutError,
    mapListings,
    notificationCount,
    pagination,
    scrollingDisabled: isScrollingDisabled(state),
    searchInProgress,
    searchListingsError,
    searchParams,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  };
};

const mapDispatchToProps = dispatch => ({
  onLogout: historyPush => dispatch(logout(historyPush)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onResendVerificationEmail: () => dispatch(sendVerificationEmail()),
  onSearchMapListings: searchParams => dispatch(searchMapListings(searchParams)),
});

const SearchPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl,
  withFlattenedRoutes,
  withRouter
)(SearchPageComponent);

SearchPage.loadData = (params, search) => {
  const queryParams = parse(search, {
    latlng: ['origin'],
    latlngBounds: ['bounds'],
  });
  const page = queryParams.page || 1;
  return searchListings({
    ...queryParams,
    page,
    perPage: RESULT_PAGE_SIZE,
    include: ['author', 'images'],
  });
};

export default SearchPage;
