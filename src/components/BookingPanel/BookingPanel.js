import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import { arrayOf, bool, func, node, oneOfType, shape, string } from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';
import { propTypes, LISTING_STATE_CLOSED, LINE_ITEM_NIGHT, LINE_ITEM_DAY } from '../../util/types';
import { priceRangeData, priceData } from '../../util/pricing';
import { parse, stringify } from '../../util/urlHelpers';

import config from '../../config';
import { ModalInMobile, Button } from '../../components';
import { BookingDatesForm } from '../../forms';

import css from './BookingPanel.css';

// This defines when ModalInMobile shows content as Modal
const MODAL_BREAKPOINT = 1023;

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
    title,
    subTitle,
    authorDisplayName,
    onManageDisableScrolling,
    timeSlots,
    fetchTimeSlotsError,
    history,
    location,
    intl,
  } = props;

  const { price, publicData = {} } = listing.attributes;

  const { formattedPrice, priceTitle } =
    publicData.products && publicData.products.length ?
    priceRangeData(publicData.products, intl) :
    priceData(price, intl);

  const hasListingState = !!listing.attributes.state;
  const isClosed = hasListingState && listing.attributes.state === LISTING_STATE_CLOSED;
  const showBookingDatesForm = hasListingState && !isClosed;
  const showClosedListingHelpText = listing.id && isClosed;
  const isBook = !!parse(location.search).book;

  const subTitleText = !!subTitle
    ? subTitle
    : showClosedListingHelpText
    ? intl.formatMessage({ id: 'BookingPanel.subTitleClosedListing' })
    : null;

  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;

  const unitTranslationKey = isNightly
    ? 'BookingPanel.perNight'
    : isDaily
    ? 'BookingPanel.perDay'
    : 'BookingPanel.perUnit';

  const classes = classNames(rootClassName || css.root, className);
  const titleClasses = classNames(titleClassName || css.bookingTitle);

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
        {showBookingDatesForm ? (
          <BookingDatesForm
            className={css.bookingForm}
            formId="BookingPanel"
            submitButtonWrapperClassName={css.bookingDatesSubmitButtonWrapper}
            unitType={unitType}
            onSubmit={onSubmit}
            listing={listing}
            isOwnListing={isOwnListing}
            timeSlots={timeSlots}
            fetchTimeSlotsError={fetchTimeSlotsError}
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
        ) : (
          <div className={css.closedListingButton}>
            <FormattedMessage id="BookingPanel.closedListingButtonText" />
          </div>
        )}
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
  unitType: config.bookingUnitType,
  timeSlots: null,
  fetchTimeSlotsError: null,
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
