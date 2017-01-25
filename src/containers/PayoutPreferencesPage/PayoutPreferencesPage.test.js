import React from 'react';
import renderer from 'react-test-renderer';
import { TestProvider } from '../../util/test-helpers';
import PayoutPreferencesPage from './PayoutPreferencesPage';

describe('PayoutPreferencesPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      (
        <TestProvider>
          <PayoutPreferencesPage />
        </TestProvider>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
