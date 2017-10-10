import React, { PropTypes } from 'react';
import { RoutesProvider } from '../components';
import routeConfiguration from '../routeConfiguration';
import { renderDeep, renderShallow } from './test-helpers';
import * as propTypes from './propTypes';
import { createResourceLocatorString, flattenRoutes, findRouteByRouteName } from './routes';

const { arrayOf } = PropTypes;

describe('util/routes.js', () => {
  describe('createResourceLocatorString', () => {
    const flattenedRoutes = flattenRoutes(routeConfiguration());

    it('should return meaningful strings if parameters are not needed', () => {
      // default links without params in path or search query
      expect(
        createResourceLocatorString('SearchPage', flattenedRoutes, undefined, undefined)
      ).toEqual('/s');
      expect(createResourceLocatorString('SearchPage', flattenedRoutes, {}, {})).toEqual('/s');
    });

    it('should return meaningful strings with path parameters', () => {
      expect(
        createResourceLocatorString(
          'ListingPage',
          flattenedRoutes,
          { id: '1234', slug: 'nice-listing' },
          {}
        )
      ).toEqual('/l/nice-listing/1234');
      expect(() =>
        createResourceLocatorString('ListingPage', flattenedRoutes, {}, {})).toThrowError(
        TypeError('Expected "slug" to be defined')
      );
      expect(() =>
        createResourceLocatorString(
          'ListingPage',
          flattenedRoutes,
          { id: '1234' },
          {}
        )).toThrowError(TypeError('Expected "slug" to be defined'));
      expect(() =>
        createResourceLocatorString(
          'ListingPage',
          flattenedRoutes,
          { slug: 'nice-listing' },
          {}
        )).toThrowError(TypeError('Expected "id" to be defined'));
    });

    it('should return meaningful strings with search parameters', () => {
      expect(createResourceLocatorString('SearchPage', flattenedRoutes, {}, { page: 2 })).toEqual(
        '/s?page=2'
      );
      expect(
        createResourceLocatorString(
          'SearchPage',
          flattenedRoutes,
          {},
          { address: 'Helsinki', page: 2 }
        )
      ).toEqual('/s?address=Helsinki&page=2');
    });

    it('should return meaningful strings with path and search parameters', () => {
      expect(
        createResourceLocatorString(
          'ListingPage',
          flattenedRoutes,
          { id: '1234', slug: 'nice-listing' },
          { extrainfo: true }
        )
      ).toEqual('/l/nice-listing/1234?extrainfo=true');
    });
  });

  describe('findRouteByRouteName', () => {
    const flattenedRoutes = flattenRoutes(routeConfiguration());
    it('should return CheckoutPage route', () => {
      const foundRoute = findRouteByRouteName('CheckoutPage', flattenedRoutes);
      expect(foundRoute.name).toEqual('CheckoutPage');
      expect(typeof foundRoute.setInitialValues).toEqual('function');
    });

    it('should throw exception for non-existing route (BlaaBlaaPage)', () => {
      expect(() => findRouteByRouteName('BlaaBlaaPage', flattenedRoutes)).toThrowError(
        'Component "BlaaBlaaPage" was not found.'
      );
    });
  });
});
