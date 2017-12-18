import EnquiryForm from './EnquiryForm';

export const Empty = {
  component: EnquiryForm,
  props: {
    listingTitle: 'Sauna with a view',
    authorDisplayName: 'Janne',
    onSubmit(values) {
      console.log('submit with values:', values);
    },
  },
  group: 'forms',
};
