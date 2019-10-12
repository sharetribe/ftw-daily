/*
 * Marketplace specific configuration.
 */

export const amenities = [
  {
    key: 'electricity',
    label: 'Electricity',
  },
  {
    key: 'drivable',
    label: 'Drivable',
  },
  {
    key: 'roof',
    label: 'Roof',
  },
  {
    key: 'gated',
    label: 'Gated',
  },
  {
    key: 'jacuzzi',
    label: 'Jacuzzi',
  },
  {
    key: 'climate_control',
    label: 'Climate Control',
  },
  {
    key: 'garage_units',
    label: 'Garage Units',
  },
  {
    key: 'wifi',
    label: 'Wifi',
  },
  {
    key: 'security',
    label: 'Security',
  },
];

export const categories = [
  { key: 'storage_unit', label: 'Storage Unit' },
  { key: 'shed', label: 'Shed' },
  { key: 'pole_barn', label: 'Pole Barn' },
  { key: 'acerage', label: 'Acerage' },
  { key: 'parking', label: 'Parking' },
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
