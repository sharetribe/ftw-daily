# Search filters

The search experience can be improved by adding search filters to narrow down the results. The
filters rely on listing's indexed public data.

## Filter types

The Starter App has two different filter types: _select single_ and _select multiple_. The _select
single_ one can be used to filter out search result with only one value per search parameter. The
_select multiple_ filters on the other hand can take multiple values for a single search parameter.

These two filter types are implemented with four different components, a standard and a plain one:

 - Select single filter: `SelectSingleFilter` and `SelectSingleFilterPlain`
 - Select multiple filter: `SelectMultipleFilter` and `SelectMultipleFilterPlain`

The `SelectSingleFilter` and `SelectMultipleFilter` components are rendered as standard dropdowns in
the search view. The plain filter components `SelectSingleFilterPlain` and
`SelectMultipleFilterPlain` are used in mobile view and with the `SearchFilterPanel` component they
can be used to fit more filters in the search view than just the ones that fit in the top filter
bar.

## Adding a new search filter

First step for adding a new filter is to make sure that the data being used for filtering is saved
in the listings `publicData` field. This can be done by modifying the `EditListingWizard`. Another
aspect in search filters is that the public data needs to be indexed in the API. This is currently
achieved with a manual operation done by the Sharetribe support. Once a public data attribute is
added to the listings and the data attribute is indexed, the listing searches can be filtered by
that attribute by adding a query parameter that consists of a preceding "pub\_" and the attribute
name, so for a _category_ attribute the parameter would be "pub_category".

### Common changes

A few common changes are required to add a select single or a select multiple filter to desktop and
mobile view.

The search filter options need to be stored in the `marketplace-custom-config.js` file. The correct
format is a list of objects with two fields:

```
export const amenities = [
  {
    key: 'option-identifier',
    label: 'Label for the UI',
  },
...
];
```

The filter options need to be stored here, as the search page checks here for the possible filter
options when validating the search parameters.

Also the search parameter ("pub\_<public-data-field-name>") needs to be added to the `SearchPage` container.

Save the search params in a constant:

```
const AMENITIES_URL_PARAM = 'pub_amenities';
```

Then add the filter parameters to the `customConfigKey`, `validURLParamsForExtendedData`,
`pickSearchParamsOnly` and `onIdle` functions.

### Desktop filter

A basic desktop filter that renders as a dropdown button in top of the search results panel is
achieved using the `SelectSingleFilter` and `SelectMultipleFilter` components. To add standard
desktop filters:

 - declare the filters param name in the `SearchFilters` file just like in `SearchPage`
 - with the filter param name resolve the current filter value form the `urlQueryParams` prop
 - render the filter by using a `SelectSingleFilter` or `SelectMultipleFilter` component inside the
   `<div className={css.filters}>` tag

### Desktop filter panel

I you require more filters that can fit into the top filter bar, the `SearchFiltersPanel` component
can be used. It renders as a button in the top filter bar that opens a new panel that can contain a
set of filters.

To use the `SearchFiltersPanel`, do the following:

 - make sure the `USE_SEARCH_FILTER_PANEL` constant in the beginning of `SearchPage` is switched to
   `true`.
 - in `SearchPage` resolve the number of selected panel filters and store that in the
   `searchFiltersPanelSelectedCount`
 - list your filter param names in the `FILTERS` array in `SearchFiltersPanel`
 - for each filter resolve the current filter value(s) from the `urlQueryParams` and
   `currentQueryParams` variables
 - use the `SelectSingleFilterPlain` and `SelectMultipleFilterPlain` components inside the `<div
   className={css.filtersWrapper}>` tag to render the filters

### Mobile filters

The mobile view uses the same `SelectSingleFilterPlain` and `SelectMultipleFilterPlain` components
as the filter panel. In this case the filter components are declared in `SearchFiltersMobile`. The
following steps are required to add a mobile filter:

 - store the filter param name in the `allowedParams` array in the `SearchFiltersMobile` component
   file
 - resolve the current values for each filter from the `urlQueryParams` object passed to
   `SearchFiltersMobile`
 - use the `SelectSingleFilterPlain` and `SelectMultipleFilterPlain` components inside the `<div
   className={css.filtersWrapper}>` tag to render the filters

## Notes

One good practice with search filters is to pass the filter options from the marketpalce custom
config as default parameters to the `SearchPage` and then pass them on from there to the filter sub
components that require them. This way a different set of options can be defined for the
`SearchPage` tests and the test snapshots will not be affected by changing coniguration.
