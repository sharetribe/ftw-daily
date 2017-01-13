import React from 'react';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';
import PayoutPreferencesPage from './PayoutPreferencesPage';

describe('PayoutPreferencesPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <PayoutPreferencesPage />
      </BrowserRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
