import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { ProfilePageComponent } from './ProfilePage';

const noop = () => null;

describe('ProfilePage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <ProfilePageComponent
        params={{ displayName: 'most-awesome-shop' }}
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
