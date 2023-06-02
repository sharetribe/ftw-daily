import EditListingFeaturesForm from './EditListingFeaturesForm';

const NAME = 'amenities';

const initialValueArray = ['towels', 'jacuzzi', 'bathroom'];
const initialValues = { [NAME]: initialValueArray };

const filterConfig = [
  {
    id: 'amenities',
    label: 'Amenities',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_amenities'],
    config: {
      mode: 'has_all',
      options: [
        {
          key: 'feat1',
          label: 'Feat 1',
        },
        {
          key: 'feat2',
          label: 'Feat 2',
        },
        {
          key: 'feat3',
          label: 'Feat 3',
        },
      ],
    },
  },
];

export const Amenities = {
  component: EditListingFeaturesForm,
  props: {
    name: NAME,
    onSubmit: values => console.log('EditListingFeaturesForm submit:', values),
    initialValues: initialValues,
    saveActionMsg: 'Save amenities',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
    filterConfig,
  },
  group: 'forms',
};
