import React from 'react';
import PropTypes from 'prop-types';
import { range } from 'lodash';
import { IconReviewStar } from '../../components';

const MAX_RATING = 5;

const ReviewRating = props => {
  const { className, rootClassName, reviewStarClassName, rating } = props;
  const classes = rootClassName || className;

  const stars = range(MAX_RATING);
  return (
    <div className={classes}>
      {stars.map(star => (
        <IconReviewStar
          key={`star-${star}`}
          className={reviewStarClassName}
          isFilled={star < rating}
        />
      ))}
    </div>
  );
};

ReviewRating.defaultProps = {
  className: null,
  reviewStarClassName: null,
};

const { number, string } = PropTypes;

ReviewRating.propTypes = {
  rating: number.isRequired,
  reviewStartClassName: string,
  rootClassName: string,
  className: string,
};

export default ReviewRating;
