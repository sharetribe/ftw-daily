/*
 * Marketplace specific configuration.
 */

export const amenities = [
  {
    key: 'fashion_beauty',
    label: 'Fashion and Beauty',
  },
  {
    key: 'corporate_headshots',
    label: 'Corporate Headshots',
  },
  {
    key: 'social_events',
    label: 'Social Events',
  },
  {
    key: 'live_entertainment',
    label: 'Live Entertainment',
  },
  {
    key: 'sports_fitness',
    label: 'Sports and Fitness',
  },
  {
    key: 'family',
    label: 'Family',
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
