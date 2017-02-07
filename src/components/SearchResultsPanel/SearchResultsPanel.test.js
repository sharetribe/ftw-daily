import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import SearchResultsPanel from './SearchResultsPanel';

describe('SearchResultsPanel', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(<SearchResultsPanel />);
    expect(tree).toMatchSnapshot();
  });
});
