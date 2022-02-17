import {
  HOURLY_DISCOUNT,
  DAILY_DISCOUNT,
  WEEKLY_DISCOUNT,
  MONTHLY_DISCOUNT
} from './util/types';

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
  {key: HOURLY_DISCOUNT, label: 'Hours'},
  {key: DAILY_DISCOUNT, label: 'Days'},
  {key: WEEKLY_DISCOUNT, label: 'Weeks'},
  {key: MONTHLY_DISCOUNT, label: 'Months'}
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
      max: 10000,
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
      options: [
        { key: 'hair-stylist', label: 'Hair Stylist', labelImg: 'hairStylist' },
        { key: 'barber', label: 'Barber', labelImg: 'barber' },
        { key: 'makeup-artist', label: 'Beauty Space', labelImg: 'makeupArtist' },
        { key: 'nail-technician', label: 'Nail Station', labelImg: 'nailTechnician' },
        { key: 'cosmetics', label: 'Beauty Room', labelImg: 'cosmetics' },
        { key: 'aesthetics', label: 'Aesthetics', labelImg: 'aesthetics' },
        { key: 'tattoo-and-piercing', label: 'Tattoo & Piercing', labelImg: 'tattooAndPiercing' }
      ],

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
      options: [
        { key: 'therapy-room', label: 'Therapy Room', labelImg: 'therapyRoom' },
        { key: 'massage-room', label: 'Massage Room', labelImg: 'massageRoom' },
        { key: 'clinical-room', label: 'Clinical Room', labelImg: 'clinicalRoom' },
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
      catKeys: 'therapy-room, massage-room, clinical-room',
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
      options: [
        { key: 'fitness', label: 'Fitness Studio', labelImg: 'fitness' },
        { key: 'yoga-studio', label: 'Yoga Studio', labelImg: 'yogaStudio' },
        { key: 'dance-studio', label: 'Dance Studio', labelImg: 'danceStudio' },
        { key: 'sports-hall', label: 'Sports Hall', labelImg: 'sportsHall' },
        { key: 'outdoor-sport-space', label: 'Outdoor Sport Space ', labelImg: 'outdoorSportSpace' },
        { key: 'activity-room', label: 'Activity Room', labelImg: 'activityRoom' },
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
      catKeys: 'fitness, yoga-studio, dance-studio, sports-hall, outdoor-sport-space, activity-room',
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
      options: [
        { key: 'music-venue', label: 'Music Venue', labelImg: "musicVenue" },
        { key: 'private-event-space', label: 'Private Event Space', labelImg: "privateEventSpace" },
        { key: 'sports-venue', label: 'Sports Venue', labelImg: "sportsVenue" },
        { key: 'conference-exhibition', label: 'Conference & Exhibition ', labelImg: "conferenceExhibition" },
        { key: 'outdoor-events', label: 'Outdoor Events', labelImg: "outdoorEvents" },
        { key: 'private-dining', label: 'Private Dining', labelImg: "privateDining" },

      ],
      isCategory: true,
      catKeys: 'music-venue, private-event-space, sports-venue, conference-exhibition, outdoor-events, private-dining',
    },
  },
  {
    id: 'coworking',
    label: 'Coworking',
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
      options: [
        { key: 'desk-space', label: 'Coworking Space', labelImg: 'deskSpace' },
        { key: 'office-space', label: 'Private Office Space', labelImg: 'officeSpace' },
        { key: 'meeting-room-space', label: 'Meeting Room Space', labelImg: 'meetingRoomSpace' },
        { key: 'conference-room', label: 'Conference Room', labelImg: 'conferenceRoom' },
        { key: 'classroom', label: 'Classroom', labelImg: 'classroom' }
      ],
      isCategory: true,
      catKeys: 'desk-space, office-space, meeting-room-space, conference-room, classroom',
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
      options: [
        { key: 'music-studio', label: 'Music Studio', labelImg: 'musicStudio' },
        { key: 'recording-studio', label: 'Recording Studio', labelImg: 'recordingStudio' },
        { key: 'gallery-space', label: 'Gallery Space', labelImg: 'gallerySpace' },
        { key: 'art-studio', label: 'Art Studio', labelImg: 'artStudio' },
        { key: 'rehearsal-space', label: 'Rehearsal Space', labelImg: 'rehearsalSpace' },
        { key: 'drama-studio', label: 'Drama Studio', labelImg: 'dramaStudio' },
        { key: 'theatre-space', label: 'Theatre Space', labelImg: 'theatreSpace' },
      ],
      isCategory: true,
      catKeys: 'music-studio, recording-studio, gallery-space, art-studio, rehearsal-space, drama-studio, theatre-space',
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
      options: [
        { key: 'photography', label: 'Photography Studio', labelImg: 'photography' },
        { key: 'location-shoot', label: 'Location Shoot', labelImg: 'locationShoot' },
        { key: 'outdoor-site', label: 'Outdoor Site', labelImg: 'outdoorSite' }
      ],
      isCategory: true,
      catKeys: 'photography, location-shoot, outdoor-site',
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
      options: [
        { key: 'kitchen-space', label: 'Kitchen space', labelImg: "kitchenSpace" },
        { key: 'pop-up-space', label: 'Pop-up space', labelImg: "popUpSpace" },
      ],
      isCategory: true,
      catKeys: 'kitchen-space, pop-up-space',
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
      options: [
        {key: "air-conditioning",label: "Air conditioning"},
        {key: "cctv-monitoring",label: "CCTV monitoring"},
        {key: "cleaner",label: "Cleaner"},
        {key: "client-refreshments",label: "Client Refreshments"},
        {key: "wheelchair-access",label: "Disabled access"},
        {key: "free-parking",label: "Free parking"},
        {key: "heating",label: "Heating"},
        {key: "kitchen",label: "Kitchen Facilities"},
        {key: "key/electronic-access-card",label: "Own Key / Electronic access card"},
        {key: 'parking', label: 'Paid Parking'},
        {key: "pets-allowed",label: "Pets Allowed"},
        {key: "receptionist",label: "Reception"},
        {key: "secure-locker",label: "Secure locker"},
        {key: "storage", label: "Storage"},
        {key: "toilet",label: "Toilet / Washroom"},
        {key: "waiting-area",label: "Waiting Area"},
        {key: "wifi",label: "WiFi"},
      ],
      isCategory: false,
      catKeys: 'all',
    },
  },
  {
    id: 'hair_beauty_amenities',
    label: 'Hair & Beauty Amenities',
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
      options: [
        {key: "backwash-chair", label: "Backwash Chair"},
        {key: "barber-accessories", label: "Barber Accessories"},
        {key: "barber-chair", label: "Barber Chair"},
        {key: "barber-unit", label: "Barber Unit"},
        {key: "capes-gowns-collars", label: "Capes / Gowns Collars"},
        {key: "hb-cleaning-supplies", label: "Cleaning Supplies"},
        {key: "hair-products", label: "Hair Products"},
        {key: "hairdryer", label: "Hairdryer"},
        {key: "locked-cupboards", label: "Locked cupboards"},
        {key: "hb-massage-chair", label: "Massage chair"},
        {key: "mirror-styling-unit", label: "Mirror / Styling Unit"},
        {key: "pedicure-chair", label: "Pedicure Chair"},
        {key: "hb-sterilising-equipment", label: "Sterilising Equipment"},
        {key: "styling-accessories", label: "Styling Accessories"},
        {key: "styling-chair", label: "Styling Chair"},
        {key: "hb-treatment-table", label: "Treatment Table"},
        {key: "hb-trolley", label: "Trolley"},
        {key: "led-magnifying-light", label: "UV / LED magnifying light"},
        {key: "washing-point", label: "Washing point / Basin"},
      ],
      isCategory: false,
      catKeys: 'hair-stylist,barber,makeup-artist,nail-technician,cosmetics,aesthetics,beauty-treatment-room',
    },
  },
  {
    id: 'fitness_wellness_amenities',
    label: 'Fitness & Wellness Amenities',
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
      options: [
        {key: "fw-adjustable-lighting", label: "Adjustable Lighting"},
        {key: "fw-changing-area", label: "Changing Area"},
        {key: "fw-cleaning-supplies", label: "Cleaning Supplies"},
        {key: "couch-armchairs", label: "Couch / Armchairs"},
        {key: "exercise-mats", label: "Exercise Mats"},
        {key: "fitness-equipment", label: "Fitness Equipment"},
        {key: "free-weights", label: "Free weights"},
        {key: "gym-equipment", label: "Gym Equipment"},
        {key: "fw-massage-chair", label: "Massage Chair"},
        {key: "massage-table", label: "Massage Table"},
        {key: "mirrored-wall", label: "Mirrored Wall"},
        {key: "secure-lockers-(for-user-clients)", label: "Secure lockers (for User clients)"},
        {key: "fw-speakers-music", label: "Speakers / Music"},
        {key: "towels", label: "Towels"},
        {key: "yoga-mats", label: "Yoga mats"},
        {key: "yoga-props", label: "Yoga props"},
        {key: "water-point", label: "Water Point"},
      ],
      isCategory: false,
      catKeys: 'fitness,therapy-room,wellness-treatment-room',
    },
  },
  {
    id: 'creative_studios_amenities',
    label: 'Creative Studios Amenities',
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
      options: [
        {key: 'cs-adjustable-lighting', label: 'Adjustable Lighting'},
        {key: 'backdrops', label: 'Backdrops (White, Black, Green)'},
        {key: 'background-reflectors', label: 'Background Reflectors'},
        {key: 'blackout-option', label: 'Blackout Option'},
        {key: 'clothes-rail', label: 'Clothes rail'},
        {key: 'dj_equipment', label: 'DJ Equipment'},
        {key: 'easels', label: 'Easels'},
        {key: 'flipchart', label: 'Flipchart'},
        {key: 'green-screen', label: 'Green Screen'},
        {key: 'high-ceilings', label: 'High Ceilings'},
        {key: 'lighting-equipment', label: 'Lighting Equipment'},
        {key: 'microphones', label: 'Microphones'},
        {key: 'mirror-and-makeup-desk', label: 'Mirror and Makeup Desk'},
        {key: 'mixer', label: 'Mixer'},
        {key: 'cs-speakers-music', label: 'Speakers / Music'},
        {key: 'natural-light', label: 'Natural Light'},
        {key: 'pa-speakers', label: 'PA Speakers'},
        {key: 'polyboards-and-stands', label: 'Polyboards and Stands'},
        {key: 'projector', label: 'Projector'},
        {key: 'seating-area', label: 'Seating area'},
        {key: 'separate-changing-area', label: 'Seperate changing area'},
        {key: 'cs-sound-engineer', label: 'Sound Engineer'},
        {key: 'tables-and-chairs', label: 'Tables and Chairs'},
        {key: 'white-boards', label: 'Whiteboards'},
      ],
      isCategory: false,
      catKeys: 'photography,art,music',
    },
  },
  {
    id: 'coworking_amenities',
    label: 'Coworking Amenities',
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
      options: [
        {key: 'bike-storage', label: 'Bike Storage'},
        {key: 'breakout-space', label: 'Breakout Space'},
        {key: 'childcare', label: 'Childcare'},
        {key: 'cleaning', label: 'Cleaning'},
        {key: "ethernet-connection", label: "Ethernet connection"},
        {key: 'lockers', label: 'Lockers'},
        {key: 'mailing-address', label: 'Mailing Address'},
        {key: "meeting-room-access", label: "Meeting Rooms"},
        {key: "laser-printer-and-scanner", label: "Printing"},
        {key: 'private-phone-booths', label: 'Private phone booths'},
        {key: 'showers', label: 'Showers'},
      ],
      isCategory: false,
      catKeys: 'desk-space,office-space,meeting-room-space',
    },
  },
  {
    id: 'events_amenities',
    label: 'Events Amenities',
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
      options: [
        {key: 'bar-hire', label: 'Bar Hire'},
        {key: 'catering-available', label: 'Catering Available'},
        {key: 'cloakroom', label: 'Cloakroom'},
        {key: 'seating', label: 'Seating'},
        {key: 'tables', label: 'Tables'},
        {key: 'licensed', label: 'Licensed'},
        {key: 'e-dj-equipment', label: 'DJ Booth / Equipment'},
        {key: 'av-equipment', label: 'A/V Equipment'},
        {key: 'e-sound-engineer', label: 'Sound Engineer'},
        {key: 'staff', label: 'Staff'},
        {key: 'stage', label: 'Stage'},
        {key: 'ceremony location', label: 'Ceremony location'},
        {key: 'ek-props', label: 'Props'},
        {key: 'sound system', label: 'Sound system'},
        {key: 'screen-projector', label: 'Screen/projector'},
      ],
      isCategory: false,
      catKeys: 'event-space,outdoor-site,shoot-location',
    },
  },
  {
    id: 'kitchen_amenities',
    label: 'Kitchen Amenities',
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
      options: [
        {key: '3-phase-power', label: '3 Phase Power'},
        {key: 'blender', label: 'Blender'},
        {key: 'chest-freezer', label: 'Chest Freezer'},
        {key: 'chopping-board', label: 'Chopping Board'},
        {key: 'combi-oven', label: 'Combi Oven'},
        {key: 'commercial-oven', label: 'Commercial oven'},
        {key: 'counter-space', label: 'Counter Space'},
        {key: 'dishwasher', label: 'Dishwasher'},
        {key: 'dry-storage', label: 'Dry Storage'},
        {key: 'extractor-fan', label: 'Extractor Fan'},
        {key: 'food-processor', label: 'Food Processor'},
        {key: 'freezer', label: 'Freezer'},
        {key: 'fridge', label: 'Fridge'},
        {key: 'gas-hob', label: 'Gas Hob'},
        {key: 'grill', label: 'Grill'},
        {key: 'induction-hob', label: 'Induction Hob'},
        {key: 'microwave', label: 'Microwave'},
        {key: 'pots-pans', label: 'Pots and Pans'},
        {key: 'sink', label: 'Sink'},
        {key: 'stand-mixer', label: 'Stand Mixer'},
        {key: 'walkin-fridge', label: 'Walk-in Fridge'},
      ],
      isCategory: false,
      catKeys: 'kitchen-space',
    },
  },
  {
    id: 'tattoo_and_piercing_amenities',
    label: 'Tattoo & Piercing Amenities',
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
      options: [
        {key: 'bench', label: 'Bench'},
        {key: 'clinical-waste-removal', label: 'Clinical Waste Removal'},
        {key: 'tp-mirror', label: 'Mirror'},
        {key: 'piercing-equipment', label: 'Piercing Equipment'},
        {key: 'sharps-collection', label: 'Sharps Collection'},
        {key: 'tp-sterilising-equipment', label: 'Sterilising Equipment'},
        {key: 'stool', label: 'Stool'},
        {key: 'tattoo-equipment', label: 'Tattoo Equipment'},
        {key: 'tp-trolley', label: 'Trolley'},
      ],
      isCategory: false,
      catKeys: 'tattoo-artist,piercing-artist',
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
