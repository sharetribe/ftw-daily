// TODO: renderdeep doesn't work due to Google Maps API integration
import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl, fakeFormProps } from '../../util/test-data';
import { EditListingLocationFormComponent } from './EditListingLocationForm';

const noop = () => null;

describe('EditListingLocationForm', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <EditListingLocationFormComponent
        {...fakeFormProps}
        intl={fakeIntl}
        dispatch={noop}
        onSubmit={v => v}
        saveActionMsg="Save location"
        updated={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
