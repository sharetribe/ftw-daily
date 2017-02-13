import React, { PropTypes } from 'react';
import { NamedLink } from '../../components';
import css from './ListingCard.css';

const ListingCard = props => {
  const { id, title, price, description, location, review, author } = props;
  const slug = encodeURIComponent(title.split(' ').join('-'));
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
            {location}
          </div>
          <div className={css.reviews}>
            (<span>{review.rating}</span><span>/5</span>){' '}
            <span>{review.count}</span>
          </div>
        </div>
        <hr />
        <div className={css.authorInfo}>
          <div className={css.avatarWrapper}>
            <img className={css.avatar} src={author.avatar} alt={author.name} />
          </div>
          <div className={css.authorDetails}>
            <span className={css.authorName}>{author.name}</span>
            <div className={css.authorReview}>
              review: <span>{author.review.rating}</span><span>/5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ListingCard.defaultProps = { location: null, review: {}, author: {} };

const { shape, string } = PropTypes;

ListingCard.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  price: string.isRequired,
  description: string.isRequired,
  location: string,
  review: shape({ rating: string.isRequired, count: string.isRequired }),
  author: shape({
    name: string.isRequired,
    avatar: string.isRequired,
    review: shape({ rating: string.isRequired }),
  }),
};

export default ListingCard;
