import React, { PropTypes } from 'react';
import { NamedLink } from '../../components';
import css from './ListingCardSmall.css';

// <NamedLink name="SearchListingsPage">X</NamedLink>
const ListingCardSmall = props => {
  const { id, title, price, review } = props;
  const slug = encodeURIComponent(title.split(' ').join('-'));
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

ListingCardSmall.defaultProps = { review: {} };

const { number, shape, string } = PropTypes;

ListingCardSmall.propTypes = {
  id: number.isRequired,
  title: string.isRequired,
  price: string.isRequired,
  review: shape({ rating: string.isRequired, count: string.isRequired }),
};

export default ListingCardSmall;
