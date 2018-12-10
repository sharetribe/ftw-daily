# Flex Template for Web: styling

The goal for creating styling for Flex template app was to keep styling as close as possible to
plain CSS while still trying to avoid the mess that comes along with globally defined cascading
behavior that CSS is all about.

To tackle this goal, we have split the styling into two levels in this template application:

- [Marketplace level styling](#marketplace-level-styling) through _marketplace.css_ (a kind of
  global theme)
- [Component level styling](#styling-components) using
  [CSS Modules](https://github.com/css-modules/css-modules)

## Marketplace level styling

On top of functionalities provided by Create React App, we have
[added a couple of extra libraries](https://www.npmjs.com/package/sharetribe-scripts#differences-to-react-scripts)
to help to design consistent UIs faster. CSS Properties and CSS Property Sets are very useful for
all kind of style sharing purposes, and we have created marketplace-level styling variables with
them.

The concept behind CSS Properties is quite straightforward - they are variables that can be defined
in root-element level and then used inside some CSS rule.

```css
:root {
  --marketplaceColor: #ffff00;
}

.linkToHomePage {
  color: var(--marketplaceColor);
}
```

(Read more about CSS Properties from [cssnext](http://cssnext.io/))

We have used this concept to create a marketplace-level "theming" that's defined in three files:
_src/marketplace.css_, _src/marketplaceFonts.css_, and _marketplaceIndex.css_.

### marketplace.css

This is a good place to start customizing marketplace styles. For example, we define our color
scheme here using CSS Property variables:

```css
/* ================ Colors ================ */

--marketplaceColor: #c0392b;
--marketplaceColorLight: #ff4c38;
--marketplaceColorDark: #8c291e;

/* Used with inline CSS SVGs */
--marketplaceColorEncoded: %23c0392b;

--successColor: #2ecc71;
--successColorDark: #239954;
--failColor: #ff0000;
--attentionColor: #ffaa00;

--matterColorDark: #000000;
--matterColor: #4a4a4a;
--matterColorAnti: #b2b2b2;
--matterColorNegative: #e7e7e7;
--matterColorBright: #fcfcfc;
--matterColorLight: #ffffff;
```

Changing `--marketplaceColor: #c0392b;` to `--marketplaceColor: tomato;` will change the default
marketplace color to tomato color. (It's a certain kind of red color.)

The `--marketplaceColorEncoded` variable holds the same value as `--marketplaceColor` but with the
_#_ URL encoded. This value can be used to maintain a consistent color scheme with inline SVG icons.

`--successColor` (green) is used in form inputs for showing that the input value is valid.
Sometimes, submit buttons (`<PrimaryButton>`) are also using that color to highlight the fact that
user has entered valid information to the form at hand.

Similarly `--failColor` is used to style errors and `--attentionColor` is used to draw user's
attention to certain UI components (e.g. required form inputs, or important info in Inbox)

Our greyscale colors (for borders and background colors) are named with prefix _"matter"_.

Similar pattern is also used to create more consistent UI components by providing variables for
box-shadows, border-radiuses, transitions, and so on. Our current plan is to parameterize styling
even more using this concept.

Breakpoints for media queries are also defined in this file:

```css
/* ================ Custom media queries ================ */

@custom-media --viewportMedium (min-width: 768px);
@custom-media --viewportLarge (min-width: 1024px);
@custom-media --viewportXLarge (min-width: 1921px);
```

### marketplaceFonts.css

Fonts are specified in this files using CSS Property Sets. They provide us a solid way of creating a
fixed set of CSS rules for a specific font.

For example, our default font is defined as:

```css
--fontWeightMedium: 500;

--marketplaceDefaultFontStyles: {
  font-family: 'sofiapro', Helvetica, Arial, sans-serif;
  font-weight: var(--fontWeightMedium);
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.1px;

  @media (--viewportMedium) {
    font-size: 20px;
    line-height: 24px;
  }
}
```

And created property set can be used as:

```css
p {
  @apply --marketplaceDefaultFontStyles;
}
```

_marketplaceFonts.css_ are included to _marketplace.css_, so you don't need to import this file on
new components (importing _marketplace.css_ is enough).

⚠️ NOTE: template app is following a pattern where the height of an element should be divisible by
`6px` on mobile layout and `8px` on bigger layouts. This affects line-heights of font styles too.

⚠️ NOTE: the `@apply` rule and custom property sets most likely won't get any more support from
browser vendors as the spec is yet considered deprecated and alternative solutions are being
discussed. However, template app will use these until a good enough alternative is available.

### marketplaceIndex.css

This file provides default styles for plain elements like `<body>`, `<a>`, `<p>`, `<input>`, `<h1>`,
`<h2>`, and so on.

## Styling components

Styling a web UI is traditionally quite a messy business due to the global nature of stylesheets and
especially their cascading specificity rule. `.card {/*...*/}` will affect every element on a web
page that has a class `card` - even if the different UI context would like to use a different set of
rules.

Our goal has been to create independent components that can be reused in the UI without paying too
much attention to the global CSS context. To achieve this, we have used
[CSS Modules](https://github.com/css-modules/css-modules), which keeps the syntax close to plain
CSS, but it actually creates unique class names to remove the problems caused by the global nature
of CSS. In practice, this means that a class with name `card` is actually renamed as
`ComponentName__card__3kj4h5`.

To use styles defined in SectionHero.css, we need to import the .css file into the component:

```jsx
import css from './SectionHero.css';
```

and then select the correct class from imported style object (in this case `heroMainTitle`):

```jsx
<h1 className={css.heroMainTitle}>Book saunas everywhere</h1>
```

### Find the component to change its styles

Quite often one needs to find a component that is responsible for certain UI partial in order to
change the styles. In this case, the easiest way to pinpoint a component is to open the inspector
from browser's dev tools. (Right-click on top of the correct element, and select _Inspector_, or
something of the sort depending on the browser, from the context menu.)

![Mobile LandingPage hero title](./assets/styling/styling-find-component.png)

Here we have opened title on LandingPage and the styles for
`<h1 class="SectionHero__heroMainTitle__3mVNg"><span>Book saunas everywhere.</span></h1>` are
defined in a "class" called `SectionHero__heroMainTitle__3mVNg`. As stated before, the first part of
a class name is actually giving us a hint about what component is defining that style - in this
case, it's _SectionHero_ and its styles can be found from the file:
`src/components/SectionHero/SectionHero.css`.

There's only two groups of components that break that rule:

- _src/containers_ (These components are connected to Redux store: Pages and TopbarContainer)
- _src/forms_

### Styling guidelines and good practices

We have a practice of naming the outermost class of a component as `.root { /* styles */ }`. So, if
the component is just rendering single element it only has `.root` class, and if there's more
complex inner DOM structure needed, additional classes are named semantically.

`<SectionHero>` could contain classes named as `.root`, `.heroMainTitle`, `.heroSubtitle`.

Some guidelines we have tried to follow:

- **Use semantic class names** (They improve readability and decouples style changes from DOM
  changes.)
- **Use CSS Properties defined in marketplace.css** and create new ones when it makes sense.
- **Use classes**, don't style DOM elements directly. (Element styles are global even with CSS
  Modules.)
- **Avoid nesting styles**. (CSS Modules makes specificity rules unnecessary.)
- **Group and comment style rules** inside declaration block if that improves readability.
- **Parent component is responsible for allocating space** for a child component (i.e. dimensions
  and margins).
- **Define `@apply` rules early enough** inside declaration block (since rules inside those property
  sets might overwrite rules written above the line where the set is applied).
- **Align text and components** to horizontal baselines. I.e. they should be a multiple of `6px` on
  mobile layout and `8px` on bigger screens.
- **Component height should follow baselines too**. I.e. they should be a multiple of `6px` on
  mobile layout and `8px` on bigger screens. _(Unfortunately, we haven't been strict with this
  one.)_

### Styling responsibility: parent component and its children

One important aspect of a component-based UI is the fact that a component is usually only
responsible for what happens inside its outermost element boundary. In parent-child context this
means that the parent component is responsible for its own layout and therefore it usually needs to
be able to give some dimensions to its child components (and naturally margins between them).

This creates a need for the parent to have means to pass `className` to its child as props. One
example could be a component that shows a circle component inside itself and makes it 50px wide.

Style definitions of the (`<Circle />`) child component:

```css
.root {
  background-color: tomato;
  border-radius: 50%;
}
```

Parent component renders
(`<div className={css.root}><Circle className={css.circleDimensions} /></div>`):

```css
.root {
  min-width: 60px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circleDimensions {
  flex-grow: 0;
  width: 50px;
  height: 50px;
  margin: 5px;
}
```

Sometimes the child component needs to be styled even further than just allocating space to it. If
the parent component wants to change the theme of child component there are generally two concepts
available:

- Create themed components (e.g. `<PrimaryButton>`, `<SecondaryButton>`, `<InlineButton>`)
- Pass in a `class` property that is able to overwrite original styling rules.

For the latter option, we have created a prop type concept called `rootClassName`. If you pass
`rootClassName` through props to a component, it will use that instead of component's own style
rules defined in `.root`. This ensures that the order of style declarations inside final CSS bundle
doesn't affect the final styles. (CSS bundle is generated in an import order, therefore we want to
avoid situations where `<Component className="classA classB"/>` could end up overwriting each others
depending on the order they are imported.)

In some complex cases, we have also created props for overwriting some inner classes of child
components. In these cases, child component is also replacing its own styling class with the class
passed-in through props. For example, `<LocationAutocompleteInput>` can take a prop called
`iconClassName`, which (if given) replaces `.icon` class defined inside
`LocationAutocompleteInput.css`.
