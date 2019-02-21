import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import MapPanel from './MapPanel';

describe('MapPanel', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(<MapPanel />);
    expect(tree).toMatchSnapshot();
  });
});
