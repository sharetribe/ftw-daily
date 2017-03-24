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
    const tree = renderShallow(
      <SearchPageComponent onLoadListings={v => v} dispatch={() => null} intl={fakeIntl} />
    );
    expect(tree).toMatchSnapshot();
  });
});
