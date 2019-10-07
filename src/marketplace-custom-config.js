/*
 * Marketplace specific configuration.
 */

export const eventstype = [
 //type of ocassions
 {
   key: 'Wedding',
   label: 'Wedding',
 },
 {
   key: 'Kids party',
   label: 'Kids party',
 },
 {
   key: 'Event',
   label: 'Event',
 },
];

export const types = [
//Jumping Castle Types
    {
      key: 'Frozen',
      label: 'Frozen',
    },
    {
      key: 'Slide',
      label: 'Slide',
    },
    {
      key: 'Paw Patrol',
      label: 'Paw Patrol',
       },
//Photobooths
{
  key: 'Open-Air',
  label: 'Open-Air',
},
{
  key: 'Traditional',
  label: 'Traditional',
},
{
  key: 'Mirrorless',
  label: 'Mirrorless',
   },
   {
     key: 'GIF-maker',
     label: 'GIF-maker',
      },
 ];

export const categories = [
    { key: 'Balloon Styling', label: 'Balloon Styling' },
  { key: 'Marquee & Canopy', label: 'Marquee & Canopy' },
  { key: 'Photo Booth', label: 'Photo Booth' },
  { key: 'Jumping Castles', label: 'Jumping Castles' },
  { key: 'Event Furniture', label: 'Event Furniture' },
  { key: 'Venues', label: 'Venues' },
  { key: 'Platters', label: 'Platters' },
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
