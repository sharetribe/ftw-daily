import React from 'react';

import { Code, CodeBlock } from './Primitives/Code/Code.js';

import renderMarkdown from './markdownProcessor.js';

import PageBuilder from './PageBuilder.js';

const addCodeBlockForSyntax = md => `
\`\`\`${md}\`\`\`

${md}
`;

const mdHeading = `
# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

This is an H1
=============

This is an H2
-------------
`;

const SectionHeadings = {
  sectionType: 'columns',
  sectionId: 'cms-section-1',
  numColumns: 2,
  title: { type: 'heading2', content: 'Headings' },
  ingress: { type: 'heading2', content: 'Lorem ipsum dolor sit amet consectetur adepisci elit...' },
  blocks: [
    {
      blockType: 'default-block',
      blockId: 'cms-heading-block-1',
      title: { type: 'heading3', content: 'Heading syntax' },
      text: { type: 'markdown', content: `\`\`\`${mdHeading}\`\`\`` },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-heading-block-2',
      title: { type: 'heading3', content: '...rendered' },
      text: { type: 'markdown', content: mdHeading },
    },
  ],
};

const emphasisBold = `
This is **bold text**
`;

const emphasisBold2 = `
This is __bold text__
`;

const emphasisItalic = `
This is *italic text*
`;

const emphasisItalic2 = `
This is _italic text_
`;

const SectionEmphasis = {
  sectionType: 'columns',
  sectionId: 'cms-section-2',
  numColumns: 4,
  title: { type: 'heading2', content: 'Emphasizing text' },
  blocks: [
    {
      blockType: 'default-block',
      blockId: 'cms-emphasis-block-1',
      title: { type: 'heading3', content: 'Bold' },
      text: { type: 'markdown', content: addCodeBlockForSyntax(emphasisBold) },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-emphasis-block-2',
      title: { type: 'heading3', content: 'Bold' },
      text: { type: 'markdown', content: addCodeBlockForSyntax(emphasisBold2) },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-emphasis-block-3',
      title: { type: 'heading3', content: 'Italic' },
      text: { type: 'markdown', content: addCodeBlockForSyntax(emphasisItalic) },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-emphasis-block-4',
      title: { type: 'heading3', content: 'Italic' },
      text: { type: 'markdown', content: addCodeBlockForSyntax(emphasisItalic2) },
    },
  ],
};

const mdLinks = `
Plain [link text](https://www.sharetribe.com/docs/) within a parapgraph.

[Link with title](https://www.sharetribe.com/docs/ "title text!") shows a title text, when mouse is hovering on top of it.

[In-app link](/s) starts with "/" I.e. use absolute path after marketplace domain.

Go to [Styleguide > Markdown page](/styleguide/c/Markdown "Markdown syntax page")
`;

const SectionLinks = {
  sectionType: 'columns',
  sectionId: 'cms-section-3',
  numColumns: 2,
  title: { type: 'heading2', content: 'Links' },
  blocks: [
    {
      blockType: 'default-block',
      blockId: 'cms-link-block-1',
      title: { type: 'heading3', content: 'Link syntax' },
      text: { type: 'markdown', content: `\`\`\`${mdLinks}\`\`\`` },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-link-block-2',
      title: { type: 'heading3', content: '...rendered' },
      text: { type: 'markdown', content: mdLinks },
    },
  ],
};

const horizontalRules = `
Some text
___

divided by horizontal rule
`;

const horizontalRules2 = `
Some text

---

divided by horizontal rule
`;

const horizontalRules3 = `
Some text

***

divided by horizontal rule
`;

const SectionHorizontalRules = {
  sectionType: 'columns',
  sectionId: 'cms-section-4',
  numColumns: 3,
  title: { type: 'heading2', content: 'Horizontal Rules' },
  blocks: [
    {
      blockType: 'default-block',
      blockId: 'cms-hr-block-1',
      title: { type: 'heading3', content: 'With 3 underscore' },
      text: { type: 'markdown', content: addCodeBlockForSyntax(horizontalRules) },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-hr-block-2',
      title: { type: 'heading3', content: 'With 3 dash' },
      text: { type: 'markdown', content: addCodeBlockForSyntax(horizontalRules2) },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-hr-block-3',
      title: { type: 'heading3', content: 'With 3 asterisk' },
      text: { type: 'markdown', content: addCodeBlockForSyntax(horizontalRules3) },
    },
  ],
};

const unorderedList = `
+ Create a list by starting a line with +, -, or *
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
  + List with asterisk (*):
    *   Red
    *   Green
    *   Blue
  + List with plus (+):
    +   Red
    +   Green
    +   Blue
  + List with dash (-):
    -   Red
    -   Green
    -   Blue
`;

const orderedList = `
1. Lorem ipsum 
2. dolor sit amet
3. Consectetur
4. adipiscing elit
`;

const orderedList2 = `
1. Lorem ipsum 
1. dolor sit amet
1. Consectetur
1. adipiscing elit
`;

const orderedList3 = `
42. Lorem ipsum 
1. dolor sit amet
1. Consectetur
1. adipiscing elit
`;

const SectionLists = {
  sectionType: 'columns',
  sectionId: 'cms-section-5',
  numColumns: 2,
  title: { type: 'heading2', content: 'Lists' },
  blocks: [
    {
      blockType: 'default-block',
      blockId: 'cms-list-block-1',
      title: { type: 'heading3', content: 'Unordered lists' },
      text: { type: 'markdown', content: `\`\`\`${unorderedList}\`\`\`` },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-list-block-2',
      title: { type: 'heading3', content: '...rendered' },
      text: { type: 'markdown', content: unorderedList },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-list-block-3',
      title: { type: 'heading3', content: 'Ordered lists' },
      text: { type: 'markdown', content: `\`\`\`${orderedList}\`\`\`` },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-list-block-4',
      title: { type: 'heading3', content: '...rendered' },
      text: { type: 'markdown', content: orderedList },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-list-block-5',
      title: { type: 'heading3', content: 'Keep all numbers as "1."' },
      text: { type: 'markdown', content: `\`\`\`${orderedList2}\`\`\`` },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-list-block-6',
      title: { type: 'heading3', content: '...rendered' },
      text: { type: 'markdown', content: orderedList2 },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-list-block-7',
      title: { type: 'heading3', content: 'Start numbering with offset' },
      text: { type: 'markdown', content: `\`\`\`${orderedList3}\`\`\`` },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-list-block-8',
      title: { type: 'heading3', content: '...rendered' },
      text: { type: 'markdown', content: orderedList3 },
    },
  ],
};

const blockquotesNested = `
> Blockquotes can also be nested...
>> ...by stacking greater-than signs...
> > > ...or with spaces between arrows.
`;

const blockquotesLazyArray = `
> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
id sem consectetuer libero luctus adipiscing.
`;

const blockquotesComplex = `
> ## This is a header (H2)
> 
> Blockquotes can contain other Markdown elements, including headers, lists, and code blocks
>
> 1.   This is the first list item.
> 2.   This is the second list item.
> 
> Here's some example code:
> 
>     export default PageBuilder;
`;

const SectionBlockquotes = {
  sectionType: 'columns',
  sectionId: 'cms-section-6',
  numColumns: 2,
  title: { type: 'heading2', content: 'Blockquotes' },
  blocks: [
    {
      blockType: 'default-block',
      blockId: 'cms-blockquote-block-1',
      title: { type: 'heading3', content: 'Nested blockquotes' },
      text: { type: 'markdown', content: `\`\`\`${blockquotesNested}\`\`\`` },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-blockquote-block-2',
      title: { type: 'heading3', content: '...rendered' },
      text: { type: 'markdown', content: blockquotesNested },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-blockquote-block-3',
      title: { type: 'heading3', content: 'Lazy arrow:' },
      text: { type: 'markdown', content: `\`\`\`${blockquotesLazyArray}\`\`\`` },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-blockquote-block-4',
      title: { type: 'heading3', content: '...rendered' },
      text: { type: 'markdown', content: blockquotesLazyArray },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-blockquote-block-5',
      title: { type: 'heading3', content: 'Complex blockquotes' },
      text: { type: 'markdown', content: `\`\`\`${blockquotesComplex}\`\`\`` },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-blockquote-block-6',
      title: { type: 'heading3', content: '...rendered' },
      text: { type: 'markdown', content: blockquotesComplex },
    },
  ],
};

const mdImage1 = `
![Alt text](https://picsum.photos/400)
`;

const mdImage2 = `
![Alt text](https://picsum.photos/400 "Title text")
`;

const mdImageFootnoteStyle = `
![Alt text][id]

Like links, Images also have a footnote style syntax with a reference later in the markdown content defining the URL location:

[id]: https://picsum.photos/400  "Title text"
`;

const SectionImages = {
  sectionType: 'columns',
  sectionId: 'cms-section-7',
  numColumns: 2,
  title: { type: 'heading2', content: 'Images' },
  blocks: [
    {
      blockType: 'default-block',
      blockId: 'cms-image-block-1',
      title: { type: 'heading3', content: 'With "alt" for screenreaders' },
      text: { type: 'markdown', content: `\`\`\`${mdImage1}\`\`\`` },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-image-block-2',
      title: { type: 'heading3', content: '...rendered' },
      text: { type: 'markdown', content: mdImage1 },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-image-block-3',
      title: { type: 'heading3', content: 'With "alt" and "title"' },
      text: { type: 'markdown', content: `\`\`\`${mdImage2}\`\`\`` },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-image-block-4',
      title: { type: 'heading3', content: '...rendered' },
      text: { type: 'markdown', content: mdImage2 },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-image-block-5',
      title: { type: 'heading3', content: 'Footnote style' },
      text: { type: 'markdown', content: `\`\`\`${mdImageFootnoteStyle}\`\`\`` },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-image-block-6',
      title: { type: 'heading3', content: '...rendered' },
      text: { type: 'markdown', content: mdImageFootnoteStyle },
    },
  ],
};

const inlineCode = `
Inline \`code\`
`;

const codeBlockIndentation = `
    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code
`;

const codeBlockFences = `
\`\`\`
Some text here...
\`\`\`
`;

const codeBlockFencesSyntax = `
    \`\`\`
    Some text here...
    \`\`\`
`;

const SectionCode = {
  sectionType: 'columns',
  sectionId: 'cms-section-8',
  numColumns: 2,
  title: { type: 'heading2', content: 'Inline code and Code blocks' },
  blocks: [
    {
      blockType: 'default-block',
      blockId: 'cms-code-block-1',
      title: { type: 'heading3', content: 'Inline code uses backticks' },
      text: { type: 'markdown', content: `\`\`\`${inlineCode}\`\`\`` },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-code-block-2',
      title: { type: 'heading3', content: '...rendered' },
      text: { type: 'markdown', content: inlineCode },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-code-block-3',
      title: { type: 'heading3', content: 'Code block with indentation (4 spaces)' },
      text: { type: 'markdown', content: `\`\`\`${codeBlockIndentation}\`\`\`` },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-code-block-4',
      title: { type: 'heading3', content: '...rendered' },
      text: { type: 'markdown', content: codeBlockIndentation },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-code-block-5',
      title: { type: 'heading3', content: 'Code block with backtick "fences" (```)' },
      text: { type: 'markdown', content: codeBlockFencesSyntax },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-code-block-6',
      title: { type: 'heading3', content: '...rendered' },
      text: { type: 'markdown', content: codeBlockFences },
    },
  ],
};

const MarkdownPage = props => {
  const sections = props.sections;
  const pageAssetsData = { sections };
  return (
    <PageBuilder
      pageAssetsData={pageAssetsData}
      description="Example page by PageBuilder"
      title="Styleguide page"
    />
  );
};

export const Syntax = {
  component: MarkdownPage,
  props: {
    sections: [
      SectionHeadings,
      SectionEmphasis,
      SectionLinks,
      SectionHorizontalRules,
      SectionLists,
      SectionBlockquotes,
      SectionImages,
      SectionCode,
    ],
  },
  group: 'PageBuilder',
};

/////////////////
// Theme: dark //
/////////////////
const SectionLinksOnDarkMode = {
  sectionType: 'columns',
  sectionId: 'cms-section-3-dark',
  numColumns: 2,
  background: { type: 'hexColor', color: '#000000' },
  textColor: 'light',
  title: { type: 'heading2', content: 'Links on dark theme' },
  blocks: [
    {
      blockType: 'default-block',
      blockId: 'cms-link-block-1-dark',
      title: { type: 'heading3', content: 'Link syntax' },
      text: { type: 'markdown', content: `\`\`\`${mdLinks}\`\`\`` },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-link-block-2-dark',
      title: { type: 'heading3', content: '...rendered' },
      text: { type: 'markdown', content: mdLinks },
    },
  ],
};

const SectionCodeOnDarkMode = {
  sectionType: 'columns',
  sectionId: 'cms-section-8',
  numColumns: 2,
  background: { type: 'hexColor', color: '#000000' },
  textColor: 'light',
  title: { type: 'heading2', content: 'Inline code and Code blocks' },
  blocks: [
    {
      blockType: 'default-block',
      blockId: 'cms-code-block-1',
      title: { type: 'heading3', content: 'Inline code uses backticks' },
      text: { type: 'markdown', content: `\`\`\`${inlineCode}\`\`\`` },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-code-block-2',
      title: { type: 'heading3', content: '...rendered' },
      text: { type: 'markdown', content: inlineCode },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-code-block-3',
      title: { type: 'heading3', content: 'Code block with indentation (4 spaces)' },
      text: { type: 'markdown', content: `\`\`\`${codeBlockIndentation}\`\`\`` },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-code-block-4',
      title: { type: 'heading3', content: '...rendered' },
      text: { type: 'markdown', content: codeBlockIndentation },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-code-block-5',
      title: { type: 'heading3', content: 'Code block with backtick "fences" (```)' },
      text: { type: 'markdown', content: codeBlockFencesSyntax },
    },
    {
      blockType: 'default-block',
      blockId: 'cms-code-block-6',
      title: { type: 'heading3', content: '...rendered' },
      text: { type: 'markdown', content: codeBlockFences },
    },
  ],
};

export const SyntaxOnDarkTheme = {
  component: MarkdownPage,
  props: {
    sections: [SectionLinksOnDarkMode, SectionCodeOnDarkMode],
  },
  group: 'PageBuilder',
};

const MarkdownDiv = props => <div>{props.renderedMarkdown}</div>;

const mdText = `
\`\`\`
import renderMarkdown from './markdownProcessor';
const MyItalics = props => <em style={{ color: 'tomato', fontStyle: 'italic' }} {...props} />;
const MyStrong = props => <strong style={{ color: 'tomato', fontWeight: 700 }} {...props} />;

const mdText = \'\n#Hello Markdown\nSome _styled_ **text**!\n\;'

const Markdown = () => (
  <div>
    {renderMarkdown(mdText, {
      em: MyItalics,
      strong: MyStrong,
    })}
  </div>
);
\`\`\`

# Hello Markdown

Some _styled_ **text**!
`;

const MyItalics = props => <em style={{ color: 'tomato', fontStyle: 'italic' }} {...props} />;
const MyStrong = props => <strong style={{ color: 'tomato', fontWeight: 700 }} {...props} />;

export const markdownProcessingWithCustomComponents = {
  component: MarkdownDiv,
  props: {
    renderedMarkdown: renderMarkdown(mdText, {
      em: MyItalics,
      strong: MyStrong,
      code: Code,
      pre: CodeBlock,
    }),
  },
  group: 'PageBuilder',
};
