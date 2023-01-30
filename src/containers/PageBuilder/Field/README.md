# Fields

Fields are pieces of content defined in the page asset JSON file. They are usually part of data
grouped under Section or Block content. For example, field data could look like this:

```json
"title": {
  "fieldType": "heading1",
  "content": "Hello World"
}
```

The Field component will check the type of the field and validate the data. If there are valid data
(e.g. if "content" is valid data for the field type "heading1"), the field renders the content.

## Mapping of field types and components

The mapping of field type vs component & pickValidProps, could look like this:

```js
const defaultFieldComponents = {
  heading1: { component: H1, pickValidProps: exposeContentAsChildren },
  paragraph: { component: Ingress, pickValidProps: exposeContentAsChildren },
  externalButtonLink: { component: Link, pickValidProps: exposeLinkProps },
  image: { component: FieldImage, pickValidProps: exposeImageProps },
};
```

It's also possible to pass additional mapping to the Field component:

```jsx
<Field data={data} options={{ fieldComponents }} />
```

## Rendable components

The Field uses components from the _Primitives_ directory to actually render the data it receives.
