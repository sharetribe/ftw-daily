import React from 'react';
import { arrayOf, func, node, object, oneOf, shape, string } from 'prop-types';

import Field, { validProps } from '../../Field';
import BlockBuilder from '../../BlockBuilder';

import SectionContainer from '../SectionContainer';
import css from './SectionArticle.module.css';

// Section component that's able to show article content
// The article content is mainly supposed to be inside a block
const SectionArticle = props => {
  const {
    sectionId,
    className,
    rootClassName,
    defaultClasses,
    title,
    ingress,
    background,
    backgroundImage,
    callToAction,
    blocks,
    options,
  } = props;

  // If external mapping has been included for fields
  // E.g. { h1: { component: MyAwesomeHeader } }
  const fieldComponents = options?.fieldComponents;
  const fieldOptions = { fieldComponents };

  // Find background color if it is included
  const colorProp = validProps(background, fieldOptions);
  const backgroundColorMaybe = colorProp?.color ? { backgroundColor: colorProp.color } : {};

  const hasBlocks = blocks?.length > 0;

  return (
    <SectionContainer
      id={sectionId}
      className={className}
      rootClassName={rootClassName}
      style={backgroundColorMaybe}
      backgroundImage={backgroundImage}
      options={fieldOptions}
    >
      <header className={defaultClasses.sectionDetails}>
        <Field data={title} className={defaultClasses.title} options={fieldOptions} />
        <Field data={ingress} className={defaultClasses.ingress} options={fieldOptions} />
        <Field data={callToAction} className={defaultClasses.ctaButton} options={fieldOptions} />
      </header>
      {hasBlocks ? (
        <div className={css.articleMain}>
          <BlockBuilder blocks={blocks} options={options} />
        </div>
      ) : null}
    </SectionContainer>
  );
};

const propTypeBlock = shape({
  blockId: string.isRequired,
  blockType: oneOf(['default-block']).isRequired,
  // Plus all kind of unknown fields.
  // Section doesn't really need to care about those
});

const propTypeOption = shape({
  fieldComponents: shape({ component: node, pickValidProps: func }),
});

SectionArticle.defaultProps = {
  className: null,
  rootClassName: null,
  defaultClasses: null,
  textClassName: null,
  title: null,
  ingress: null,
  background: null,
  backgroundImage: null,
  callToAction: null,
  blocks: [],
  options: null,
};

SectionArticle.propTypes = {
  sectionId: string.isRequired,
  className: string,
  rootClassName: string,
  defaultClasses: shape({
    sectionDetails: string,
    title: string,
    ingress: string,
    ctaButton: string,
  }),
  title: object,
  ingress: object,
  background: object,
  backgroundImage: object,
  callToAction: object,
  blocks: arrayOf(propTypeBlock),
  options: propTypeOption,
};

export default SectionArticle;
