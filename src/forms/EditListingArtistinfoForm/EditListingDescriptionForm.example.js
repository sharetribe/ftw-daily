/* eslint-disable no-console */
import EditListingArtistinfoForm from './EditListingArtistinfoForm';

export const Empty = {
  component: EditListingArtistinfoForm,
  props: {
    onSubmit: values => {
      console.log('Submit EditListingArtistinfoForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save Artistinfo',
    updated: false,
    updateInProgress: false,
  },
  group: 'forms',
};
