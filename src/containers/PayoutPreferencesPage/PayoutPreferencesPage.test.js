import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl, createCurrentUser } from '../../util/test-data';
import { PayoutPreferencesPageComponent } from './PayoutPreferencesPage';

const noop = () => null;

describe('PayoutPreferencesPage', () => {
  it('matches snapshot with Stripe not connected', () => {
    const currentUser = createCurrentUser('stripe-not-connected', {
      stripeConnected: false,
    });
    expect(currentUser.attributes.stripeConnected).toEqual(false);
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
    const currentUser = createCurrentUser('stripe-connected');
    expect(currentUser.attributes.stripeConnected).toEqual(true);
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
    const currentUser = createCurrentUser('stripe-connected');
    expect(currentUser.attributes.stripeConnected).toEqual(true);
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
