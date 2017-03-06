import React from 'react';
import { createListing } from '../../util/test-data';
import { fakeIntl, renderShallow } from '../../util/test-helpers';
import { ListingPageComponent } from './ListingPage';

describe('ListingPage', () => {
  it('matches snapshot', () => {
    const entitiesData = { entities: { listing: { listing1: createListing('listing1') } } };
    const tree = renderShallow(
      <ListingPageComponent
        params={{ slug: 'listing1-title', id: 'listing1' }}
        entitiesData={entitiesData}
        intl={fakeIntl}
        onLoadListing={l => l}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
