import routeConfiguration from '../routeConfiguration';
import { createResourceLocatorString, findRouteByRouteName, canonicalRoutePath } from './routes';

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
        TypeError('Expected "slug" to be a string')
      );
      expect(() =>
        createResourceLocatorString('ListingPage', routes, { id: '1234' }, {})
      ).toThrowError(TypeError('Expected "slug" to be a string'));
      expect(() =>
        createResourceLocatorString('ListingPage', routes, { slug: 'nice-listing' }, {})
      ).toThrowError(TypeError('Expected "id" to be a string'));
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

  describe('canonicalRoutePath', () => {
    it('handles non-listing route', () => {
      const routes = routeConfiguration();
      const location = {
        pathname: '/',
        search: '?some=value',
        hash: '#and-some-hash',
      };
      expect(canonicalRoutePath(routes, location)).toEqual('/?some=value#and-some-hash');
    });
    it('handles ListingPage', () => {
      const routes = routeConfiguration();
      const location = {
        pathname: '/l/some-slug-here/00000000-0000-0000-0000-000000000000',
        search: '',
        hash: '',
      };
      expect(canonicalRoutePath(routes, location)).toEqual(
        '/l/00000000-0000-0000-0000-000000000000'
      );
    });
    it('handles ListingPage book', () => {
      const routes = routeConfiguration();
      const location = {
        pathname: '/l/some-slug-here/00000000-0000-0000-0000-000000000000?book=true',
        search: '',
        hash: '',
      };
      expect(canonicalRoutePath(routes, location)).toEqual(
        '/l/00000000-0000-0000-0000-000000000000?book=true'
      );
    });
    it('handles ListingBasePage', () => {
      const routes = routeConfiguration();
      const location = {
        pathname: '/l',
        search: '',
        hash: '',
      };
      expect(canonicalRoutePath(routes, location)).toEqual('/l');
    });
    it('handles CheckoutPage', () => {
      const routes = routeConfiguration();
      const location = {
        pathname: '/l/some-slug-here/00000000-0000-0000-0000-000000000000/checkout',
        search: '',
        hash: '',
      };
      expect(canonicalRoutePath(routes, location)).toEqual(
        '/l/some-slug-here/00000000-0000-0000-0000-000000000000/checkout'
      );
    });
    it('handles NewListingPage', () => {
      const routes = routeConfiguration();
      const location = {
        pathname: '/l/new',
        search: '',
        hash: '',
      };
      expect(canonicalRoutePath(routes, location)).toEqual('/l/new');
    });
    it('handles ListingPageCanonical', () => {
      const routes = routeConfiguration();
      const location = {
        pathname: '/l/00000000-0000-0000-0000-000000000000',
        search: '',
        hash: '',
      };
      expect(canonicalRoutePath(routes, location)).toEqual(
        '/l/00000000-0000-0000-0000-000000000000'
      );
    });
  });
});
