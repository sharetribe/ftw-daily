import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { InlineTextButton, ReviewRating } from '../../components';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY } from '../../util/types';
import config from '../../config';

import css from './ListingPage.module.css';
import SectionReviews from './SectionReviews';
import SectionReviewsheading from './SectionReviewsHeading';

const SectionHeading = props => {
  const {
    priceTitle,
    formattedPrice,
    richTitle,
    category,
    hostLink,
    showContactUser,
    onContactUser,
    reviews,
    ratings,
    totalbooking,
    fetchReviewsError,
    yourself,
  } = props;


  const unitType = config.bookingUnitType;
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;

  const unitTranslationKey = isNightly
    ? 'ListingPage.perNight'
    : isDaily
      ? 'ListingPage.perDay'
      : 'ListingPage.perUnit';

  return (
    <div className={css.sectionHeading}>
      <div className={css.desktopPriceContainer}>
        <div className={css.desktopPriceValue} title={priceTitle}>
          {formattedPrice}
        </div>
        <div className={css.desktopPerUnit}>
          <FormattedMessage id={unitTranslationKey} />
        </div>
      </div>
      <div className={css.heading}>
        <h1 className={css.title}>{hostLink}</h1>
        <div className={css.author}>
          {category}
          {/* <FormattedMessage id="ListingPage.hostedBy" values={{ name: hostLink }} /> */}
          <p className={css.yourSelfText}>{yourself}</p>

          <div className={css.reviewBookingRow}>
           
            {/* <SectionReviews reviews={reviews} fetchReviewsError={fetchReviewsError} /> */}
            <div className={css.numberBooking}>
              <p>{totalbooking?.length} Bookings </p>
            </div>
            <div className={css.reviewBox}>
              <SectionReviewsheading reviews={reviews} fetchReviewsError={fetchReviewsError} />
            </div>
            {ratings ?
              <div className={css.ratingStar}>
                <ReviewRating
                  rating={ratings}
                  reviewStarClassName={css.reviewRatingStar}
                />
              </div>
              : null}
          </div>


          {showContactUser ? (
            <span className={css.contactWrapper}>
              <span className={css.separator}>•</span>
              <InlineTextButton
                rootClassName={css.contactLink}
                onClick={onContactUser}
                enforcePagePreloadFor="SignupPage"
              >
                <FormattedMessage id="ListingPage.contactUser" />
              </InlineTextButton>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SectionHeading;
