import React from 'react';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      (
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
