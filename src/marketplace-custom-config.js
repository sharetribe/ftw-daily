/*
 * Marketplace specific configuration.
 */

export const amenities = [
  {
      key: "free-parking",
      label: "Free parking",
    },


    {
      key: "key/electronic-access-card",
      label: "Key/electronic access card",
    },


    {
      key: "wheelchair-access",
      label: "Wheelchair access",
    },


    {
      key: "wifi",
      label: "WiFi",
    },


    {
      key: "receptionist",
      label: "Receptionist",
    },


    {
      key: "kitchen",
      label: "Kitchen",
    },


    {
      key: "fridge/freezer",
      label: "Fridge/freezer",
    },


    {
      key: "tea/coffee-making-facilities",
      label: "Tea/coffee making facilities",
    },


    {
      key: "refreshments",
      label: "Refreshments",
    },


    {
      key: "toilet",
      label: "Toilet",
    },


    {
      key: "air-conditioning",
      label: "Air conditioning",
    },


    {
      key: "heating",
      label: "Heating",
    },


    {
      key: "accepts-card-payments",
      label: "Accepts card payments",
    },


    {
      key: "accepts-mail-and-packages",
      label: "Accepts mail and packages",
    },


    {
      key: "cleaner",
      label: "Cleaner",
    },


    {
      key: "waiting-area",
      label: "Waiting area",
    },


    {
      key: "changing-areas-with-showers",
      label: "Changing areas with showers",
    },


    {
      key: "cctv-monitoring",
      label: "CCTV monitoring",
    },


    {
      key: "secure-locker",
      label: "Secure locker",
    },


    {
      key: "chair",
      label: "Chair",
    },


    {
      key: "mirror",
      label: "Mirror",
    },


    {
      key: "gowns",
      label: "Gowns",
    },


    {
      key: "towels",
      label: "Towels",
    },


    {
      key: "washing-point",
      label: "Washing point",
    },


    {
      key: "trolley",
      label: "Trolley",
    },


    {
      key: "locked-cupboards",
      label: "Locked cupboards",
    },


    {
      key: "massage-chair",
      label: "Massage chair",
    },


    {
      key: "led-magnifying-light",
      label: "LED magnifying light",
    },


    {
      key: "dim-lighting",
      label: "Dim lighting",
    },


    {
      key: "wax-equipment",
      label: "Wax equipment",
    },


    {
      key: "treadmill",
      label: "Treadmill",
    },


    {
      key: "bike",
      label: "Bike",
    },


    {
      key: "resistance-bands",
      label: "Resistance bands",
    },


    {
      key: "stepper",
      label: "Stepper",
    },


    {
      key: "kettlebells",
      label: "Kettlebells",
    },


    {
      key: "free-weights",
      label: "Free weights",
    },


    {
      key: "machine-weights",
      label: "Machine weights",
    },


    {
      key: "yoga-mats",
      label: "Yoga mats",
    },


    {
      key: "yoga-props",
      label: "Yoga props",
    },


    {
      key: "pilates-balls",
      label: "Pilates balls",
    },


    {
      key: "treatment-table",
      label: "Treatment table",
    },


    {
      key: "water-point",
      label: "Water point",
    },


    {
      key: "secure-lockers-(for-user-clients)",
      label: "Secure lockers (for User clients)",
    },


    {
      key: "lockable-drawers-/-file-cabinet",
      label: "Lockable drawers / file cabinet",
    },


    {
      key: "laser-printer-and-scanner",
      label: "Laser printer and scanner",
    },


    {
      key: "ethernet-connection",
      label: "Ethernet connection",
    },


    {
      key: "power-bank",
      label: "Power bank",
    },


    {
      key: "meeting-/-breakout-room-access",
      label: "Meeting / breakout room access",
    },
];





export const categories = [
  { key: 'hair-stylist', label: 'Hair Stylist' },
  { key: 'barber', label: 'Barber' },
  { key: 'makeup-artist', label: 'Makeup Artist' },
  { key: 'nail-technician', label: 'Nail Technician' },
  { key: 'cosmetics', label: 'Cosmetics' },
  { key: 'tattoo-artist', label: 'Tattoo Artist' },
  { key: 'fitness', label: 'Fitness' },
  { key: 'yoga', label: 'Yoga' },
  { key: 'dance', label: 'Dance' },
  { key: 'martial-arts', label: 'Martial Arts' },
  { key: 'massage', label: 'Massage' },
  { key: 'reiki', label: 'Reiki' },
  { key: 'acupuncture', label: 'Acupuncture' },
  { key: 'chiropractor', label: 'Chiropractor' },
  { key: 'art', label: 'Art' },
  { key: 'photography', label: 'Photography' },
  { key: 'music', label: 'Music' },
  { key: 'desk-space', label: 'Desk space' },
  { key: 'office-space', label: 'Office space' },
  { key: 'event-space', label: 'Event space' },
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
