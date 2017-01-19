import React from 'react';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';
import PasswordChangePage from './PasswordChangePage';

describe('PasswordChangePage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      (
        <BrowserRouter>
          <PasswordChangePage />
        </BrowserRouter>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
