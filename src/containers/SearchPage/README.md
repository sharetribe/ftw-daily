# SearchPage

SearchPage component has roughly 3 sections inside its layout:
Topbar, MainPanel (for results and filters), and Map

So, rough JSX presentation is something like:
```jsx
<Page>
  <TopbarContainer />
  <MainPanel />
  <SearchMap />
<Page>
```

Searches can be made by each of these components.

* Topbar contains location search (LocationAutocompleteInput)
* MainPanel has Filters that can fine-tune current location search
* SearchMap can create new location searches when the map's bounding box changes
  (i.e. moving, zooming, etc.)

## Topbar

In contrast to other pages, Topbar gets `currentSearchParams` among other props. This makes it
possible for Topbar to take current filters into account.

## MainPanel

MainPanel has two functions: showing searchResults and showing filters. There are two sets of
filters that can be passed to it: `primaryFilters`, `secondaryFilters`.

Primary filters are filters that are shown always on top of SearchResults as dropdown-selections.
We recommend that only 1 - 3 primary filters are passed in since they start to take too much space
on narrow screens.

Secondary filters create one more button to the space containing primary filters: *More filters*.
This more-filters button opens up a SearchFiltersPanel component that can be changed to show those
extra filters passed to it.
**Note:** Currently, it doesn't contain any filter components by default, even if you pass in some
filter data. Creating those filter components is part of the customization process.

On the mobile layout, all the filters are shown in separate mobile filters panel.

## SearchMap

SearchMap listens to 'idle' event and SearchPage function `onIndle` can create a new location search if
SearchMap's bounds have changed enough.

## Other things to consider

### URL Params vs marketplace-custom-config.js

Filter handling needs some mapping between configured extended data. For example,
*marketplace-custom-config.js* defines all the categories used by the app, but that data needs to be in
format `pub_category=selectedCategory` when we talk with the API. (We also use this format in URL.)

This mapping is done at the beginning of the file:
```
const CATEGORY_URL_PARAM = 'pub_category';
const AMENITIES_URL_PARAM = 'pub_amenities';

const customURLParamToConfig = {
  [CATEGORY_URL_PARAM]: 'categories',
  [AMENITIES_URL_PARAM]: 'amenities',
};
```

### SeachPage schema / SEO

Schema is created inside `createSearchResultSchema` in *SearchPage.helpers.js*. It needs listings
and address to make meaningful JSON-LD presentation for search engines.
