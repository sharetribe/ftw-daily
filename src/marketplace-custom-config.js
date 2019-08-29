/*
 * Marketplace specific configuration.
 */

export const amenities = [
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

// export const categories = [
//   { key: 'smoke', label: 'Smoke' },
//   { key: 'electric', label: 'Electric' },
//   { key: 'wood', label: 'Wood' },
//   { key: 'other', label: 'Other' },
// ];

export const categories = [
  { key: 'springen', label: 'Springen' },
  { key: 'dressur', label: 'Dressur' },
  { key: 'freizeit', label: 'Freizeit' },
  { key: 'other', label: 'Other' },
];

export const genders = [{ key: 'male', label: 'Male' }, { key: 'female', label: 'Female' }];
export const ages = [{ key: '16', label: '16' }, { key: '18', label: '18' }];
export const breeds = [
  { key: 'thoroughbreds', label: 'Thoroughbreds' },
  { key: 'appaloosa', label: 'Appaloosa' },
];
export const hights = [{ key: '163', label: '163' }, { key: '146', label: '146' }];
export const colors = [{ key: 'black', label: 'Black' }, { key: 'white', label: 'White' }];

// Price filter configuration
// Note: unlike most prices this is not handled in subunits
export const priceFilterConfig = {
  min: 0,
  max: 1000,
  step: 5,
};
