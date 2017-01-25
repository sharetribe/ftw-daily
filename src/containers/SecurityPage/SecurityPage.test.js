import React from 'react';
import renderer from 'react-test-renderer';
import { TestProvider } from '../../util/test-helpers';
import SecurityPage from './SecurityPage';

describe('SecurityPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      (
        <TestProvider>
          <SecurityPage />
        </TestProvider>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
