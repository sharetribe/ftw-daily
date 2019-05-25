const TIME_SLOTS = [
  { key: '00_00', label: '00:00' },
  { key: '00_30', label: '00:30' },
  { key: '01_00', label: '01:00' },
  { key: '01_30', label: '01:30' },
  { key: '02_00', label: '02:00' },
  { key: '02_30', label: '02:30' },
  { key: '03_00', label: '03:00' },
  { key: '03_30', label: '03:30' },
  { key: '04_00', label: '04:00' },
  { key: '04_30', label: '04:30' },
  { key: '05_00', label: '05:00' },
  { key: '05_30', label: '05:30' },
  { key: '06_00', label: '06:00' },
  { key: '06_30', label: '06:30' },
  { key: '07_00', label: '07:00' },
  { key: '07_30', label: '07:30' },
  { key: '08_00', label: '08:00' },
  { key: '08_30', label: '08:30' },
  { key: '09_00', label: '09:00' },
  { key: '09_30', label: '09:30' },
  { key: '10_00', label: '10:00' },
  { key: '10_30', label: '10:30' },
  { key: '11_00', label: '11:00' },
  { key: '11_30', label: '11:30' },
  { key: '12_00', label: '12:00' },
  { key: '12_30', label: '12:30' },
  { key: '13_00', label: '13:00' },
  { key: '13_30', label: '13:30' },
  { key: '14_00', label: '14:00' },
  { key: '14_30', label: '14:30' },
  { key: '15_00', label: '15:00' },
  { key: '15_30', label: '15:30' },
  { key: '16_00', label: '16:00' },
  { key: '16_30', label: '16:30' },
  { key: '17_00', label: '17:00' },
  { key: '17_30', label: '17:30' },
  { key: '18_00', label: '18:00' },
  { key: '18_30', label: '18:30' },
  { key: '19_00', label: '19:00' },
  { key: '19_30', label: '19:30' },
  { key: '20_00', label: '20:00' },
  { key: '20_30', label: '20:30' },
  { key: '21_00', label: '21:00' },
  { key: '21_30', label: '21:30' },
  { key: '22_00', label: '22:00' },
  { key: '22_30', label: '22:30' },
  { key: '23_00', label: '23:00' },
  { key: '23_30', label: '23:30' }
]

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

export const bookingSlots = [
  { key: 'morning', label: 'Time.morning' },
  { key: 'afternoon', label: 'Time.afternoon' },
  { key: 'completeDay', label: 'Time.entireDay' },
]

export const morningStartHour = TIME_SLOTS
export const morningEndHour = TIME_SLOTS
export const afternoonStartHour = TIME_SLOTS
export const afternoonEndtHour = TIME_SLOTS

//Remove - When example saunas are deleted
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
