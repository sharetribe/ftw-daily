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

export const filters = [
  {
    id: 'dates',
    label: 'Dates',
    type: 'BookingDateRangeFilter',
    group: 'primary',
    // Note: BookingDateRangeFilter is fixed filter,
    // you can't change "queryParamNames: ['dates'],"
    queryParamNames: ['dates'],
    config: {},
  },
  
  /*
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
    },
  },
  */

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
  
  {
    id: 'category',
    label: 'Category',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_category'],
    config: {

      
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      //searchMode: 'has_all',
      options: [
        { key: 'allemarken', label: 'Alle Marken' },
        { key: 'marken', label: 'Vertragswerkstatt' },
        { key: 'bestimmtemarken', label: 'Nur bestimmte Marken' },
        { key: 'alleelektrisch', label: 'Alle E-Auto Marken' },
        { key: 'oldtimer', label: 'Oldtimer' },
        { key: 'audi', label: 'Audi' },
        { key: 'bmw', label: 'BMW' },
        { key: 'fiat', label: 'Fiat' },
        { key: 'ford', label: 'Ford' },
        { key: 'hyundai', label: 'Hyundai' },
        { key: 'kia', label: 'KIA' },
        { key: 'mazda', label: 'Mazda' },
        { key: 'mercedes', label: 'Mercedes-Benz' },
        { key: 'opel', label: 'Opel' },
        { key: 'porsche', label: 'Porsche' },
        { key: 'seat', label: 'Seat' },
        { key: 'skoda', label: 'Skoda' },
        { key: 'toyota', label: 'Toyota' },
        { key: 'volvo', label: 'Volvo' },
        { key: 'vw', label: 'Volkswagen' },

        { key: 'sonstige', label: 'Sonstige' },

      ],
    },
  },

  
  
  {
    id: 'amenities',
    label: 'Amenities',
    type: 'SelectMultipleFilter',
    group: 'primary',
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
          key: 'reparatur',
          label: 'Reparatur / Terminvereinbarung',
        },
        {
          key: 'fehleranalyse',
          label: 'Problem- und Fehleranalyse',
        },
        {
          key: 'sonstiges',
          label: 'Sonstiges',
        },
        {
          key: 'reifen',
          label: 'Reifen',
        },
        {
          key: 'reifenwechsel',
          label: 'Reifenwechsel ',
        },
        {
          key: 'reifenwuchten',
          label: 'Reifen Wuchten',
        },
        {
          key: 'reinfeneinlagerung',
          label: 'Reifeneinlagerung',
        },
        {
          key: 'reifenwaesche',
          label: 'Reifenwäsche',
        },
        {
          key: 'reifenmontage',
          label: 'Reifenmontage ',
        },
        {
          key: 'reifenkauf',
          label: 'Reifenkauf',
        },
        {
          key: 'pickerl',
          label: 'Pickerl-Überprüfung (§57a)',
        },
        {
          key: 'klima',
          label: 'Klima-Service',
        },
        {
          key: 'inspektion',
          label: 'Inspektion',
        },
        {
          key: 'oelwechsel',
          label: 'Ölwechsel',
        },
        {
          key: 'urlaubscheck',
          label: 'Urlaubscheck',
        },
        {
          key: 'wintercheck',
          label: 'Winter-Check',
        },
        {
          key: 'fruehjahrscheck',
          label: 'Frühjahrs-Check',
        },
        {
          key: 'sicherheitscheck',
          label: 'Sicherheits-Check',
        },
        {
          key: 'mobilitaetscheck',
          label: 'Mobilitäts-Check',
        },
        {
          key: 'lichttest',
          label: 'Lichttest',
        },
        {
          key: 'fehlerdiagnose',
          label: 'Fehlerdiagnose',
        },
        {
          key: 'elektrik',
          label: 'Elektrik',
        },
        {
          key: 'lichtmaschine',
          label: 'Lichtmaschine',
        },
        {
          key: 'achsvermessung',
          label: 'Achsvermessung',
        },
        {
          key: 'zahnriemen',
          label: 'Zahnriemen',
        },
        {
          key: 'bremsenservice',
          label: 'Bremsenservice',
        },
        {
          key: 'bremsbelaege',
          label: 'Bremsbeläge / -scheiben',
        },
        {
          key: 'bremsfluessigkeitswechsel',
          label: 'Bremsflüssigkeitswechsel',
        },
        {
          key: 'abgasuntersuchung',
          label: 'Abgasuntersuchung ',
        },
        {
          key: 'autobatterie',
          label: 'Autobatterie ',
        },
        {
          key: 'auspuff',
          label: 'Auspuff',
        },
        {
          key: 'anlasser',
          label: 'Anlasser',
        },
        {
          key: 'fahrwerk',
          label: 'Fahrwerk',
        },
        {
          key: 'getriebe',
          label: 'Getriebe',
        },
        {
          key: 'glasreparatur',
          label: 'Glasreparatur',
        },
        {
          key: 'felgenaufbereitung',
          label: 'Felgenaufbereitung ',
        },
        {
          key: 'dachbox',
          label: 'Dachbox-Montage ',
        },
        {
          key: 'reinigung',
          label: 'Reinigung',
        },
        {
          key: 'reinigunginterieur',
          label: 'Reinigung Interieur',
        },
        {
          key: 'reinigungexterieur',
          label: 'Reinigung Exterieur',
        },
        {
          key: 'kratzerentfernen',
          label: 'Kratzer und Dellen entfernen',
        },
        {
          key: 'kratzerlackieren',
          label: 'Kratzer lackieren',
        },
        {
          key: 'pflege',
          label: 'Pflege',
        },
        {
          key: 'lackierarbeiten',
          label: 'Lackierarbeiten',
        },
        {
          key: 'spenglerarbeiten',
          label: 'Spenglerarbeiten',
        },
        {
          key: 'unfallschaden',
          label: 'Unfallschaden reparieren',
        },
        {
          key: 'abschlepphilfe',
          label: 'Abschlepphilfe',
        },
        {
          key: 'radio',
          label: 'Radio und Soundsysteme',
        },
        {
          key: 'altfahrzeugankauf',
          label: 'Altfahrzeugankauf',
        },
        {
          key: 'tuningauspuff',
          label: 'Auspuff-Tuning',
        },
        {
          key: 'tuningbremsen',
          label: 'Bremsen-Tuning',
        },
        {
          key: 'tuningfahrwerk',
          label: 'Fahrwerk-Tuning',
        },
        {
          key: 'tuningfelgen',
          label: 'Felgen-Tuning',
        },
        {
          key: 'tuninginterieurexterieur',
          label: 'Tuning Interieur / Exterieur',
        },
        {
          key: 'tuningzubehoer',
          label: 'Tuning-Zubehör',
        },
        {
          key: 'tuningchiptuning',
          label: 'Chip-Tuning',
        },
        
      ],
    },
  },



  

  {
    id: 'extras',
    label: 'Zusatzservices',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_extras'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_all',
      options: [
        { key: 'expresstermin', label: 'Express-Termin' },
        { key: 'holservice', label: 'Hol- und Bringservice' },
        { key: 'nachtannahme', label: 'Nachtannahme' },
        { key: 'ersatzfahrzeug', label: 'Ersatzfahrzeug' },
        { key: 'zubehoer', label: 'Zubehör-Shop' },
        { key: 'finanzierungsberatung', label: 'Finanzierungsberatung' },
        { key: 'versicherungsberatung', label: 'Versicherungsberatung' },
        { key: 'waschstraße', label: 'Waschstraße' },
        { key: 'bankomat', label: 'Bankomatkassa' },
        { key: 'wlan', label: 'WLAN' },
        { key: 'oeffentlicherverkehr', label: 'Gute öffentliche Verkehranbindung' },
        { key: 'kaffee', label: 'Kaffee' },
        { key: 'warten', label: 'Warteraum' },

      ],
    },
  },

  {
    id: 'branche',
    label: 'Branche',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_category'],
    config: {

      
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      //searchMode: 'has_all',
      options: [
        { key: 'kfzmeister', label: 'Kfz Reparatur Meisterbetrieb' },
        { key: 'karosseriefachbetrieb', label: 'Karosserie Fachbetrieb' },
        { key: 'lackierfachbetrieb', label: 'Autolackier Fachbetrieb' },
        { key: 'pruefstelle', label: 'Prüfstelle nach §57a' },
        { key: 'meisterbetrieb', label: 'Meisterbetrieb' },
        { key: 'dellentechniker', label: 'Zertifizierter Dellentechniker' },
        { key: 'fahrzeugaufbereitung', label: 'Zertifizierter Fachbetrieb Fahrzeugaufbereitung' },
        { key: 'service', label: 'Service Leistungen' },
        { key: 'sonstige', label: 'Sonstige' },

      ],
    },
  },

  {
    id: 'land',
    label: 'Land',
    //type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_category'],
    config: {

      
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      //searchMode: 'has_all',
      options: [
        { key: 'austria', label: 'AT - Österreich' },

      ],
    },
  },




];

  //expresstermin, holservice, nachtannahme, ersatzfahrzeug, waschstraße, wlan, bankomat, zubehoer, versicherungsberatung, finanzierungsberatung, oeffentlicherverkehr, 
  //dellentechniker, karosseriefachbetrieb, meisterbetrieb, pruefstelle, 
  //allemarken, marken

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
