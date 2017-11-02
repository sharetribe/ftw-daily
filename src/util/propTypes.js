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

// Denormalised user object
export const currentUser = shape({
  id: uuid.isRequired,
  type: value('current-user').isRequired,
  attributes: shape({
    banned: bool.isRequired,
    email: string.isRequired,
    emailVerified: bool.isRequired,
    profile: shape({
      firstName: string.isRequired,
      lastName: string.isRequired,
      displayName: string.isRequired,
      abbreviatedName: string.isRequired,
    }).isRequired,
    stripeConnected: bool.isRequired,
  }),
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
    }),
  }),
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

export const TX_TRANSITIONS = [
  TX_TRANSITION_PREAUTHORIZE,
  TX_TRANSITION_ACCEPT,
  TX_TRANSITION_DECLINE,
  TX_TRANSITION_AUTO_DECLINE,
  TX_TRANSITION_CANCEL,
  TX_TRANSITION_MARK_DELIVERED,
];

const txLastTransition = tx => ensureTransaction(tx).attributes.lastTransition;

export const txIsPreauthorized = tx => txLastTransition(tx) === TX_TRANSITION_PREAUTHORIZE;

export const txIsAccepted = tx => txLastTransition(tx) === TX_TRANSITION_ACCEPT;

export const txIsDeclined = tx => txLastTransition(tx) === TX_TRANSITION_DECLINE;

export const txIsAutodeclined = tx => txLastTransition(tx) === TX_TRANSITION_AUTO_DECLINE;

export const txIsDeclinedOrAutodeclined = tx => txIsDeclined(tx) || txIsAutodeclined(tx);

export const txIsCanceled = tx => txLastTransition(tx) === TX_TRANSITION_CANCEL;

export const txIsDelivered = tx => txLastTransition(tx) === TX_TRANSITION_MARK_DELIVERED;

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
  }),
  booking,
  listing,
  customer: user,
  provider: user,
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
