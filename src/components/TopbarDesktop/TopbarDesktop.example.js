/* eslint-disable no-console */
import { fakeIntl } from '../../util/test-data';
import TopbarDesktop from './TopbarDesktop';

const noop = () => null;

export const AuthenticatedDesktopTopbar = {
  component: TopbarDesktop,
  props: {
    isAuthenticated: true,
    currentUserHasListings: true,
    name: 'John Doe',
    onSearchSubmit: values => {
      console.log('submit search:', values);
    },
    intl: fakeIntl,
    onLogout: noop,
  },
  group: 'navigation',
};
