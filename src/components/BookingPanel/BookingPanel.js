import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import { arrayOf, array, bool, func, node, oneOfType, shape, string } from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';
import { propTypes, LISTING_STATE_CLOSED, LINE_ITEM_NIGHT, LINE_ITEM_DAY } from '../../util/types';
import { formatMoney } from '../../util/currency';
import { parse, stringify } from '../../util/urlHelpers';
import config from '../../config';
import { ModalInMobile, Button } from '../../components';
import { BookingDatesForm } from '../../forms';

import SectionFeatures5Maybe from '../../containers/ListingPage/SectionFeatures5Maybe';
import SectionServicesetup from '../../containers/ListingPage/SectionSerivesetup';
import { findOptionsForSelectFilter } from '../../util/search';
import SectionFeaturesMaybe from '../../containers/ListingPage/SectionFeaturesMaybe';
import SectionFeatures3Maybe from '../../containers/ListingPage/SectionFeatures3Maybe';
import SectionFeatures4Maybe from '../../containers/ListingPage/SectionFeatures4Maybe';
// import SectionFeatures2Maybe from '../../containers/ListingPage/SectionFeatures2Maybe'

import css from './BookingPanel.module.css';
import SectionFeatures6Maybe from '../../containers/ListingPage/SectionFeatures6Maybe';

// This defines when ModalInMobile shows content as Modal
const MODAL_BREAKPOINT = 1023;

const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: `(${price.currency})`,
      priceTitle: `Unsupported currency (${price.currency})`,
    };
  }
  return {};
};

const openBookModal = (isOwnListing, isClosed, history, location) => {
  if (isOwnListing || isClosed) {
    window.scrollTo(0, 0);
  } else {
    const { pathname, search, state } = location;
    const searchString = `?${stringify({ ...parse(search), book: true })}`;
    history.push(`${pathname}${searchString}`, state);
  }
};

const closeBookModal = (history, location) => {
  const { pathname, search, state } = location;
  const searchParams = omit(parse(search), 'book');
  const searchString = `?${stringify(searchParams)}`;
  history.push(`${pathname}${searchString}`, state);
};

const BookingPanel = props => {
  const {
    rootClassName,
    className,
    titleClassName,
    listing,
    isOwnListing,
    unitType,
    onSubmit,
    search,
    authorDisplayName,
    onManageDisableScrolling,
    timeSlots,
    fetchTimeSlotsError,
    history,
    location,
    intl,
    hostLink,
    firstname,
    filterConfig,
    onFetchTransactionLineItems,
    lineItems,
    fetchLineItemsInProgress,
    fetchLineItemsError,
    dayUnitType,
  } = props;

  const { price, publicData } = listing.attributes || {};

  const hasListingState = !!listing.attributes.state;
  const isClosed = hasListingState && listing.attributes.state === LISTING_STATE_CLOSED;
  const showBookingDatesForm = hasListingState && !isClosed;
  // const showClosedListingHelpText = listing.id && isClosed;
  const { formattedPrice, priceTitle } = priceData(price, intl);
  const isBook = !!parse(location.search).book;

  // const letofstay = listing.attributes.publicData.lengthOfStays;
  const numberPet = listing?.attributes?.publicData?.numberOfPets;

  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;

  const unitTranslationKey = isNightly
    ? 'BookingPanel.perNight'
    : isDaily
      ? 'BookingPanel.perDay'
      : 'BookingPanel.perUnit';

  const classes = classNames(rootClassName || css.root, className);
  const titleClasses = classNames(titleClassName || css.bookingTitle);

  const amenityOptions = findOptionsForSelectFilter('typeOfPets', filterConfig);
  // const amenityOptions2 = findOptionsForSelectFilter('numberOfPets', filterConfig);
  const amenityOptions3 = findOptionsForSelectFilter('sizeOfdogs', filterConfig);
  const amenityOptions4 = findOptionsForSelectFilter('housingConditions', filterConfig);
  const amenityOptions5 = findOptionsForSelectFilter('petInHome', filterConfig);
  const amenityOptions7 = findOptionsForSelectFilter('policeCheck', filterConfig);
  const amenityOptions6 = findOptionsForSelectFilter('serviceSetup', filterConfig);
  const selectedOptions = publicData && publicData.numberOfPets ? publicData.numberOfPets : [];

  return (
    <div className={classes}>
      <ModalInMobile
        containerClassName={css.modalContainer}
        id="BookingDatesFormInModal"
        isModalOpenOnMobile={isBook}
        onClose={() => closeBookModal(history, location)}
        showAsModalMaxWidth={MODAL_BREAKPOINT}
        onManageDisableScrolling={onManageDisableScrolling}
      >
        <div className={css.modalHeading}>
          <h1 className={css.title}>{hostLink}</h1>
          <div className={css.author}>
            <FormattedMessage id="BookingPanel.hostedBy" values={{ name: authorDisplayName }} />
          </div>
        </div>

        <div className={css.bookingHeading}>
          <h2 className={titleClasses}>{hostLink}</h2>
        </div>
        {showBookingDatesForm ? (
          <BookingDatesForm
            className={css.bookingForm}
            formId="BookingPanel"
            submitButtonWrapperClassName={css.bookingDatesSubmitButtonWrapper}
            unitType={unitType}
            dayUnitType={dayUnitType}
            onSubmit={onSubmit}
            numberPet={numberPet}
            price={price}
            initialValues={{
              serviceSetup: search?.pub_serviceSetup?search.pub_serviceSetup:null,
              numberOfPets: search?.pub_numberOfPets?search.pub_numberOfPets:null
            }}
            listing={listing}
            firstname={firstname}
            listingId={listing.id}
            isOwnListing={isOwnListing}
            timeSlots={timeSlots}
            fetchTimeSlotsError={fetchTimeSlotsError}
            onFetchTransactionLineItems={onFetchTransactionLineItems}
            lineItems={lineItems}
            fetchLineItemsInProgress={fetchLineItemsInProgress}
            fetchLineItemsError={fetchLineItemsError}
          />
        ) : null}
      </ModalInMobile>
      <div className={css.openBookingForm}>
        <div className={css.priceContainer}>
          <div className={css.priceValue} title={priceTitle}>
            {formattedPrice}
          </div>
          <div className={css.perUnit}>
            <FormattedMessage id={unitTranslationKey} />
          </div>
        </div>

        {showBookingDatesForm ? (
          <Button
            rootClassName={css.bookButton}
            onClick={() => openBookModal(isOwnListing, isClosed, history, location)}
          >
            <FormattedMessage id="BookingPanel.ctaButtonMessage" />
          </Button>
        ) : isClosed ? (
          <div className={css.closedListingButton}>
            <FormattedMessage id="BookingPanel.closedListingButtonText" />
          </div>
        ) : null}
      </div>

      <SectionServicesetup options={amenityOptions6} publicData={publicData} />
      <SectionFeaturesMaybe options={amenityOptions} publicData={publicData} />

      <div className={css.pricingBox}>
        <div className={css.pricingHeading}>
          <FormattedMessage id="ListingPage.featuresnumberpet" values={{ name: hostLink }} />
        </div>
        <div className={css.countOption}> {selectedOptions}</div>
      </div>
      <SectionFeatures6Maybe options={amenityOptions7} publicData={publicData} />
      {amenityOptions3 ?
        <SectionFeatures3Maybe options={amenityOptions3} publicData={publicData} />
        : null
      }
      <SectionFeatures4Maybe options={amenityOptions4} publicData={publicData} />
      <SectionFeatures5Maybe options={amenityOptions5} publicData={publicData} />
     
    </div>
  );
};

BookingPanel.defaultProps = {
  rootClassName: null,
  className: null,
  titleClassName: null,
  isOwnListing: false,
  subTitle: null,
  unitType: config.bookingUnitType,
  timeSlots: null,
  fetchTimeSlotsError: null,
  lineItems: null,
  fetchLineItemsError: null,
  filterConfig: config.custom.filters,
};

BookingPanel.propTypes = {
  rootClassName: string,
  className: string,
  titleClassName: string,
  listing: oneOfType([propTypes.listing, propTypes.ownListing]),
  isOwnListing: bool,
  unitType: propTypes.bookingUnitType,
  onSubmit: func.isRequired,
  title: oneOfType([node, string]).isRequired,
  subTitle: oneOfType([node, string]),
  authorDisplayName: oneOfType([node, string]).isRequired,
  onManageDisableScrolling: func.isRequired,
  timeSlots: arrayOf(propTypes.timeSlot),
  fetchTimeSlotsError: propTypes.error,
  onFetchTransactionLineItems: func.isRequired,
  lineItems: array,
  fetchLineItemsInProgress: bool.isRequired,
  fetchLineItemsError: propTypes.error,
  filterConfig: array,
  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default compose(
  withRouter,
  injectIntl
)(BookingPanel);