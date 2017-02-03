/* eslint-disable import/prefer-default-export, no-unused-vars */
const fakeListings = [
  {
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
  },
  {
    id: 1234,
    title: 'Pienix Studio',
    price: '80\u20AC / day',
    description: 'Pienix Studio specializes in music mixing and mastering production.',
    location: 'New York, NY \u2022 6mi away',
    review: { count: '7 reviews', rating: '4' },
    author: { name: 'Juhan', avatar: 'http://placehold.it/44x44', review: { rating: '4' } },
  },
];
/* eslint-enable import/prefer-default-export */

exports.fetchListings = () => {
  const randomTime = Math.random() * 2000;
  const fakeResponseTime = 1000 + randomTime;

  const fakeFetch = new Promise((resolve, reject) => {
    setTimeout(
      () => {
        resolve({ response: fakeListings });
        // or reject({ error: new Error('FetchListings errored') );
      },
      fakeResponseTime,
    );
  });
  return fakeFetch;
};
