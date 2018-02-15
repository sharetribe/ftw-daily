import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { debounce, intersection, isEqual, unionWith } from 'lodash';
import classNames from 'classnames';
import config from '../../config';
import routeConfiguration from '../../routeConfiguration';
import {
  googleLatLngToSDKLatLng,
  googleBoundsToSDKBounds,
  sdkBoundsToFixedCoordinates,
  hasSameSDKBounds,
} from '../../util/googleMaps';
import { createResourceLocatorString } from '../../util/routes';
import { createSlug, parse, stringify } from '../../util/urlHelpers';
import { propTypes } from '../../util/types';
import { getListingsById } from '../../ducks/marketplaceData.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import {
  SearchMap,
  ModalInMobile,
  Page,
  SearchResultsPanel,
  SearchFilters,
  SearchFiltersMobile,
} from '../../components';
import { TopbarContainer } from '../../containers';
import { searchListings, searchMapListings } from './SearchPage.duck';

import css from './SearchPage.css';

// Pagination page size might need to be dynamic on responsive page layouts
// Current design has max 3 columns 12 is divisible by 2 and 3
// So, there's enough cards to fill all columns on full pagination pages
const RESULT_PAGE_SIZE = 12;
const SHARETRIBE_API_MAX_PAGE_SIZE = 100;
const MAX_SEARCH_RESULT_PAGES_ON_MAP = 5; // 100 * 5 = 500 listings are shown on a map.
const MODAL_BREAKPOINT = 768; // Search is in modal on mobile layout
const SEARCH_WITH_MAP_DEBOUNCE = 300; // Little bit of debounce before search is initiated.
const BOUNDS_FIXED_PRECISION = 8;

const CATEGORY_URL_PARAM = 'pub_category';
const AMENITIES_URL_PARAM = 'pub_amenities';

// Find correct extended data key from config.custom
// e.g. 'pub_category' -> 'categories'.
const customConfigKey = paramKey => {
  switch (paramKey) {
    case CATEGORY_URL_PARAM:
      return 'categories';
    case AMENITIES_URL_PARAM:
      return 'amenities';
    default:
      return null;
  }
};

const validURLParamForExtendedData = (paramKey, urlParams) => {
  const configKey = customConfigKey(paramKey);
  const value = urlParams[paramKey];
  const valueArray = value ? value.split(',') : [];

  if (configKey && valueArray.length > 0) {
    const allowedValues = config.custom[configKey].map(a => a.key);
    const validValues = intersection(valueArray, allowedValues).join(',');
    return validValues.length > 0 ? { [paramKey]: validValues } : {};
  }
  return {};
};

// extract search parameters, including a custom attribute named category
const pickSearchParamsOnly = params => {
  const { address, origin, bounds, ...rest } = params || {};
  return {
    address,
    origin,
    bounds,
    ...validURLParamForExtendedData(CATEGORY_URL_PARAM, rest),
    ...validURLParamForExtendedData(AMENITIES_URL_PARAM, rest),
  };
};

export class SearchPageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearchMapOpenOnMobile: props.tab === 'map',
      isMobileModalOpen: false,
    };

    // Initiating map creates 'bounds_changes' event
    // we listen to that event to make new searches
    // So, if the search comes from location search input,
    // we need to by pass 2nd search created by initial 'bounds_changes' event
    this.locationInputSearch = true;
    this.modalOpenedBoundsChange = false;
    this.searchMapListingsInProgress = false;

    this.onIdle = debounce(this.onIdle.bind(this), SEARCH_WITH_MAP_DEBOUNCE);
    this.fetchMoreListingsToMap = this.fetchMoreListingsToMap.bind(this);
    this.onOpenMobileModal = this.onOpenMobileModal.bind(this);
    this.onCloseMobileModal = this.onCloseMobileModal.bind(this);
  }

  componentDidMount() {
    this.fetchMoreListingsToMap(this.props.location);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.location, nextProps.location)) {
      this.fetchMoreListingsToMap(nextProps.location);

      // If no mapSearch url parameter is given, this is original location search
      const { mapSearch } = parse(nextProps.location.search, {
        latlng: ['origin'],
        latlngBounds: ['bounds'],
      });
      if (!mapSearch) {
        this.locationInputSearch = true;
      }
    }
  }

  // We are using Google Maps idle event instead of bounds_changed, since it will not be fired
  // too often (in the middle of map's pan or zoom activity)
  onIdle(googleMap) {
    const { history, location } = this.props;

    // parse query parameters, including a custom attribute named category
    const { address, country, bounds, mapSearch, ...rest } = parse(location.search, {
      latlng: ['origin'],
      latlngBounds: ['bounds'],
    });

    const viewportGMapBounds = googleMap.getBounds();
    const viewportBounds = sdkBoundsToFixedCoordinates(
      googleBoundsToSDKBounds(viewportGMapBounds),
      BOUNDS_FIXED_PRECISION
    );
    const boundsChanged = !hasSameSDKBounds(viewportBounds, bounds);
    const isRealMapSearch = mapSearch && !this.modalOpenedBoundsChange;

    // If mapSearch url param is given (and we have not just opened mobile map modal)
    // or original location search is rendered once,
    // we start to react to 'bounds_changed' event by generating new searches
    if (boundsChanged && (isRealMapSearch || !this.locationInputSearch)) {
      const origin = googleLatLngToSDKLatLng(viewportGMapBounds.getCenter());
      const searchParams = {
        address,
        origin,
        bounds: viewportBounds,
        country,
        mapSearch: true,
        ...validURLParamForExtendedData(CATEGORY_URL_PARAM, rest),
        ...validURLParamForExtendedData(AMENITIES_URL_PARAM, rest),
      };
      history.push(
        createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParams)
      );
    } else {
      this.locationInputSearch = false;
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
        const hasNextPage =
          page < response.data.meta.totalPages && page < MAX_SEARCH_RESULT_PAGES_ON_MAP;
        if (hasNextPage) {
          onSearchMapListings({ ...searchParamsForMapResults, page: page + 1 });
        } else {
          this.searchMapListingsInProgress = false;
        }
      })
      .catch(error => {
        // In case of error, stop recursive loop and report error.
        // TODO: Show and error in the listings column
        // eslint-disable-next-line no-console
        console.error(`An error (${error} occured while trying to retrieve map listings`);
      });
  }

  // Invoked when a modal is opened from a child component,
  // for example when a filter modal is opened in mobile view
  onOpenMobileModal() {
    this.setState({ isMobileModalOpen: true });
  }

  // Invoked when a modal is closed from a child component,
  // for example when a filter modal is opened in mobile view
  onCloseMobileModal() {
    this.setState({ isMobileModalOpen: false });
  }

  render() {
    const {
      intl,
      listings,
      location,
      mapListings,
      onManageDisableScrolling,
      pagination,
      scrollingDisabled,
      searchInProgress,
      searchListingsError,
      searchParams,
      categories,
      features,
    } = this.props;
    // eslint-disable-next-line no-unused-vars
    const { mapSearch, page, ...searchInURL } = parse(location.search, {
      latlng: ['origin'],
      latlngBounds: ['bounds'],
    });

    const urlQueryParams = pickSearchParamsOnly(searchInURL);

    // Page transition might initially use values from previous search
    const urlQueryString = stringify(urlQueryParams);
    const paramsQueryString = stringify(pickSearchParamsOnly(searchParams));
    const searchParamsMatch = urlQueryString === paramsQueryString;

    const { address, bounds, origin } = searchInURL || {};

    const hasPaginationInfo = !!pagination && pagination.totalItems != null;
    const totalItems = searchParamsMatch && hasPaginationInfo ? pagination.totalItems : 0;
    const listingsAreLoaded = !searchInProgress && searchParamsMatch && hasPaginationInfo;

    const searchError = (
      <h2 className={css.error}>
        <FormattedMessage id="SearchPage.searchError" />
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
        useLocationSearchBounds={this.locationInputSearch}
      />
    );
    const showSearchMapInMobile = this.state.isSearchMapOpenOnMobile ? searchMap : null;
    const isWindowDefined = typeof window !== 'undefined';
    const searchMapMaybe =
      isWindowDefined && window.innerWidth < MODAL_BREAKPOINT ? showSearchMapInMobile : searchMap;

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
      const pathToItem = createResourceLocatorString('ListingPage', routeConfiguration(), {
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

    const onMapIconClick = () => {
      this.useLocationSearchBounds = true;
      this.modalOpenedBoundsChange = true;
      this.setState({ isSearchMapOpenOnMobile: true });
    };

    // Set topbar class based on if a modal is open in
    // a child component
    const topbarClasses = this.state.isMobileModalOpen
      ? classNames(css.topbarBehindModal, css.topbar)
      : css.topbar;

    // N.B. openMobileMap button is sticky.
    // For some reason, stickyness doesn't work on Safari, if the element is <button>
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <Page
        scrollingDisabled={scrollingDisabled}
        description={schemaDescription}
        title={schemaTitle}
        schema={{
          '@context': 'http://schema.org',
          '@type': 'SearchResultsPage',
          description: schemaDescription,
          name: schemaTitle,
          mainEntity: [schemaMainEntity],
        }}
      >
        <TopbarContainer className={topbarClasses} />
        <div className={css.container}>
          <div className={css.searchResultContainer}>
            <SearchFilters
              className={css.searchFilters}
              urlQueryParams={urlQueryParams}
              listingsAreLoaded={listingsAreLoaded}
              resultsCount={totalItems}
              searchInProgress={searchInProgress}
              searchListingsError={searchListingsError}
              onMapIconClick={onMapIconClick}
              onManageDisableScrolling={onManageDisableScrolling}
              categories={categories}
              features={features}
            />
            <SearchFiltersMobile
              className={css.searchFiltersMobile}
              urlQueryParams={urlQueryParams}
              listingsAreLoaded={listingsAreLoaded}
              resultsCount={totalItems}
              searchInProgress={searchInProgress}
              searchListingsError={searchListingsError}
              showAsModalMaxWidth={MODAL_BREAKPOINT}
              onMapIconClick={onMapIconClick}
              onManageDisableScrolling={onManageDisableScrolling}
              onOpenModal={this.onOpenMobileModal}
              onCloseModal={this.onCloseMobileModal}
              categories={categories}
              features={features}
            />
            <div
              className={classNames(css.listings, {
                [css.newSearchInProgress]: !listingsAreLoaded,
              })}
            >
              {searchListingsError ? searchError : null}

              <SearchResultsPanel
                className={css.searchListingsPanel}
                listings={listings}
                pagination={listingsAreLoaded ? pagination : null}
                search={searchParamsForPagination}
              />
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
            <div className={css.map}>{searchMapMaybe}</div>
          </ModalInMobile>
        </div>
      </Page>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

SearchPageComponent.defaultProps = {
  listings: [],
  mapListings: [],
  pagination: null,
  searchListingsError: null,
  searchParams: {},
  tab: 'listings',
  categories: config.custom.categories,
  features: config.custom.amenities,
};

const { array, bool, func, oneOf, object, shape, string } = PropTypes;

SearchPageComponent.propTypes = {
  listings: array,
  mapListings: array,
  onManageDisableScrolling: func.isRequired,
  onSearchMapListings: func.isRequired,
  pagination: propTypes.pagination,
  scrollingDisabled: bool.isRequired,
  searchInProgress: bool.isRequired,
  searchListingsError: propTypes.error,
  searchParams: object,
  tab: oneOf(['filters', 'listings', 'map']).isRequired,
  categories: array,
  features: array,

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
  const pageListings = getListingsById(state, currentPageResultIds);
  const mapListings = getListingsById(
    state,
    unionWith(currentPageResultIds, searchMapListingIds, (id1, id2) => id1.uuid === id2.uuid)
  );

  return {
    listings: pageListings,
    mapListings,
    pagination,
    scrollingDisabled: isScrollingDisabled(state),
    searchInProgress,
    searchListingsError,
    searchParams,
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onSearchMapListings: searchParams => dispatch(searchMapListings(searchParams)),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const SearchPage = compose(withRouter, connect(mapStateToProps, mapDispatchToProps), injectIntl)(
  SearchPageComponent
);

SearchPage.loadData = (params, search) => {
  const queryParams = parse(search, {
    latlng: ['origin'],
    latlngBounds: ['bounds'],
  });
  const { page = 1, ...rest } = queryParams;
  return searchListings({
    ...rest,
    page,
    perPage: RESULT_PAGE_SIZE,
    include: ['author', 'images'],
  });
};

export default SearchPage;
