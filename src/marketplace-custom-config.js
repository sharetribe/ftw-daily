/*
 * Marketplace specific configuration.
 */

export const amenities = [
  {
    key: 'battery pack',
    label: 'Battery pack',
  },
  {
    key: '20 voltage',
    label: '20 Voltage',
  },
  {
    key: '40 voltage',
    label: '40 Voltage',
  },
  {
    key: 'own_drinks',
    label: 'Own drinks allowed',
  },
  {
    key: 'jacuzzi',
    label: 'Jacuzzi',
  },
  {
    key: 'audiovisual_entertainment',
    label: 'Audiovisual entertainment',
  },
  {
    key: 'barbeque',
    label: 'Barbeque',
  },
  {
    key: 'own_food_allowed',
    label: 'Own food allowed',
  },
];

export const categories = [
{key: 'Gear: Camera', label: 'Gear: Camera'},
{key: 'Gear: Camping & Hiking', label: 'Gear: Camping & Hiking'},
{key: 'Gear: Climbing', label: 'Gear: Climbing'},
{key: 'Gear: Cycling', label: 'Gear: Cycling'},
{key: 'Gear: Paddling & Surfing', label: 'Gear: Paddling & Surfing'},
{key: 'Gear: Snow', label: 'Gear: Snow'},
{key: 'Gear: Travel', label: 'Gear: Travel'},

{key: 'Equipment: Automotive', label: 'Equipment: Automotive'},
{key: 'Equipment: Carpet Cleaners & Vacuums', label: 'Equipment: Carpet Cleaners & Vacuums'},
{key: 'Equipment: Cooling & Heating', label: 'Equipment: Cooling & Heating'},
{key: 'Equipment: Hand Tools', label: 'Equipment: Hand Tools'},
{key: 'Equipment: Ladders', label: 'Equipment: Ladders'},
{key: 'Equipment: Lawn & Garden', label: 'Equipment: Lawn & Garden'},
{key: 'Equipment: Power Tools', label: 'Equipment: Power Tools'},
{key: 'Equipment: Pressure Washers', label: 'Equipment: Pressure Washers'},

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
