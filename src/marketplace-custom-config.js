/*
 * Marketplace specific configuration.
 */

export const skills = [
  {
    key: 'singing',
    label: 'Singing',
  },
  {
    key: 'rap',
    label: 'Rap',
  },
  {
    key: 'bass',
    label: 'Bass',
  },
  {
    key: 'drummer',
    label: 'Drummer',
  },
  {
    key: 'musicproduce',
    label: 'Music Production',
  },
  {
    key: 'dj',
    label: 'DJ',
  },
  {
    key: 'audioengineer',
    label: 'Audio Engineer',
  },
  {
    key: 'guitarist',
    label: 'Guitar',
  },
  {
    key: 'piano',
    label: 'Piano',
  },
];

export const categories = [
  { key: 'singer', label: 'Singer' },
  { key: 'drummer', label: 'Drummer' },
  { key: 'stagehand', label: 'Stagehand' },
  { key: 'rapper', label: 'Rapper' },
  { key: 'productioncrew', label: 'Production Crew' },
  { key: 'stagehand', label: 'Stagehand' },
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
