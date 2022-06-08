import React from 'react';
import { types as sdkTypes } from '../../../util/sdkLoader';
import { AspectRatioWrapper, ResponsiveImage } from '../../../components/index.js';

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

///////////////////////
// Custom components //
///////////////////////

// Image as a Field (by default only allowed inside a block).
const ImageField = props => {
  // TODO image dimensions
  // sizes: should reflect column widths
  const { alt, variants } = props;
  const image = {
    id: new sdkTypes.UUID('empty'),
    type: 'image',
    attributes: { variants },
  };
  const variantNames = Object.keys(variants);
  // We assume aspect ratio from the first image variant
  const firstImageVariant = variants[variantNames[0]];
  const { width, height } = firstImageVariant || {};

  return (
    <AspectRatioWrapper width={width || 1} height={height || 1}>
      <ResponsiveImage
        className={css.fieldImage}
        alt={alt}
        image={image}
        variants={variantNames}
        sizes="(max-width: 768px) 100vw, 400px"
      />
    </AspectRatioWrapper>
  );
};

// BackgroundImage doesn't have enforcable aspectratio
// It's most likely a scaled image
const BackgroundImageField = props => {
  // TODO image dimensions
  const { alt, variants } = props;
  const image = {
    id: new sdkTypes.UUID('empty'),
    type: 'image',
    attributes: { variants },
  };
  const variantNames = Object.keys(variants);
  const w = variants[variantNames[0]]?.width;
  const h = variants[variantNames[0]]?.height;

  return (
    <ResponsiveImage
      className={css.backgroundImage}
      alt={alt}
      image={image}
      variants={variantNames}
    />
  );
};

// Images in markdown point to elsewhere (they don't support responsive image variants)
const MarkdownImg = props => {
  return <img className={css.markdownImg} {...props} />;
};

// Most fields are primitives but markdown is a bit special case.
const MarkdownField = ({ content, components }) => renderMarkdown(content, components);

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
        img: MarkdownImg,
        code: Code,
        pre: CodeBlock,
        a: Link,
      },
    },
  },
  externalButtonLink: { component: Link, pickValidProps: exposeLinkProps },
  internalButtonLink: { component: Link, pickValidProps: exposeLinkProps },
  // TODO (these don't have final specs)
  image: { component: ImageField, pickValidProps: exposeImageProps },
  backgroundImage: { component: BackgroundImageField, pickValidProps: exposeImageProps },
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
