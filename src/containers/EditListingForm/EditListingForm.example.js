/* eslint-disable no-console, import/prefer-default-export */
import EditListingForm from './EditListingForm';

export const Empty = {
  component: EditListingForm,
  props: {
    images: [],
    onImageUpload: values => {
      console.log(`onImageUpload with id (${values.id}) and file name (${values.file.name})`);
    },
    onSubmit: values => {
      console.log('Submit EditListingForm with (unformatted) values:', values);
    },
    onUpdateImageOrder: imageOrder => {
      console.log('onUpdateImageOrder with new imageOrder:', imageOrder);
    },
  },
};
