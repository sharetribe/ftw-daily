import React, { Component } from 'react';
import { string, func } from 'prop-types';
import classNames from 'classnames';
import { propTypes } from '../../util/types'; //LINE_ITEM_DAY, LINE_ITEM_NIGHT, 
// import config from '../../config';
import { richText } from '../../util/richText';
// import { formatMoney } from '../../util/currency';
import { createSlug } from '../../util/urlHelpers';
import { ensureListing, ensureUser } from '../../util/data';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';

import { NamedLink, ResponsiveImage, ReviewRating } from '../../components';
import SectionReviewsheading from '../../containers/ListingPage/SectionReviewsHeading';

import css from './ListingCard.module.css';

const MIN_LENGTH_FOR_LONG_WORDS = 10;

// const priceData = (price, intl) => {
//   if (price && price.currency === config.currency) {
//     const formattedPrice = formatMoney(intl, price);
//     return { formattedPrice, priceTitle: formattedPrice };
//   } else if (price) {
//     return {
//       formattedPrice: intl.formatMessage(
//         { id: 'ListingCard.unsupportedPrice' },
//         { currency: price.currency }
//       ),
//       priceTitle: intl.formatMessage(
//         { id: 'ListingCard.unsupportedPriceTitle' },
//         { currency: price.currency }
//       ),
//     };
//   }
//   return {};
// };

class ListingImage extends Component {
  render() {
    return <ResponsiveImage {...this.props} />;
  }
}
const LazyImage = lazyLoadWithDimensions(ListingImage, { loadAfterInitialRendering: 3000 });

export const ListingCardComponent = props => {
  const {
    className,
    rootClassName,
    intl,
    listing,
    renderSizes,
    setActiveListing,
    currentUser,
    onUpdateProfile,
    pageName,
    fetchReviewsError,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const id = currentListing.id.uuid;
  const { title = '', price, publicData } = currentListing.attributes;
  const { reviews, ratings } = publicData || {};

  const slug = createSlug(title);
  const author = ensureUser(listing.author);
  const authorName = author.attributes.profile.displayName;
  const firstImage =
    currentListing.images && currentListing.images.length > 0 ? currentListing.images[0] : null;

  // const { formattedPrice, priceTitle } = priceData(price, intl);
  // const unitType = config.bookingUnitType;
  // const isNightly = unitType === LINE_ITEM_NIGHT;
  // const isDaily = unitType === LINE_ITEM_DAY;

  // const unitTranslationKey = isNightly
  //   ? 'ListingCard.perNight'
  //   : isDaily
  //     ? 'ListingCard.perDay'
  //     : 'ListingCard.perUnit';

  const headline = listing?.attributes?.publicData?.headline


  const favorites = (currentUser && currentUser.id && currentUser.attributes.profile.protectedData.favorite) || [];
  const index = favorites.findIndex(i => i == id);
  const handleClick = e => {
    e.preventDefault();
    if (index > -1) {
      onUpdateProfile({
        protectedData: {
          favorite: favorites.filter(i => i != id)
        }
      });
    } else {
      favorites.push(id);
      onUpdateProfile({
        protectedData: { favorite: favorites }
      });
    }
  };

  return (
    <NamedLink className={classes} name="ListingPage" params={{ id, slug }}>
      <div
        className={css.threeToTwoWrapper}
        onMouseEnter={() => setActiveListing(currentListing.id)}
        onMouseLeave={() => setActiveListing(null)}
      >
        <div className={css.aspectWrapper}>
          <LazyImage
            rootClassName={css.rootForImage}
            alt={title}
            image={firstImage}
            variants={['landscape-crop', 'landscape-crop2x']}
            sizes={renderSizes}
          />
        </div>
      </div>
      <div className={css.info}>
        {/* <div className={css.price}>
      <div className={favCard ? css.favInfo : css.info}>
        <div className={css.price}>
          <div className={css.priceValue} title={priceTitle}>
            {formattedPrice}
          </div>
          <div className={css.perUnit}>
            <FormattedMessage id={unitTranslationKey} />
          </div>
        </div> */}
        <div className={css.mainInfo}>
          {/* <div className={css.title}>
            
            {richText( authorName, {
              longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS,
              longWordClass: css.longWord,
            })}
          </div> */}
          <div className={css.authorInfo}>
            <FormattedMessage id="ListingCard.hostedBy" values={{ authorName }} />

          </div>
          <div> {headline}</div>
          {pageName == "SearchPage" && ratings && reviews ?
            <div className={css.ratingStar}>
              <SectionReviewsheading
                reviews={reviews}
                fetchReviewsError={fetchReviewsError}
                className={css.reviewHeading}
              />
              <ReviewRating
                rating={ratings}
                reviewStarClassName={css.reviewRatingStar}
              />
            </div>
            : null}
        </div>

        {pageName == "SearchPage"
          ? null
          : <div>
            {index > -1
              ? (<span onClick={e => handleClick(e)}>
                <svg fill="#000000" width="30px" height="30px" viewBox="0 0 1.35 1.35" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" >
                  <path d="M1.238 0.286c-0.05 -0.103 -0.195 -0.188 -0.363 -0.138A0.37 0.37 0 0 0 0.675 0.289a0.37 0.37 0 0 0 -0.199 -0.141C0.307 0.1 0.163 0.183 0.112 0.286c-0.07 0.144 -0.041 0.307 0.087 0.483C0.3 0.907 0.444 1.046 0.652 1.208a0.037 0.037 0 0 0 0.046 0c0.208 -0.162 0.352 -0.3 0.453 -0.439 0.128 -0.176 0.157 -0.338 0.087 -0.483Z" fill='#E95629' class="clr-i-solid clr-i-solid-path-1" />
                  <path x="0" y="0" width="36" height="36" fill-opacity="0" d="M0 0H1.35V1.35H0V0z" /></svg>
              </span>)
              : (<span onClick={e => handleClick(e)}>
                <svg fill="#000000" width="30px" height="30px" viewBox="0 0 1.35 1.35" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" >
                  <path d="M0.675 1.216a0.037 0.037 0 0 1 -0.023 -0.008C0.444 1.046 0.3 0.907 0.2 0.769 0.071 0.593 0.042 0.431 0.112 0.286c0.05 -0.103 0.195 -0.188 0.363 -0.138A0.37 0.37 0 0 1 0.675 0.289a0.37 0.37 0 0 1 0.199 -0.141c0.168 -0.048 0.313 0.035 0.363 0.138 0.07 0.144 0.041 0.307 -0.087 0.483 -0.101 0.138 -0.244 0.277 -0.453 0.439a0.037 0.037 0 0 1 -0.023 0.008ZM0.38 0.209A0.221 0.221 0 0 0 0.18 0.319c-0.058 0.119 -0.032 0.252 0.08 0.405A2.142 2.142 0 0 0 0.675 1.131a2.142 2.142 0 0 0 0.415 -0.406c0.112 -0.154 0.138 -0.286 0.08 -0.405 -0.037 -0.075 -0.15 -0.135 -0.275 -0.099a0.3 0.3 0 0 0 -0.185 0.158 0.037 0.037 0 0 1 -0.069 0 0.297 0.297 0 0 0 -0.185 -0.158 0.274 0.274 0 0 0 -0.075 -0.011Z" class="clr-i-outline clr-i-outline-path-1" fill='red' />
                  <path x="0" y="0" width="36" height="36" fill-opacity="0" d="M0 0H1.35V1.35H0V0z" /></svg>
              </span>)
            }
          </div>}
      </div>
    </NamedLink>
  );
};

ListingCardComponent.defaultProps = {
  className: null,
  rootClassName: null,
  renderSizes: null,
  setActiveListing: () => null,
};

ListingCardComponent.propTypes = {
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
  listing: propTypes.listing.isRequired,

  // Responsive image sizes hint
  renderSizes: string,

  setActiveListing: func,
};

export default injectIntl(ListingCardComponent);
