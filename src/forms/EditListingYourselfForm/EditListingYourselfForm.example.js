/* eslint-disable no-console */
import EditListingYourselfForm from './EditListingYourselfForm';

export const Empty = {
  component: EditListingYourselfForm,
  props: {
    onSubmit: values => {
      console.log('Submit EditListingYourselfForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save description',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
  },
  group: 'forms',
};
