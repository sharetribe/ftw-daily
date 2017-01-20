import React from 'react';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';
import { SearchPageComponent } from './SearchPage';
import reducer, { ADD_FILTER, addFilter } from './SearchPage.ducks';

describe('SearchPageComponent', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      (
        <BrowserRouter>
          <SearchPageComponent />
        </BrowserRouter>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('SearchPageDucs', () => {
  describe('actions', () => {
    it('should create an action to add a filter', () => {
      const expectedAction = { type: ADD_FILTER, payload: { location: 'helsinki' } };
      expect(addFilter('location', 'helsinki')).toEqual(expectedAction);
    });
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      const initial = reducer(undefined, {});
      expect(initial).toEqual({});
    });

    it('should handle ADD_FILTER', () => {
      const addFilter1 = addFilter('location', 'helsinki');
      const addFilter2 = addFilter('gears', 3);
      const reduced = reducer([], addFilter1);
      const reducedWithInitialContent = reducer({ filters: [ addFilter1.payload ] }, addFilter2);
      expect(reduced).toEqual({ filters: [ addFilter1.payload ] });
      expect(reducedWithInitialContent).toEqual({ filters: [ addFilter1.payload, addFilter2.payload ] });
    });

    it('should handle duplicates ADD_FILTER', () => {
      const filter = { location: 'helsinki' };
      const addFilter = { type: ADD_FILTER, payload: filter };
      const reducedWithInitialContent = reducer({ filters: [ filter ] }, addFilter);
      expect(reducedWithInitialContent).toEqual({ filters: [ filter ] });
    });
  });
});
