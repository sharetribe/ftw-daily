import React from 'react';
import { fakeIntl } from '../../util/test-data';
import { renderShallow } from '../../util/test-helpers';
import { LandingPageComponent } from './LandingPage';
import { RoutesProvider } from '../../components';
import routeConfiguration from '../../routeConfiguration';

const noop = () => null;

describe('LandingPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <LandingPageComponent
        history={{ push: noop }}
        location={{ search: '' }}
        scrollingDisabled={false}
        authInProgress={false}
        currentUserHasListings={false}
        intl={fakeIntl}
        isAuthenticated={false}
        onLogout={noop}
        onManageDisableScrolling={noop}
        sendVerificationEmailInProgress={false}
        onResendVerificationEmail={noop}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
