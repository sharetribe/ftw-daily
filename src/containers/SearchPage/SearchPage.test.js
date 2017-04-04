import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { types } from '../../util/sdkLoader';
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
    const props = {
      flattenedRoutes: [],
      location: { search: '' },
      history: {
        push: () => console.log('HistoryPush called'),
      },
      tab: 'listings',
      searchInProgress: false,
    };
    const tree = renderShallow(<SearchPageComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
