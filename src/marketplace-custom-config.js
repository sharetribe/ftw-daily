/*
 * Marketplace specific configuration.
 */

export const amenities = [
  {
    key: 'battery pack',
    label: 'Battery pack',
  },
  {
    key: '20 voltage',
    label: '20 Voltage',
  },
  {
    key: '40 voltage',
    label: '40 Voltage',
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
  { key: 'tools and equipment', label: 'Tools and Equipment' },
  { key: 'outdoors', label: 'Outdoors' },
  { key: 'cameras', label: 'Cameras' },

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
