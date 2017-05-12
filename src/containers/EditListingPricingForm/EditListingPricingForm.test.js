import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import { fakeIntl, fakeFormProps } from '../../util/test-data';
import EditListingPricingForm from './EditListingPricingForm';

const noop = () => null;

describe('EditListingPricingForm', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(
      <EditListingPricingForm
        {...fakeFormProps}
        intl={fakeIntl}
        dispatch={noop}
        onSubmit={v => v}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
