import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import FilterPanel from './FilterPanel';

describe('FilterPanel', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(<FilterPanel />);
    expect(tree).toMatchSnapshot();
  });
});
