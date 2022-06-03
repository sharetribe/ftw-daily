import React from 'react';
import { AspectRatioWrapper } from '../../../components/index.js';

import { H1, H2, H3, H4, H5, H6 } from '../Primitives/Heading.js';
import { Ul, Ol, Li } from '../Primitives/List.js';
import { Code, CodeBlock } from '../Primitives/Code.js';
import { Link } from '../Primitives/Link.js';
import renderMarkdown from '../markdownProcessor.js';

import {
  exposeContentAsChildren,
  exposeContentString,
  exposeLinkProps,
  exposeImageProps,
  exposeColorProps,
} from './Field.helpers.js';
import css from './Field.module.css';

const PlainImg = props => {
  return <img className={css.markdownImg} {...props} />;
};

///////////////////
// Custom fields //
///////////////////

// Most fields are primitives but markdown is a bit special case.
const MarkdownField = ({ content, components }) => renderMarkdown(content, components);
const ImageField = props => {
  // TODO image dimensions
  return (
    <AspectRatioWrapper width={props?.width || 1} height={props?.height || 1}>
      <img className={css.img} {...props} />
    </AspectRatioWrapper>
  );
};

/////////////
// Configs //
/////////////

const defaultConfigs = {
  heading1: { component: H1, pickValidProps: exposeContentAsChildren },
  heading2: { component: H2, pickValidProps: exposeContentAsChildren },
  heading3: { component: H3, pickValidProps: exposeContentAsChildren },
  heading4: { component: H4, pickValidProps: exposeContentAsChildren },
  heading5: { component: H5, pickValidProps: exposeContentAsChildren },
  heading6: { component: H6, pickValidProps: exposeContentAsChildren },
  paragraph: { component: 'p', pickValidProps: exposeContentAsChildren },
  markdown: {
    component: MarkdownField,
    pickValidProps: exposeContentString,
    options: {
      // Custom components mapped to be rendered for markdown content (instead of the default ones)
      components: {
        ul: Ul,
        ol: Ol,
        li: Li,
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        h6: H6,
        img: PlainImg,
        code: Code,
        pre: CodeBlock,
        a: Link,
      },
    },
  },
  // TODO (these doesn't have final specs)
  externalButtonLink: { component: Link, pickValidProps: exposeLinkProps },
  internalButtonLink: { component: Link, pickValidProps: exposeLinkProps },
  image: { component: ImageField, pickValidProps: exposeImageProps },
  backgroundImage: { component: PlainImg, pickValidProps: exposeImageProps },
  hexColor: { pickValidProps: exposeColorProps },
};

//////////////////
// Props picker //
//////////////////

// This is useful for fields that are not used as components (e.g. background-color)
export const pickValidProps = (data, options) => {
  const customConfigs = options?.fieldComponents || {};
  const fieldConfigs = { ...defaultConfigs, ...customConfigs };
  const config = fieldConfigs[(data?.type)];
  const pickValidProps = config?.pickValidProps;
  if (pickValidProps) {
    return pickValidProps(data);
  } else {
    console.warn(`There's no validator (pickValidProps) for this field type (${data?.type}).`);
    return null;
  }
};

////////////////////
// Field selector //
////////////////////

// Generic field component that picks a specific field component based on 'type'
const Field = props => {
  const { data, options: fieldOptions, ...propsFromParent } = props;

  // Get correct config for the field type
  const customConfigs = fieldOptions?.fieldComponents || {};
  const fieldConfigs = { ...defaultConfigs, ...customConfigs };
  const config = fieldConfigs[(data?.type)];
  // Config contains component and valid props picker
  const { component: Component, pickValidProps, options = {} } = config || {};

  // If there's no data, the optional field has been left untouched.
  if (!data || !pickValidProps) {
    return null;
  }

  // If there's no validator, the optional field has been left untouched.
  if (!pickValidProps) {
    console.warn(`There's no validator (pickValidProps) for this field type (${data?.type}).`);
    return null;
  }

  const validPropsFromData = pickValidProps(data);
  const hasValidProps = Object.keys(validPropsFromData).length > 0;

  // Render the correct field component
  if (Component && hasValidProps) {
    return <Component {...propsFromParent} {...validPropsFromData} {...options} />;
  }

  // If the field type is unknown, the app can't know what to render
  console.warn(`Unknown field type (${data?.type}) detected.`);
  return null;
};

export default Field;
