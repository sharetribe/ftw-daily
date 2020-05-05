/*
 * Marketplace specific configuration.
 */
export const capacityOptions = [
  { key: '1to3', label: '1 to 3' },
  { key: '4to6', label: '4 to 6' },
  { key: '7to9', label: '7 to 9' },
  { key: '10plus', label: '10 plus' },
];

export const amenities = [
  {
    key: 'artesanías',
    label: 'Artesanías',
    tip: 'breed',
    weight: [
      {
        key: 'accesorios',
        label: 'Accesorios',
        tip: 'Akitas, Bernese Mountain Dog, Bullmastiff etc...',
      },
      {
        key: 'gourmet y bebidas',
        label: 'Gourmet y Bebidas',
        tip: 'German Shepherd, Retriever, Siberian Husky, Weimaraner etc...'
      },
      {
        key: 'belleza y bienestar',
        label: 'Belleza y Bienestar',
        tip: 'Whippet, Staffordshire Bull Terrier, Spaniel, Border Collie etc...',
      },
      {
        key: 'juegos y juguetes',
        label: 'Juegos y Juguetes',
        tip: 'Pomeranian, Pug, Yorkshire Terrier, Papillion etc...',
      },
    ],
  },
  {
    key: 'decoración',
    label: 'Decoración',
    weight: [
      {
        key: 'jardinería y jardín',
        label: 'Jardinería y jardín',
      },
      {
        key: 'mascotas',
        label: 'Mascotas',
      },
      {
        key: 'librería y artículos de arte',
        label: 'Librería y Artículos de arte',
      },
      {
        key: 'turismo',
        label: 'Turismo',
      },
    ],
  },
  {
    key: 'artículos deportivos',
    label: 'Artículos deportivos',
    weight: [
      {
        key: 'servicios',
        label: 'Servicios',
      },
      {
        key: 'otras categorías',
        label: 'Otras Categorías',
      },
      {
        key: 'medium',
        label: 'Medium (101+ lbs)',
      },
      {
        key: 'small',
        label: 'Small (0-15 lbs)',
      },
    ],
  },
  {
    key: 'cat',
    label: 'Mascotas',
    weight: [
      {
        key: 'giant',
        label: 'Giant (101+ lbs)',
      },
      {
        key: 'large',
        label: 'Large (41-100 lbs)',
      },
      {
        key: 'medium',
        label: 'Medium (101+ lbs)',
      },
      {
        key: 'small',
        label: 'Small (0-15 lbs)',
      },
    ],
  },

  {
    key: 'rabbit',
    label: 'Jardinería y jardín',
    weight: [
      {
        key: 'giant',
        label: 'Giant (101+ lbs)',
      },
      {
        key: 'large',
        label: 'Large (41-100 lbs)',
      },
      {
        key: 'medium',
        label: 'Medium (101+ lbs)',
      },
      {
        key: 'small',
        label: 'Small (0-15 lbs)',
      },
    ],
  },

  {
    key: 'bird',
    label: 'Decoración',
    weight: [
      {
        key: 'giant',
        label: 'Giant (101+ lbs)',
      },
      {
        key: 'large',
        label: 'Large (41-100 lbs)',
      },
      {
        key: 'medium',
        label: 'Medium (101+ lbs)',
      },
      {
        key: 'small',
        label: 'Small (0-15 lbs)',
      },
    ],
  },
  {
    key: 'fish',
    label: 'Belleza y Bienestar',
    weight: [
      {
        key: 'giant',
        label: 'Giant (101+ lbs)',
      },
      {
        key: 'large',
        label: 'Large (41-100 lbs)',
      },
      {
        key: 'medium',
        label: 'Medium (101+ lbs)',
      },
      {
        key: 'small',
        label: 'Small (0-15 lbs)',
      },
    ],
  },
  {
    key: 'horse',
    label: 'Accesorios',
    weight: [
      {
        key: 'giant',
        label: 'Giant (101+ lbs)',
      },
      {
        key: 'large',
        label: 'Large (41-100 lbs)',
      },
      {
        key: 'medium',
        label: 'Medium (101+ lbs)',
      },
      {
        key: 'small',
        label: 'Small (0-15 lbs)',
      },
    ],
  },
  {
    key: 'other',
    label: 'Otro',
    weight: [
      {
        key: 'giant',
        label: 'Giant (101+ lbs)',
      },
      {
        key: 'large',
        label: 'Large (41-100 lbs)',
      },
      {
        key: 'medium',
        label: 'Medium (101+ lbs)',
      },
      {
        key: 'small',
        label: 'Small (0-15 lbs)',
      },
    ],
  },
];

export const categories = [
  { key: '0', label: 'Productos' },
  
  { key: '2', label: 'Servicios' },
  { key: '1', label: 'Otros' },
];

export const equipments = [
  { key: 'wifi', label: 'Wifi' },
  { key: 'garden', label: 'Garden' },
  { key: 'wheelchair', label: 'Wheelchair Access' },
  { key: 'parking', label: 'Parking' },
  { key: 'transport', label: 'Transport Links' },
  { key: 'cable', label: 'Cable TV' },
  { key: 'elevator', label: 'Elevator in Building' },
  { key: 'aircon', label: 'Air Con' },
  { key: 'suitable', label: 'Suitable for families' },
  { key: 'laundry', label: 'Laundry Facilities' },
];
export const locations = [
  { key: 'sea', label: 'By the Sea' },
  { key: 'mountain', label: 'Mountain Views' },
  { key: 'city', label: 'City Pad' },
  { key: 'suburbs', label: 'Suburbs' },
  { key: 'rural', label: 'Rural Location' },
];
export const info = [
  { key: 'travel', label: 'Willing to travel	' },
  { key: 'admin', label: 'Can Administer Meds' },
  { key: 'children', label: 'Have children under 18' },
  { key: 'car', label: 'Car Owner' },
];

export const service = [
  { key: 'walking', label: 'Artesanías' },
  { key: 'surgeon', label: 'Accesorios' },
  { key: 'groomer', label: 'Belleza y Bienestar' },
  { key: 'store', label: 'Decoración' },
  { key: 'food', label: 'Jardinería y jardín' },
  { key: 'tech', label: 'Mascotas' },
  { key: 'accessories', label: 'Librería y Artículos de arte' },
  { key: 'photo', label: 'Turismo' },
   { key: 'photo', label: 'Artículos deportivos' },
    { key: 'photo', label: 'Servicios' },
     { key: 'photo', label: 'Otras Categorías' },
];

export const size = [
  {
    key: 'giant',
    label: 'giant (101+ lbs)',
  },
  {
    key: 'large',
    label: 'large (41-100 lbs)',
  },
  {
    key: 'medium',
    label: 'medium (101+ lbs)',
  },
  {
    key: 'small',
    label: 'small (0-15 lbs)',
  },
];

export const rate = [
  { key: 'h', label: 'Por Hora' },
  { key: 'u', label: 'Por Unidad' },
  { key: 'd', label: 'Por Día' },
  { key: 'o', label: 'Otro' },
];

export const preferredLocations = [
  { key: 'italy', label: 'Italy' },
  { key: 'germany', label: 'Germany' },
  { key: 'china', label: 'China' },
];

// Price filter configuration
// Note: unlike most prices this is not handled in subunits
export const priceFilterConfig = {
  min: 0,
  max: 100,
  step: 5,
};

// Price filter configuration
// Note: unlike most prices this is not handled in subunits
export const timePickerConfig = {
  min: 0,
  max: 23,
  step: 1,
};

// Activate booking dates filter on search page
export const dateRangeFilterConfig = {
  active: true,
};
