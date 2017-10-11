import React from 'react';
import { fakeIntl } from '../../util/test-data';
import { renderDeep } from '../../util/test-helpers';
import TopbarDesktop from './TopbarDesktop';

const noop = () => null;

describe('TopbarDesktop', () => {
  it('data matches snapshot', () => {
    window.google = { maps: {} };
    const topbarProps = {
      isAuthenticated: true,
      currentUserHasListings: true,
      name: 'John Doe',
      onSearchSubmit: noop,
      intl: fakeIntl,
      onLogout: noop,
    };
    const tree = renderDeep(<TopbarDesktop {...topbarProps} />);
    delete window.google;
    expect(tree).toMatchSnapshot();
  });
});
