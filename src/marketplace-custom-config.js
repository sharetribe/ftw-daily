/*
 * Marketplace specific configuration.
 */

export const types = [
  {
    key: 'Towels',
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
    key: 'distant',
    label: 'distant',
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
    { key: 'Event Hire', label: 'Event Hire' },
    { key: 'Event Service', label: 'Event service' },
    { key: 'Venues', label: 'Venues' },
  { key: 'Marquee & Canopy', label: 'Marquee & Canopy' },
  { key: 'Photo Booth', label: 'Photo Booth' },
  { key: 'Event Furniture', label: 'Event Furniture' },
  { key: 'other', label: 'Other' },
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
