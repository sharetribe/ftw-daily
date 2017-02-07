import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import PayoutPreferencesPage from './PayoutPreferencesPage';

describe('PayoutPreferencesPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(<PayoutPreferencesPage />);
    expect(tree).toMatchSnapshot();
  });
});
