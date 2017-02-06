import React from 'react';
import { renderTree } from '../../util/test-helpers';
import PayoutPreferencesPage from './PayoutPreferencesPage';

describe('PayoutPreferencesPage', () => {
  it('matches snapshot', () => {
    const tree = renderTree(<PayoutPreferencesPage />);
    expect(tree).toMatchSnapshot();
  });
});
