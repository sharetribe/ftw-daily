import { createUser, createTransaction, createListing, createTxTransition } from './test-data';

import {
  TX_TRANSITION_ACTOR_CUSTOMER,
  TX_TRANSITION_ACTOR_PROVIDER,
  TX_TRANSITION_ACTOR_SYSTEM,
  TRANSITION_REQUEST,
  TRANSITION_ACCEPT,
  TRANSITION_COMPLETE,
  TRANSITION_EXPIRE_REVIEW_PERIOD,
  txIsAccepted,
  txIsReviewed,
  txHasBeenAccepted,
  txHasBeenDelivered,
} from './transaction';

const transitionRequest = createTxTransition({
  createdAt: new Date(Date.UTC(2017, 10, 9, 8, 10)),
  by: TX_TRANSITION_ACTOR_CUSTOMER,
  transition: TRANSITION_REQUEST,
});

const transitionAccept = createTxTransition({
  createdAt: new Date(Date.UTC(2017, 10, 9, 8, 12)),
  by: TX_TRANSITION_ACTOR_PROVIDER,
  transition: TRANSITION_ACCEPT,
});

const transitionDelivered = createTxTransition({
  createdAt: new Date(Date.UTC(2017, 10, 16, 8, 12)),
  by: TX_TRANSITION_ACTOR_SYSTEM,
  transition: TRANSITION_COMPLETE,
});
const transitionReviewed = createTxTransition({
  createdAt: new Date(Date.UTC(2017, 10, 16, 8, 12)),
  by: TX_TRANSITION_ACTOR_SYSTEM,
  transition: TRANSITION_EXPIRE_REVIEW_PERIOD,
});

const txRequested = createTransaction({
  lastTransition: TRANSITION_REQUEST,
  customer: createUser('user1'),
  provider: createUser('user2'),
  listing: createListing('Listing'),
  transitions: [transitionRequest],
});

const txAccepted = createTransaction({
  lastTransition: TRANSITION_ACCEPT,
  customer: createUser('user1'),
  provider: createUser('user2'),
  listing: createListing('Listing'),
  transitions: [transitionRequest, transitionAccept],
});

const txReviewed = createTransaction({
  lastTransition: TRANSITION_EXPIRE_REVIEW_PERIOD,
  customer: createUser('user1'),
  provider: createUser('user2'),
  listing: createListing('Listing'),
  transitions: [transitionRequest, transitionAccept, transitionDelivered, transitionReviewed],
});

describe('transaction utils', () => {
  describe('tx is in correct state', () => {
    it(`txIsReviewed(txReviewed) succeeds with last transaction: ${TRANSITION_EXPIRE_REVIEW_PERIOD}`, () => {
      expect(txIsReviewed(txReviewed)).toEqual(true);
    });
    it(`txIsAccepted(txReviewed) fails with last transaction: ${TRANSITION_EXPIRE_REVIEW_PERIOD}`, () => {
      expect(txIsAccepted(txReviewed)).toEqual(false);
    });
  });

  describe('tx has passed a state X', () => {
    it('txHasBeenAccepted(txRequested) fails', () => {
      expect(txHasBeenAccepted(txRequested)).toEqual(false);
    });
    it('txHasBeenDelivered(txRequest) fails', () => {
      expect(txHasBeenDelivered(txRequested)).toEqual(false);
    });

    it('txHasBeenAccepted(txAccepted) succeeds', () => {
      expect(txHasBeenAccepted(txAccepted)).toEqual(true);
    });
    it('txHasBeenDelivered(txAccepted) fails', () => {
      expect(txHasBeenDelivered(txAccepted)).toEqual(false);
    });

    it('txHasBeenAccepted(txReviewed) succeeds', () => {
      expect(txHasBeenAccepted(txReviewed)).toEqual(true);
    });
    it('txHasBeenDelivered(txReviewed) succeeds', () => {
      expect(txHasBeenDelivered(txReviewed)).toEqual(true);
    });
  });
});
