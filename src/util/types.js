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
import {
  arrayOf,
  bool,
  func,
  instanceOf,
  number,
  object,
  objectOf,
  oneOf,
  oneOfType,
  shape,
  string,
} from 'prop-types';
import Decimal from 'decimal.js';
import { types as sdkTypes } from './sdkLoader';
import { ensureTransaction } from './data';

const { UUID, LatLng, LatLngBounds, Money } = sdkTypes;

const propTypes = {};

// Fixed value
propTypes.value = val => oneOf([val]);

// SDK type instances
propTypes.uuid = instanceOf(UUID);
propTypes.latlng = instanceOf(LatLng);
propTypes.latlngBounds = instanceOf(LatLngBounds);
propTypes.money = instanceOf(Money);

// Configuration for currency formatting
propTypes.currencyConfig = shape({
  style: string.isRequired,
  currency: string.isRequired,
  currencyDisplay: string,
  useGrouping: bool,
  minimumFractionDigits: number,
  maximumFractionDigits: number,
});

// Configuration for a single route
propTypes.route = shape({
  name: string.isRequired,
  path: string.isRequired,
  exact: bool,
  strict: bool,
  component: func.isRequired,
  loadData: func,
});

// Place object from LocationAutocompleteInput
propTypes.place = shape({
  address: string.isRequired,
  origin: propTypes.latlng,
  bounds: propTypes.latlngBounds, // optional viewport bounds
});

// Denormalised image object
propTypes.image = shape({
  id: propTypes.uuid.isRequired,
  type: propTypes.value('image').isRequired,
  attributes: shape({
    variants: objectOf(
      shape({
        width: number.isRequired,
        height: number.isRequired,
        url: string.isRequired,
      })
    ),
  }),
});

// Denormalised user object
propTypes.currentUser = shape({
  id: propTypes.uuid.isRequired,
  type: propTypes.value('currentUser').isRequired,
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
  profileImage: propTypes.image,
});

// Denormalised user object
propTypes.user = shape({
  id: propTypes.uuid.isRequired,
  type: propTypes.value('user').isRequired,
  attributes: shape({
    banned: bool.isRequired,
    profile: shape({
      displayName: string.isRequired,
      abbreviatedName: string.isRequired,
      bio: string,
    }),
  }),
  profileImage: propTypes.image,
});

export const LISTING_STATE_DRAFT = 'draft';
export const LISTING_STATE_PENDING_APPROVAL = 'pendingApproval';
export const LISTING_STATE_PUBLISHED = 'published';
export const LISTING_STATE_CLOSED = 'closed';

const LISTING_STATES = [
  LISTING_STATE_DRAFT,
  LISTING_STATE_PENDING_APPROVAL,
  LISTING_STATE_PUBLISHED,
  LISTING_STATE_CLOSED,
];

const listingAttributes = shape({
  title: string.isRequired,
  description: string.isRequired,
  geolocation: propTypes.latlng,
  deleted: propTypes.value(false).isRequired,
  state: oneOf(LISTING_STATES).isRequired,
  price: propTypes.money,
  publicData: object.isRequired,
});

const AVAILABILITY_PLAN_DAY = 'availability-plan/day';
const AVAILABILITY_PLAN_TIME = 'availability-plan/time';
export const DAYS_OF_WEEK = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const availabilityPlan = shape({
  type: oneOf([AVAILABILITY_PLAN_DAY, AVAILABILITY_PLAN_TIME]).isRequired,
  timezone: string,
  entries: arrayOf(
    shape({
      dayOfWeek: oneOf(DAYS_OF_WEEK).isRequired,
      seats: number.isRequired,
      start: string,
      end: string,
    })
  ),
});

const ownListingAttributes = shape({
  title: string.isRequired,
  description: string,
  geolocation: propTypes.latlng,
  deleted: propTypes.value(false).isRequired,
  state: oneOf(LISTING_STATES).isRequired,
  price: propTypes.money,
  availabilityPlan: availabilityPlan,
  publicData: object.isRequired,
});

const deletedListingAttributes = shape({
  deleted: propTypes.value(true).isRequired,
});

// Denormalised listing object
propTypes.listing = shape({
  id: propTypes.uuid.isRequired,
  type: propTypes.value('listing').isRequired,
  attributes: oneOfType([listingAttributes, deletedListingAttributes]).isRequired,
  author: propTypes.user,
  images: arrayOf(propTypes.image),
});

// Denormalised ownListing object
propTypes.ownListing = shape({
  id: propTypes.uuid.isRequired,
  type: propTypes.value('ownListing').isRequired,
  attributes: oneOfType([ownListingAttributes, deletedListingAttributes]).isRequired,
  author: propTypes.currentUser,
  images: arrayOf(propTypes.image),
});

// Denormalised booking object
propTypes.booking = shape({
  id: propTypes.uuid.isRequired,
  type: propTypes.value('booking').isRequired,
  attributes: shape({
    end: instanceOf(Date).isRequired,
    start: instanceOf(Date).isRequired,
  }),
});

// A time slot that covers one day, having a start and end date.
export const TIME_SLOT_DAY = 'time-slot/day';

// Denormalised time slot object
propTypes.timeSlot = shape({
  id: propTypes.uuid.isRequired,
  type: propTypes.value('timeSlot').isRequired,
  attributes: shape({
    type: oneOf([TIME_SLOT_DAY]).isRequired,
    end: instanceOf(Date).isRequired,
    start: instanceOf(Date).isRequired,
  }),
});

// Denormalised availability exception object
propTypes.availabilityException = shape({
  id: propTypes.uuid.isRequired,
  type: propTypes.value('availabilityException').isRequired,
  attributes: shape({
    end: instanceOf(Date).isRequired,
    seats: number.isRequired,
    start: instanceOf(Date).isRequired,
  }),
});

// When a customer makes a booking to a listing, a transaction is
// created with the initial request transition.
export const TRANSITION_REQUEST = 'transition/request';

// A customer can also initiate a transaction with an enquiry, and
// then transition that with a request.
export const TRANSITION_ENQUIRE = 'transition/enquire';
export const TRANSITION_REQUEST_AFTER_ENQUIRY = 'transition/request-after-enquiry';

// When the provider accepts or declines a transaction from the
// SalePage, it is transitioned with the accept or decline transition.
export const TRANSITION_ACCEPT = 'transition/accept';
export const TRANSITION_DECLINE = 'transition/decline';

// The backend automatically expire the transaction.
export const TRANSITION_EXPIRE = 'transition/expire';

// Admin can also cancel the transition.
export const TRANSITION_CANCEL = 'transition/cancel';

// The backend will mark the transaction completed.
export const TRANSITION_COMPLETE = 'transition/complete';

// Reviews are given through transaction transitions. Review 1 can be
// by provider or customer, and review 2 will be the other party of
// the transaction.
export const TRANSITION_REVIEW_1_BY_PROVIDER = 'transition/review-1-by-provider';
export const TRANSITION_REVIEW_2_BY_PROVIDER = 'transition/review-2-by-provider';
export const TRANSITION_REVIEW_1_BY_CUSTOMER = 'transition/review-1-by-customer';
export const TRANSITION_REVIEW_2_BY_CUSTOMER = 'transition/review-2-by-customer';
export const TRANSITION_EXPIRE_CUSTOMER_REVIEW_PERIOD = 'transition/expire-customer-review-period';
export const TRANSITION_EXPIRE_PROVIDER_REVIEW_PERIOD = 'transition/expire-provider-review-period';
export const TRANSITION_EXPIRE_REVIEW_PERIOD = 'transition/expire-review-period';

export const TRANSITIONS = [
  TRANSITION_ACCEPT,
  TRANSITION_CANCEL,
  TRANSITION_COMPLETE,
  TRANSITION_DECLINE,
  TRANSITION_ENQUIRE,
  TRANSITION_EXPIRE,
  TRANSITION_EXPIRE_CUSTOMER_REVIEW_PERIOD,
  TRANSITION_EXPIRE_PROVIDER_REVIEW_PERIOD,
  TRANSITION_EXPIRE_REVIEW_PERIOD,
  TRANSITION_REQUEST,
  TRANSITION_REQUEST_AFTER_ENQUIRY,
  TRANSITION_REVIEW_1_BY_CUSTOMER,
  TRANSITION_REVIEW_1_BY_PROVIDER,
  TRANSITION_REVIEW_2_BY_CUSTOMER,
  TRANSITION_REVIEW_2_BY_PROVIDER,
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

export const txIsEnquired = tx => txLastTransition(tx) === TRANSITION_ENQUIRE;

export const txIsRequested = tx => {
  const transition = txLastTransition(tx);
  return transition === TRANSITION_REQUEST || transition === TRANSITION_REQUEST_AFTER_ENQUIRY;
};

export const txIsAccepted = tx => txLastTransition(tx) === TRANSITION_ACCEPT;

export const txIsDeclined = tx => txLastTransition(tx) === TRANSITION_DECLINE;

export const txIsExpired = tx => txLastTransition(tx) === TRANSITION_EXPIRE;

export const txIsDeclinedOrExpired = tx => txIsDeclined(tx) || txIsExpired(tx);

export const txIsCanceled = tx => txLastTransition(tx) === TRANSITION_CANCEL;

export const txIsCompleted = tx => txLastTransition(tx) === TRANSITION_COMPLETE;

export const txHasFirstReview = tx => firstReviewTransitions.includes(txLastTransition(tx));

export const txIsReviewed = tx => areReviewsCompleted(txLastTransition(tx));

propTypes.transition = shape({
  createdAt: instanceOf(Date).isRequired,
  by: oneOf(TX_TRANSITION_ACTORS).isRequired,
  transition: oneOf(TRANSITIONS).isRequired,
});

const firstReviewTransitions = [TRANSITION_REVIEW_1_BY_CUSTOMER, TRANSITION_REVIEW_1_BY_PROVIDER];

// Check if tx transition is followed by a state where
// reviews are completed
export const areReviewsCompleted = transition => {
  return [
    TRANSITION_EXPIRE_CUSTOMER_REVIEW_PERIOD,
    TRANSITION_EXPIRE_PROVIDER_REVIEW_PERIOD,
    TRANSITION_EXPIRE_REVIEW_PERIOD,
    TRANSITION_REVIEW_2_BY_CUSTOMER,
    TRANSITION_REVIEW_2_BY_PROVIDER,
  ].includes(transition);
};

export const txHasBeenAccepted = tx => {
  const transition = txLastTransition(tx);
  return [
    TRANSITION_ACCEPT,
    TRANSITION_REVIEW_1_BY_CUSTOMER,
    TRANSITION_REVIEW_1_BY_PROVIDER,
    TRANSITION_REVIEW_2_BY_CUSTOMER,
    TRANSITION_REVIEW_2_BY_PROVIDER,
    TRANSITION_EXPIRE_CUSTOMER_REVIEW_PERIOD,
    TRANSITION_EXPIRE_PROVIDER_REVIEW_PERIOD,
    TRANSITION_EXPIRE_REVIEW_PERIOD,
    TRANSITION_COMPLETE,
  ].includes(transition);
};

// Possible amount of stars in a review
export const REVIEW_RATINGS = [1, 2, 3, 4, 5];

// Review types: review of a provider and of a customer
export const REVIEW_TYPE_OF_PROVIDER = 'ofProvider';
export const REVIEW_TYPE_OF_CUSTOMER = 'ofCustomer';

// A review on a user
propTypes.review = shape({
  id: propTypes.uuid.isRequired,
  attributes: shape({
    createdAt: instanceOf(Date).isRequired,
    content: string,
    rating: oneOf(REVIEW_RATINGS),
    state: string.isRequired,
    type: oneOf([REVIEW_TYPE_OF_PROVIDER, REVIEW_TYPE_OF_CUSTOMER]).isRequired,
  }).isRequired,
  author: propTypes.user,
  subject: propTypes.user,
});

export const LINE_ITEM_NIGHT = 'line-item/night';
export const LINE_ITEM_DAY = 'line-item/day';
export const LINE_ITEM_UNITS = 'line-item/units';
export const LINE_ITEM_CUSTOMER_COMMISSION = 'line-item/customer-commission';
export const LINE_ITEM_PROVIDER_COMMISSION = 'line-item/provider-commission';

const LINE_ITEMS = [
  LINE_ITEM_NIGHT,
  LINE_ITEM_DAY,
  LINE_ITEM_UNITS,
  LINE_ITEM_CUSTOMER_COMMISSION,
  LINE_ITEM_PROVIDER_COMMISSION,
];

propTypes.bookingUnitType = oneOf([LINE_ITEM_NIGHT, LINE_ITEM_DAY, LINE_ITEM_UNITS]);

// Denormalised transaction object
propTypes.transaction = shape({
  id: propTypes.uuid.isRequired,
  type: propTypes.value('transaction').isRequired,
  attributes: shape({
    createdAt: instanceOf(Date).isRequired,
    lastTransitionedAt: instanceOf(Date).isRequired,
    lastTransition: oneOf(TRANSITIONS).isRequired,

    // An enquiry won't need a total sum nor a booking so these are
    // optional.
    payinTotal: propTypes.money,
    payoutTotal: propTypes.money,

    lineItems: arrayOf(
      shape({
        code: oneOf(LINE_ITEMS).isRequired,
        includeFor: arrayOf(oneOf(['customer', 'provider'])).isRequired,
        quantity: instanceOf(Decimal),
        unitPrice: propTypes.money.isRequired,
        lineTotal: propTypes.money.isRequired,
        reversal: bool.isRequired,
      })
    ).isRequired,
    transitions: arrayOf(propTypes.transition).isRequired,
  }),
  booking: propTypes.booking,
  listing: propTypes.listing,
  customer: propTypes.user,
  provider: propTypes.user,
  reviews: arrayOf(propTypes.review),
});

// Denormalised transaction message
propTypes.message = shape({
  id: propTypes.uuid.isRequired,
  type: propTypes.value('message').isRequired,
  attributes: shape({
    createdAt: instanceOf(Date).isRequired,
    content: string.isRequired,
  }).isRequired,
  sender: propTypes.user,
});

// Pagination information in the response meta
propTypes.pagination = shape({
  page: number.isRequired,
  perPage: number.isRequired,
  totalItems: number.isRequired,
  totalPages: number.isRequired,
});

// Search filter definition
const filterWithOptions = shape({
  paramName: string.isRequired,
  options: arrayOf(
    shape({
      key: oneOfType([string, bool, number]).isRequired,
      label: string.isRequired,
    })
  ).isRequired,
});
const filterWithPriceConfig = shape({
  paramName: string.isRequired,
  config: shape({
    min: number.isRequired,
    max: number.isRequired,
    step: number.isRequired,
  }).isRequired,
});

propTypes.filterConfig = oneOfType([filterWithOptions, filterWithPriceConfig]);

export const ERROR_CODE_TRANSACTION_LISTING_NOT_FOUND = 'transaction-listing-not-found';
export const ERROR_CODE_TRANSACTION_INVALID_TRANSITION = 'transaction-invalid-transition';
export const ERROR_CODE_TRANSACTION_ALREADY_REVIEWED_BY_CUSTOMER =
  'transaction-already-reviewed-by-customer';
export const ERROR_CODE_TRANSACTION_ALREADY_REVIEWED_BY_PROVIDER =
  'transaction-already-reviewed-by-provider';
export const ERROR_CODE_TRANSACTION_BOOKING_TIME_NOT_AVAILABLE =
  'transaction-booking-time-not-available';
export const ERROR_CODE_PAYMENT_FAILED = 'transaction-payment-failed';
export const ERROR_CODE_CHARGE_ZERO_PAYIN = 'transaction-charge-zero-payin';
export const ERROR_CODE_CHARGE_ZERO_PAYOUT = 'transaction-charge-zero-payout';
export const ERROR_CODE_EMAIL_TAKEN = 'email-taken';
export const ERROR_CODE_EMAIL_NOT_FOUND = 'email-not-found';
export const ERROR_CODE_EMAIL_NOT_VERIFIED = 'email-unverified';
export const ERROR_CODE_TOO_MANY_VERIFICATION_REQUESTS = 'email-too-many-verification-requests';
export const ERROR_CODE_UPLOAD_OVER_LIMIT = 'request-upload-over-limit';
export const ERROR_CODE_VALIDATION_INVALID_PARAMS = 'validation-invalid-params';
export const ERROR_CODE_VALIDATION_INVALID_VALUE = 'validation-invalid-value';
export const ERROR_CODE_NOT_FOUND = 'not-found';
export const ERROR_CODE_FORBIDDEN = 'forbidden';
export const ERROR_CODE_MISSING_STRIPE_ACCOUNT = 'transaction-missing-stripe-account';

const ERROR_CODES = [
  ERROR_CODE_TRANSACTION_LISTING_NOT_FOUND,
  ERROR_CODE_TRANSACTION_INVALID_TRANSITION,
  ERROR_CODE_TRANSACTION_ALREADY_REVIEWED_BY_CUSTOMER,
  ERROR_CODE_TRANSACTION_ALREADY_REVIEWED_BY_PROVIDER,
  ERROR_CODE_PAYMENT_FAILED,
  ERROR_CODE_CHARGE_ZERO_PAYIN,
  ERROR_CODE_CHARGE_ZERO_PAYOUT,
  ERROR_CODE_EMAIL_TAKEN,
  ERROR_CODE_EMAIL_NOT_FOUND,
  ERROR_CODE_EMAIL_NOT_VERIFIED,
  ERROR_CODE_TOO_MANY_VERIFICATION_REQUESTS,
  ERROR_CODE_UPLOAD_OVER_LIMIT,
  ERROR_CODE_VALIDATION_INVALID_PARAMS,
  ERROR_CODE_VALIDATION_INVALID_VALUE,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_FORBIDDEN,
  ERROR_CODE_MISSING_STRIPE_ACCOUNT,
];

// API error
// TODO this is likely to change soonish
propTypes.apiError = shape({
  id: propTypes.uuid.isRequired,
  status: number.isRequired,
  code: oneOf(ERROR_CODES).isRequired,
  title: string.isRequired,
  meta: object,
});

// Storable error prop type. (Error object should not be stored as it is.)
propTypes.error = shape({
  type: propTypes.value('error').isRequired,
  name: string.isRequired,
  message: string,
  status: number,
  statusText: string,
  apiErrors: arrayOf(propTypes.apiError),
});

export { propTypes };
