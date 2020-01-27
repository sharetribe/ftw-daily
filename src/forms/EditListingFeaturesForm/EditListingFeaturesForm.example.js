import EditListingFeaturesForm from './EditListingFeaturesForm';

const NAME = 'filters';

const initialValueArray = ['first_aid', 'qualifications', 'own_transport'];
const initialValues = { [NAME]: initialValueArray };

export const Filters = {
  component: EditListingFeaturesForm,
  props: {
    name: NAME,
    onSubmit: values => console.log('EditListingFeaturesForm submit:', values),
    initialValues: initialValues,
    saveActionMsg: 'Save filters',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
  },
  group: 'forms',
};
