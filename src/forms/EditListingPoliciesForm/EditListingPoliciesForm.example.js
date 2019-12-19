/* eslint-disable no-console */
import EditListingPoliciesForm from './EditListingPoliciesForm';

export const Empty = {
  component: EditListingPoliciesForm,
  props: {
    publicData: {},
    onSubmit: values => {
      console.log('Submit EditListingPoliciesForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save rules',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
  },
  group: 'forms',
};
