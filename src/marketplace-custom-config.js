/*
 * Marketplace specific configuration.
 */

export const amenities = [
  {
    key: 'Surfboard',
    label: 'Surfboard',
  },
  {
    key: 'Skateboard',
    label: 'Skateboard',
  },
  {
    key: 'Snowboard',
    label: 'Snowboard',
  },
  {
    key: 'Paddle board',
    label: 'Paddle board',
  },
  {
    key: 'Skis',
    label: 'Skis',
  },
  {
    key: 'Kayak',
    label: 'Kayak',
  },
  {
    key: 'Windsurfing board',
    label: 'Windsurfing board',
  },
  {
    key: 'Kiteboard',
    label: 'Kiteboard',
  },
  {
    key: 'Tent',
    label: 'Tent',
  },
  {
    key: 'Other camping gear',
    label: 'Other camping gear',
  },
  {
    key: 'Other',
    label: 'Other',
  },
];

export const categories = [
  { key: 'Earth', label: 'Earth' },
  { key: 'Water', label: 'Water' },
  { key: 'Air', label: 'Air' },
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
