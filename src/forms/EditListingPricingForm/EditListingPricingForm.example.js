/* eslint-disable no-console */
import EditListingPricingForm from './EditListingPricingForm';

export const Empty = {
  component: EditListingPricingForm,
  props: {
    onSubmit: values => {
      console.log('Submit EditListingPricingForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save price',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
  },
  group: 'forms',
};
