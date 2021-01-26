import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import EditListingHorseForm from './EditListingHorseForm';

const noop = () => null;

describe('EditListingHorseForm', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(
      <EditListingHorseForm
        intl={fakeIntl}
        dispatch={noop}
        onSubmit={v => v}
        saveActionMsg="Save description"
        updated={false}
        updateInProgress={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
