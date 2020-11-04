/*
 * Marketplace specific configuration.
 *
 * Every filter needs to have following keys:
 * - id:     Unique id of the filter.
 * - label:  The default label of the filter.
 * - type:   String that represents one of the existing filter components:
 *           BookingDateRangeFilter, KeywordFilter, PriceFilter,
 *           SelectSingleFilter, SelectMultipleFilter.
 * - group:  Is this 'primary' or 'secondary' filter?
 *           Primary filters are visible on desktop layout by default.
 *           Secondary filters are behind "More filters" button.
 *           Read more from src/containers/SearchPage/README.md
 * - queryParamNames: Describes parameters to be used with queries
 *                    (e.g. 'price' or 'pub_amenities'). Most of these are
 *                    the same between webapp URLs and API query params.
 *                    You can't change 'dates', 'price', or 'keywords'
 *                    since those filters are fixed to a specific attribute.
 * - config: Extra configuration that the filter component needs.
 *
 * Note 1: Labels could be tied to translation file
 *         by importing FormattedMessage:
 *         <FormattedMessage id="some.translation.key.here" />
 *
 * Note 2: If you need to add new custom filter components,
 *         you need to take those into use in:
 *         src/containers/SearchPage/FilterComponent.js
 *
 * Note 3: If you just want to create more enum filters
 *         (i.e. SelectSingleFilter, SelectMultipleFilter),
 *         you can just add more configurations with those filter types
 *         and tie them with correct extended data key
 *         (i.e. pub_<key> or meta_<key>).
 */

export const amenities = [
  {
    label: "General",
    children: [
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
      }
    ]
  },
  {
    label: 'Beauty',
    children: [
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
    ]
  },
  {
    label: "Fitness & Wellbeing",
    children: [
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
    ]
  },
  {
    label: "Office",
    children: [
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
    ]
  },
];


export const filters = [
  {
    id: 'dates',
    label: 'Dates',
    type: 'BookingDateRangeFilter',
    group: 'primary',
    // Note: BookingDateRangeFilter is fixed filter,
    // you can't change "queryParamNames: ['dates'],"
    queryParamNames: ['dates'],
    config: {isCategory: false, catKeys: ''},
  },
  {
    id: 'price',
    label: 'Price',
    type: 'PriceFilter',
    group: 'primary',
    // Note: PriceFilter is fixed filter,
    // you can't change "queryParamNames: ['price'],"
    queryParamNames: ['price'],
    // Price filter configuration
    // Note: unlike most prices this is not handled in subunits
    config: {
      min: 0,
      max: 1000,
      step: 5,
      isCategory: false,
      catKeys: '',
    },
  },
  {
    id: 'keyword',
    label: 'Keyword',
    type: 'KeywordFilter',
    group: 'secondary',
    // Note: KeywordFilter is fixed filter,
    // you can't change "queryParamNames: ['keywords'],"
    queryParamNames: ['keywords'],
    // NOTE: If you are ordering search results by distance
    // the keyword search can't be used at the same time.
    // You can turn on/off ordering by distance from config.js file.
    config: {isCategory: false, catKeys: ''},
  },
  {
    id: 'hair_and_beauty',
    label: 'Hair & Beauty',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_category'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'hair-stylist', label: 'Hair Stylist' },
        { key: 'barber', label: 'Barber' },
        { key: 'makeup-artist', label: 'Beauty Space' },
        { key: 'nail-technician', label: 'Nail Station' },
        { key: 'cosmetics', label: 'Beauty Room' },
        { key: 'beauty-treatment-room', label: 'Beauty Treatment Room' }
      ],
      // NOTE Old categories migrated, i think??
      // { key: 'hair-stylist', label: 'Hair Stylist' },
      // { key: 'barber', label: 'Barber' },
      // { key: 'makeup-artist', label: 'Makeup Artist' },
      // { key: 'nail-technician', label: 'Nail Technician' },
      // { key: 'cosmetics', label: 'Cosmetics' },
      isCategory: true,
      catKeys: 'hair-stylist,barber,makeup-artist,nail-technician,cosmetics,beauty-treatment-room',
    },
  },
  {
    id: 'fitness_and_wellness',
    label: 'Fitness & Wellness',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_category'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'fitness', label: 'Fitness Studio' },
        { key: 'therapy-room', label: 'Therapy Room' },
        { key: 'wellness-treatment-room', label: 'Wellness Treatment Room' },
      ],
        // NOTE Old categories, need to migrate!
        // { key: 'fitness', label: 'Fitness' },
        // { key: 'yoga', label: 'Yoga' },
        // { key: 'dance', label: 'Dance' },
        // { key: 'martial-arts', label: 'Martial Arts' },
        // { key: 'massage', label: 'Massage' },
        // { key: 'reiki', label: 'Reiki' },
        // { key: 'acupuncture', label: 'Acupuncture' },
        // { key: 'chiropractor', label: 'Chiropractor' },
      isCategory: true,
      catKeys: 'fitness,therapy-room,wellness-treatment-room',
    },
  },
  {
    id: 'creative_studios',
    label: 'Creative Studios',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_category'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'photography', label: 'Photography Studio' },
        { key: 'art', label: 'Art Studio' },
        { key: 'music', label: 'Music Studio' },
      ],
      isCategory: true,
      catKeys: 'photography,art,music',
    },
  },
  {
    id: 'coworking',
    label: 'Coworking',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_category'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'desk-space', label: 'Coworking Space' },
        { key: 'office-space', label: 'Private Office Space' },
        { key: 'meeting-room-space', label: 'Meeting Room Space' },
      ],
      isCategory: true,
      catKeys: 'desk-space,office-space,meeting-room-space',
    },
  },
  {
    id: 'events_and_kitchen',
    label: 'Events & Kitchen',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_category'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'event-space', label: 'Event Space' },
        { key: 'outdoor-site', label: 'Outdoor Site' },
        { key: 'shoot-location', label: 'Shoot Location' },
        { key: 'kitchen-space', label: 'Kitchen Space' },
      ],
      isCategory: true,
      catKeys: 'event-space,outdoor-site,shoot-location,kitchen-space',
    },
  },
  {
    id: 'tattoo_and_piercing',
    label: 'Tattoo & Piercing',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_category'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'tattoo-artist', label: 'Tattoo' },
        { key: 'piercing-artist', label: 'Piercing' },
      ],
      isCategory: true,
      catKeys: 'tattoo-artist,piercing-artist',
    },
  },
  {
    id: 'amenities',
    label: 'Amenities',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_amenities'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_all',

      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
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
        }
      ],
      isCategory: false,
      catKeys: '',
    },
  }
];

// This can be used to populate all of the combined categories
// for example, on the new listing page, to select a category
export const categories = filters.filter(f => f.config.isCategory);


export const sortConfig = {
  // Enable/disable the sorting control in the SearchPage
  active: true,

  // Note: queryParamName 'sort' is fixed,
  // you can't change it since Flex API expects it to be named as 'sort'
  queryParamName: 'sort',

  // Internal key for the relevance option, see notes below.
  relevanceKey: 'relevance',

  // Keyword filter is sorting the results already by relevance.
  // If keyword filter is active, we need to disable sorting.
  conflictingFilters: ['keyword'],

  options: [
    { key: 'createdAt', label: 'Newest' },
    { key: '-createdAt', label: 'Oldest' },
    { key: '-price', label: 'Lowest price' },
    { key: 'price', label: 'Highest price' },

    // The relevance is only used for keyword search, but the
    // parameter isn't sent to the Marketplace API. The key is purely
    // for handling the internal state of the sorting dropdown.
    { key: 'relevance', label: 'Relevance', longLabel: 'Relevance (Keyword search)' },
  ],
};
