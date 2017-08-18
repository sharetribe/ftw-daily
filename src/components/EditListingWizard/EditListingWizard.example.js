import { createListing } from '../../util/test-data';
import { flattenRoutes } from '../../util/routes';
import routesConfiguration from '../../routesConfiguration';
import EditListingWizard from './EditListingWizard';

const noop = () => null;

export const NoPhotos = {
  component: EditListingWizard,
  props: {
    params: {
      id: 'some-id',
      slug: 'some-slug',
      type: 'edit',
      tab: 'pricing',
    },
    fetchInProgress: false,
    flattenedRoutes: flattenRoutes(routesConfiguration),
    history: { push: noop },
    images: [],
    listing: createListing('listing1'),
    stripeConnected: true,
    onImageUpload: noop,
    onUpdateImageOrder: noop,
    onRemoveImage: noop,
    onUpdateListing: noop,
    onCreateListing: noop,
    onCreateListingDraft: noop,
    onPayoutDetailsSubmit: noop,
    onUpdateListingDraft: noop,
    onManageDisableScrolling: noop,
    onChange: noop,
    errors: {},
    updateInProgress: false,
  },
  useDefaultWrapperStyles: false,
};
