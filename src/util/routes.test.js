import React, { PropTypes } from 'react'; // eslint-disable-line react/no-deprecated
import { RoutesProvider } from '../components';
import routeConfiguration from '../routeConfiguration';
import { renderDeep, renderShallow } from './test-helpers';
import * as propTypes from './propTypes';
import { createResourceLocatorString, findRouteByRouteName } from './routes';

const { arrayOf } = PropTypes;

describe('util/routes.js', () => {
  describe('createResourceLocatorString', () => {
    const routes = routeConfiguration();

    it('should return meaningful strings if parameters are not needed', () => {
      // default links without params in path or search query
      expect(createResourceLocatorString('SearchPage', routes, undefined, undefined)).toEqual('/s');
      expect(createResourceLocatorString('SearchPage', routes, {}, {})).toEqual('/s');
    });

    it('should return meaningful strings with path parameters', () => {
      expect(
        createResourceLocatorString('ListingPage', routes, { id: '1234', slug: 'nice-listing' }, {})
      ).toEqual('/l/nice-listing/1234');
      expect(() => createResourceLocatorString('ListingPage', routes, {}, {})).toThrowError(
        TypeError('Expected "slug" to be defined')
      );
      expect(() =>
        createResourceLocatorString('ListingPage', routes, { id: '1234' }, {})).toThrowError(
        TypeError('Expected "slug" to be defined')
      );
      expect(() =>
        createResourceLocatorString(
          'ListingPage',
          routes,
          { slug: 'nice-listing' },
          {}
        )).toThrowError(TypeError('Expected "id" to be defined'));
    });

    it('should return meaningful strings with search parameters', () => {
      expect(createResourceLocatorString('SearchPage', routes, {}, { page: 2 })).toEqual(
        '/s?page=2'
      );
      expect(
        createResourceLocatorString('SearchPage', routes, {}, { address: 'Helsinki', page: 2 })
      ).toEqual('/s?address=Helsinki&page=2');
    });

    it('should return meaningful strings with path and search parameters', () => {
      expect(
        createResourceLocatorString(
          'ListingPage',
          routes,
          { id: '1234', slug: 'nice-listing' },
          { extrainfo: true }
        )
      ).toEqual('/l/nice-listing/1234?extrainfo=true');
    });
  });

  describe('findRouteByRouteName', () => {
    const routes = routeConfiguration();
    it('should return CheckoutPage route', () => {
      const foundRoute = findRouteByRouteName('CheckoutPage', routes);
      expect(foundRoute.name).toEqual('CheckoutPage');
      expect(typeof foundRoute.setInitialValues).toEqual('function');
    });

    it('should throw exception for non-existing route (BlaaBlaaPage)', () => {
      expect(() => findRouteByRouteName('BlaaBlaaPage', routes)).toThrowError(
        'Component "BlaaBlaaPage" was not found.'
      );
    });
  });
});
