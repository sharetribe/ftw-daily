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
import { MarkdownImage, BackgroundImage, FieldImage } from '../Primitives/Image';

import renderMarkdown from '../markdownProcessor';

import {
  exposeContentAsChildren,
  exposeContentString,
  exposeLinkProps,
  exposeImageProps,
  exposeColorProps,
} from './Field.helpers';

////////////////////////
// Markdown component //
////////////////////////

// Most fields are primitives but markdown is a bit special case.
// It gets its own "components" mapping that it uses to render the markdown content
const MarkdownField = ({ content, components }) => renderMarkdown(content, components);

///////////////////////////////////////////
// Mapping of field types and components //
///////////////////////////////////////////

const defaultFieldComponents = {
  heading1: { component: H1, pickValidProps: exposeContentAsChildren },
  heading2: { component: H2, pickValidProps: exposeContentAsChildren },
  heading3: { component: H3, pickValidProps: exposeContentAsChildren },
  heading4: { component: H4, pickValidProps: exposeContentAsChildren },
  heading5: { component: H5, pickValidProps: exposeContentAsChildren },
  heading6: { component: H6, pickValidProps: exposeContentAsChildren },
  paragraph: { component: Ingress, pickValidProps: exposeContentAsChildren },
  externalButtonLink: { component: Link, pickValidProps: exposeLinkProps },
  internalButtonLink: { component: Link, pickValidProps: exposeLinkProps },
  image: { component: FieldImage, pickValidProps: exposeImageProps },
  backgroundImage: { component: BackgroundImage, pickValidProps: exposeImageProps },

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
  // hexColor doesn't render component: it's used as an inlined background-color for section component
  hexColor: { pickValidProps: exposeColorProps },
};

//////////////////
// Props picker //
//////////////////

const getFieldConfig = (data, defaultFieldComponents, options) => {
  const customFieldComponents = options?.fieldComponents || {};
  const fieldMapping = { ...defaultFieldComponents, ...customFieldComponents };
  return fieldMapping[(data?.type)];
};

// This is useful for fields that are not used as components (e.g. background-color)
export const validProps = (data, options) => {
  if (!data || Object.keys(data).length === 0) {
    // If there's no data, the (optional) field in Console has been left untouched.
    return null;
  }

  const config = getFieldConfig(data, defaultFieldComponents, options);
  const pickValidProps = config?.pickValidProps;
  if (data && pickValidProps) {
    const validProps = pickValidProps(data);

    // If picker returns an empty object, data was invalid.
    // Field will render null, but we should warn the dev that data was not valid.
    if (Object.keys(validProps).length === 0) {
      console.warn(`Invalid props detected. Data: ${JSON.stringify(data)}`);
    }
    return validProps;
  }

  if (data && !config) {
    // If there's no config, the field type is unknown => the app can't know what to render
    console.warn(`Unknown field type (${data?.type}) detected. Data: ${JSON.stringify(data)}`);
  } else if (data && !pickValidProps) {
    console.warn(`There's no validator (pickValidProps) for this field type (${data?.type}).`);
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

// Generic field component that picks a specific UI component based on 'type'
const Field = props => {
  const { data, options: fieldOptions, ...propsFromParent } = props;

  // Check the data and pick valid props only
  const validPropsFromData = validProps(data, fieldOptions);
  const hasValidProps = validPropsFromData && Object.keys(validPropsFromData).length > 0;

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
  type: oneOf([
    'heading1',
    'heading2',
    'heading3',
    'heading4',
    'heading5',
    'heading6',
    'ingress',
    'paragraph',
    'markdown',
  ]).isRequired,
  content: string.isRequired,
});
const propTypeColor = shape({
  type: oneOf(['hexColor']).isRequired,
  color: string.isRequired,
  href: string.isRequired,
});
const propTypeLink = shape({
  type: oneOf(['externalButtonLink', 'internalButtonLink']).isRequired,
  label: string.isRequired,
  href: string.isRequired,
});
const propTypeImageAsset = shape({
  type: oneOf(['image', 'backgroundImage']).isRequired,
  alt: string.isRequired,
  image: shape({
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
  }).isRequired,
});

const propTypeOption = shape({
  fieldComponents: shape({ component: node, pickValidProps: func }),
});

// Empty objects might be received through page data asset for optional fields.
// If you get a warning "Failed prop type: Invalid prop `data` supplied to `Field`."
// on localhost environment.
// This is the catch for those invalid data fields that don't have known "type".
const propTypeEmptyObject = exact({});

Field.defaultProps = {
  options: null,
};

Field.propTypes = {
  data: oneOfType([
    propTypeTextContent,
    propTypeColor,
    propTypeLink,
    propTypeImageAsset,
    propTypeEmptyObject,
  ]),
  options: propTypeOption,
};

export default Field;
