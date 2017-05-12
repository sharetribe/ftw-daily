// TODO: renderdeep doesn't work due to
// "Invariant Violation: getNodeFromInstance: Invalid argument."
// refs and findDOMNode are not supported by react-test-renderer
// (react-sortable-hoc uses them)
import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl, fakeFormProps } from '../../util/test-data';
import { EditListingPhotosFormComponent } from './EditListingPhotosForm';

const noop = () => null;

describe('EditListingPhotosForm', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <EditListingPhotosFormComponent
        {...fakeFormProps}
        initialValues={{ country: 'US', images: [] }}
        intl={fakeIntl}
        dispatch={noop}
        onImageUpload={v => v}
        onSubmit={v => v}
        onUpdateImageOrder={v => v}
        stripeConnected={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
