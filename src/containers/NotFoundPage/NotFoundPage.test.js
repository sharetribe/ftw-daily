import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { NotFoundPageComponent } from './NotFoundPage';

const noop = () => null;

describe('NotFoundPageComponent', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <NotFoundPageComponent
        params={{ displayName: 'my-shop' }}
        history={{ push: noop }}
        location={{ search: '' }}
        scrollingDisabled={false}
        authInProgress={false}
        currentUserHasListings={false}
        isAuthenticated={false}
        onLogout={noop}
        onManageDisableScrolling={noop}
        sendVerificationEmailInProgress={false}
        onResendVerificationEmail={noop}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
