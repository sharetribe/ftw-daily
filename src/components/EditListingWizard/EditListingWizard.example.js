import { createListing } from '../../util/test-data';
import { flattenRoutes } from '../../util/routes';
import routesConfiguration from '../../routesConfiguration';
import EditListingWizard from './EditListingWizard';

const noop = () => null;

export const NoPhotos = {
  component: EditListingWizard,
  props: {
    flattenedRoutes: flattenRoutes(routesConfiguration),
    history: { push: noop },
    selectedTab: 'pricing',
    images: [],
    listing: createListing('listing1'),
    stripeConnected: true,
    onImageUpload: noop,
    onUpdateImageOrder: noop,
    onCreateListing: noop,
    onCreateListingDraft: noop,
    onUpdateListingDraft: noop,
    togglePageClassNames: noop,
  },
  useDefaultWrapperStyles: false,
};
