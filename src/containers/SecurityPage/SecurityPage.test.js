import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { SecurityPageComponent } from './SecurityPage';

const noop = () => null;

describe('SecurityPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <SecurityPageComponent
        params={{ displayName: 'my-shop' }}
        history={{ push: noop }}
        location={{ search: '' }}
        scrollingDisabled={false}
        authInProgress={false}
        currentUserHasListings={false}
        isAuthenticated={false}
        onLogout={noop}
        onManageDisableScrolling={noop}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
