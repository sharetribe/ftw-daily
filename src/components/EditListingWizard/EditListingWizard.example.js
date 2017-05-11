import { createListing } from '../../util/test-data';
import { flattenRoutes } from '../../util/routes';
import routesConfiguration from '../../routesConfiguration';
import EditListingWizard from './EditListingWizard';

export const NoPhotos = {
  component: EditListingWizard,
  props: {
    flattenedRoutes: flattenRoutes(routesConfiguration),
    history: { push: () => {} },
    selectedTab: 'pricing',
    images: [],
    listing: createListing('listing1'),
    stripeConnected: true,
    onImageUpload: () => {},
    onUpdateImageOrder: () => {},
    onCreateListing: () => {},
    onCreateListingDraft: () => {},
    onUpdateListingDraft: () => {},
  },
  useDefaultWrapperStyles: false,
};
