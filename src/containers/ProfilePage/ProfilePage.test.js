import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { createUser, fakeIntl, fakeViewport } from '../../util/test-data';
import { ProfilePageComponent } from './ProfilePage';

describe('ProfilePage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <ProfilePageComponent
        scrollingDisabled={false}
        user={createUser('test-user')}
        userShowInProgress={false}
        listings={[]}
        viewport={fakeViewport}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
