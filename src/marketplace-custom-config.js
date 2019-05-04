/*
 * Marketplace specific configuration.
 */

export const amenities = [
  {
    key: 'towels',
    label: 'Amenity.towels',
    icon: "layer-group"
  },
  {
    key: 'bathroom',
    label: 'Amenity.bathroom',
    icon: "shower"
  },
  {
    key: 'jacuzzi',
    label: 'Amenity.jacuzzi',
    icon: 'hot-tub'
  },
  {
    key: 'barbeque',
    label: 'Amenity.barbeque',
    icon: 'gripfire'
  }
];

export const traderCategories = [
  { key: 'hotel', label: 'Pool.hotel' },
  { key: 'localAccomodation', label: 'Pool.localAccomodation' },
  { key: 'individual', label: 'Pool.individual' }
];

export const categories = [
  { key: 'interior', label: 'Pool.exterior' },
  { key: 'exterior', label: 'Pool.interior' }
];

//To Remove

export const type = [
  { key: 'interior', label: 'Smoke' },
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
