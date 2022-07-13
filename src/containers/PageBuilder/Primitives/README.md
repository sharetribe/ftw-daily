# Primitive UI components

These components are actually used to render field data. Fields are pieces of content defined in a
page asset JSON file. They are usually part of data grouped under Section or Block content. For
example, field data could look like this:

```json
"title": {
  "type": "heading1",
  "content": "Hello World"
}
```

The **_title_** field above should therefore be rendered with the H1 heading component:

```js
import { H1 } from './Primitives/Heading';
```

Most of the primitives are just simple wrappers for built-in React elements / DOM tags. It makes it
easy to style and add extra features to similar components without changing all the places that
actually use that component.

For example, Heading components have an optional prop: **as**. This is a concept that's quite often
used by CSS-in-JS libraries. You can use it to decouple an actual HTML element and its style to fix
SEO vs UI issues. So, `<H1 as="h2">Hello World</H1>` would render `<h2>` DOM element with styles
that match `H1` component.
