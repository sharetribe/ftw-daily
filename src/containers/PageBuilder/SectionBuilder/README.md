## SectionBuilder

The default schema for page content has 3 levels that can include content fields:

- **page asset** (data from Asset Delivery API)
  - **sections** (page asset contains sections)
    - **blocks** (section might contain blocks)

This is the builder for section types. For example, when encountering `sectionType: 'article'`
SectionBuilder uses internal component **SectionArticle** to render the section data.

```jsx
<SectionBuilder
  sections={[
    {
      sectionType: 'article',
      sectionId: 'my-article-section',
      title: {
        type: 'heading1',
        content: 'Hello World!',
      },
      blocks: [
        {
          blockType: 'default-block',
          blockId: 'cms-article-section-block-1',
          text: {
            type: 'markdown',
            content: 'My article content. _Lorem ipsum_ consectetur adepisci velit',
          },
        },
      ],
    },
  ]}
  options={options}
/>
```

## Default section components

The existing section components are created to be quite flexible they have many shared optional
fields. For example, you can give them a title, ingress, callToAction button, and blocks. So, these
sections are

- **SectionArticle**
  - Show article content in a bit narrower main column on desktop
- **SectionCarousel**
  - Creates carousel effect from block content.
- **SectionColumns**
  - Allows multiple columns to be shown on wider screens
  - The number of columns is defined by **_numColumns_** prop
  - Mobile layout shows all the blocks in a single column
- **SectionFeatures**
  - Shows block content in a row mode: text and media are shown side by side
  - Create alternating block flow: each row changes the order of text and media

Each of these components uses **SectionContainer** to wrap the content. It can be used to include
some common styling to each section. For example, a responsive background image could be given to
this container.

## Add a new section component

1. Create a new directory

   - E.g. _SectionMyComponent_
   - The naming convention (i.e. _'Section'_ prefix) is just there to help working with code editors
     and text suggestions.

2. Add component files there

   - **_SectionMyComponent.js_**
     - The main file containing the component's code
     - There's a special component called SectionContainer, which should be used to wrap your
       component. For example:
       ```jsx
       <SectionContainer
         id={sectionId}
         className={className}
         rootClassName={rootClassName}
         style={backgroundColorMaybe}
         backgroundImage={backgroundImage}
         options={fieldOptions}
       >
         <header className={defaultClasses.sectionDetails}>
           <Field data={title} rootClassName={defaultClasses.title} options={fieldOptions} />
         </header>
       </SectionContainer>
       ```
   - **_SectionMyComponent.module.css_**
     - Styles for your component
     - SectionBuilder also passes some shared styles like **_defaultClasses.title_**
   - **_index.js_**
     - This should just export your main component

3. Edit _SectionBuilder.js_

   1. You need to import your component to BlockBuilder:

      ```js
      // Section components
      import SectionColumns from './SectionColumns';
      import SectionMyComponent from './SectionMyComponent';
      // This is the same as writing:
      // import SectionMyComponent from './SectionMyComponent/index.js';
      ```

   2. Inside SectionBuilder, there's a mapping between section type and component that can render
      it:

      ```js
      const defaultSectionComponents = {
        article: { component: SectionArticle },
        columns: { component: SectionColumns },
        // etc.
      };
      ```

      You can change this to use your custom component:

      ```js
      const defaultSectionComponents = {
        article: { component: SectionMyComponent },
        // etc.
      };
      ```
