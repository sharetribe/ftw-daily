import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { EditListingPhotosFormComponent } from './EditListingPhotosForm';

const noop = () => null;

describe('EditListingPhotosForm', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <EditListingPhotosFormComponent
        initialValues={{ country: 'US', images: [] }}
        intl={fakeIntl}
        dispatch={noop}
        onImageUpload={v => v}
        onSubmit={v => v}
        saveActionMsg="Save photos"
        onUpdateImageOrder={v => v}
        stripeConnected={false}
        updated={false}
        ready={false}
        updateInProgress={false}
        disabled={false}
        onRemoveImage={noop}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
