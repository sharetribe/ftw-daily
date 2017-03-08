import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import EditListingForm from './EditListingForm';

describe('EditListingForm', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(<EditListingForm />);
    expect(tree).toMatchSnapshot();
  });
});
