# Routing

Flex Template for Web (FTW) uses [React Router](https://reacttraining.com/react-router/web) for
creating routes to different pages. React Router is a collection of navigational components that
allow single page apps to create routing as a part of normal rendering flow of the React app. So,
instead of defining on server-side what gets rendered when user goes to URL
`somemarketplace.com/about`, we just catch all the path combinations and let the app to define what
page gets rendered.

- [React Router setup](#react-router-setup)
- [Linking](#linking)
- [Loading data](#loading-data)
- [Analytics](#analytics)
- [A brief introduction to server-side rendering](#a-brief-introduction-to-ssr)

## React Router setup

### Route configuration

FTW has a quite straightforward routing setup - there's just one file you need to check before you
link to existing routes or start creating new routes to static pages: `src/routeConfiguration.js`.

There we have imported and configured all the page-level components that are currently used within
FTW:

```js
import {
  AboutPage,
  AuthenticationPage,
  //...
} from './containers';

// Our routes are exact by default.
// See behaviour from Routes.js where Route is created.
const routeConfiguration = () => {
  return [
    {
      path: '/about',
      name: 'AboutPage',
      component: AboutPage,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: props => <AuthenticationPage {...props} tab="login" />,
    },
    {
      path: '/signup',
      name: 'SignupPage',
      component: props => <AuthenticationPage {...props} tab="signup" />,
    },
    //...
  ];
};

export default routeConfiguration;
```

In the example, path `/login` renders `AuthenticationPage` component with prop 'tab' set to 'login'.
In addition, this route configuration has a name 'LoginPage'.

> Routes use exact path matches in FTW. We felt that this makes it easier to understand the
> connection between a path and its routed view aka related page component.
> [Read more.](https://reacttraining.com/react-router/web/api/Route/exact-bool)

There are a couple of extra configurations you can set. For example `/listings` path leads to a page
that lists all the listings provided by the current user:

```js
    {
      path: '/listings',
      name: 'ManageListingsPage',
      auth: true,
      authPage: 'LoginPage', // default is 'SingupPage'
      component: props => <ManageListingsPage {...props} />,
      loadData: ManageListingsPage.loadData,
    },
```

Here we have set this route to be available only for authenticated user (`auth: true`), because we
need to know whose listings we should fetch. If a user is unauthenticated, he/she is redirected to
LoginPage (`authPage: 'LoginPage'`) before he/she can see the content of `ManageListingsPage` page.

There's also a `loadData` function defined. It is a special function that gets called if a page
needs to fetch more data (e.g. from Flex API) after redirecting to that route. We'll open up this
concept [later in this document](#loading-data).

In addition to these configurations, there's also a rarely used `setInitialValues` function that
could be defined and passed to a route:

```js
    {
      path: '/l/:slug/:id/checkout',
      name: 'CheckoutPage',
      auth: true,
      component: props => <CheckoutPage {...props} />,
      setInitialValues: CheckoutPage.setInitialValues,
    },
```

This function gets called when some page wants to pass forward some extra data before redirecting
user to that page. For example we could ask booking dates on ListingPage and initialize CheckoutPage
state with that data before buyer is redirected to CheckoutPage.

### How FTW renders a router with routeConfiguration.js

Aforementioned route configuration is used in `src/app.js`. For example, `ClientApp` defines
`BrowserRouter` and gives it a child component (`Routes`) that gets the configuration as `routes`
property.

Simplified `app.js` code that renders client-side FTW app:

```js
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import routeConfiguration from './routeConfiguration';
//...
export const ClientApp = props => {
  return (
    <BrowserRouter>
      <Routes routes={routeConfiguration()} />
    </BrowserRouter>
  );
};
```

`src/Routes.js` renders the `Route` navigational components (`Switch` renders the first `Route` that
matches the location):

```js
import { Switch, Route } from 'react-router-dom';
//...

const Routes = (props, context) => {
  //...
  return (
    <Switch>
      {routes.map(toRouteComponent)}
      <Route component={NotFoundPage} />
    </Switch>
  );
```

Inside `src/Routes.js`, we also have a component called `RouteComponentRenderer`, which has three
important jobs:

- Calling loadData function, if those have been defined in `src/routeConfiguration.js`. This is an
  asynchronous call, a page needs to define what gets rendered before data is complete.
- Reset scroll position after location change.
- Dispatch location changed actions to Redux store. This makes it possible for
  [analytics Redux middleware](analytics.md) to listen location changes.

## Linking

Linking is a special case in SPA. Using HTML `<a>` tags will cause browser to redirect to given
`href` location. That will cause all the resources to be fetched again, which is a slow and
unnecessary step for SPA. Instead, we just need to tell our router to render a different page by
adding or modifying browser's history entries.

### NamedLink and NamedRedirect

React Router exports a couple of
[navigational components](https://reacttraining.com/react-router/web/api/Link) (e.g.
`<Link to="/about">About</Link>`) that could be used for linking to different internal paths. Since
FTW is a template app, we want all the paths to be customizable too. That means that we can't use
paths directly when redirecting user to another Route. For example marketplace for German customer
might want to customize the LoginPage path to be `/anmelden` instead of `/login` - and that would
mean that all the _Links_ to it would need to be updated.

This is the reason why we have created names to different routes in `src/routeConfiguration.js`. We
have a component called `<NamedLink name="LoginPage" />` and its _name_ property creates a link to
the correct Route even if the path is changed in routeConfiguration. Needless to say that those
names should only be used for internal route mapping.

More complex example of `NamedLink`

```js
// Link to LoginPage:
<NamedLink name="LoginPage" />log in</NamedLink>
// Link to ListingPage with path `l/<listing-uuid>/<listing-title-as-url-slug>/`:
<NamedLink name="ListingPage" params={{ id: '<listing-uuid>', slug: '<listing-title-as-url-slug>' }}>some listing</NamedLink>
// Link to SearchPage with query parameter: bounds
<NamedLink name="SearchPage" to={{ search: '?bounds=60.53,22.38,60.33,22.06' }}>Turku city</NamedLink>
```

`NamedLink` is widely used in FTW, but there are some cases when we have made redirection to another
page if some data is missing (e.g. CheckoutPage redirects to ListingPage, if some data is missing or
it is old). This can be done with rendering component called `NamedRedirect`, which is a similar
wrapper for [Redirect component](https://reacttraining.com/react-router/web/api/Redirect).

### ExternalLink

There's also a component for external links. The reason why it exists is that there's a
[security issue](https://mathiasbynens.github.io/rel-noopener/) that can be exploited when a site is
linking to external resources. `ExternalLink` component has some safety measures to prevent those.
We recommend that all the external links are created using `ExternalLink`component instead of
directly writing anchors like `<a href="externalsite.com">External site</a>`. (You can just change
the JSX element accordinly: `<ExternalLink href="externalsite.com">External site</ExternalLink>`.)

## Loading data

If a page component needs to fetch data, it can be done as a part of navigation. A page component
needs to define a static function called `loadData`, which needs to return a Promise, which is
resolved when all the asynchronous Redux Thunk calls are completed.

For example here's a bit simplified version of `ListingPage.loadData` function:

```js
export const loadData = (params, search) => dispatch => {
  const listingId = new UUID(params.id);

  return Promise.all([
    dispatch(showListing(listingId)), // fetch listing data
    dispatch(fetchTimeSlots(listingId)), // fetch timeslots for booking calendar
    dispatch(fetchReviews(listingId)), // fetch reviews related to this listing
  ]);
};
```

> Unfortunately, `loadData` function needs to be separately mapped in routeConfiguration.js atm.
> There has been a problem with module initialization order and functional components have been used
> in routeConfiguration.js as wrappers to prevent a premature call to these static functions.

## Analytics

It is possible to track page views to gather information about navigation behaviour. Tracking is
tied to routing through `src/Routes.js` where `RouteRendererComponent` dispatches `LOCATION_CHANGED`
actions. These actions are handled by a global reducer (`src/ducks/Routing.duck.js`), but more
importantly, `src/analytics/analytics.js` (a Redux middleware) listens to these changes and sends
tracking events to configured services. [Read more.](analytics.md)

## A brief introduction to SSR

Server-side rendering needs a better documentation at some point, but this routing setup is the key
to render any page on server-side without duplicating routing logic. We just need to fetch data if
`loadData` is defined on page component and then use `ReactDOMServer.renderToString` to render the
app to string (requested URL is a parameter for this render function).

So, instead of having something like this on Express server:

```js
app.get('/about', handleAbout);
```

We basically catch every path call using `*` on `server/index.js`:

```js
app.get('*', (req, res) => {
```

and then we ask our React app to

1.  load data based on current URL (and return this preloaded state from Redux store)
2.  render the correct page with this preloaded state (renderer also attaches preloadedState to
    HTML-string to hydrate the app on the client-side)
3.  send rendered HTML string as a response to the client browser

```js
  dataLoader
    .loadData(req.url, sdk)
    .then(preloadedState => {
      const html = renderer.render(req.url, context, preloadedState);
      //...
      res.send(html);
    }
```
