// TODO: renderdeep doesn't work due to
// "Invariant Violation: getNodeFromInstance: Invalid argument."
// refs and findDOMNode are not supported by react-test-renderer
// (react-sortable-hoc uses them)
import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import EditListingForm from './EditListingForm';

describe('EditListingForm', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(<EditListingForm images={[]} onImageUpload={v => v} onSubmit={v => v} onUpdateImageOrder={v => v} />);
    expect(tree).toMatchSnapshot();
  });
});
