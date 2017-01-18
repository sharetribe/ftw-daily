import React from 'react';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';
import ListingPage from './ListingPage';

describe('ListingPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <ListingPage params={{ slug: 'really-nice-house-1234' }} />
      </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
