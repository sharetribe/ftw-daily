import PropertyGroup from './PropertyGroup';

const exampleOptions = [
  { value: 'towels', text: 'Towels' },
  { value: 'bathroom', text: 'Bathroom' },
  { value: 'swimming', text: 'Swimming' },
  { value: 'own_drinks_allowed', text: 'Own drinks allowed' },
  { value: 'jacuzzi', text: 'Jacuzzi' },
  { value: 'audiovisual_entertainment', text: 'Audiovisual entertainment' },
  { value: 'barbeque', text: 'Barbeque' },
  { value: 'own_food_allowed', text: 'Own food allowed' },
];

export const WithSomeSelected = {
  component: PropertyGroup,
  props: {
    options: exampleOptions,
    selectedOptions: ['towels', 'bathroom', 'barbeque'],
    twoColumns: true,
  },
  group: 'misc',
};
