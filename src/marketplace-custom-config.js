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

// TODO: change to real Data
export const genders = [{ key: 'male', label: 'Male' }, { key: 'female', label: 'Female' }];
export const ages = [{ key: '16', label: '16' }, { key: '18', label: '18' }];
export const breeds = [
  { key: 'thoroughbreds', label: 'Thoroughbreds' },
  { key: 'appaloosa', label: 'Appaloosa' },
];
export const hights = [{ key: '163', label: '163' }, { key: '146', label: '146' }];
export const colors = [{ key: 'black', label: 'Black' }, { key: 'white', label: 'White' }];

export const disciplines = [
  { key: 'springen', label: 'Springen' },
  { key: 'dressur', label: 'Dressur' },
  { key: 'voltegieren', label: 'Voltegieren' },
  { key: 'freizei', label: 'Freizei' },
  { key: 'western', label: 'Western' },
  { key: 'polo', label: 'Polo' },
  { key: 'decken', label: 'Decken' },
  { key: 'fahren', label: 'Fahren' },
  { key: 'gang', label: 'Gang' },
  { key: 'vielseitigkeit', label: 'Vielseitigkeit' },
  { key: 'zucht', label: 'Zucht' },
  { key: 'distanz', label: 'Distanz' },
  { key: 'hunter', label: 'Hunter' },
  { key: 'barock', label: 'Barock' },
  { key: 'galopp', label: 'Galopp' },
  { key: 'traber', label: 'Traber' },
];
export const characteristics = [
  { key: 'licensed', label: 'Licensed' },
  { key: 'Competition_experience', label: 'Competition experience' },
  { key: 'greed', label: 'Greed' },
  { key: 'lunged', label: 'Lunged' },
  { key: 'broken-in', label: 'Broken-in' },
  { key: 'incl_papers', label: 'Incl. Papers' },
  { key: 'safe_in_the_fields', label: 'Safe in the fields' },
  { key: 'used_to_the_blacksmith', label: 'Used to the blacksmith' },
  { key: 'easy_to_load', label: 'Easy to load' },
  { key: 'no_eczema', label: 'No eczema' },
  { key: 'vet_check', label: 'Vet Check' },
  { key: 'allrounder', label: 'Allrounder' },
  { key: 'barefoot', label: 'Barefoot' },
  { key: 'for_beginners', label: 'For Beginners' },
  { key: 'from_the_breeder', label: 'From the breeder' },
];

// Price filter configuration
// Note: unlike most prices this is not handled in subunits
export const priceFilterConfig = {
  min: 0,
  max: 1000,
  step: 5,
};
