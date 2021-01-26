import PropertyGroup from './PropertyGroup';

const exampleOptions = [
  {
    key: 'towels',
    label: 'Towels',
  },
  {
    key: 'bathroom',
    label: 'Bathroom',
  },
  {
    key: 'swimming_pool',
    label: 'Swimming pool',
  },
  {
    key: 'own_drinks',
    label: 'Own drinks allowed',
  },
  {
    key: 'jacuzzi',
    label: 'Jacuzzi',
  },
  {
    key: 'audiovisual_entertainment',
    label: 'Audiovisual entertainment',
  },
  {
    key: 'barbeque',
    label: 'Barbeque',
  },
  {
    key: 'own_food_allowed',
    label: 'Own food allowed',
  },
];

export const WithSomeSelected = {
  component: PropertyGroup,
  props: {
    id: 'amenities',
    options: exampleOptions,
    selectedOptions: ['towels', 'bathroom', 'barbeque'],
    twoColumns: true,
  },
  group: 'misc',
};
