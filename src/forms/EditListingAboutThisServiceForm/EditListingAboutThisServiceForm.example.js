/* eslint-disable no-console */
import EditListingAboutYouForm from './EditListingAboutYouForm'

export const Empty = {
  component: EditListingAboutYouForm,
  props: {
    onSubmit: (values) => {
      console.log('Submit EditListingAboutYouForm with (unformatted) values:', values)
    },
    saveActionMsg: 'Save description',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
  },
  group: 'forms',
}
