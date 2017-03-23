import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { NamedLink } from '../../components';
import * as propTypes from '../../util/propTypes';
import { convertMoneyToNumber } from '../../util/currency';
import css from './ListingCard.css';
import noImageIcon from './images/noImageIcon.svg';

const priceData = (price, currencyConfig, intl) => {
  if (price && price.currency === currencyConfig.currency) {
    const priceAsNumber = convertMoneyToNumber(price, currencyConfig.subUnitDivisor);
    const formattedPrice = intl.formatNumber(priceAsNumber, currencyConfig);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: `(${price.currency})`,
      priceTitle: `Unsupported currency (${price.currency})`,
    };
  }
  return {};
};

export const ListingCardComponent = props => {
  const { currencyConfig, intl, listing } = props;
  const id = listing.id.uuid;
  const { title = '', description = '', address = '', price } = listing.attributes || {};
  const slug = encodeURIComponent(title.split(' ').join('-'));
  const authorName = listing.author && listing.author.attributes
    ? `${listing.author.attributes.profile.firstName} ${listing.author.attributes.profile.lastName}`
    : '';

  // TODO: Currently, API can return currencies that are not supported by starter app.
  const { formattedPrice, priceTitle } = priceData(price, currencyConfig, intl);

  const images = listing.images
    ? listing.images.map(i => ({ id: i.id, sizes: i.attributes.sizes }))
    : [];
  const mainImage = images.length > 0 ? images[0] : null;
  const squareImageURL = mainImage ? mainImage.sizes.find(i => i.name === 'square').url : null;
  const square2XImageURL = mainImage ? mainImage.sizes.find(i => i.name === 'square2x').url : null;
  const higherRes = square2XImageURL ? { srcSet: `${square2XImageURL} 2x` } : null;

  // TODO: these are not yet present in the API data, figure out what
  // to do with them
  const authorAvatar = 'https://placehold.it/44x44';

  // TODO: svg should have own loading strategy
  // Now noImageIcon is imported with default configuration (gives url)
  /* eslint-disable jsx-a11y/img-redundant-alt */
  const noListingImage = (
    <div className={css.noImageContainer}>
      <div className={css.noImageWrapper}>
        <img className={css.noImageIcon} src={noImageIcon} alt="No image" />
        <div className={css.noImageText}>No image</div>
      </div>
    </div>
  );
  /* eslint-enable jsx-a11y/img-redundant-alt */
  const listingImage = (
    <img className={css.thumbnail} src={squareImageURL} alt="Listing Title" {...higherRes} />
  );

  const imageOrPlaceholder = squareImageURL ? listingImage : noListingImage;

  return (
    <div className={css.listing}>
      <div className={css.squareWrapper}>
        <div className={css.aspectWrapper}>
          {imageOrPlaceholder}
        </div>
      </div>
      <div className={css.info}>
        <div className={css.mainInfo}>
          <NamedLink className={css.title} name="ListingPage" params={{ id, slug }}>
            {title}
          </NamedLink>
          <div className={css.price} title={priceTitle}>
            {formattedPrice}
          </div>
        </div>
        <div className={css.description}>
          {description}
        </div>
        <div className={css.details}>
          <div className={css.location}>
            {address}
          </div>
        </div>
        <hr />
        <div className={css.authorInfo}>
          <div className={css.avatarWrapper}>
            <img className={css.avatar} src={authorAvatar} alt={authorName} />
          </div>
          <div className={css.authorDetails}>
            <span className={css.authorName}>{authorName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

ListingCardComponent.propTypes = {
  currencyConfig: propTypes.currencyConfig.isRequired,
  intl: intlShape.isRequired,
  listing: propTypes.listing.isRequired,
};

export default injectIntl(ListingCardComponent);
