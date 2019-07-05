/*
 * Marketplace specific configuration.
 */

export const amenities = [
  {
    key: 'dog',
    label: 'Dog',
  },
  {
    key: 'cat',
    label: 'Cat',
  },
  {
    key: 'reptiles',
    label: 'Rptiles',
  },
  {
    key: 'rabbits',
    label: 'Rabbits',
  },
  {
    key: 'horse',
    label: 'Horse',
  },
  {
    key: 'farm_animals',
    label: 'Farm Animals',
  },
  {
    key: 'aquarium_fish',
    label: 'Aquarium Fish',
  },
  {
    key: 'pet_birds',
    label: 'Pet Birds',
  },
];

export const categories = [
  { key: 'petowners', label: 'Pet Owners' },
  { key: 'petsitter', label: 'Pet Sitter' },
  { key: 'petservices', label: 'Pet Services' },
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
