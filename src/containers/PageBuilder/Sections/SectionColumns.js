import React from 'react';
import classNames from 'classnames';

import Field, { pickValidProps } from '../Fields/Field.js';
import BlockBuilder from '../Blocks/BlockBuilder.js';
import css from './SectionBuilder.module.css';

const SectionColumns = props => {
  const {
    tag: SectionTag,
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
      ? css.columns4
      : numColumns === 3
      ? css.columns3
      : numColumns === 2
      ? css.columns2
      : css.columns1;

  return (
    <SectionTag id={sectionId} style={backgroundColorMaybe} {...backgroundImageMaybe} theme={theme}>
      <header className={defaultClasses.sectionDetails}>
        <Field data={title} className={defaultClasses.title} options={fieldOptions} />
        <Field data={ingress} className={defaultClasses.ingress} options={fieldOptions} />
        <Field data={callToAction} className={defaultClasses.ctaButton} options={fieldOptions} />
      </header>
      {blocks ? (
        <div className={classNames(defaultClasses.singleColumn, columnsClasses)}>
          <BlockBuilder
            blocks={blocks}
            ctaButtonClass={defaultClasses.ctaButton}
            options={options}
          />
        </div>
      ) : null}
    </SectionTag>
  );
};

export default SectionColumns;
