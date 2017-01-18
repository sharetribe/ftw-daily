import React from 'react';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';
import PasswordForgottenPage from './PasswordForgottenPage';

describe('PasswordForgottenPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <PasswordForgottenPage />
      </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
