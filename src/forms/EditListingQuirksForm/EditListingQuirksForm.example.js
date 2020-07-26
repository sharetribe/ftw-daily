/* eslint-disable no-console */
import EditListingQuirksForm from './EditListingQuirksForm';

export const Empty = {
  component: EditListingQuirksForm,
  props: {
    publicData: {},
    onSubmit: values => {
      console.log('Submit EditListingQuirksForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save rules',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
  },
  group: 'forms',
};
