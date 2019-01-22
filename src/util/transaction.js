import { ensureTransaction } from './data';

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

const txLastTransition = tx => ensureTransaction(tx).attributes.lastTransition;

export const txIsEnquired = tx => txLastTransition(tx) === TRANSITION_ENQUIRE;

export const transitionsToRequested = [TRANSITION_REQUEST, TRANSITION_REQUEST_AFTER_ENQUIRY];
export const txIsRequested = tx => transitionsToRequested.includes(txLastTransition(tx));

export const txIsAccepted = tx => txLastTransition(tx) === TRANSITION_ACCEPT;

export const txIsDeclined = tx => txLastTransition(tx) === TRANSITION_DECLINE;

export const txIsExpired = tx => txLastTransition(tx) === TRANSITION_EXPIRE;

export const txIsDeclinedOrExpired = tx => txIsDeclined(tx) || txIsExpired(tx);

export const txIsCanceled = tx => txLastTransition(tx) === TRANSITION_CANCEL;

export const txIsCompleted = tx => txLastTransition(tx) === TRANSITION_COMPLETE;

const firstReviewTransitions = [TRANSITION_REVIEW_1_BY_CUSTOMER, TRANSITION_REVIEW_1_BY_PROVIDER];
export const txHasFirstReview = tx => firstReviewTransitions.includes(txLastTransition(tx));

export const txIsReviewed = tx => areReviewsCompleted(txLastTransition(tx));

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

export const txHasBeenDelivered = tx => {
  return txHasFirstReview(tx) || txIsReviewed(tx) || txIsCompleted(tx);
};

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
