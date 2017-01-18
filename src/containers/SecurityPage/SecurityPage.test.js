import React from 'react';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';
import SecurityPage from './SecurityPage';

describe('SecurityPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <SecurityPage />
      </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
