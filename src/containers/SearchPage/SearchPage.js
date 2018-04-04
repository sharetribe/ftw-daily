import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { debounce, isEqual, unionWith } from 'lodash';
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
import { SearchMap, ModalInMobile, Page } from '../../components';
import { TopbarContainer } from '../../containers';

import { searchListings, searchMapListings, setActiveListing } from './SearchPage.duck';
import {
  pickSearchParamsOnly,
  validURLParamForExtendedData,
  validURLParamsForExtendedData,
} from './SearchPage.helpers';
import MainPanel from './MainPanel';
import css from './SearchPage.css';

// Pagination page size might need to be dynamic on responsive page layouts
// Current design has max 3 columns 12 is divisible by 2 and 3
// So, there's enough cards to fill all columns on full pagination pages
const RESULT_PAGE_SIZE = 24;
const MODAL_BREAKPOINT = 768; // Search is in modal on mobile layout
const SEARCH_WITH_MAP_DEBOUNCE = 300; // Little bit of debounce before search is initiated.
const BOUNDS_FIXED_PRECISION = 8;

const CATEGORY_URL_PARAM = 'pub_category';
const AMENITIES_URL_PARAM = 'pub_amenities';

const customURLParamToConfig = {
  [CATEGORY_URL_PARAM]: 'categories',
  [AMENITIES_URL_PARAM]: 'amenities',
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
    // So, if the search comes from location search input (this.viewportBounds == null),
    // we need to by pass extra searches created by Google Map's 'indle' event.
    // This is done by keeping track of map's viewport bounds (which differ from location bounds)
    this.viewportBounds = null;
    this.modalOpenedBoundsChange = false;
    this.searchMapListingsInProgress = false;

    this.onIdle = debounce(this.onIdle.bind(this), SEARCH_WITH_MAP_DEBOUNCE);
    this.onOpenMobileModal = this.onOpenMobileModal.bind(this);
    this.onCloseMobileModal = this.onCloseMobileModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.location, nextProps.location)) {
      // If no mapSearch url parameter is given, this is original location search
      const { mapSearch } = parse(nextProps.location.search, {
        latlng: ['origin'],
        latlngBounds: ['bounds'],
      });
      if (!mapSearch) {
        this.viewportBounds = null;
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

    // ViewportBounds from (previous) rendering differ from viewportBounds currently set to map
    // I.e. user has changed the map somehow: moved, panned, zoomed, resized
    const viewportBoundsChanged =
      this.viewportBounds && !hasSameSDKBounds(this.viewportBounds, viewportBounds);

    // If mapSearch url param is given (and we have not just opened mobile map modal)
    // or original location search is rendered once,
    // we start to react to 'bounds_changed' event by generating new searches
    if (viewportBoundsChanged && !this.modalOpenedBoundsChange) {
      const originMaybe = config.sortSearchByDistance
        ? { origin: googleLatLngToSDKLatLng(viewportGMapBounds.getCenter()) }
        : {};
      const searchParams = {
        address,
        ...originMaybe,
        bounds: viewportBounds,
        country,
        mapSearch: true,
        ...validURLParamForExtendedData(CATEGORY_URL_PARAM, rest, customURLParamToConfig),
        ...validURLParamForExtendedData(AMENITIES_URL_PARAM, rest, customURLParamToConfig),
      };
      this.viewportBounds = viewportBounds;
      history.push(
        createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParams)
      );
    } else {
      this.viewportBounds = viewportBounds;
      this.modalOpenedBoundsChange = false;
    }
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
      amenities,
      activeListingId,
      onActivateListing,
    } = this.props;
    // eslint-disable-next-line no-unused-vars
    const { mapSearch, page, ...searchInURL } = parse(location.search, {
      latlng: ['origin'],
      latlngBounds: ['bounds'],
    });

    // urlQueryParams doesn't contain page specific url params
    // like mapSearch, page or origin (origin depends on config.sortSearchByDistance)
    const urlQueryParams = pickSearchParamsOnly(
      searchInURL,
      [AMENITIES_URL_PARAM, CATEGORY_URL_PARAM],
      customURLParamToConfig
    );

    // Page transition might initially use values from previous search
    const urlQueryString = stringify(urlQueryParams);
    const paramsQueryString = stringify(
      pickSearchParamsOnly(
        searchParams,
        [AMENITIES_URL_PARAM, CATEGORY_URL_PARAM],
        customURLParamToConfig
      )
    );
    const { address, bounds, origin } = searchInURL || {};

    const searchParamsAreInSync = urlQueryString === paramsQueryString;

    const validQueryParams = validURLParamsForExtendedData(
      searchInURL,
      [AMENITIES_URL_PARAM, CATEGORY_URL_PARAM],
      customURLParamToConfig
    );

    const searchMap = (
      <SearchMap
        activeListingId={activeListingId}
        bounds={bounds}
        center={origin}
        listings={mapListings || []}
        onIdle={this.onIdle}
        isOpenOnModal={this.state.isSearchMapOpenOnMobile}
        onCloseAsModal={() => {
          onManageDisableScrolling('SearchPage.map', false);
        }}
        useLocationSearchBounds={!this.viewportBounds}
      />
    );
    const showSearchMapInMobile = this.state.isSearchMapOpenOnMobile ? searchMap : null;
    const isWindowDefined = typeof window !== 'undefined';
    const searchMapMaybe =
      isWindowDefined && window.innerWidth < MODAL_BREAKPOINT ? showSearchMapInMobile : searchMap;

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
        <TopbarContainer
          className={topbarClasses}
          currentPage="SearchPage"
          currentSearchParams={urlQueryParams}
        />
        <div className={css.container}>
          <MainPanel
            urlQueryParams={validQueryParams}
            listings={listings}
            searchInProgress={searchInProgress}
            searchListingsError={searchListingsError}
            searchParamsAreInSync={searchParamsAreInSync}
            onActivateListing={onActivateListing}
            onManageDisableScrolling={onManageDisableScrolling}
            onMapIconClick={onMapIconClick}
            pagination={pagination}
            searchParamsForPagination={parse(location.search)}
            showAsModalMaxWidth={MODAL_BREAKPOINT}
            customURLParamToConfig={customURLParamToConfig}
            primaryFilters={{ amenities, categories }}
            secondaryFilters={{ amenities, categories }}
          />
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
  amenities: config.custom.amenities,
  activeListingId: null,
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
  amenities: array,

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
    activeListingId,
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
    activeListingId,
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onSearchMapListings: searchParams => dispatch(searchMapListings(searchParams)),
  onActivateListing: listingId => dispatch(setActiveListing(listingId)),
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
  const { page = 1, address, country, origin, ...rest } = queryParams;
  const originMaybe = config.sortSearchByDistance && origin ? { origin } : {};
  return searchListings({
    ...rest,
    ...originMaybe,
    page,
    perPage: RESULT_PAGE_SIZE,
    include: ['author', 'images'],
    'fields.image': ['variants.landscape-crop', 'variants.landscape-crop2x'],
    'limit.images': 1,
  });
};

export default SearchPage;
