import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { types as sdkTypes } from '../../util/sdkLoader';
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

const { LatLng } = sdkTypes;
const noop = () => null;

describe('SearchPageComponent', () => {
  it('matches snapshot', () => {
    const props = {
      location: { search: '' },
      history: {
        push: () => console.log('HistoryPush called'),
      },
      pagination: {
        page: 1,
        perPage: 12,
        totalItems: 22,
        totalPages: 2,
      },
      tab: 'listings',
      scrollingDisabled: false,
      searchInProgress: false,
      authInProgress: false,
      currentUserHasListings: false,
      intl: fakeIntl,
      isAuthenticated: false,
      onActivateListing: noop,
      onLogout: noop,
      onManageDisableScrolling: noop,
      onSearchMapListings: noop,
      sendVerificationEmailInProgress: false,
      onResendVerificationEmail: noop,
      categories: [{ key: 'cat1', label: 'Cat 1' }, { key: 'cat2', label: 'Cat 2' }],
      filters: [{ key: 'dog1', label: 'Dog 1' }, { key: 'dog2', label: 'Dog 2' }],
    };
    const tree = renderShallow(<SearchPageComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
