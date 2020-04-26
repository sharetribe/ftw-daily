/*
 * Marketplace specific configuration.
 */

export const amenities = [
  {
    key: 'artesanías',
    label: 'Artesanías',
  },
  {
    key: 'accesorios',
    label: 'Accesorios',
  },
  {
    key: 'gourmet y bebidas',
    label: 'Gourmet y Bebidas',
  },
  {
    key: 'belleza y bienestar',
    label: 'Belleza y Bienestar',
  },
  {
    key: 'juegos y juguetes',
    label: 'Juegos y Juguetes',
  },
  {
    key: 'decoración',
    label: 'Decoración',
  },
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
   {
    key: 'artículos deportivos',
    label: 'Artículos deportivos',
  },
   {
    key: 'servicios',
    label: 'Servicios',
  },
   {
    key: 'otras categorías',
    label: 'Otras Categorías',
  },






];

export const categories = [
  { key: 'productos', label: 'Productos' },
  { key: 'servicios', label: 'Servicios' },
  { key: 'otros', label: 'Otros' },

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

export const sortConfig = {
  // Enable/disable the sorting control in the SearchPage
  active: true,

  // Internal key for the relevance option, see notes below.
  relevanceKey: 'relevance',

  options: [
    { key: 'createdAt', label: 'Último' },
    { key: '-createdAt', label: 'Más antiguo' },
    { key: '-price', label: 'Precio más bajo' },
    { key: 'price', label: 'Precio más alto' },

    // The relevance is only used for keyword search, but the
    // parameter isn't sent to the Marketplace API. The key is purely
    // for handling the internal state of the sorting dropdown.
    { key: 'relevancia', label: 'Relevancia', longLabel: 'Relevancia (búsqueda de palabras)' },
  ],
};
