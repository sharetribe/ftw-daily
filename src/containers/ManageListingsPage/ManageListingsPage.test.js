import React from 'react';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';
import ManageListingsPage from './ManageListingsPage';

describe('ManageListingsPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <ManageListingsPage />
      </BrowserRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
