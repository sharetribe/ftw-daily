import React from 'react';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';
import AuthenticationPage from './AuthenticationPage';

describe('AuthenticationPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      (
        <BrowserRouter>
          <AuthenticationPage location={{ state: { from: '/protected' } }} />
        </BrowserRouter>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
