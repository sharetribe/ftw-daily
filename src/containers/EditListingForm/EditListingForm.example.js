/* eslint-disable no-console, import/prefer-default-export */
import EditListingForm from './EditListingForm';

export const Empty = {
  component: EditListingForm,
  props: {
    onSubmit(values) {
      console.log('submit new password form values:', values);
    },
  },
};
