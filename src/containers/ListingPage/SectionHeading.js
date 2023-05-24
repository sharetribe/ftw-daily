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
    category,
    hostLink,
    showContactUser,
    onContactUser,
    reviews,
    ratings,
    totalbooking,
    id,
    fetchReviewsError,
    yourself,
    currentUser,
    favoriteData,
    isOwnListing,
  } = props;



  const unitType = config.bookingUnitType;
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;

  const unitTranslationKey = isNightly
    ? 'ListingPage.perNight'
    : isDaily
      ? 'ListingPage.perDay'
      : 'ListingPage.perUnit';

  const favorite =
    currentUser?.attributes?.profile.protectedData?.favorite || [];


  const handleClick = e => {
    e.preventDefault();
    if (favorite.findIndex(i => i === id) > -1) {
      favorite.splice(
        favorite.findIndex(i => i === id),
        1
      ),
        favoriteData({
          protectedData:
            { favorite }
        });
    } else {
      favorite.push(id),
        favoriteData({
          protectedData:
            { favorite }
        });

    }
  };


  return (
    <div className={css.sectionHeading}>
      <div className={css.desktopPriceContainer}>
      
      </div>
      <div className={css.heading}>
        <h1 className={css.title}>{hostLink}</h1>
        <div className={css.author}>
          {category}
          <p className={css.yourSelfText}>{yourself}</p>

          <div className={css.reviewBookingRow}>
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
            {
              isOwnListing ? null :
                <div className={css.favIconBox}>
                  {
                    favorite.findIndex(i => i === id) > -1 ? (
                      <span onClick={e => handleClick(e)}>
                        <svg fill="#000000" width="30px" height="30px" viewBox="0 0 1.35 1.35" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" >
                          <path d="M1.238 0.286c-0.05 -0.103 -0.195 -0.188 -0.363 -0.138A0.37 0.37 0 0 0 0.675 0.289a0.37 0.37 0 0 0 -0.199 -0.141C0.307 0.1 0.163 0.183 0.112 0.286c-0.07 0.144 -0.041 0.307 0.087 0.483C0.3 0.907 0.444 1.046 0.652 1.208a0.037 0.037 0 0 0 0.046 0c0.208 -0.162 0.352 -0.3 0.453 -0.439 0.128 -0.176 0.157 -0.338 0.087 -0.483Z" fill='#E95629' class="clr-i-solid clr-i-solid-path-1" />
                          <path x="0" y="0" width="36" height="36" fill-opacity="0" d="M0 0H1.35V1.35H0V0z" /></svg>
                      </span>
                    ) :
                      (
                        <span onClick={e => handleClick(e)}>
                          <svg fill="#000000" width="30px" height="30px" viewBox="0 0 1.35 1.35" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" >gray
                            <path d="M0.675 1.216a0.037 0.037 0 0 1 -0.023 -0.008C0.444 1.046 0.3 0.907 0.2 0.769 0.071 0.593 0.042 0.431 0.112 0.286c0.05 -0.103 0.195 -0.188 0.363 -0.138A0.37 0.37 0 0 1 0.675 0.289a0.37 0.37 0 0 1 0.199 -0.141c0.168 -0.048 0.313 0.035 0.363 0.138 0.07 0.144 0.041 0.307 -0.087 0.483 -0.101 0.138 -0.244 0.277 -0.453 0.439a0.037 0.037 0 0 1 -0.023 0.008ZM0.38 0.209A0.221 0.221 0 0 0 0.18 0.319c-0.058 0.119 -0.032 0.252 0.08 0.405A2.142 2.142 0 0 0 0.675 1.131a2.142 2.142 0 0 0 0.415 -0.406c0.112 -0.154 0.138 -0.286 0.08 -0.405 -0.037 -0.075 -0.15 -0.135 -0.275 -0.099a0.3 0.3 0 0 0 -0.185 0.158 0.037 0.037 0 0 1 -0.069 0 0.297 0.297 0 0 0 -0.185 -0.158 0.274 0.274 0 0 0 -0.075 -0.011Z" class="clr-i-outline clr-i-outline-path-1" fill='gray' />
                            <path x="0" y="0" width="36" height="36" fill-opacity="0" d="M0 0H1.35V1.35H0V0z" /></svg>
                        </span>
                      )
                  }
                </div>
            }
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
