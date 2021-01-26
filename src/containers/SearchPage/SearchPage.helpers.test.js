import {
  validURLParamForExtendedData,
  validFilterParams,
  validURLParamsForExtendedData,
  pickSearchParamsOnly,
} from './SearchPage.helpers.js';

const urlParams = {
  pub_category: 'smoke',
  pub_amenities: 'towels,bathroom',
};

const filters = {
  categoryFilter: {
    paramName: 'pub_category',
    options: [{ key: 'smoke' }, { key: 'wooden' }],
  },
  amenitiesFilter: {
    paramName: 'pub_amenities',
    options: [{ key: 'towels' }, { key: 'bathroom' }],
  },
};

describe('SearchPage.helpers', () => {
  describe('validURLParamForExtendedData', () => {
    it('returns a valid parameter', () => {
      const validParam = validURLParamForExtendedData('pub_category', 'smoke', filters);
      expect(validParam).toEqual({ pub_category: 'smoke' });
    });

    it('takes empty params', () => {
      const validParam = validURLParamForExtendedData('pub_category', '', filters);
      expect(validParam).toEqual({});
    });

    it('drops an invalid param value', () => {
      const validParam = validURLParamForExtendedData('pub_category', 'invalid', filters);
      expect(validParam).toEqual({});
    });

    it('drops a param with invalid name', () => {
      const validParam = validURLParamForExtendedData('pub_invalid', 'towels', filters);
      expect(validParam).toEqual({});
    });
  });

  describe('validFilterParams', () => {
    it('returns valid parameters', () => {
      const validParams = validFilterParams(urlParams, filters);
      expect(validParams).toEqual(urlParams);
    });

    it('takes empty params', () => {
      const validParams = validFilterParams({}, filters);
      expect(validParams).toEqual({});
    });

    it('drops an invalid filter param value', () => {
      const params = { pub_category: 'smoke', pub_amenities: 'invalid1,invalid2' };
      const validParams = validFilterParams(params, filters);
      expect(validParams).toEqual({ pub_category: 'smoke' });
    });

    it('drops non-filter params', () => {
      const params = { pub_category: 'smoke', other_param: 'somevalue' };
      const validParams = validFilterParams(params, filters);
      expect(validParams).toEqual({ pub_category: 'smoke' });
    });
  });

  describe('validURLParamsForExtendedData', () => {
    it('returns valid parameters', () => {
      const validParams = validURLParamsForExtendedData(urlParams, filters);
      expect(validParams).toEqual(urlParams);
    });

    it('takes empty params', () => {
      const validParams = validURLParamsForExtendedData({}, filters);
      expect(validParams).toEqual({});
    });

    it('drops an invalid filter param value', () => {
      const params = { pub_category: 'smoke', pub_amenities: 'invalid1,invalid2' };
      const validParams = validURLParamsForExtendedData(params, filters);
      expect(validParams).toEqual({ pub_category: 'smoke' });
    });

    it('returns non-filter params', () => {
      const params = { pub_category: 'smoke', other_param: 'somevalue' };
      const validParams = validURLParamsForExtendedData(params, filters);
      expect(validParams).toEqual(params);
    });
  });

  describe('pickSearchParamsOnly', () => {
    it('returns search parameters', () => {
      const params = {
        address: 'address value',
        origin: 'origin value',
        bounds: 'bounds value',
      };
      const validParams = pickSearchParamsOnly(params, filters);
      expect(validParams).toEqual({ bounds: 'bounds value' });
    });

    it('returns filter parameters', () => {
      const validParams = pickSearchParamsOnly(urlParams, filters);
      expect(validParams).toEqual(urlParams);
    });

    it('drops an invalid filter param value', () => {
      const params = { pub_category: 'smoke', pub_amenities: 'invalid1,invalid2' };
      const validParams = pickSearchParamsOnly(params, filters);
      expect(validParams).toEqual({ pub_category: 'smoke' });
    });

    it('drops non-search params', () => {
      const params = { pub_category: 'smoke', other_param: 'somevalue' };
      const validParams = pickSearchParamsOnly(params, filters);
      expect(validParams).toEqual({ pub_category: 'smoke' });
    });
  });
});
