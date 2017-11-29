/**
 * This module defines custom PropTypes shared within the application.
 *
 * To learn about validating React component props with PropTypes, see:
 *
 *     https://facebook.github.io/react/docs/typechecking-with-proptypes.html
 *
 * For component specific PropTypes, it's perfectly ok to inline them
 * to the component itself. If the type is shared or external (SDK or
 * API), however, it should be in this file for sharing with other
 * components.
 *
 * PropTypes should usually be validated only at the lowest level
 * where the props are used, not along the way in parents that pass
 * along the props to their children. Those parents should usually
 * just validate the presense of the prop key and that the value is
 * defined. This way we get the validation errors only in the most
 * specific place and avoid duplicate errros.
 */
import PropTypes from 'prop-types';
import Decimal from 'decimal.js';
import { types as sdkTypes } from './sdkLoader';
import { ensureTransaction } from './data';

const { UUID, LatLng, LatLngBounds, Money } = sdkTypes;
const { arrayOf, bool, func, instanceOf, number, object, oneOf, shape, string } = PropTypes;

// Fixed value
export const value = val => oneOf([val]);

// SDK type instances
export const uuid = instanceOf(UUID);
export const latlng = instanceOf(LatLng);
export const latlngBounds = instanceOf(LatLngBounds);
export const money = instanceOf(Money);

// Configuration for currency formatting
export const currencyConfig = shape({
  style: string.isRequired,
  currency: string.isRequired,
  currencyDisplay: string,
  useGrouping: bool,
  minimumFractionDigits: number,
  maximumFractionDigits: number,
});

// Configuration for a single route
export const route = shape({
  name: string.isRequired,
  path: string.isRequired,
  exact: bool,
  strict: bool,
  component: func.isRequired,
  loadData: func,
});

// Place object from LocationAutocompleteInput
export const place = shape({
  address: string.isRequired,
  origin: latlng.isRequired,
  bounds: latlngBounds, // optional viewport bounds
  country: string, // country code, e.g. FI, US
});

// Denormalised image object
export const image = shape({
  id: uuid.isRequired,
  type: value('image').isRequired,
  attributes: shape({
    sizes: arrayOf(
      shape({
        width: number.isRequired,
        height: number.isRequired,
        name: string.isRequired,
        url: string.isRequired,
      })
    ).isRequired,
  }),
});

// Denormalised user object
export const currentUser = shape({
  id: uuid.isRequired,
  type: value('currentUser').isRequired,
  attributes: shape({
    banned: bool.isRequired,
    email: string.isRequired,
    emailVerified: bool.isRequired,
    profile: shape({
      firstName: string.isRequired,
      lastName: string.isRequired,
      displayName: string.isRequired,
      abbreviatedName: string.isRequired,
      bio: string,
    }).isRequired,
    stripeConnected: bool.isRequired,
  }),
  profileImage: image,
});

// Denormalised user object
export const user = shape({
  id: uuid.isRequired,
  type: value('user').isRequired,
  attributes: shape({
    banned: bool.isRequired,
    profile: shape({
      displayName: string.isRequired,
      abbreviatedName: string.isRequired,
      bio: string,
    }),
  }),
  profileImage: image,
});

// Denormalised listing object
export const listing = shape({
  id: uuid.isRequired,
  type: value('listing').isRequired,
  attributes: shape({
    title: string.isRequired,
    description: string.isRequired,
    address: string.isRequired,
    geolocation: latlng.isRequired,
    closed: bool.isRequired,
    deleted: bool.isRequired,
    price: money,
  }).isRequired,
  author: user,
  images: arrayOf(image),
});

// Denormalised booking object
export const booking = shape({
  id: uuid.isRequired,
  type: value('booking').isRequired,
  attributes: shape({
    end: instanceOf(Date).isRequired,
    start: instanceOf(Date).isRequired,
  }),
});

// When the customer requests a booking, a transaction is created. The
// initial state is preauthorized that is transitioned with the
// initial preauthorize transition. The customer can see this
// transaction in the OrderPage that is linked from the InboxPage. The
// provider sees the transaction in the SalePage.
export const TX_TRANSITION_PREAUTHORIZE = 'transition/preauthorize';

// When the provider accepts or declines a transaction from the
// SalePage, it is transitioned with the accept or decline transition.
export const TX_TRANSITION_ACCEPT = 'transition/accept';
export const TX_TRANSITION_DECLINE = 'transition/decline';

// If the backend automatically declines the transaction, it is
// transitioned with the auto-decline transition.
export const TX_TRANSITION_AUTO_DECLINE = 'transition/auto-decline';

// Admin can also cancel the transition.
export const TX_TRANSITION_CANCEL = 'transition/cancel';

// If the is marked as delivered in the backend, it is transitioned
// with the mark-delivered transition.
export const TX_TRANSITION_MARK_DELIVERED = 'transition/mark-delivered';

// Review transitions
export const TX_TRANSITION_REVIEW_BY_PROVIDER_FIRST = 'transition/review-by-provider-first';
export const TX_TRANSITION_REVIEW_BY_PROVIDER_SECOND = 'transition/review-by-provider-second';
export const TX_TRANSITION_REVIEW_BY_CUSTOMER_FIRST = 'transition/review-by-customer-first';
export const TX_TRANSITION_REVIEW_BY_CUSTOMER_SECOND = 'transition/review-by-customer-second';
export const TX_TRANSITION_MARK_REVIEWED_BY_CUSTOMER = 'transition/mark-reviewed-by-customer';
export const TX_TRANSITION_MARK_REVIEWED_BY_PROVIDER = 'transition/mark-reviewed-by-provider';
export const TX_TRANSITION_AUTO_COMPLETE_WITHOUT_REVIEWS =
  'transition/auto-complete-without-reviews';

export const TX_TRANSITIONS = [
  TX_TRANSITION_PREAUTHORIZE,
  TX_TRANSITION_ACCEPT,
  TX_TRANSITION_DECLINE,
  TX_TRANSITION_AUTO_DECLINE,
  TX_TRANSITION_CANCEL,
  TX_TRANSITION_MARK_DELIVERED,
  TX_TRANSITION_REVIEW_BY_PROVIDER_FIRST,
  TX_TRANSITION_REVIEW_BY_PROVIDER_SECOND,
  TX_TRANSITION_REVIEW_BY_CUSTOMER_FIRST,
  TX_TRANSITION_REVIEW_BY_CUSTOMER_SECOND,
  TX_TRANSITION_MARK_REVIEWED_BY_CUSTOMER,
  TX_TRANSITION_MARK_REVIEWED_BY_PROVIDER,
  TX_TRANSITION_AUTO_COMPLETE_WITHOUT_REVIEWS,
];

// Roles of actors that perform transaction transitions
export const TX_TRANSITION_ACTOR_CUSTOMER = 'customer';
export const TX_TRANSITION_ACTOR_PROVIDER = 'provider';
export const TX_TRANSITION_ACTOR_SYSTEM = 'system';
export const TX_TRANSITION_ACTOR_OPERATOR = 'operator';

export const TX_TRANSITION_ACTORS = [
  TX_TRANSITION_ACTOR_CUSTOMER,
  TX_TRANSITION_ACTOR_PROVIDER,
  TX_TRANSITION_ACTOR_SYSTEM,
  TX_TRANSITION_ACTOR_OPERATOR,
];

const txLastTransition = tx => ensureTransaction(tx).attributes.lastTransition;

export const txIsPreauthorized = tx => txLastTransition(tx) === TX_TRANSITION_PREAUTHORIZE;

export const txIsAccepted = tx => txLastTransition(tx) === TX_TRANSITION_ACCEPT;

export const txIsDeclined = tx => txLastTransition(tx) === TX_TRANSITION_DECLINE;

export const txIsAutodeclined = tx => txLastTransition(tx) === TX_TRANSITION_AUTO_DECLINE;

export const txIsDeclinedOrAutodeclined = tx => txIsDeclined(tx) || txIsAutodeclined(tx);

export const txIsCanceled = tx => txLastTransition(tx) === TX_TRANSITION_CANCEL;

export const txIsDelivered = tx => txLastTransition(tx) === TX_TRANSITION_MARK_DELIVERED;

export const txTransition = shape({
  at: instanceOf(Date).isRequired,
  by: oneOf(TX_TRANSITION_ACTORS).isRequired,
  transition: oneOf(TX_TRANSITIONS).isRequired,
});

// Check if tx transition is followed by a state where
// reviews are completed
export const areReviewsCompleted = transition => {
  return [
    TX_TRANSITION_REVIEW_BY_PROVIDER_SECOND,
    TX_TRANSITION_REVIEW_BY_CUSTOMER_SECOND,
    TX_TRANSITION_MARK_REVIEWED_BY_CUSTOMER,
    TX_TRANSITION_MARK_REVIEWED_BY_PROVIDER,
    TX_TRANSITION_AUTO_COMPLETE_WITHOUT_REVIEWS,
  ].includes(transition);
};

// Check if a user giving a review is related to
// given tx transition.
export const isReviewTransition = transition => {
  return [
    TX_TRANSITION_REVIEW_BY_PROVIDER_FIRST,
    TX_TRANSITION_REVIEW_BY_CUSTOMER_FIRST,
    TX_TRANSITION_REVIEW_BY_PROVIDER_SECOND,
    TX_TRANSITION_REVIEW_BY_CUSTOMER_SECOND,
  ].includes(transition);
};

// Possible amount of stars in a review
export const REVIEW_RATINGS = [1, 2, 3, 4, 5];

// A review on a user
export const review = shape({
  id: uuid.isRequired,
  attributes: shape({
    at: instanceOf(Date).isRequired,
    content: string,
    rating: oneOf(REVIEW_RATINGS),
    state: string.isRequired,
    type: string.isRequired,
  }).isRequired,
  author: user,
  subject: user,
});

// Denormalised transaction object
export const transaction = shape({
  id: uuid.isRequired,
  type: value('transaction').isRequired,
  attributes: shape({
    createdAt: instanceOf(Date).isRequired,
    lastTransitionedAt: instanceOf(Date).isRequired,
    lastTransition: oneOf(TX_TRANSITIONS).isRequired,
    payinTotal: money.isRequired,
    payoutTotal: money.isRequired,
    lineItems: arrayOf(
      shape({
        code: string.isRequired,
        quantity: instanceOf(Decimal),
        unitPrice: money.isRequired,
        lineTotal: money.isRequired,
        reversal: bool.isRequired,
      })
    ).isRequired,
    transitions: arrayOf(txTransition).isRequired,
  }),
  booking,
  listing,
  customer: user,
  provider: user,
  reviews: arrayOf(review),
});

// Denormalised transaction message
export const message = shape({
  id: uuid.isRequired,
  type: value('message').isRequired,
  attributes: shape({
    at: instanceOf(Date).isRequired,
    content: string.isRequired,
  }).isRequired,
  sender: user,
});

// Pagination information in the response meta
export const pagination = shape({
  page: number.isRequired,
  perPage: number.isRequired,
  totalItems: number.isRequired,
  totalPages: number.isRequired,
});

export const ERROR_CODE_TRANSACTION_LISTING_NOT_FOUND = 'transaction-listing-not-found';
export const ERROR_CODE_PAYMENT_FAILED = 'transaction-payment-failed';
export const ERROR_CODE_EMAIL_TAKEN = 'email-taken';
export const ERROR_CODE_EMAIL_NOT_FOUND = 'email-not-found';
export const ERROR_CODE_EMAIL_NOT_VERIFIED = 'email-unverified';
export const ERROR_CODE_TOO_MANY_VERIFICATION_REQUESTS = 'email-too-many-verification-requests';
export const ERROR_CODE_UPLOAD_OVER_LIMIT = 'request-upload-over-limit';
const ERROR_CODES = [
  ERROR_CODE_TRANSACTION_LISTING_NOT_FOUND,
  ERROR_CODE_PAYMENT_FAILED,
  ERROR_CODE_EMAIL_TAKEN,
  ERROR_CODE_EMAIL_NOT_FOUND,
  ERROR_CODE_EMAIL_NOT_VERIFIED,
  ERROR_CODE_TOO_MANY_VERIFICATION_REQUESTS,
  ERROR_CODE_UPLOAD_OVER_LIMIT,
];

// API error
// TODO this is likely to change soonish
export const apiError = shape({
  id: uuid.isRequired,
  status: number.isRequired,
  code: oneOf(ERROR_CODES).isRequired,
  title: string.isRequired,
  details: shape({
    data: object,
    msg: string,
  }),
});

// Storable error prop type. (Error object should not be stored as it is.)
export const error = shape({
  type: value('error').isRequired,
  name: string.isRequired,
  message: string,
  status: number,
  statusText: string,
  apiErrors: arrayOf(apiError),
});
