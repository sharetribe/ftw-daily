import React from 'react';
import { exact, func, node, number, objectOf, oneOf, oneOfType, shape, string } from 'prop-types';

// Primitive components that are actually used for rendering field data
// These are essentially calling the index.js
// E.g. import { H1, H2, H3, H4, H5, H6 } from '../Primitives/Heading/index.js';
import { H1, H2, H3, H4, H5, H6 } from '../Primitives/Heading';
import { Ul, Ol, Li } from '../Primitives/List';
import { Ingress } from '../Primitives/Ingress';
import { P } from '../Primitives/P';
import { Code, CodeBlock } from '../Primitives/Code';
import { Link } from '../Primitives/Link';
import { MarkdownImage, FieldImage } from '../Primitives/Image';
import { CustomAppearance } from '../Primitives/CustomAppearance';
import { YoutubeEmbed } from '../Primitives/YoutubeEmbed';

import renderMarkdown from '../markdownProcessor';

import {
  hasContent,
  exposeContentAsChildren,
  exposeContentString,
  exposeLinkProps,
  exposeCustomAppearanceProps,
  exposeImageProps,
  exposeYoutubeProps,
  exposeOpenGraphData,
} from './Field.helpers';

const TEXT_CONTENT = [
  'heading1',
  'heading2',
  'heading3',
  'heading4',
  'heading5',
  'heading6',
  'paragraph',
  'markdown',
  'metaTitle',
  'metaDescription',
];

////////////////////////
// Markdown component //
////////////////////////

// Most fields are primitives but markdown is a bit special case.
// It gets its own "components" mapping that it uses to render the markdown content
const MarkdownField = ({ content, components }) => renderMarkdown(content, components);

///////////////////////////////////////////
// Mapping of field types and components //
///////////////////////////////////////////

// For text content (headings, paragraph, markdown), we don't print warning about empty string
// as that's expected result after removing previously entered string.
const omitInvalidPropsWarning = data => !hasContent(data);

const defaultFieldComponents = {
  heading1: { component: H1, pickValidProps: exposeContentAsChildren, omitInvalidPropsWarning },
  heading2: { component: H2, pickValidProps: exposeContentAsChildren, omitInvalidPropsWarning },
  heading3: { component: H3, pickValidProps: exposeContentAsChildren, omitInvalidPropsWarning },
  heading4: { component: H4, pickValidProps: exposeContentAsChildren, omitInvalidPropsWarning },
  heading5: { component: H5, pickValidProps: exposeContentAsChildren, omitInvalidPropsWarning },
  heading6: { component: H6, pickValidProps: exposeContentAsChildren, omitInvalidPropsWarning },
  paragraph: {
    // By default, page asset schema uses 'paragraph' field type only in the context of
    // lead paragraph aka ingress
    component: Ingress,
    pickValidProps: exposeContentAsChildren,
    omitInvalidPropsWarning,
  },
  externalButtonLink: { component: Link, pickValidProps: exposeLinkProps },
  internalButtonLink: { component: Link, pickValidProps: exposeLinkProps },
  image: { component: FieldImage, pickValidProps: exposeImageProps },
  customAppearance: { component: CustomAppearance, pickValidProps: exposeCustomAppearanceProps },
  youtube: { component: YoutubeEmbed, pickValidProps: exposeYoutubeProps },

  // markdown content field is pretty complex component
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
        p: P,
        img: MarkdownImage,
        code: Code,
        pre: CodeBlock,
        a: Link,
      },
    },
  },

  // Page's metadata goes to <head> and it is not currently rendered as a separate component
  // Instead, valid data is passed to <Page>, which then renders it using react-helmet-async
  metaTitle: { component: null, pickValidProps: exposeContentString },
  metaDescription: { component: null, pickValidProps: exposeContentString },
  openGraphData: { component: null, pickValidProps: exposeOpenGraphData },
};

//////////////////
// Props picker //
//////////////////

const hasExactNumKeys = (obj, num) => Object.keys(obj).length === num;
const isEmptyObject = obj => hasExactNumKeys(obj, 0);
const hasOnlyProp = (obj, key) => hasExactNumKeys(obj, 1) && obj[key];
const hasEmptyTextContent = obj =>
  hasExactNumKeys(obj, 2) && TEXT_CONTENT.includes(obj?.fieldType) && obj?.content?.length === 0;

const getFieldConfig = (data, defaultFieldComponents, options) => {
  const customFieldComponents = options?.fieldComponents || {};
  const fieldMapping = { ...defaultFieldComponents, ...customFieldComponents };
  return fieldMapping[(data?.fieldType)];
};

// This is also useful for fields that are not used as components on their own
// E.g. if some field data is used as an attribute to HTML element.
export const validProps = (data, options) => {
  if (
    !data ||
    isEmptyObject(data) ||
    hasOnlyProp(data, 'fieldType') ||
    hasEmptyTextContent(data) ||
    ['none'].includes(data?.fieldType)
  ) {
    // If there's no data, the (optional) field in Console has been left untouched or it's removed.
    return null;
  }

  const config = getFieldConfig(data, defaultFieldComponents, options);
  const pickValidProps = config?.pickValidProps;
  if (data && pickValidProps) {
    const validProps = pickValidProps(data);
    const omitWarning = config?.omitInvalidPropsWarning && config?.omitInvalidPropsWarning(data);

    // If picker returns an empty object, data was invalid.
    // Field will render null, but we should warn the dev that data was not valid.
    if (Object.keys(validProps).length === 0 && !omitWarning) {
      console.warn(`Invalid props detected. Data: ${JSON.stringify(data)}`);
    }
    return validProps;
  }

  if (data && !config) {
    // If there's no config, the field type is unknown => the app can't know what to render
    console.warn(`Unknown field type (${data?.fieldType}) detected. Data: ${JSON.stringify(data)}`);
  } else if (data && !pickValidProps) {
    console.warn(`There's no validator (pickValidProps) for this field type (${data?.fieldType}).`);
  }
  return null;
};

// Check that the array of given field data is containing some content
// (fieldOptions parameter is needed if custom fields are used)
export const hasDataInFields = (fields, fieldOptions) => {
  const hasData = fields.reduce((hasFoundValues, fieldData) => {
    const validPropsFromData = validProps(fieldData, fieldOptions);
    const hasDataInCurrent = validPropsFromData && Object.keys(validPropsFromData).length > 0;
    return hasFoundValues || hasDataInCurrent;
  }, false);
  return hasData;
};

////////////////////
// Field selector //
////////////////////

const isEmpty = obj => Object.keys(obj).length === 0;

// Generic field component that picks a specific UI component based on 'fieldType'
const Field = props => {
  const { data, options: fieldOptions, ...propsFromParent } = props;

  // Check the data and pick valid props only
  const validPropsFromData = validProps(data, fieldOptions);
  const hasValidProps = validPropsFromData && !isEmpty(validPropsFromData);

  // Config contains component, pickValidProps, and potentially also options.
  // E.g. markdown has options.components to override default elements
  const config = getFieldConfig(data, defaultFieldComponents, fieldOptions);
  const { component: Component, options = {} } = config || {};

  // Render the correct field component
  if (Component && hasValidProps) {
    return <Component {...validPropsFromData} {...propsFromParent} {...options} />;
  }

  return null;
};

// Field's prop types:
const propTypeTextContent = shape({
  fieldType: oneOf(TEXT_CONTENT).isRequired,
  content: string.isRequired,
});

const propTypeLink = shape({
  fieldType: oneOf(['externalButtonLink', 'internalButtonLink']).isRequired,
  content: string,
  href: string.isRequired,
});

const propTypeImageAsset = shape({
  id: string.isRequired,
  type: oneOf(['imageAsset']).isRequired,
  attributes: shape({
    variants: objectOf(
      shape({
        width: number.isRequired,
        height: number.isRequired,
        url: string.isRequired,
      })
    ).isRequired,
  }).isRequired,
});

const propTypeImage = shape({
  fieldType: oneOf(['image']).isRequired,
  alt: string,
  image: propTypeImageAsset.isRequired,
});

const propTypeCustomAppearance = shape({
  fieldType: oneOf(['customAppearance']).isRequired,
  backgroundColor: string,
  textColor: string,
  backgroundImage: propTypeImageAsset,
});

const propTypeYoutube = shape({
  fieldType: oneOf(['youtube']).isRequired,
  aspectRatio: string,
  youtubeVideoId: string.isRequired,
});

const propTypeOption = shape({
  fieldComponents: shape({ component: node, pickValidProps: func }),
});

// Empty objects might be received through page data asset for optional fields.
// If you get a warning "Failed prop type: Invalid prop `data` supplied to `Field`."
// on localhost environment.
const propTypeEmptyObject = exact({});
const propTypeTextEmptyObject = exact({
  fieldType: oneOf(TEXT_CONTENT).isRequired,
});
const propTypeDefaultAppearance = shape({
  fieldType: oneOf(['defaultAppearance']).isRequired,
});
const propTypeNone = shape({
  fieldType: oneOf(['none']).isRequired,
});

Field.defaultProps = {
  options: null,
};

Field.propTypes = {
  data: oneOfType([
    propTypeTextContent,
    propTypeLink,
    propTypeImage,
    propTypeCustomAppearance,
    propTypeYoutube,
    propTypeEmptyObject,
    propTypeTextEmptyObject,
    propTypeDefaultAppearance,
    propTypeNone,
  ]),
  options: propTypeOption,
};

export default Field;
