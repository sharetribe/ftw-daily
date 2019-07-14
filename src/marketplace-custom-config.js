/*
 * Marketplace specific configuration.
 */

export const amenities = [
  {
    key: 'first_aid',
    label: 'First Aid',
  },
  {
    key: 'own_transport',
    label: 'Own Transport',
  },
  {
    key: 'non_smoker',
    label: 'Non Smoker',
  },
  {
    key: 'new_borns',
    label: 'New Borns',
  },
  {
    key: 'qualifications',
    label: 'Qualifications',
  },
  {
    key: 'overnights',
    label: 'Overnights',
  },
  {
    key: 'evenings',
    label: 'Evenings',
  },
  {
    key: 'mornings',
    label: 'Mornings',
  },
  {
    key: 'all_day',
    label: 'All Day',
  },
];

export const categories = [
  { key: 'smoke', label: 'Smoke' },
  { key: 'electric', label: 'Electric' },
  { key: 'wood', label: 'Wood' },
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
