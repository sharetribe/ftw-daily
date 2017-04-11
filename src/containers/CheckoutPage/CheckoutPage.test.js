import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { createUser, createListing, fakeIntl } from '../../util/test-data';
import { CheckoutPageComponent } from './CheckoutPage';
import checkoutPageReducer, { SET_INITAL_VALUES, setInitialValues } from './CheckoutPage.duck';

const noop = () => null;

describe('CheckoutPage', () => {
  it('matches snapshot', () => {
    const props = {
      bookingDates: {
        bookingStart: new Date('Fri, 14 Apr 2017 GMT'),
        bookingEnd: new Date('Sun, 16 Apr 2017 GMT'),
      },
      flattenedRoutes: [],
      history: { push: noop },
      intl: fakeIntl,
      listing: { ...createListing('listing1'), author: createUser('author') },
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
        bookingStart: new Date('Fri, 14 Apr 2017 GMT'),
        bookingEnd: new Date('Sun, 16 Apr 2017 GMT'),
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
          bookingStart: new Date('Fri, 14 Apr 2017 GMT'),
          bookingEnd: new Date('Sun, 16 Apr 2017 GMT'),
        };
        const payload = { listing, bookingDates };
        expect(checkoutPageReducer({}, { type: SET_INITAL_VALUES, payload })).toEqual(payload);
      });
    });
  });
});
