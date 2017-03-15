import React from 'react';
import { fakeIntl, renderShallow } from '../../util/test-helpers';
import { EditListingPageComponent } from './EditListingPage';

describe('EditListingPageComponent', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <EditListingPageComponent
        data={{ entities: {} }}
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
