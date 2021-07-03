import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import { arrayOf, array, bool, func, object, node, oneOfType, shape, string } from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';
import {
  propTypes,
  LISTING_STATE_CLOSED,
  LINE_ITEM_UNITS,
  LINE_ITEM_DAY,
  HOURLY_PRICE,
  DAILY_PRICE,
  WEEKLY_PRICE,
  MONTHLY_PRICE,
} from '../../util/types';
import {
  getTypeDuration,
  getLowestPrice
} from '../../util/data';
import { formatMoney } from '../../util/currency';
import { parse, stringify } from '../../util/urlHelpers';
import config from '../../config';
import { ModalInMobile, Button, BookingTypes } from '../../components';
import { BookingDatesForm, BookingTimeForm } from '../../forms';
import { types as sdkTypes } from '../../util/sdkLoader';


import css from './BookingPanel.module.css';

// This defines when ModalInMobile shows content as Modal
const MODAL_BREAKPOINT = 1023;
const TODAY = new Date();
const { Money } = sdkTypes;

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

const dateFormattingOptions = { month: 'short', day: 'numeric', weekday: 'short' };

const BookingPanel = props => {
  const {
    unitType,
    rootClassName,
    className,
    titleClassName,
    listing,
    isOwnListing,
    onSubmit,
    title,
    subTitle,
    authorDisplayName,
    onManageDisableScrolling,
    onFetchTimeSlots,
    monthlyTimeSlots,
    timeSlots,
    fetchTimeSlotsError,
    history,
    location,
    intl,
    onFetchTransactionLineItems,
    lineItems,
    fetchLineItemsInProgress,
    fetchLineItemsError,
    bookingType,
    toggleBookingType
  } = props;

  const {
    price,
    availabilityPlan,
    state,
    publicData
  } = listing.attributes;

  const { discount, minimumLength } = publicData || {};

  const timeZone = availabilityPlan && availabilityPlan.timezone;
  const isClosed = state && state === LISTING_STATE_CLOSED;
  const showClosedListingHelpText = listing.id && isClosed;
  // const { formattedPrice, priceTitle } = priceData(price, intl);

 const {key: priceType, value: {amount, currency}} = getLowestPrice(listing);

  const { formattedPrice, priceTitle } = priceData(amount && currency ? new Money(amount, currency) : null, intl);
  const unitTranslationKey = `BookingPanel.${priceType}`;
  const isBook = !!parse(location.search).book;

  const showBookingForm = !!state && !isClosed;
  const showBookingTimeForm = showBookingForm && availabilityPlan && bookingType === HOURLY_PRICE;
  const showBookingDatesForm = showBookingForm && availabilityPlan && !showBookingTimeForm;


  // const subTitleMinLengthText = (
  //   showBookingDatesForm &&
  //   minimumLength &&
  //   minimumLength > 1
  // ) ? ` Minimum booking length is ${minimumLength} days.` : '';

  const subTitleText = !!subTitle
    // ? subTitle + subTitleMinLengthText
    ? subTitle
    : showClosedListingHelpText
    ? intl.formatMessage({ id: 'BookingPanel.subTitleClosedListing' })
    : null;

  // let unitTranslationKey = 'BookingPanel.perHour';

  // switch(bookingType){
  //   case DAILY_PRICE:
  //     unitTranslationKey = 'BookingPanel.perDay';
  //     break;
  //   case WEEKLY_PRICE:
  //     unitTranslationKey = 'BookingPanel.perWeek';
  //     break;
  //   case MONTHLY_PRICE:
  //     unitTranslationKey = 'BookingPanel.perMonth';
  //     break;
  // }

  const classes = classNames(rootClassName || css.root, className);
  const titleClasses = classNames(titleClassName || css.bookingTitle);

  const getMinLength = bookingType => {
    switch(bookingType){
      case WEEKLY_PRICE:
        return 7;
      case MONTHLY_PRICE:
        return 30;
      default:
        return null;
    }
  }

  const seats = listing && listing.attributes && listing.attributes.publicData && listing.attributes.publicData.seats || 1;
  const filtTimeSlots = timeSlots => timeSlots && timeSlots.filter(slot => slot.attributes.seats >= seats) || [];

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
          <h1 className={css.title}>{title}</h1>
          <div className={css.author}>
            <FormattedMessage id="BookingPanel.hostedBy" values={{ name: authorDisplayName }} />
          </div>
        </div>

        <div className={css.bookingHeading}>
          <h2 className={titleClasses}>{title}</h2>
          {subTitleText ? <div className={css.bookingHelp}>{subTitleText}</div> : null}
        </div>

        <BookingTypes
          intl={intl}
          listing={listing}
          onChange={toggleBookingType}
        />

        {showBookingDatesForm ? (
          <BookingDatesForm
            key={bookingType}
            className={css.bookingForm}
            formId="BookingPanel"
            submitButtonWrapperClassName={css.bookingDatesSubmitButtonWrapper}
            unitType={unitType}
            minimumLength={getTypeDuration(bookingType)}
            onSubmit={onSubmit}
            price={price}
            discount={discount}
            listingId={listing.id}
            isOwnListing={isOwnListing}
            timeSlots={filtTimeSlots(timeSlots)}
            fetchTimeSlotsError={fetchTimeSlotsError}
            onFetchTransactionLineItems={onFetchTransactionLineItems}
            lineItems={lineItems}
            fetchLineItemsInProgress={fetchLineItemsInProgress}
            fetchLineItemsError={fetchLineItemsError}
            bookingType={bookingType}
          />
        ) : null}

        {showBookingTimeForm ? (
          <BookingTimeForm
            key={bookingType}
            className={css.bookingForm}
            formId="BookingPanel"
            submitButtonWrapperClassName={css.submitButtonWrapper}
            unitType={unitType}
            onSubmit={onSubmit}
            price={price}
            isOwnListing={isOwnListing}
            listingId={listing.id}
            monthlyTimeSlots={monthlyTimeSlots}
            onFetchTimeSlots={onFetchTimeSlots}
            startDatePlaceholder={intl.formatDate(TODAY, dateFormattingOptions)}
            endDatePlaceholder={intl.formatDate(TODAY, dateFormattingOptions)}
            timeZone={timeZone}
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

        {showBookingDatesForm || showBookingTimeForm ? (
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
    </div>
  );
};

BookingPanel.defaultProps = {
  rootClassName: null,
  className: null,
  titleClassName: null,
  isOwnListing: false,
  subTitle: null,
  timeSlots: null,
  fetchTimeSlotsError: null,
  lineItems: null,
  fetchLineItemsError: null,
};

BookingPanel.propTypes = {
  rootClassName: string,
  className: string,
  titleClassName: string,
  listing: oneOfType([propTypes.listing, propTypes.ownListing]),
  isOwnListing: bool,
  onSubmit: func.isRequired,
  title: oneOfType([node, string]).isRequired,
  subTitle: oneOfType([node, string]),
  authorDisplayName: oneOfType([node, string]).isRequired,
  onManageDisableScrolling: func.isRequired,

  onFetchTimeSlots: func.isRequired,
  monthlyTimeSlots: object,


  timeSlots: arrayOf(propTypes.timeSlot),
  fetchTimeSlotsError: propTypes.error,
  onFetchTransactionLineItems: func.isRequired,
  lineItems: array,
  fetchLineItemsInProgress: bool.isRequired,
  fetchLineItemsError: propTypes.error,

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
