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

MainPanel has two functions: showing searchResults and showing filters. Filters are primarily added,
removed, reordered and configured through _marketplace-custom-config.js_

```shell
└── src
    └── marketplace-custom-config.js
```

There you can set some filters to be primary filters. They are shown always on top of SearchResults
as dropdown-selections on Desktop layout. We recommend that only 1 - 3 primary filters are passed in
since they start to take too much space on narrow screens.

If there are secondary filters, they create one more button to the space containing primary filters:
_More filters_. This more-filters button opens up a SearchFiltersSecondary component that can be
changed to show those extra filters passed to it.

On the mobile layout, all the filters are shown in separate mobile filters modal. The order of
filters is following the order of filters config in _marketplace-custom-config.js_.

## SearchMap

SearchMap listens to 'idle' event and SearchPage function `onIndle` can create a new location search
if SearchMap's bounds have changed enough.

## Other things to consider

### Search filters

See the
[filters documentation](https://www.sharetribe.com/docs/cookbook-search/change-search-filters-in-ftw/).

### SeachPage schema / SEO

Schema is created inside `createSearchResultSchema` in _SearchPage.helpers.js_. It needs listings
and address to make meaningful JSON-LD presentation for search engines.
