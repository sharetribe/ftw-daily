import React from 'react';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';
import { SearchPageComponent } from './SearchPage';
import reducer, { addFilter } from './SearchPageDucks';

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
  const ADD_FILTER = 'ADD_FILTER';

  describe('actions', () => {
    it('should create an action to add a filter', () => {
      const expectedAction = { type: ADD_FILTER, payload: { location: 'helsinki' } };
      const serializedExpectations = JSON.stringify(expectedAction);
      expect(JSON.stringify(addFilter('location', 'helsinki'))).toEqual(serializedExpectations);
    });
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      const initial = reducer(undefined, {});
      expect(initial).toEqual({});
    });

    it('should handle ADD_FILTER', () => {
      const filter1 = { location: 'helsinki' };
      const filter2 = { gears: 3 };
      const addFilter1 = { type: ADD_FILTER, payload: filter1 };
      const addFilter2 = { type: ADD_FILTER, payload: filter2 };
      const reduced = reducer([], addFilter1);
      const reducedWithInitialContent = reducer({ filters: [ filter1 ] }, addFilter2);
      expect(reduced).toEqual({ filters: [ filter1 ] });
      expect(reducedWithInitialContent).toEqual({ filters: [ filter1, filter2 ] });
    });

    it('should handle duplicates ADD_FILTER', () => {
      const filter = { location: 'helsinki' };
      const addFilter = { type: ADD_FILTER, payload: filter };
      const reducedWithInitialContent = reducer({ filters: [ filter ] }, addFilter);
      expect(reducedWithInitialContent).toEqual({ filters: [ filter ] });
    });
  });
});
