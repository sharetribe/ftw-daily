import {
  HOURLY_BOOKING,
  DAILY_BOOKING,
  WEEKLY_BOOKING,
  MONTHLY_BOOKING
} from './util/types';

import {
  generalAmenitiesOptions,
  hairAndBeautyOptions,
  hairAndBeautyAmenitiesOptions,
  wellnessOptions,
  wellnessAmenitiesOptions,
  fitnessOptions,
  fitnessAmenitiesOptions,
  eventsAndVenuesOptions,
  eventsAndVenuesAmenitiesOptions,
  coworkingOptions,
  coworkingAmenitiesOptions,
  musicAndArtsOptions,
  musicAndArtsAmenitiesOptions,
  photographyAndFilmOptions,
  photographyAndFilmAmenitiesOptions,
  kitchenOptions,
  kitchenAmenitiesOptions,
} from './custom-config-options'

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

export const discountTypes = [
  {key: HOURLY_BOOKING, label: 'Hours'},
  {key: DAILY_BOOKING, label: 'Days'},
  {key: WEEKLY_BOOKING, label: 'Weeks'},
  {key: MONTHLY_BOOKING, label: 'Months'}
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
      max: 50000,
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
    labelImg: 'hairBeauty',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_category'],
    config: {
      searchMode: 'has_any',
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: hairAndBeautyOptions,

      isCategory: true,
      catKeys: 'hair-stylist,barber,makeup-artist,nail-technician,cosmetics,aesthetics,tattoo-and-piercing',
    },
  },
  {
    id: 'wellness',
    label: 'Wellness',
    labelImg: 'wellness',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_category'],
    config: {
      searchMode: 'has_any',
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: wellnessOptions,
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
      catKeys: 'therapy-room,massage-room,clinical-room',
    },
  },
  {
    id: 'fitness',
    label: 'Fitness',
    labelImg: 'fitness',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_category'],
    config: {
      searchMode: 'has_any',
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: fitnessOptions,
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
      catKeys: 'fitness,yoga-studio,dance-studio,sports-hall,outdoor-sport-space,activity-room',
    },
  },
  {
    id: 'events_and_venues',
    label: 'Events & Venues',
    labelImg: 'eventsAndVenues',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_category'],
    config: {
      searchMode: 'has_any',
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: eventsAndVenuesOptions,
      isCategory: true,
      catKeys: 'music-venue,private-event-space,sports-venue,conference-exhibition,outdoor-events,private-dining',
    },
  },
  {
    id: 'coworking',
    label: 'Coworking & Office',
    labelImg: 'coworking',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_category'],
    config: {
      searchMode: 'has_any',
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: coworkingOptions,
      isCategory: true,
      catKeys: 'desk-space,office-space,meeting-room-space,conference-room,classroom',
    },
  },
  {
    id: 'music_and_arts',
    label: 'Music & Arts',
    labelImg: 'musicAndArts',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_category'],
    config: {
      searchMode: 'has_any',
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: musicAndArtsOptions,
      isCategory: true,
      catKeys: 'music-studio,recording-studio,gallery-space,art-studio,rehearsal-space,drama-studio,theatre-space',
    },
  },
  {
    id: 'photography_and_film',
    label: 'Photography & Film',
    labelImg: 'photographyAndFilm',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_category'],
    config: {
      searchMode: 'has_any',
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: photographyAndFilmOptions,
      isCategory: true,
      catKeys: 'photography,location-shoot,outdoor-site',
    },
  },
  {
    id: 'kitchensand_pop_ups',
    label: 'Kitchens & Pop-ups',
    labelImg: 'kitchensAndPopUps',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_category'],
    config: {
      searchMode: 'has_any',
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: kitchenOptions,
      isCategory: true,
      catKeys: 'kitchen-space,pop-up-space',
    },
  },

  // ====================================
  // SECONDARY FILTERS
  // ====================================

  {
    id: 'general_amenities',
    label: 'General Amenities',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_amenities'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_any',
      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: generalAmenitiesOptions,
      isCategory: false,
      isGeneralAmenities: true,
      catKeys: 'all',
    },
  },
  {
    id: 'hair_beauty_amenities',
    idCategory: 'hair_and_beauty',
    label: 'Hair & Beauty Amenities',
    labelMobile: 'Patch Amenities',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_amenities'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_any',
      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: hairAndBeautyAmenitiesOptions,
      isCategory: false,
      isCategoryAmenities: true,
      catKeys: 'hair-stylist,barber,makeup-artist,nail-technician,cosmetics,aesthetics,tattoo-and-piercing',
    },
  },
  {
    id: 'wellness_amenities',
    idCategory: 'wellness',
    label: 'Wellness Amenities',
    labelMobile: 'Patch Amenities',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_amenities'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_any',
      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: wellnessAmenitiesOptions,
      isCategory: false,
      isCategoryAmenities: true,
      catKeys: 'therapy-room,massage-room,clinical-room',
    },
  },  
  {
    id: 'fitness_amenities',
    idCategory: 'fitness',
    label: 'Fitness Amenities',
    labelMobile: 'Patch Amenities',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_amenities'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_any',
      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: fitnessAmenitiesOptions,
      isCategory: false,
      isCategoryAmenities: true,
      catKeys: 'fitness,yoga-studio,dance-studio,sports-hall,outdoor-sport-space,activity-room',
    },
  },
  {
    id: 'photography_and_film_amenities',
    idCategory: 'photography_and_film',
    label: 'Photography & Film Amenities',
    labelMobile: 'Patch Amenities',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_amenities'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_any',
      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: photographyAndFilmAmenitiesOptions,
      isCategory: false,
      isCategoryAmenities: true,
      catKeys: 'photography,location-shoot,outdoor-site',
    },
  },
  {
    id: 'coworking_amenities',
    idCategory: 'coworking',
    label: 'Coworking Amenities',
    labelMobile: 'Patch Amenities',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_amenities'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_any',
      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: coworkingAmenitiesOptions,
      isCategory: false,
      isCategoryAmenities: true,
      catKeys: 'desk-space,office-space,meeting-room-space,conference-room,classroom',
    },
  },
  {
    id: 'music_and_arts_amenities',
    idCategory: 'music_and_arts',
    label: 'Music & Arts Amenities',
    labelMobile: 'Patch Amenities',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_amenities'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_any',
      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: musicAndArtsAmenitiesOptions,
      isCategory: false,
      isCategoryAmenities: true,
      catKeys: 'music-studio,recording-studio,gallery-space,art-studio,rehearsal-space,drama-studio,theatre-space',
    },
  },  
  {
    id: 'events_amenities',
    idCategory: 'events_and_venues',
    label: 'Events Amenities',
    labelMobile: 'Patch Amenities',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_amenities'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_any',

      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: eventsAndVenuesAmenitiesOptions,
      isCategory: false,
      isCategoryAmenities: true,
      catKeys: 'music-venue,private-event-space,sports-venue,conference-exhibition,outdoor-events,private-dining',
    },
  },
  {
    id: 'kitchen_amenities',
    idCategory: 'kitchensand_pop_ups',
    label: 'Kitchen Amenities',
    labelMobile: 'Patch Amenities',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_amenities'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_any',
      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: kitchenAmenitiesOptions,
      isCategory: false,
      isCategoryAmenities: true,
      catKeys: 'kitchen-space,pop-up-space',
    },
  },
];


// This can be used to populate all of the combined categories
// for example, on the new listing page, to select a category
export const categories = filters.filter(f => f.config.isCategory);

// This can be used to populate all of the combined categories
// for example, on the new listing page, to select a category
export const amenities = filters.filter(f => f.queryParamNames[0] === 'pub_amenities');

const genCatOptions = categories.map(cat => {
  const genCat = {key: cat.config.catKeys, label: cat.label};
  return genCat;
});

export const generalCategories =
  {
    id: 'general_categories',
    label: 'Categories',
    type: 'SelectSingleFilter',
    group: 'primary',
    queryParamNames: ['pub_category'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_all',
      options: genCatOptions,
      isCategory: false,
      catKeys: '',
    },
  };


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
