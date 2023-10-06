import React, { useState } from 'react';
import { arrayOf, bool, func, node, number, object, shape, string } from 'prop-types';
import classNames from 'classnames';
import Field, { hasDataInFields } from '../../Field';
import BlockBuilder from '../../BlockBuilder';
import SectionContainer from '../SectionContainer';
import css from './SectionColumns.module.css';
import { Button, IconCard, PrimaryButton } from '../../../../components';
import MainPanel from '../../../SearchPage/MainPanel';
import { parse, stringify } from '../../../../util/urlHelpers';
import config from '../../../../config';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { connect } from 'react-redux';
import { pickSearchParamsOnly, validURLParamsForExtendedData } from '../../../SearchPage/SearchPage.helpers';
import { getListingsById } from '../../../../ducks/marketplaceData.duck';
import { setActiveListing } from '../../../SearchPage/SearchPage.duck';
import MainPanelLandingPage from '../../../SearchPage/MainPanelLandingpage';

// The number of columns (numColumns) affects styling and responsive images
const COLUMN_CONFIG = [
  { css: css.oneColumn, responsiveImageSizes: '(max-width: 767px) 100vw, 1200px' },
  { css: css.twoColumns, responsiveImageSizes: '(max-width: 767px) 100vw, 600px' },
  { css: css.threeColumns, responsiveImageSizes: '(max-width: 767px) 100vw, 400px' },
  { css: css.fourColumns, responsiveImageSizes: '(max-width: 767px) 100vw, 265px' },
];
const getIndex = numColumns => numColumns - 1;
const getColumnCSS = numColumns => {
  const config = COLUMN_CONFIG[getIndex(numColumns)];
  return config ? config.css : COLUMN_CONFIG[0].css;
};
const getResponsiveImageSizes = numColumns => {
  const config = COLUMN_CONFIG[getIndex(numColumns)];
  return config ? config.responsiveImageSizes : COLUMN_CONFIG[0].responsiveImageSizes;
};

// Section component that's able to show blocks in multiple different columns (defined by "numColumns" prop)
const SectionColumnsComponent = props => {
  const {
    sectionId,
    className,
    rootClassName,
    defaultClasses,
    numColumns,
    title,
    description,
    appearance,
    callToAction,
    blocks,
    isInsideContainer,
    options,
    sortConfig,
    filterConfig, currentPageResultIds,
    pagination,
    searchInProgress,
    searchListingsError,
    searchParams,
    listings,
    searchMapListingIds,
    activeListingId,
    location, history,
    onActivateListing

  } = props;

  
  const [toggle, setToggle] = useState(false);

  const handleToggleState = () => {
    setToggle(prev => !prev);
    onShowMap()
  };
  // If external mapping has been included for fields
  // E.g. { h1: { component: MyAwesomeHeader } }
  const fieldComponents = options?.fieldComponents;
  const fieldOptions = { fieldComponents };

  const hasHeaderFields = hasDataInFields([title, description, callToAction], fieldOptions);
  const hasBlocks = blocks?.length > 0;

  const [onOpenMobile, setonOpenMobileModal] = useState(false)

  const onOpenMobileModal = () => {
    setonOpenMobileModal(true);
  }
  const { mapSearch, page, ...searchInURL } = parse(location.search, {
    latlng: ['origin'],
    latlngBounds: ['bounds'],
  });

  const onMapIconClick = () => {
    this.useLocationSearchBounds = true;
    this.setState({ isSearchMapOpenOnMobile: true });
  };
  const urlQueryParams = pickSearchParamsOnly(searchInURL, filterConfig, sortConfig);
  const validQueryParams = validURLParamsForExtendedData(searchInURL, filterConfig);

  // const pageMetaProps = getMetadata(meta, schemaType, options?.fieldComponents);
  const urlQueryString = stringify(urlQueryParams);
  const paramsQueryString = stringify(
    pickSearchParamsOnly(searchParams, filterConfig, sortConfig)
  );
  const searchParamsAreInSync = urlQueryString === paramsQueryString;
  return (
    <SectionContainer
      id={sectionId}
      className={className}
      rootClassName={rootClassName}
      appearance={appearance}
      options={fieldOptions}
      sectionId={sectionId}
    >
      {hasHeaderFields ? (
        <header className={defaultClasses.sectionDetails}>
          <Field data={title} className={
            sectionId == "featured-locations" ? css.headingServices :
              sectionId == "petcrib-work" ? css.headingServices :
                defaultClasses.title}
            options={fieldOptions}
          />
          <Field data={description} className={defaultClasses.description} options={fieldOptions} />
          <Field data={callToAction} className={defaultClasses.ctaButton} options={fieldOptions} />
        </header>
      ) : null}
      {hasBlocks ? (
        <div
          className={classNames(
            sectionId == "petcrib-work" ? css.petGrid :
              sectionId == "intro" ? css.introSection :
                sectionId == "featured-locations" ? css.serviceGrid :
                  defaultClasses.blockContainer, getColumnCSS(numColumns),
            { [css.noSidePaddings]: isInsideContainer, })}
        >
          <BlockBuilder
            ctaButtonClass={defaultClasses.ctaButton}
            blocks={blocks}
            responsiveImageSizes={getResponsiveImageSizes(numColumns)}
            options={options}
          />
          {sectionId == "intro" ?
            <div className={css.searchBox}>
              <MainPanelLandingPage
                isSelect={true}
                isDateSelect={true}
                className={css.filterSearch}
                urlQueryParams={validQueryParams}
                //listings={listings}
                searchInProgress={searchInProgress}
                searchListingsError={searchListingsError}
                searchParamsAreInSync={searchParamsAreInSync}
                onActivateListing={onActivateListing}
                onManageDisableScrolling={() => { }}
                onOpenModal={onOpenMobileModal}
                onCloseModal={() => {
                  setonOpenMobileModal(false)
                }}
                onMapIconClick={() => {
                  onMapIconClick
                }}
                pagination={pagination}
                searchParamsForPagination={parse(location.search)}
                
                history={history}
              />
            </div>
            : null}
        </div>
      ) : null}
    </SectionContainer>
  );
};

const propTypeOption = shape({
  fieldComponents: shape({ component: node, pickValidProps: func }),
});

SectionColumnsComponent.defaultProps = {
  className: null,
  rootClassName: null,
  defaultClasses: null,
  textClassName: null,
  numColumns: 1,
  title: null,
  description: null,
  appearance: null,
  callToAction: null,
  blocks: [],
  isInsideContainer: false,
  options: null,
  filterConfig: config.custom.filters,
  sortConfig: config.custom.sortConfig,
};

SectionColumnsComponent.propTypes = {
  sectionId: string.isRequired,
  className: string,

  rootClassName: string,
  defaultClasses: shape({
    sectionDetails: string,
    title: string,
    description: string,
    ctaButton: string,
  }),
  numColumns: number,
  title: object,
  description: object,
  appearance: object,
  callToAction: object,
  blocks: arrayOf(object),
  isInsideContainer: bool,

  options: propTypeOption,



  location: shape({
    search: string.isRequired,
  }).isRequired,
  history: shape({
    push: func.isRequired,
  }).isRequired,
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
  return {
    listings: pageListings,
    pagination,
    searchInProgress,
    searchListingsError,
    searchParams,
    searchMapListingIds,
    activeListingId,
  };
};
const mapDispatchToProps = dispatch => ({
  // onManageDisableScrolling: (componentId, disableScrolling) =>
  //   dispatch(manageDisableScrolling(componentId, disableScrolling)),
  // onSearchMapListings: searchParams => dispatch(searchMapListings(searchParams)),
  onActivateListing: listingId => dispatch(setActiveListing(listingId)),
});

const SectionColumns = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(SectionColumnsComponent);
export default SectionColumns;
