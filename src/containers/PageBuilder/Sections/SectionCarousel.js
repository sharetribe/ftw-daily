import React from 'react';
import classNames from 'classnames';

import Field, { pickValidProps } from '../Fields/Field.js';
import BlockBuilder from '../Blocks/BlockBuilder.js';

import SectionTag from './SectionTag.js';
import css from './SectionCarousel.module.css';

const SectionCarousel = props => {
  const {
    className,
    defaultClasses,
    sectionId,
    numColumns,
    title,
    ingress,
    background,
    backgroundImage,
    callToAction,
    theme = 'light',
    blocks,
    options,
  } = props;

  // If external mapping has been included for fields
  // E.g. { h1: { component: MyAwesomeHeader } }
  const fieldComponents = options?.fieldComponents;
  const fieldOptions = { fieldComponents };

  // Find background color if it is included
  const fixedBackgroundData = { ...background, type: 'hexColor' }; // TODO remove if type is included
  const colorProp = pickValidProps(fixedBackgroundData, fieldOptions);
  const backgroundColorMaybe = colorProp.color ? { backgroundColor: colorProp.color } : {};

  // Create Image field for background image
  // This will be passed to SectionTag as responsive "background" image
  const backgroundImageMaybe = backgroundImage
    ? {
        backgroundImage: (
          <Field
            data={{ ...backgroundImage, type: 'backgroundImage', bgColor: '#aae3ff' }}
            className={css.backgroundImage}
            options={fieldOptions}
          />
        ),
      }
    : {};

  // Select class for column container
  const columnsClasses =
    numColumns === 4
      ? css.fourColumns
      : numColumns === 3
      ? css.threeColumns
      : numColumns === 2
      ? css.twoColumns
      : css.oneColumn;

  return (
    <SectionTag
      id={sectionId}
      className={className}
      style={backgroundColorMaybe}
      {...backgroundImageMaybe}
    >
      <header className={defaultClasses.sectionDetails}>
        <Field data={title} className={defaultClasses.title} options={fieldOptions} />
        <Field data={ingress} className={defaultClasses.ingress} options={fieldOptions} />
        <Field data={callToAction} className={defaultClasses.ctaButton} options={fieldOptions} />
      </header>
      {blocks ? (
        <div className={classNames(defaultClasses.baseColumn, columnsClasses)}>
          <BlockBuilder
            blockClassName={css.block}
            ctaButtonClass={defaultClasses.ctaButton}
            blocks={blocks}
            options={options}
            // mediaClassName={css.media}
            // textClassName={css.text}
          />
        </div>
      ) : null}
    </SectionTag>
  );
};

export default SectionCarousel;
