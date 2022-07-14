import React from 'react';
import { arrayOf, func, node, number, object, oneOf, shape, string } from 'prop-types';

import Field, { validProps } from '../../Field';
import BlockBuilder from '../../BlockBuilder';

import SectionContainer from '../SectionContainer';
import css from './SectionCarousel.module.css';

// The number of columns (numColumns) affects styling and responsive images
const COLUMN_CONFIG = [
  { css: css.oneColumn, responsiveImageSizes: '(max-width: 767px) 100vw, 1200px' },
  { css: css.twoColumns, responsiveImageSizes: '(max-width: 767px) 100vw, 600px' },
  { css: css.threeColumns, responsiveImageSizes: '(max-width: 767px) 100vw, 400px' },
  { css: css.fourColumns, responsiveImageSizes: '(max-width: 767px) 100vw, 290px' },
];
const getIndex = numColumns => numColumns - 1;
const getColumnCSS = numColumns => {
  const config = COLUMN_CONFIG[getIndex(numColumns)];
  return config ? config.css : COLUMN_CONFIG[0].css;
};
const getResponsiveImageSizes = numColumns => {
  const config = COLUMN_CONFIG[getIndex(numColumns)];
  return config ? config.responsiveImageSizes : COLUMN_CONFIG[0].responsiveImageSizes;
};

// Section component that's able to show blocks in a carousel
// the number blocks visible is defined by "numColumns" prop.
const SectionCarousel = props => {
  const {
    sectionId,
    className,
    rootClassName,
    defaultClasses,
    numColumns,
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
        <div className={getColumnCSS(numColumns)}>
          <BlockBuilder
            rootClassName={css.block}
            ctaButtonClass={defaultClasses.ctaButton}
            blocks={blocks}
            responsiveImageSizes={getResponsiveImageSizes(numColumns)}
            options={options}
          />
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

SectionCarousel.defaultProps = {
  className: null,
  rootClassName: null,
  defaultClasses: null,
  textClassName: null,
  numColumns: 1,
  title: null,
  ingress: null,
  background: null,
  backgroundImage: null,
  callToAction: null,
  blocks: [],
  options: null,
};

SectionCarousel.propTypes = {
  sectionId: string.isRequired,
  className: string,
  rootClassName: string,
  defaultClasses: shape({
    sectionDetails: string,
    title: string,
    ingress: string,
    ctaButton: string,
  }),
  numColumns: number,
  title: object,
  ingress: object,
  background: object,
  backgroundImage: object,
  callToAction: object,
  blocks: arrayOf(propTypeBlock),
  options: propTypeOption,
};

export default SectionCarousel;
