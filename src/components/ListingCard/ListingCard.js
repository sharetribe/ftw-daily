import React from 'react';
import { NamedLink } from '../../components';
import * as propTypes from '../../util/propTypes';
import css from './ListingCard.css';

const ListingCard = props => {
  const { listing } = props;
  const id = listing.id.uuid;
  const { title, description, address } = listing.attributes;
  const slug = encodeURIComponent(title.split(' ').join('-'));
  const authorName = `${listing.author.attributes.profile.firstName} ${listing.author.attributes.profile.lastName}`;

  // TODO: these are not yet present in the API data, figure out what
  // to do with them
  const price = '55\u20AC / day';
  const review = { rating: 3, count: 10 };
  const authorAvatar = 'http://placehold.it/44x44';
  const authorReview = { rating: 4 };

  return (
    <div className={css.listing}>
      <div className={css.squareWrapper}>
        <div className={css.aspectWrapper}>
          <img className={css.thumbnail} src="http://placehold.it/400x300" alt="Listing Title" />
        </div>
      </div>
      <div className={css.info}>
        <div className={css.mainInfo}>
          <NamedLink className={css.title} name="ListingPage" params={{ id, slug }}>
            {title}
          </NamedLink>
          <div className={css.price}>
            {price}
          </div>
        </div>
        <div className={css.description}>
          {description}
        </div>
        <div className={css.details}>
          <div className={css.location}>
            {address}
          </div>
          <div className={css.reviews}>
            (<span>{review.rating}</span><span>/5</span>){' '}
            <span>{review.count} reviews</span>
          </div>
        </div>
        <hr />
        <div className={css.authorInfo}>
          <div className={css.avatarWrapper}>
            <img className={css.avatar} src={authorAvatar} alt={authorName} />
          </div>
          <div className={css.authorDetails}>
            <span className={css.authorName}>{authorName}</span>
            <div className={css.authorReview}>
              review: <span>{authorReview.rating}</span><span>/5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ListingCard.propTypes = { listing: propTypes.listing.isRequired };

export default ListingCard;
