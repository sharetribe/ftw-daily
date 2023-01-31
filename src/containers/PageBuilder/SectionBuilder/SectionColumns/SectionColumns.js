import React from 'react';
import { arrayOf, bool, func, node, number, object, shape, string } from 'prop-types';
import classNames from 'classnames';

import Field, { hasDataInFields } from '../../Field';
import BlockBuilder from '../../BlockBuilder';

import SectionContainer from '../SectionContainer';
import css from './SectionColumns.module.css';

// The number of columns (numColumns) affects styling and responsive images
const COLUMN_CONFIG = [
  { css: css.oneColumn, responsiveImageSizes: '(max-width: 767px) 100vw, 1200px' },
  { css: css.twoColumns, responsiveImageSizes: '(max-width: 767px) 100vw, 600px' },
  { css: css.threeColumns, responsiveImageSizes: '(max-width: 767px) 100vw, 400px' },
  { css: css.fourColumns, responsiveImageSizes: '(max-width: 767px) 100vw, 265px' },
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

// Section component that's able to show blocks in multiple different columns (defined by "numColumns" prop)
const SectionColumns = props => {
  const {
    sectionId,
    className,
    rootClassName,
    defaultClasses,
    numColumns,
    title,
    description,
    appearance,
    callToAction,
    blocks,
    isInsideContainer,
    options,
  } = props;

  // If external mapping has been included for fields
  // E.g. { h1: { component: MyAwesomeHeader } }
  const fieldComponents = options?.fieldComponents;
  const fieldOptions = { fieldComponents };

  const hasHeaderFields = hasDataInFields([title, description, callToAction], fieldOptions);
  const hasBlocks = blocks?.length > 0;

  return (
    <SectionContainer
      id={sectionId}
      className={className}
      rootClassName={rootClassName}
      appearance={appearance}
      options={fieldOptions}
    >
      {hasHeaderFields ? (
        <header className={defaultClasses.sectionDetails}>
          <Field data={title} className={defaultClasses.title} options={fieldOptions} />
          <Field data={description} className={defaultClasses.description} options={fieldOptions} />
          <Field data={callToAction} className={defaultClasses.ctaButton} options={fieldOptions} />
        </header>
      ) : null}
      {hasBlocks ? (
        <div
          className={classNames(defaultClasses.blockContainer, getColumnCSS(numColumns), {
            [css.noSidePaddings]: isInsideContainer,
          })}
        >
          <BlockBuilder
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

const propTypeOption = shape({
  fieldComponents: shape({ component: node, pickValidProps: func }),
});

SectionColumns.defaultProps = {
  className: null,
  rootClassName: null,
  defaultClasses: null,
  textClassName: null,
  numColumns: 1,
  title: null,
  description: null,
  appearance: null,
  callToAction: null,
  blocks: [],
  isInsideContainer: false,
  options: null,
};

SectionColumns.propTypes = {
  sectionId: string.isRequired,
  className: string,
  rootClassName: string,
  defaultClasses: shape({
    sectionDetails: string,
    title: string,
    description: string,
    ctaButton: string,
  }),
  numColumns: number,
  title: object,
  description: object,
  appearance: object,
  callToAction: object,
  blocks: arrayOf(object),
  isInsideContainer: bool,
  options: propTypeOption,
};

export default SectionColumns;
