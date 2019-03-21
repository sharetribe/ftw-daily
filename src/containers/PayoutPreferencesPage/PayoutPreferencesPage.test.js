import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl, createCurrentUser, createStripeAccount } from '../../util/test-data';
import { PayoutPreferencesPageComponent } from './PayoutPreferencesPage';

const noop = () => null;

describe('PayoutPreferencesPage', () => {
  it('matches snapshot with Stripe not connected', () => {
    const currentUser = createCurrentUser('stripe-not-connected');
    expect(currentUser.stripeAccount).toBeUndefined();
    const tree = renderShallow(
      <PayoutPreferencesPageComponent
        currentUser={currentUser}
        scrollingDisabled={false}
        payoutDetailsSaveInProgress={false}
        payoutDetailsSaved={false}
        onPayoutDetailsFormChange={noop}
        onPayoutDetailsFormSubmit={noop}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });
  it('matches snapshot with Stripe connected', () => {
    const currentUser = createCurrentUser(
      'stripe-connected',
      {},
      {
        stripeAccount: createStripeAccount(),
      }
    );
    expect(currentUser.stripeAccount).toBeDefined();
    const tree = renderShallow(
      <PayoutPreferencesPageComponent
        currentUser={currentUser}
        scrollingDisabled={false}
        payoutDetailsSaveInProgress={false}
        payoutDetailsSaved={false}
        onPayoutDetailsFormChange={noop}
        onPayoutDetailsFormSubmit={noop}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });
  it('matches snapshot with details submitted', () => {
    const currentUser = createCurrentUser(
      'stripe-connected',
      {},
      {
        stripeAccount: createStripeAccount(),
      }
    );
    expect(currentUser.stripeAccount).toBeDefined();
    const tree = renderShallow(
      <PayoutPreferencesPageComponent
        currentUser={currentUser}
        scrollingDisabled={false}
        payoutDetailsSaveInProgress={false}
        payoutDetailsSaved={true}
        onPayoutDetailsFormChange={noop}
        onPayoutDetailsFormSubmit={noop}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
