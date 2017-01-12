import React from 'react';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';
import LandingPage from './LandingPage';

describe('LandingPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
