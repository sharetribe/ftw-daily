import React from 'react';
import renderer from 'react-test-renderer';
import { TestProvider } from '../../util/test-helpers';
import ListingPage from './ListingPage';

describe('ListingPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      (
        <TestProvider>
          <ListingPage params={{ slug: 'really-nice-house-1234', id: 1234 }} />
        </TestProvider>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
