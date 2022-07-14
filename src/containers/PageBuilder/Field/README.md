# Fields

Fields are pieces of content defined in the page asset JSON file. They are usually part of data
grouped under Section or Block content. For example, field data could look like this:

```json
"title": {
  "type": "heading1",
  "content": "Hello World"
}
```

The Field component will check the type of the field and validate the data. If there are valid data
(e.g. if "content" is valid data for type "heading1"), the field renders the content.

## Mapping of field types and components

The mapping of content type vs component & pickValidProps, could look like this:

```js
const defaultFieldComponents = {
  heading1: { component: H1, pickValidProps: exposeContentAsChildren },
  paragraph: { component: Ingress, pickValidProps: exposeContentAsChildren },
  externalButtonLink: { component: Link, pickValidProps: exposeLinkProps },
  image: { component: FieldImage, pickValidProps: exposeImageProps },
  // In some cases, the data is used without a renderable component.
  // Data for "background-color" in _style_ prop could be an example of that.
  hexColor: { pickValidProps: exposeColorProps },
};
```

It's also possible to pass additional mapping to the Field component:

```jsx
<Field data={data} options={{ fieldComponents }} />
```

## Rendable components

The Field uses components from the _Primitives_ directory to actually render the data it receives.
