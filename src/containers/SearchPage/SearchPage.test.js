import React from 'react';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';
import { SearchPage } from './SearchPage';

describe('SearchPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
