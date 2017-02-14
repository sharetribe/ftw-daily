import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import ListingCardSmall from './ListingCardSmall';

describe('ListingCardSmall', () => {
  it('matches snapshot', () => {
    const listing = {
      id: 123,
      title: 'Banyan Studios',
      price: '55\u20AC / day',
      description: 'Organic Music Production in a Sustainable, Ethical and Professional Studio.',
      location: 'New York, NY \u2022 40mi away',
      review: { count: '8 reviews', rating: '4' },
      author: {
        name: 'The Stardust Collective',
        avatar: 'http://placehold.it/44x44',
        review: { rating: '4' },
      },
    };
    const tree = renderShallow(<ListingCardSmall {...listing} />);
    expect(tree).toMatchSnapshot();
  });
});
