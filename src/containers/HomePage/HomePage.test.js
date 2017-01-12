import React from 'react';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
