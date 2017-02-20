import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { types } from 'sharetribe-sdk';
import { SearchPageComponent } from './SearchPage';
import reducer, {
  ADD_FILTER,
  LOAD_LISTINGS,
  addFilter,
  callFetchListings,
  initialState,
  loadListings,
  watchLoadListings,
} from './SearchPage.duck';

const { LatLng } = types;

describe('SearchPageComponent', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(<SearchPageComponent onLoadListings={v => v} />);
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
      expect(initial).toEqual(initialState);
    });

    it('should handle ADD_FILTER', () => {
      const addFilter1 = addFilter('location', 'helsinki');
      const addFilter2 = addFilter('gears', 3);
      const reduced = reducer([], addFilter1);
      const reducedWithInitialContent = reducer({ filters: [addFilter1.payload] }, addFilter2);
      expect(reduced).toEqual({ filters: [addFilter1.payload] });
      expect(reducedWithInitialContent).toEqual({
        filters: [addFilter1.payload, addFilter2.payload],
      });
    });

    it('should handle duplicates ADD_FILTER', () => {
      const filter = { location: 'helsinki' };
      const addFilter = { type: ADD_FILTER, payload: filter };
      const reducedWithInitialContent = reducer({ filters: [filter] }, addFilter);
      expect(reducedWithInitialContent).toEqual({ filters: [filter] });
    });
  });

  describe('callFetchListings worker', () => {
    it('should succeed when API call fulfills', () => {
      const payload = { data: { data: [], included: [] } };
      const sdk = { listings: { search: jest.fn() } };
      const worker = callFetchListings(sdk);

      expect(worker.next()).toEqual({
        value: call(sdk.listings.search, { origin: new LatLng(40, 70), include: ['author'] }),
        done: false,
      });
      expect(worker.next(payload)).toEqual({ value: put(loadListings.success([])), done: false });
      expect(worker.next().done).toEqual(true);
      expect(sdk.listings.search).not.toHaveBeenCalled();
    });

    it('should fail when API call rejects', () => {
      const payload = {};
      const sdk = { listings: { search: jest.fn() } };
      const worker = callFetchListings(sdk);
      const error = new Error('Test listing fetch failed');

      expect(worker.next()).toEqual({
        value: call(sdk.listings.search, { origin: new LatLng(40, 70), include: ['author'] }),
        done: false,
      });
      expect(worker.throw(error)).toEqual({ value: put(loadListings.failure(error)), done: false });
      expect(worker.next().done).toEqual(true);
      expect(sdk.listings.search).not.toHaveBeenCalled();
    });
  });

  describe('load listings watcher', () => {
    it('creates takeEvery helper for listening LOAD_LISTINGS.REQUEST actions', () => {
      const sdk = { fetchListings: jest.fn() };
      const watcher = watchLoadListings(sdk);
      const takeLoadListingsRequest = takeEvery(LOAD_LISTINGS.REQUEST, callFetchListings, sdk);

      // The watcher should use takeEvery (a wrapper for forking saga's internal takeEveryHelper)
      expect(watcher.next().value).toEqual(takeLoadListingsRequest);
      expect(sdk.fetchListings).not.toHaveBeenCalled();
    });
  });
});
