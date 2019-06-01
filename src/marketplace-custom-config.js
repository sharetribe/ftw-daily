/*
 * Marketplace specific configuration.
 */

export const amenities = [
  {
    key: 'audio-engineer',
    label: 'Audio Engineer Included',
  },
  {
    key: 'parking-studio',
    label: 'Studio Parking Available',
  },
  {
    key: 'parking-nearby',
    label: 'Parking Available Nearby',
  },  
];

export const categories = [
  { key: 'jam-space', label: 'Jam Space' },
];

// Price filter configuration
// Note: unlike most prices this is not handled in subunits
export const priceFilterConfig = {
  min: 0,
  max: 100,
  step: 5,
};

// Activate booking dates filter on search page
export const dateRangeFilterConfig = {
  active: true,
};
