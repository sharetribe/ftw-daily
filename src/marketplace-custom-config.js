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

export const typeOfPet = [
  // {
  //   key: 'overnightsStay',
  //   label: 'Over night stay',
  // },
  // {
  //   key: 'dayCareStay',
  //   label: 'Day care stay',
  // },
  {
    key: 'dog',
    label: 'Dog',
  },
  {
    key: 'cat',
    label: 'Cat',
  }
]
export const Weight=[
  {
    key: 'small',
    label: '0-6kg (Small)',
  },
  {
    key: 'midium',
    label: '7-20kg (Medium)',
  },
  {
    key: 'large',
    label: '20-40kg (Large)',
  },
  {
    key: 'giant',
    label: '40+kg (Giant)',
  },
]
export const microchipped=[
  {
    key: 'microchipped_yes',
    label: 'Yes',
  },
  {
    key: 'microchipped_no',
    label: 'No',
  },
]
export const desexed=[
  {
    key: 'desexed_yes',
    label: 'Yes',
  },
  {
    key: 'desexed_no',
    label: 'No',
  },
]
export const house_trained=[
  {
    key: 'trained_yes',
    label: 'Yes',
  },
  {
    key: 'trained_no',
    label: 'No',
  },
  {
    key: 'trained_Unsure',
    label: 'Unsure',
  },
  {
    key: 'trained_Depends',
    label: 'Depends',
  },
 
]
export const children_pet=[
  {
    key: 'children_yes',
    label: 'Yes',
  },
  {
    key: 'children_no',
    label: 'No',
  },
  {
    key: 'children_Unsure',
    label: 'Unsure',
  },
  {
    key: 'children_Depends',
    label: 'Depends',
  },
 
]
export const Potty_break=[
  {
    key: 'every_hour',
    label: 'Every hour',
  },
  {
    key: 'two_hr',
    label: '2 hours',
  },
  {
    key: 'four_hr',
    label: '4 hours',
  },
  {
    key: 'eight_hr',
    label: '8 hours',
  },
  {
    key: 'custom',
    label: 'Custom',
  },
]
export const Energy_level=[
  {
    key: 'high',
    label: 'High ',
  },
  {
    key: 'medium',
    label: 'Medium',
  },
  {
    key: 'low',
    label: 'Low',
  },
 
 
]
export const Feeding_schedule=[
  {
    key: 'morning',
    label: 'Morning',
  },
  {
    key: 'twice',
    label: 'Twice a day',
  },
  {
    key: 'feed_custom',
    label: 'Custom',
  },
  {
    key: 'other_Depends',
    label: 'Depends',
  },
 
]
export const left_alone=[
  {
    key: 'less_one',
    label: '<1 hour',
  },
  {
    key: 'one_four',
    label: '1 - 4 hours',
  },
  {
    key: 'four_eight',
    label: '4 - 8 hours',
  },
  {
    key: 'alone_custom',
    label: 'Custom',
  },
 
]
export const Medication=[
  {
    key: 'pill',
    label: 'Pill',
  },
  {
    key: 'topical',
    label: 'Topical',
  },
  {
    key: 'injection',
    label: 'Injection',
  },
 
]
export const other_pet=[
  {
    key: 'other_yes',
    label: 'Yes',
  },
  {
    key: 'other_no',
    label: 'No',
  },
  {
    key: 'other_Unsure',
    label: 'Unsure',
  },
  {
    key: 'other_Depends',
    label: 'Depends',
  },
 
]
export const Pet_Insurance=[
  {
    key: 'insurance_yes',
    label: 'Yes',
  },
  {
    key: 'insurance_no',
    label: 'No',
  },
 
 
]
export const filters = [

  {
    id: 'price',
    label: 'Price',
    type: 'PriceFilter',
    group: 'primary',
    filtersFor: ["SearchPage"],
    // Note: PriceFilter is fixed filter,
    // you can't change "queryParamNames: ['price'],"
    queryParamNames: ['price'],
    // Price filter configuration
    // Note: unlike most prices this is not handled in subunits
    config: {
      min: 0,
      max: 500,
      step: 5,
    },
  },
  {
    id: 'keyword',
    label: 'Keyword',
    type: 'KeywordFilter',
    group: 'primary',
    // Note: KeywordFilter is fixed filter,
    // you can't change "queryParamNames: ['keywords'],"
    queryParamNames: ['keywords'],
    // NOTE: If you are ordering search results by distance
    // the keyword search can't be used at the same time.
    // You can turn on/off ordering by distance from config.js file.
    config: {},
  },
  // {
  //   id: 'category',
  //   label: 'Category',
  //   type: 'SelectSingleFilter',
  //   group: 'secondary',
  //   queryParamNames: ['pub_category'],
  //   config: {
  //     // "key" is the option you see in Flex Console.
  //     // "label" is set here for the UI only.
  //     // Note: label is not added through the translation files
  //     // to make filter customizations a bit easier.
  //     options: [
  //       { key: 'Overnight Stay', label: 'Overnight Stay' },
  //       { key: 'Day Care Stay', label: 'Day Care Stay' },

  //     ],
  //   },
  // },
  // {
  //   id: 'amenities',
  //   label: 'Amenities',
  //   type: 'SelectMultipleFilter',
  //   group: 'secondary',
  //   queryParamNames: ['pub_amenities'],
  //   config: {
  //     // Optional modes: 'has_all', 'has_any'
  //     // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
  //     searchMode: 'has_all',

  //     // "key" is the option you see in Flex Console.
  //     // "label" is set here for this web app's UI only.
  //     // Note: label is not added through the translation files
  //     // to make filter customizations a bit easier.
  //     options: [
  //       {
  //         key: 'towels',
  //         label: '0-6kg (small)',

  //       },
  //       {
  //         key: 'bathroom',
  //         label: 'Bathroom',
  //       },
  //       {
  //         key: 'swimming_pool',
  //         label: 'Swimming pool',
  //       },
  //       {
  //         key: 'own_drinks',
  //         label: 'Own drinks allowed',
  //       },
  //       {
  //         key: 'jacuzzi',
  //         label: 'Jacuzzi',
  //       },
  //       {
  //         key: 'audiovisual_entertainment',
  //         label: 'Audiovisual entertainment',
  //       },
  //       {
  //         key: 'barbeque',
  //         label: 'Barbeque',
  //       },
  //       {
  //         key: 'own_food_allowed',
  //         label: 'Own food allowed',
  //       },
  //     ],
  //   },
  // },
  {
    id: 'dates',
    label: 'Dates',
    type: 'BookingDateRangeFilter',
    filtersFor: ["SearchPage", "LandingPage"],
    group: 'primary',
    // Note: BookingDateRangeFilter is fixed filter,
    // you can't change "queryParamNames: ['dates'],"
    queryParamNames: ['dates'],
    config: {},
  },
  {
    id: 'serviceSetup',
    label: 'Type of Services',
    type: 'SelectSingleFilter',
    group: 'primary',
    filtersFor: ["SearchPage", "LandingPage"],
    queryParamNames: ['pub_serviceSetup'],
    config: {
      searchMode: 'has_any',
      options: [
        {
          key: 'overnightsStay',
          label: 'Over night stay',
        },
        {
          key: 'dayCareStay',
          label: 'Day care stay',
        },

      ],
    },
  },

  {
    id: 'typeOfPets',
    label: 'Type of Pet',
    type: 'SelectMultipleFilter',
    group: 'primary',
    filtersFor: ["SearchPage", "LandingPage"],
    queryParamNames: ['pub_typeOfPets'],
    config: {
      searchMode: 'has_all',
      options: [
        {
          key: 'dog',
          label: 'Dog',
        },
        {
          key: 'cat',
          label: 'Cat',
        }
      ],
    },
  },
  {
    id: 'sizeOfdogs',
    label: 'Size Of Dogs',
    type: 'SelectMultipleFilter',
    filtersFor: ["SearchPage", "LandingPage"],
    group: 'primary',
    queryParamNames: ['pub_sizeOfdogs'],
    config: {

      searchMode: 'has_any',
      options: [
        {
          key: 'small',
          label: '0-6kg (Small)',
        },
        {
          key: 'midium',
          label: '7-20kg (Medium)',
        },
        {
          key: 'large',
          label: '20-40kg (Large)',
        },
        {
          key: 'giant',
          label: '40+kg (Giant)',
        },

      ],
    },
  },

  {
    id: 'discount',
    label: 'discount',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_discount'],
    config: {

      searchMode: 'has_all',
      options: [
        {
          key: 'dis_yes',
          label: 'yes',
        },
        {
          key: 'dis_no',
          label: 'no',
        },
      ],
    },
  },
  {
    id: 'policeCheck',
    label: ' Police Verification',
    type: 'SelectSingleFilter',
    group: 'primary',
    queryParamNames: ['pub_policeCheck'],
    config: {

      searchMode: 'has_all',
      options: [
        {
          key: 'police_yes',
          label: 'Yes',
        },
        {
          key: 'police_no',
          label: 'No',
        },
      ],
    },
  },
  {
    id: 'dropPick',
    label: ' drop off/ pick up service',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_dropPick'],
    config: {

      searchMode: 'has_all',
      options: [
        {
          key: 'dropPick_yes',
          label: 'Yes',
        },
        {
          key: 'dropPick_no',
          label: 'No',
        },
      ],
    },
  },
  {
    id: 'numberOfPets',
    label: 'Number Of Pets',
    type: 'SelectSingleFilter',
    group: 'primary',
    filtersFor: ["SearchPage", "LandingPage"],
    queryParamNames: ['pub_numberOfPets'],
    config: {
      // searchMode: 'has_all',
      options: [
        {
          key: '1',
          label: '1',
        },
        {
          key: '2',
          label: '2',
        },
        {
          key: '3',
          label: '3+',
        },

      ],
    },
  },
  {
    id: 'dohavepets',
    label: 'Have pets',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_dohavepets'],
    config: {

      searchMode: 'has_all',
      options: [
        {
          key: 'yes',
          label: 'Yes',
        },
        {
          key: 'no',
          label: 'No',
        },
      ],
    },
  },

  {
    id: 'housingConditions',
    label: 'Housing conditions',
    type: 'SelectMultipleFilter',
    group: 'primary',
    filtersFor: ["SearchPage"],
    queryParamNames: ['pub_housingConditions'],
    config: {

      searchMode: 'has_all',
      options: [
        {
          key: 'house',
          label: 'Has house (excludes apartments)',
        },
        {
          key: 'fenced',
          label: 'Has fenced backyard',
        },
        {
          key: 'furniture',
          label: 'Pet allowed on furniture',
        },
        {
          key: 'bed',
          label: 'Pet allowed on bed',
        },
        {
          key: 'nonSmoking',
          label: 'Non-smoking home',
        },
      ],
    },
  },
  {
    id: 'petInHome',
    label: 'Pet in the home',
    type: 'SelectMultipleFilter',
    group: 'primary',
    filtersFor: ["SearchPage"],
    queryParamNames: ['pub_petInHome'],
    config: {

      searchMode: 'has_all',
      options: [
        {
          key: 'doesnotDog',
          label: 'Does not own a dog',
        },
        {
          key: 'doesnotcat',
          label: 'Does not own a cat',
        },

        {
          key: 'acceptoneClient',
          label: 'Accepts only one client at a time',
        },
        {
          key: 'doesnotpet',
          label: 'Does not own caged pets',
        },
      ],
    },
  },
];

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
