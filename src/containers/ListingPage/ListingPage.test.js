import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import ListingPage from './ListingPage';

describe('ListingPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(<ListingPage params={{ slug: 'banyan-studios', id: 1234 }} />);
    expect(tree).toMatchSnapshot();
  });
});
