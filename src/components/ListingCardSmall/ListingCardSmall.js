import React from 'react';
import { NamedLink } from '../../components';
import * as propTypes from '../../util/propTypes';
import css from './ListingCardSmall.css';

const ListingCardSmall = props => {
  const { listing } = props;
  const { title = '' } = listing.attributes || {};
  const id = listing.id.uuid;
  const slug = encodeURIComponent(title.split(' ').join('-'));

  // TODO: these are not yet present in the API data, figure out what
  // to do with them
  const price = '55\u20AC / day';
  const review = { rating: 3, count: 10 };

  return (
    <div className={css.listing}>
      <div className={css.squareWrapper}>
        <div className={css.aspectWrapper}>
          <img className={css.thumbnail} src="http://placehold.it/200x150" alt="Listing Title" />
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
