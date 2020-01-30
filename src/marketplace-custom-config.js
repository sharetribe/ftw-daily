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

export const categories = [
  { key: 'hair-stylist', label: 'Hair Stylist' },
  { key: 'barber', label: 'Barber' },
  { key: 'makeup-artist', label: 'Makeup Artist' },
  { key: 'nail-technician', label: 'Nail Technician' },
  { key: 'cosmetics', label: 'Cosmetics' },
  { key: 'tattoo-artist', label: 'Tattoo Artist' },
  { key: 'fitness', label: 'Fitness' },
  { key: 'yoga', label: 'Yoga' },
  { key: 'dance', label: 'Dance' },
  { key: 'martial-arts', label: 'Martial Arts' },
  { key: 'massage', label: 'Massage' },
  { key: 'reiki', label: 'Reiki' },
  { key: 'acupuncture', label: 'Acupuncture' },
  { key: 'chiropractor', label: 'Chiropractor' },
  { key: 'art', label: 'Art' },
  { key: 'photography', label: 'Photography' },
  { key: 'music', label: 'Music' },
  { key: 'desk-space', label: 'Desk space' },
  { key: 'office-space', label: 'Office space' },
  { key: 'event-space', label: 'Event space' },
];

















// Price filter configuration
// Note: unlike most prices this is not handled in subunits
export const priceFilterConfig = {
  min: 0,
  max: 1000,
  step: 5,
};

// Activate booking dates filter on search page
export const dateRangeFilterConfig = {
  active: true,
};

// Activate keyword filter on search page

// NOTE: If you are ordering search results by distance the keyword search can't be used at the same time.
// You can turn off ordering by distance in config.js file
export const keywordFilterConfig = {
  active: true,
};
