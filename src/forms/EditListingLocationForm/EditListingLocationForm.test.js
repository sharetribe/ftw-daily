// NOTE: renderdeep doesn't work due to map integration
import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { EditListingLocationFormComponent } from './EditListingLocationForm';

const noop = () => null;

describe('EditListingLocationForm', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <EditListingLocationFormComponent
        intl={fakeIntl}
        dispatch={noop}
        onSubmit={noop}
        saveActionMsg="Save location"
        updated={false}
        updateInProgress={false}
        disabled={false}
        ready={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
