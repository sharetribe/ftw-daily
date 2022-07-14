## BlockBuilder

The default schema for page content has 3 levels that can include content fields:

- **page asset** (data from Asset Delivery API)
  - **sections** (page asset contains sections)
    - **blocks** (section might contain blocks)

This is the builder for block types. Although, at the time of writing, there's only one block type
supported: '**default-block**'. The component called **BlockDefault** handles the rendering of that
block type.

```jsx
<BlockBuilder
  ctaButtonClass={css.myCallToActionButton}
  blocks={[
    {
      blockType: 'default-block',
      blockId: 'block-1',
      title: {
        type: 'heading2',
        content: 'Hello world!',
      },
      text: {
        type: 'markdown',
        content: `**Lorem ipsum** consectetur adepisci velit`,
      },
      callToAction: {
        type: 'internalButtonLink',
        href: '/s',
        label: 'Go to search page',
      },
    },
  ]}
  responsiveImageSizes={responsiveImageSizes}
  options={options}
/>
```

## Adding a new block component

1. Create a new folder

   - E.g. _BlockMyComponent_
   - The naming convention (i.e. _'Block'_ prefix) is just there to help to work with code editors
     and text suggestions.

2. Add component files there

   - **_BlockMyComponent.js_**
     - Main file containing the component's code
     - There's a special component called BlockContainer, which should be used to wrap your
       component. For example:
       ```jsx
       <BlockContainer id={blockId} className={css.root}>
         <Field data={title} options={options} />
         <Field data={text} options={options} />
       </BlockContainer>
       ```
   - **_BlockMyComponent.module.css_**
     - Styles for your component
   - **_index.js_**
     - This should just export your main component

3. Edit _BlockBuilder.js_

   1. You need to import your component to BlockBuilder:

      ```js
      // Block components
      import BlockDefault from './BlockDefault';
      import BlockMyComponent from './BlockMyComponent';
      // This is the same as writing:
      // import BlockMyComponent from './BlockMyComponent/index.js';
      ```

   2. Inside BlockBuilder, there's a mapping between block type and component that can render it:

      ```js
      const defaultBlockComponents = {
        ['default-block']: { component: BlockDefault },
      };
      ```

      You can change this to use your custom component:

      ```js
      const defaultBlockComponents = {
        ['default-block']: { component: BlockMyComponent },
      };
      ```
