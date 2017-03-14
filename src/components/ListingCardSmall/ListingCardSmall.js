import React from 'react';
import { NamedLink } from '../../components';
import * as propTypes from '../../util/propTypes';
import css from './ListingCardSmall.css';
import noImageIcon from './images/noImageIcon.svg';

const ListingCardSmall = props => {
  const { listing } = props;
  const { title = '' } = listing.attributes || {};
  const id = listing.id.uuid;
  const slug = encodeURIComponent(title.split(' ').join('-'));

  // TODO: these are not yet present in the API data, figure out what
  // to do with them
  const price = '55\u20AC / day';
  const review = { rating: 3, count: 10 };
  const images = listing.images
    ? listing.images.map(i => ({ id: i.id, sizes: i.attributes.sizes }))
    : [];
  const mainImage = images.length > 0 ? images[0] : null;
  const squareImageURL = mainImage ? mainImage.sizes.find(i => i.name === 'square').url : null;
  const square2XImageURL = mainImage
    ? mainImage.sizes.find(i => i.name === 'square2x').url
    : null;
  const higherRes = square2XImageURL ? { srcSet: `${square2XImageURL} 2x` } : null;

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
        <NamedLink className={css.title} name="ListingPage" params={{ id, slug }}>
          {title}
        </NamedLink>
        <div className={css.reviews}>
          (<span>{review.rating}</span><span>/5</span>){' '}
          <span>{review.count}</span>
        </div>
        <div className={css.price}>
          {price}
        </div>
      </div>
    </div>
  );
};

ListingCardSmall.propTypes = { listing: propTypes.listing.isRequired };

export default ListingCardSmall;
