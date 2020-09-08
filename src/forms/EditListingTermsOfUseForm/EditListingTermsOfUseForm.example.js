import EditListingTermsOfUseForm from './EditListingTermsOfUseForm'

const NAME = 'amenities'

const initialValueArray = ['towels', 'jacuzzi', 'bathroom']
const initialValues = { [NAME]: initialValueArray }

const filterConfig = [
  {
    id: 'amenities',
    label: 'Terms Of Use',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_amenities'],
    config: {
      mode: 'has_all',
      options: [
        {
          key: 'agree',
          label: 'I agree to terms of use',
        },
      ],
    },
  },
]

export const TermsOfUse = {
  component: EditListingTermsOfUseForm,
  props: {
    name: NAME,
    onSubmit: (values) => console.log('EditListingTermsOfUseForm submit:', values),
    initialValues: initialValues,
    saveActionMsg: 'Save Terms Of Use',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
    filterConfig,
  },
  group: 'forms',
}
