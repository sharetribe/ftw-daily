import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { EditListingPageComponent } from './EditListingPage';

describe('EditListingPageComponent', () => {
  it('matches snapshot', () => {
    const state = {
      marketplaceData: {
        entities: {},
      },
    };
    const tree = renderShallow(
      <EditListingPageComponent
        storeState={state}
        images={[]}
        intl={fakeIntl}
        onCreateListing={v => v}
        onLoadListing={v => v}
        onImageUpload={v => v}
        onUpdateImageOrder={v => v}
        page={{ imageOrder: [], images: {} }}
        type="new"
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
