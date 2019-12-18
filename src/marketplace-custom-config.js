/*
 * Marketplace specific configuration.
 */

export const amenities = [
  {
    key: "surfboard_included",
    label: "Surfboard included"
  },
  {
    key: "wetsuit_included",
    label: "Wetsuit included"
  },
  {
    key: "free_coffee_and_tea",
    label: "Free coffee and tea"
  },
  {
    key: "surf_lessons_included",
    label: "Surf lessons included"
  },
  {
    key: "surf_lessons_available",
    label: "Surf lessons available"
  },
  {
    key: "surfboard_rental_available",
    label: "Surfboard rental available"
  },
  {
    key: "wetsuit_rental_available",
    label: "Wetsuit rental available"
  },
  {
    key: "car_rental_available",
    label: "Car rental available"
  },
  {
    key: "scooter_rental_available",
    label: "Scooter rental available"
  },
  {
    key: "coworking_space",
    label: "Coworking space"
  },
  {
    key: "ergonomic_office_chairs",
    label: "Ergonomic office chairs"
  },
  {
    key: "private_desk(s)",
    label: "Private desk(s)"
  },
  {
    key: "recording_studio",
    label: "Recording studio"
  },
  {
    key: "close_to_supermarket",
    label: "Close to supermarket"
  },
  {
    key: "desk_supplies_(staples,_post-it_notes,_tape,_highlighter,_etc.)",
    label: "Desk supplies (staples, post-it notes, tape, highlighter, etc.)"
  },
  {
    key: "standing_desk",
    label: "Standing desk"
  },
  {
    key: "white_board",
    label: "White board"
  },
  {
    key: "projector",
    label: "Projector"
  },
  {
    key: "international_power_adapter(s)",
    label: "International power adapter(s)"
  },
  {
    key: "community_events",
    label: "Community events"
  },
  {
    key: "community_workshops",
    label: "Community workshops"
  },
  {
    key: "(communal)_kitchen",
    label: "(Communal) kitchen"
  },
  {
    key: "community_meals",
    label: "Community meals"
  },
  {
    key: "community_activities_(e.g._weekend_adventures,_group_surfs,_beach_cleanups,_movie_nights)",
    label: "Community activities (E.g. Weekend adventures, group surfs, beach cleanups, movie nights)"
  },
  {
    key: "essentials_(towels,_bed_sheets,_soap,_and_toilet_paper)",
    label: "Essentials (Towels, bed sheets, soap, and toilet paper)"
  },
  {
    key: "air_conditioning",
    label: "Air conditioning"
  },
  {
    key: "dryer",
    label: "Dryer"
  },
  {
    key: "washer",
    label: "Washer"
  },
  {
    key: "free_parking",
    label: "Free parking"
  },
  {
    key: "locker",
    label: "Locker"
  },
  {
    key: "patio_or_balcony",
    label: "Patio or balcony"
  },
];


export const categories = [
  { key: 'coliving-accommodation', label: 'Coliving Accommodation' },
  { key: 'coworking-space', label: 'Coworking space' },
  { key: 'group-and-team-packages', label: 'Group & Team Packages' },
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
  active: false,
};

// Activate keyword filter on search page

// NOTE: If you are ordering search results by distance the keyword search can't be used at the same time.
// You can turn off ordering by distance in config.js file
export const keywordFilterConfig = {
  active: true,
};
