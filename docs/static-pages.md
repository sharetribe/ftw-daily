# Static pages

If you want to create simple pages that just show static content without need for data fetches, you
can create a static page.

Steps for creating a static page:

1.  [Create a new folder under `src/containers/`](#1-creating-a-new-folder)
2.  [Create a new JavaScript file using the same name.](#2-creating-a-javascript-file)
3.  [Create a new CSS file using the same name.](#3-creating-a-css-file)
4.  [Write the content to a JavaScript file (i.e. AboutPage.js in our example).](#4-creating-the-component)
5.  [Write the style rules to CSS file (i.e. AboutPage.css in our example).](#5-adding-some-styles-to-the-css-file)
6.  [Add the newly created page component to `src/containers/index.js`](#6-adding-the-component-to-the-component-directory)
7.  [Add the newly created page to `src/routeConfiguration.js`](#7-adding-a-route-to-the-page)

## 1. Creating a new folder

Create a new folder under `src/containers/` with the name of your static page. E.g. "about" page
should be named as `AboutPage`.

## 2. Creating a JavaScript file

Create a new JavaScript file using the folder name. The path should look like
`src/containers/AboutPage/AboutPage.js`.

## 3. Creating a CSS file

Create a new CSS file using the folder name. The path should look like
`src/containers/AboutPage/AboutPage.css`.

## 4. Creating the component

Template for a single column static page (AboutPage.js): (We'll go through this line-by-line below.)

```jsx
import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
  ExternalLink,
} from '../../components';

import css from './AboutPage.css';
import image from './path/to/image.png';

const AboutPage = () => {
  return (
    <StaticPage
      className={css.root}
      title="About"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'Description of this page',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <h1>Some content</h1>
          <img src={image} alt="My first ice cream." />
          <div>
            <NamedLink name="LandingPage">Go to home page</NamedLink> or
            <ExternalLink href="https://google.com">Go to Google</ExternalLink>
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default AboutPage;
```

We are using [React](https://reactjs.org/) and [JSX](https://reactjs.org/docs/introducing-jsx.html)
to create components and pages. Therefore, we need to import React to our new component which is
done in the first line.

```jsx
import React from 'react';
```

In the second line we are importing two containers:

- `StaticPage`: helps in creating static pages
- `TopbarContainer`: creates our Topbar component and fetches the data it needs.

```jsx
import { StaticPage, TopbarContainer } from '../../containers';
```

After that we need to import some components:

- `LayoutSingleColumn` and wrappers that it needs to position content
- `Footer` component (to be added inside LayoutWrapperFooter)
- `NamedLink` makes it easier to point to different pages inside the application
- `ExternalLink` can be used to link outside the application. It creates a normal `<a>`link with
  extra attributes `target="_blank" rel="noopener noreferrer"` that add some security to these
  outbound links.

`LayoutSingleColumn` (and other layouts like LayoutSideNavigation) need to understand what the
content is about. Therefore, different parts of the page need to be wrapped with specific
components - in this case: `LayoutWrapperTopbar`, `LayoutWrapperMain`, and `LayoutWrapperFooter`.

```jsx
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
  ExternalLink,
} from '../../components';
```

Then we need to import styles and possible other files from current folder. With CSS we are using
[CSS Modules](https://github.com/css-modules/css-modules) to tackle possible classhes of different
class names. [Read more.](#5-creating-the-css-file)

```jsx
import css from './AboutPage.css';
```

Then we also import an image which is used later (`<img src={image} alt="My first ice cream." />`).

```jsx
import image from './path/to/image.png';
```

Then after all the imports we are finally getting into phase were we define the component.
`const AboutPage = props => { return <div></div>}` defines a component called AboutPage with content
defined in return part. This is a
[functional component](https://reactjs.org/docs/components-and-props.html).

In the template above we are using StaticPage component with some attributes:

```jsx
    <StaticPage
      className={css.root}
      title="About"
      schema={{
        "@context": "http://schema.org",
        "@type": "AboutPage",
        "description": "Description of this page",
        "name": "About page",
      }}
    >
```

- `className` is JSX name for `class` attribute used in plain HTML.
- `title="About"` creates `<title>About</title>` element to `<head>` section of the page. (That
  title is also used in OpenGraph meta tags). You could also add
  `description="This is about page description"`
- Then we have `schema` tag that defines some data for search engines in JSON-LD format. Check
  [schema.org](http://schema.org/docs/full.html) for more information.

Inside `StaticPage` component we define layout (`LayoutSingleColumn`) and add other components
inside semantic content wrappers so that the layout is able to understand where to render those
blocks.

```jsx
<LayoutSingleColumn>
  <LayoutWrapperTopbar>
    <TopbarContainer />
  </LayoutWrapperTopbar>
  <LayoutWrapperMain>
    <h1>Some content</h1>
    <img src={image} alt="My first ice cream." />
    <div>
      <NamedLink name="LandingPage">Go to home page</NamedLink> or
      <ExternalLink href="https://google.com">Go to Google</ExternalLink>
    </div>
  </LayoutWrapperMain>
  <LayoutWrapperFooter>
    <Footer />
  </LayoutWrapperFooter>
</LayoutSingleColumn>
```

And as a final step we need to export the component. `export default AboutPage;`. See more from
[babeljs.org](https://babeljs.io/learn-es2015/#ecmascript-2015-features-modules)

## 5. Adding some styles to the CSS file

Here's an example what your AboutPage.css file could look like:

```css
@import '../../marketplace.css';

.root {
  padding: 24px;

  /* Use CSS variable imported from marketplace.css */
  background-color: var(--marketplaceColor);
}
```

## 6. Adding the component to the component directory

New component needs to be added to `src/containers/index.js` file or if it's a presentational
component (not page or form) it should be inside components folder and therefore added to
`src/components/index.js`

Inside that index.js you need to add line
`export { default as AboutPage } from './AboutPage/AboutPage';`. This helps other parts of the app
to import new components easily with `import { AboutPage } from '../../components'`.

## 7. Adding a route to the page

As a last step you need to add the newly created static page to the routing. This can be done in
`src/routeConfiguration.js`.

Inside routeConfiguration function you should add a URL path, a page name (it should not conflicting
with other pages), and the component itself.

Add it as first to the list of imported pages in alphabetical order (2nd line):

```jsx
import {
  AboutPage,
  AuthenticationPage,
  CheckoutPage,
```

and after that add the route configuration to your newly created page: (In this example we created
about page so '/about' would work well as a path.)

```javascript
    {
      path: '/about',
      name: 'AboutPage',
      component: AboutPage,
    },
```

## Read more

We are using several libraries in this example. If you want to read more, here's some pointers:

- [ES2015](https://babeljs.io/learn-es2015/): imports, exports, arrow functions
- [React](https://reactjs.org/): for creating components
- [JSX](https://reactjs.org/docs/introducing-jsx.html): for getting HTML-like markup syntax for own
  components
- [CSS Modules](https://github.com/css-modules/css-modules)
- [React Router](https://reacttraining.com/react-router/web/guides/philosophy): routing inside the
  application.
