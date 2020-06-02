# SearchPage

> **Note:** _category_ and _amenities_ filters are not actually filtering anything by default. They
> are tied to [extended data](https://www.sharetribe.com/docs/references/extended-data/), which is
> likely to be customized in every marketplace. You can add public data to listing entity in your
> client app, but to make it work as a search filter, we need to manually add
> [a schema](https://www.sharetribe.com/docs/references/extended-data/#data-schema) for it - so that
> search engine understands what is the nature of a given data key.

## Structure

SearchPage component has roughly 3 sections inside its layout: Topbar, MainPanel (for results and
filters), and Map

So, rough JSX presentation is something like:

```jsx
<Page>
  <TopbarContainer />
  <MainPanel />
  <SearchMap />
<Page>
```

Searches can be made by each of these components.

- Topbar contains location search (LocationAutocompleteInput)
- MainPanel has Filters that can fine-tune current location search
- SearchMap can create new location searches when the map's bounding box changes (i.e. moving,
  zooming, etc.)

## Topbar

In contrast to other pages, Topbar gets `currentSearchParams` among other props. This makes it
possible for Topbar to take current filters into account.

## MainPanel

MainPanel has two functions: showing searchResults and showing filters. There are two sets of
filters that can be passed to it: `primaryFilters`, `secondaryFilters`.

Primary filters are filters that are shown always on top of SearchResults as dropdown-selections. We
recommend that only 1 - 3 primary filters are passed in since they start to take too much space on
narrow screens.

Secondary filters create one more button to the space containing primary filters: _More filters_.
This more-filters button opens up a SearchFiltersSecondary component that can be changed to show those
extra filters passed to it. **Note:** Currently, it doesn't contain any filter components by
default, even if you pass in some filter data. Creating those filter components is part of the
customization process.

On the mobile layout, all the filters are shown in separate mobile filters panel.

## SearchMap

SearchMap listens to 'idle' event and SearchPage function `onIndle` can create a new location search
if SearchMap's bounds have changed enough.

## Other things to consider

### Search filters

See the [filters documentation](../../../docs/search-filters.md).

### SeachPage schema / SEO

Schema is created inside `createSearchResultSchema` in _SearchPage.helpers.js_. It needs listings
and address to make meaningful JSON-LD presentation for search engines.
