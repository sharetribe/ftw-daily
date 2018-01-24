// NOTE: renderdeep doesn't work due to Google Maps API integration
import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl, fakeFormProps } from '../../util/test-data';
import { EditListingPoliciesFormComponent } from './EditListingPoliciesForm';

const noop = () => null;

describe('EditListingPoliciesForm', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <EditListingPoliciesFormComponent
        {...fakeFormProps}
        publicData={{}}
        intl={fakeIntl}
        dispatch={noop}
        onSubmit={v => v}
        saveActionMsg="Save rules"
        updated={false}
        updateInProgress={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
