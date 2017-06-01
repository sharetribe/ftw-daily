import { fakeIntl } from '../../util/test-data';
import TopbarDesktop from './TopbarDesktop';

const noop = () => null;

export const AuthenticatedDesktopTopbar = {
  component: TopbarDesktop,
  props: {
    isAuthenticated: true,
    currentUserHasListings: true,
    name: 'John Doe',
    intl: fakeIntl,
    onLogout: noop,
  },
  group: 'navigation',
};
