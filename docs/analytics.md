# Analytics

The application supports tracking page views with pluggable analytics handlers.

## Google Analytics

Google Analytics (GA) is supported by default. The enable GA, set the GA tracker ID to the
environment variable `REACT_APP_GOOGLE_ANALYTICS_ID`;

## Custom analytics handler

If you want to add a new analytics library, you can do as follows:

1.  Add the analytics library script

    If the analytics library has an external script, add the library script tag to the
    [src/public/index.html](../public/index.html) file. If you need more control, see how the GA
    script is added in [server/renderer.js](../server/renderer.js).

1.  Create a handler

    To track page views, create a custom handler e.g. in
    [src/analytics/handlers.js](../src/analytics/handlers.js). The handler should be a class that
    implements a `trackPageView(url)` method.

    Note that the `url` parameter might not be the same as in the URL bar of the browser. It is the
    canonical form of the URL. For example, in the listing page it doesn't have the dynamic title
    slug in the middle. This allows unified analytics and correct tracking of pages that can be
    accessed from multiple different URLs.

    If you analytics library takes the page URL from the browser, you might need to override that
    behavior to use the canonical URL that is given to the method.

1.  Initialise the handler

    Initialise the handler in the `setupAnalyticsHandlers()` function in
    [src/index.js](../src/index.js).
