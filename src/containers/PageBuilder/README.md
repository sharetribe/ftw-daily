## PageBuilder

PageBuilder creates a page according to a page data asset. The page asset represents all the content
that the page needs and how they are grouped together (excluding the top bar and footer).

The page asset file is created in Flex Console against the page asset schema. When comparing this
solution with headless CMS services, the schema of the page asset represents the result of **content
modeling**. It defines what kind of data needs to be asked from a content writer. In Flex, content
writing happens in Console, which means that content writers are marketplace operators.

The smallest piece of information in page asset is a field. It defines a piece of data and its type.
For example:

```json
"title": {
  "type": "heading1",
  "content": "Hello World"
}
```

The default asset schema for page content has 3 levels that can include content fields:

- **page asset** (data from Asset Delivery API)
  - **sections** (page asset contains an array of sections)
    - **blocks** (section might contain an array of blocks)

**PageBuilder** reads the page asset, and when it gets to the _sections_ array, it uses
**SectionBuilder** to render its content. Similarly, SectionBuilder passes _blocks_ array to
**BlockBuilder**. All the fields are passed to the **Field** component, which validates and
sanitizes the data and uses **Primitive** components to actually render them. **MarkdownProcessor**
is used to render fields with `"type": "markdown"`.

Then **LayoutComposer** creates the layout areas for **Topbar**, **Footer**, and for the main
content, which is created using a page asset.

In addition, the **StaticPage** component wraps everything and adds the page context using
[React Helmet Async](https://github.com/staylor/react-helmet-async) library. It sets the title,
description, SEO schema, and social media meta tags to the `<head>` section of the page. There are
also other responsibilities that StaticPage takes care of.

## Props

- **pageAssetsData**: denormalized page asset data (e.g. image refs are swapped to imageAsset
  entities)
- **inProgress**: status of Asset Delivery API call to fetch the asset
- **fallbackPage**: if asset fetch fails, you can provide a fallback component
- **options**: possibility to extend built-in sections, blocks, and fields.
- All the other props are given to the **StaticPage** component, which PageBuilder uses internally.

## Extend PageBuilder

By default, PageBuilder has only one layout that consists of 3 parts: topbar, main, and footer. You
might want to create more layout options using **LayoutComposer**.

It's also possible to create custom section types, block types, and fields - and map those with your
custom components. However, this is only useful if PageBuilder is used to create custom pages that
don't get content through the Asset Delivery API.

```jsx
<PageBuilder
  pageAssetsData={{
    sections: [
      {
        sectionType: 'customHero',
        sectionId: 'hero',
      },
      {
        sectionType: 'customSection',
        sectionId: 'my-ection',
        foo: { type: 'myField', bar: 'bar' },
        blocks: [
          {
            blockType: 'customSectionBlock',
            blockId: 'my-block',
          },
        ],
      },
    ],
  }}
  options={{
    sectionComponents: {
      customHero: { component: FallbackHero },
      customSection: { component: MyCustomSection },
    },
    blockComponents: {
      customSectionBlock: { component: MyCustomBlock },
    },
    fieldComponents: {
      myField: {
        component: MyCustomField,
        // Expose only "bar" data, drop everything else
        pickValidProps: data => (hasBar(data) ? { bar: data.bar } : {}),
      },
    },
  }}
  contentType={openGraphContentType}
  description={description}
  title={title}
  schema={pageSchemaForSEO}
/>
```
