import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { createUser, createCurrentUser, createListing, fakeIntl } from '../../util/test-data';
import { CheckoutPageComponent } from './CheckoutPage';
import checkoutPageReducer, { SET_INITAL_VALUES, setInitialValues } from './CheckoutPage.duck';

const noop = () => null;

describe('CheckoutPage', () => {
  it('matches snapshot', () => {
    const listing = createListing('listing1', createUser('author'));
    const props = {
      bookingDates: {
        bookingStart: new Date(Date.UTC(2017, 3, 14)),
        bookingEnd: new Date(Date.UTC(2017, 3, 16)),
      },
      flattenedRoutes: [],
      history: { push: noop },
      intl: fakeIntl,
      listing,
      currentUser: createCurrentUser('current-user'),
      params: { id: 'listing1', slug: 'listing1' },
      sendOrderRequest: noop,
    };
    const tree = renderShallow(<CheckoutPageComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });

  describe('Duck', () => {
    it('ActionCreator: setInitialValues(initialValues)', () => {
      const author = createUser('author1');
      const listing = { ...createListing('00000000-0000-0000-0000-000000000000'), author };
      const bookingDates = {
        bookingStart: new Date(Date.UTC(2017, 3, 14)),
        bookingEnd: new Date(Date.UTC(2017, 3, 16)),
      };
      const expectedAction = {
        type: SET_INITAL_VALUES,
        payload: { listing, bookingDates },
      };

      expect(setInitialValues({ listing, bookingDates })).toEqual(expectedAction);
    });

    describe('Reducer', () => {
      it('should return the initial state', () => {
        const initialValues = {
          initiateOrderError: null,
          listing: null,
          bookingDates: null,
        };
        expect(checkoutPageReducer(undefined, {})).toEqual(initialValues);
      });

      it('should handle SET_INITAL_VALUES', () => {
        const author = createUser('author1');
        const listing = { ...createListing('00000000-0000-0000-0000-000000000000'), author };
        const bookingDates = {
          bookingStart: new Date(Date.UTC(2017, 3, 14)),
          bookingEnd: new Date(Date.UTC(2017, 3, 16)),
        };
        const payload = { listing, bookingDates };
        expect(checkoutPageReducer({}, { type: SET_INITAL_VALUES, payload })).toEqual(payload);
      });
    });
  });
});
