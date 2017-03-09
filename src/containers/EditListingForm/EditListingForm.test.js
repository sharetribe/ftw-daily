import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import EditListingForm from './EditListingForm';

describe('EditListingForm', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(<EditListingForm images={[]} />);
    expect(tree).toMatchSnapshot();
  });
});
