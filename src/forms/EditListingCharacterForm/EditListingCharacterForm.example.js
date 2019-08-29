import EditListingCharacterForm from './EditListingCharacterForm';

const NAME = 'amenities';

const initialValueArray = ['towels', 'jacuzzi', 'bathroom'];
const initialValues = { [NAME]: initialValueArray };

export const Amenities = {
  component: EditListingCharacterForm,
  props: {
    name: NAME,
    onSubmit: values => console.log('EditListingCharacterForm submit:', values),
    initialValues: initialValues,
    saveActionMsg: 'Save amenities',
    updated: false,
    updateInProgress: false,
  },
  group: 'forms',
};
