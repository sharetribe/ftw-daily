/* eslint-disable no-console */
import EditListingPhotosForm from './EditListingPhotosForm';

export const Empty = {
  component: EditListingPhotosForm,
  props: {
    initialValues: { country: 'US', images: [] },
    stripeConnected: false,
    onImageUpload: values => {
      console.log(`onImageUpload with id (${values.id}) and file name (${values.file.name})`);
    },
    onSubmit: values => {
      console.log('Submit EditListingPhotosForm with (unformatted) values:', values);
    },
    onUpdateImageOrder: imageOrder => {
      console.log('onUpdateImageOrder with new imageOrder:', imageOrder);
    },
  },
  group: 'forms',
};
