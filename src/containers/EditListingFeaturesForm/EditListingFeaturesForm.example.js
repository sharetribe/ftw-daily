import EditListingFeaturesForm from './EditListingFeaturesForm';

const NAME = 'amenities';

const initialValueArray = ['towels', 'jacuzzi', 'bathroom'];
const initialValueMap = initialValueArray.reduce((map, value) => {
  map[value] = true;
  return map;
}, {});
const initialValues = { [NAME]: initialValueMap };

export const Amenities = {
  component: EditListingFeaturesForm,
  props: {
    name: NAME,
    onSubmit: values => console.log('EditListingFeaturesForm submit:', values),
    initialValues: initialValues,
    saveActionMsg: 'Save amenities',
    updated: false,
    updateInProgress: false,
  },
  group: 'forms',
};
