// import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import { IconReviewStar } from '../../components';
// import { REVIEW_RATINGS } from '../../util/types';

// const ReviewRating = props => {
//   const { className, rootClassName, reviewStarClassName, rating } = props;
//   const classes = classNames(rootClassName, className);

//   const stars = REVIEW_RATINGS;
//   return (
//     <span className={classes}>
//       {stars.map(star => (
//         <IconReviewStar
//           key={`star-${star}`}
//           className={reviewStarClassName}
//           isFilled={star <= rating}
//         />
//       ))}
//     </span>
//   );
// };

// ReviewRating.defaultProps = {
//   rootClassName: null,
//   className: null,
//   reviewStarClassName: null,
// };

// const { string, oneOf } = PropTypes;

// ReviewRating.propTypes = {
//   rating: oneOf(REVIEW_RATINGS).isRequired,
//   reviewStartClassName: string,
//   rootClassName: string,
//   className: string,
// };

// export default ReviewRating;
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IconReviewStar } from '../../components';
import { REVIEW_RATINGS } from '../../util/types';

const ReviewRating = props => {
  const { className, rootClassName, reviewStarClassName, rating } = props;
  const classes = classNames(rootClassName, className);
console.log('rating', rating)
  const stars = REVIEW_RATINGS;
  const toFixedRating = rating.toFixed(1);
  
  return (
    <span className={classes} title={`${rating}/5`}>
      {stars.map(star => (
        <IconReviewStar
          key={`star-${star}`}
          className={reviewStarClassName}
          isFilled={rating>=5  || star <= parseInt(rating) ? true : star == parseInt(rating)+1 && toFixedRating.split(".")[1] > 5}
          isHalfFilled={
            rating>=5 ? false 
            : star == parseInt(rating)+1 && toFixedRating.split(".")[1] < 6 && toFixedRating.split(".")[1] > 1 ? true 
            : false 
          }
        />
      ))}
    </span>
  );
};

ReviewRating.defaultProps = {
  rootClassName: null,
  className: null,
  reviewStarClassName: null,
};

const { string, oneOf } = PropTypes;

ReviewRating.propTypes = {
  rating: oneOf(REVIEW_RATINGS).isRequired,
  reviewStartClassName: string,
  rootClassName: string,
  className: string,
};

export default ReviewRating;

