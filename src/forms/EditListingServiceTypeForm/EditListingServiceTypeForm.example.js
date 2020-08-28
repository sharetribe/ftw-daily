/* eslint-disable no-console */
import EditListingServiceTypeForm from './EditListingServiceTypeForm'

export const Empty = {
  component: EditListingServiceTypeForm,
  props: {
    onSubmit: (values) => {
      console.log('Submit EditListingServiceTypeForm with (unformatted) values:', values)
    },
    saveActionMsg: 'Save description',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
  },
  group: 'forms',
}
