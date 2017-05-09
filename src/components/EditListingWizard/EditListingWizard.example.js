import { createListing } from '../../util/test-data';
import EditListingWizard from './EditListingWizard';

export const NoPhotos = {
  component: EditListingWizard,
  props: {
    selectedTab: 'price',
    listing: createListing('listing1'),
    onCreateListing: () => {},
    onCreateListingDraft: () => {},
    onUpdateListingDraft: () => {},
  },
  useDefaultWrapperStyles: false,
};
