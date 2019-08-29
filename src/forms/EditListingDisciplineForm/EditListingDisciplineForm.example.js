import EditListingDisciplineForm from './EditListingDisciplineForm';

const NAME = 'amenities';

const initialValueArray = ['towels', 'jacuzzi', 'bathroom'];
const initialValues = { [NAME]: initialValueArray };

export const Amenities = {
  component: EditListingDisciplineForm,
  props: {
    name: NAME,
    onSubmit: values => console.log('EditListingDisciplineForm submit:', values),
    initialValues: initialValues,
    saveActionMsg: 'Save amenities',
    updated: false,
    updateInProgress: false,
  },
  group: 'forms',
};
