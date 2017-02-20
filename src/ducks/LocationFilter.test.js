import reducer, { CHANGE_LOCATION, changeLocationFilter } from './LocationFilter.duck';

describe('LocationFilterDuck', () => {
  describe('actions', () => {
    it('should create an action to change the filter', () => {
      const expectedAction = { type: CHANGE_LOCATION, payload: 'helsinki' };
      expect(changeLocationFilter('helsinki')).toEqual(expectedAction);
    });
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      const initial = reducer(undefined, {});
      expect(initial).toEqual('');
    });

    it('should handle CHANGE_LOCATION', () => {
      const addFilter1 = changeLocationFilter('Helsinki');
      const addFilter2 = changeLocationFilter('Espoo');
      const reduced = reducer('', addFilter1);

      const reducedWithInitialContent = reducer(addFilter1.payload, addFilter2);
      expect(reduced).toEqual(addFilter1.payload);
      expect(reducedWithInitialContent).toEqual(addFilter2.payload);
    });
  });
});
