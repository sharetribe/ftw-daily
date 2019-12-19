// NOTE: renderdeep doesn't work due to map integration
import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { EditListingPoliciesFormComponent } from './EditListingPoliciesForm';

const noop = () => null;

describe('EditListingPoliciesForm', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <EditListingPoliciesFormComponent
        publicData={{}}
        intl={fakeIntl}
        dispatch={noop}
        onSubmit={v => v}
        saveActionMsg="Save rules"
        updated={false}
        updateInProgress={false}
        disabled={false}
        ready={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
