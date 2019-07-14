import EditListingFeaturesForm from './EditListingFeaturesForm';

const NAME = 'amenities';

const initialValueArray = ['first_aid', 'qualifications', 'own_transport'];
const initialValues = { [NAME]: initialValueArray };

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
