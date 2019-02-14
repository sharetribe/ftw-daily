import Reviews from './Reviews';
import { createReview, createUser } from '../../util/test-data';

export const WithNoReviews = {
  component: Reviews,
  props: {
    reviews: [],
  },
};

export const WithThreeReviews = {
  component: Reviews,
  props: {
    reviews: [
      createReview('review_1', { rating: 1 }, { author: createUser('author_1') }),
      createReview('review_2', { rating: 3 }, { author: createUser('author_2') }),
      createReview('review_3', { rating: 5 }, { author: createUser('author_3') }),
    ],
  },
};

export const WithBannedUser = {
  component: Reviews,
  props: {
    reviews: [
      createReview(
        'review_1',
        { rating: 1 },
        { author: createUser('author_1', { banned: true, deleted: false, profile: null }) }
      ),
    ],
  },
};

export const WithDeletedUser = {
  component: Reviews,
  props: {
    reviews: [
      createReview(
        'review_1',
        { rating: 2 },
        { author: createUser('author_1', { banned: false, deleted: true, profile: null }) }
      ),
    ],
  },
};
