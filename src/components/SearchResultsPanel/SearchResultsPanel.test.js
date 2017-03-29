import React from 'react';
import { currencyConfig } from '../../util/test-data';
import { fakeIntl, renderShallow } from '../../util/test-helpers';
import SearchResultsPanel from './SearchResultsPanel';

describe('SearchResultsPanel', () => {
  it('matches snapshot', () => {
    const props = {
      currencyConfig,
      intl: fakeIntl,
    };
    const tree = renderShallow(<SearchResultsPanel {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
