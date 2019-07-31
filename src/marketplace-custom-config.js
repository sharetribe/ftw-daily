/*
 * Marketplace specific configuration.
 */

export const amenities = [
  {
    key: 'padcar',
    label: 'Crash Pad Car',
  },
  {
    key: 'wifi',
    label: 'Wireless Internet',
  },
  {
    key: 'cable',
    label: 'Cable TV',
  },
  {
    key: 'reserveready',
    label: 'Reserve Ready (less then 10 minutes to the airport)',
  },
  {
    key: 'fullkitchen',
    label: 'Full kitchen with cooking utensils',
  },
  {
    key: 'grill',
    label: 'Grill',
  },
  {
    key: 'amenity1',
    label: 'Amenity 1',
  },
  {
    key: 'amenity2',
    label: 'Amenity 2',
  },
];

export const categories = [
  { key: 'cat1', label: 'Category 1' },
  { key: 'cat2', label: 'Category 2' },
  { key: 'cat3', label: 'Category 3' },
  { key: 'cat4', label: 'Category 4' },
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