import EditListingHorseForm from './EditListingHorseForm';

export const Empty = {
  component: EditListingHorseForm,
  props: {
    onSubmit: values => {
      console.log('Submit EditListingHorseForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save description',
    updated: false,
    updateInProgress: false,
  },
  group: 'forms',
};
