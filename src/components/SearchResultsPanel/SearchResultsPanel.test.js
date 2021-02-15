import React from 'react';
import { fakeIntl } from '../../util/test-data';
import { renderShallow } from '../../util/test-helpers';
import SearchResultsPanel from './SearchResultsPanel';

describe('SearchResultsPanel', () => {
  it('matches snapshot', () => {
    const props = {
      intl: fakeIntl,
    };
    const tree = renderShallow(<SearchResultsPanel {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
