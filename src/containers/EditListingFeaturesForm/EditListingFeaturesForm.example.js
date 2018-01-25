import EditListingFeaturesForm from './EditListingFeaturesForm';

const initialValueArray = ['towels', 'jacuzzi', 'bathroom'];

export const Amenities = {
  component: EditListingFeaturesForm,
  props: {
    onSubmit: values => console.log('EditListingFeaturesForm submit:', values),
    initialValues: initialValueArray.reduce((map, value) => {
      map[value] = true;
      return map;
    }, {}),
    saveActionMsg: 'Save amenities',
    updated: false,
    updateInProgress: false,
  },
  group: 'forms',
};
