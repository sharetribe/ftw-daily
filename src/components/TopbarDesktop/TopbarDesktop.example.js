import { fakeIntl } from '../../util/test-data';
import TopbarDesktop from './TopbarDesktop';


export const AuthenticatedDesktopTopbar = {
  component: TopbarDesktop,
  props: {
    isAuthenticated: true,
    currentUserHasListings: true,
    name: 'John Doe',
    intl: fakeIntl,
  },
  group: 'navigation',
};
