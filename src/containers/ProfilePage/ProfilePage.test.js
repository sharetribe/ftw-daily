import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { createUser, fakeIntl } from '../../util/test-data';
import { ProfilePageComponent } from './ProfilePage';

const noop = () => null;

describe('ProfilePage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <ProfilePageComponent
        scrollingDisabled={false}
        user={createUser('test-user')}
        userShowInProgress={false}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
