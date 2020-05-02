import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';
import {
  LINE_ITEM_DAY,
  LINE_ITEM_NIGHT,
  LINE_ITEM_UNITS,
  LINE_ITEM_HOUR,
  LINE_ITEM_WEEK,
  propTypes,
} from '../../util/types';
import { formatMoney } from '../../util/currency';
import { ensureListing, ensureUser } from '../../util/data';
import { richText } from '../../util/richText';
import { createSlug } from '../../util/urlHelpers';
import config from '../../config';
import { NamedLink, ResponsiveImage } from '../../components';
import { YotiVerifiedListingPage } from '../../components';

import css from './ListingCard.css';
import verified from './images/verified.png';

const MIN_LENGTH_FOR_LONG_WORDS = 10;

const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: intl.formatMessage(
        { id: 'ListingCard.unsupportedPrice' },
        { currency: price.currency }
      ),
      priceTitle: intl.formatMessage(
        { id: 'ListingCard.unsupportedPriceTitle' },
        { currency: price.currency }
      ),
    };
  }
  return {};
};

class ListingImage extends Component {
  render() {
    return <ResponsiveImage {...this.props} />;
  }
}
const LazyImage = lazyLoadWithDimensions(ListingImage, { loadAfterInitialRendering: 3000 });

export const ListingCardComponent = props => {
  const { className, rootClassName, intl, listing, renderSizes, setActiveListing } = props;
  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const id = currentListing.id.uuid;
  const { title = '', price } = currentListing.attributes;
  const slug = createSlug(title);
  const author = ensureUser(listing.author);
  const authorName = author.attributes.profile.displayName;
  const firstImage =
    currentListing.images && currentListing.images.length > 0 ? currentListing.images[0] : null;

  const { formattedPrice, priceTitle } = priceData(price, intl);
  const { publicData } = currentListing.attributes;

  const user_type = publicData ? publicData.user_type : null;

  const user_name = user_type === 0 ? 'owner' : user_type === 1 ? 'sitter' : 'service';
  const category = user_name ? user_name : null;

  const rate = publicData && publicData.rate ? publicData.rate : config.bookingUnitType;

  const unitType = rate;

  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;
  const isHourly = unitType === LINE_ITEM_HOUR;
  const isWeekly = unitType === LINE_ITEM_WEEK;

  const unitTranslationKey = isHourly
    ? 'ListingCard.perHour'
    : isNightly
      ? 'ListingCard.perNight'
      : isDaily
        ? 'ListingCard.perDay'
        : isWeekly
          ? 'ListingCard.perWeek'
          : 'ListingCard.perUnit';


  publicData.service = publicData.service ? typeof publicData.service == "string" ? Array(publicData.service) : publicData.service : []


  const serviceCategoriesMap = {
    'walking': 'Artesanías',
    'surgeon': 'Accesorios',
    'groomer': 'Gourmet y Bebidas',
    'store': 'Belleza y Bienestar',
    'sitter': 'Juegos y Juguetes',
    'food': 'Jardinería y jardín',
    'food': 'Mascotas',
    'food': 'Librería y Artículos de arte',
    'food': 'Turismo',
    'food': 'Artículos deportivos',
    'food': 'Servicios',
    'food': 'Otras Categorías'

  }

  return (
    <NamedLink className={classes} name="ListingPage" params={{ id, slug }}>
      <div
        className={css.threeToTwoWrapper}
        onMouseEnter={() => setActiveListing(currentListing.id)}
        onMouseLeave={() => setActiveListing(null)}
      >
        <div className={css.aspectWrapper}>
          <div
            className={
              category === 'owner'
                ? `${css.cardCategory} ${css.cardCategoryOwner}`
                : category === 'sitter'
                  ? `${css.cardCategory} ${css.cardCategorySitter}`
                  : `${css.cardCategory} ${css.cardCategoryService}`
            }
          >
            {category}
          </div>

          {author.attributes.profile.publicData ? (
            author.attributes.profile.publicData.yotiVerified == 'YES' ? (
              <span className={css.yotiBadge}>
                <img className={css.verifiedBy} src={verified} />
                ID Verified
              </span>
            ) : null
          ) : null}

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
        <div className={css.price}>
        {
        publicData.service.length ?
          <div className={css.serviceType}>
            {publicData.service.map((type, index) => {
              return (
                <span>
                  {serviceCategoriesMap[type] && serviceCategoriesMap[type].charAt(0).toUpperCase() + serviceCategoriesMap[type].slice(1)}
                  {index != publicData.service.length - 1 ? <span className={css.separator}>|</span> : null}
                </span>
              );
            })}
          </div> : null
        }
          {price.amount !== 0 ? (
            <div>
              <div className={css.priceValue} title={priceTitle}>
                {formattedPrice}
              </div>
              <div className={css.perUnit}>
                <FormattedMessage id={unitTranslationKey} />
              </div>
            </div>
          ) : null}
        </div>
        <div className={css.mainInfo}>

          <div className={css.title}>
            {richText(title, {
              longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS,
              longWordClass: css.longWord,
            })}
          </div>
          <div className={css.authorInfo}>
            <FormattedMessage id="ListingCard.hostedBy" values={{ authorName }} />
          </div>
        </div>
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
