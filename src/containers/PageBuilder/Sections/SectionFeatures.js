import React from 'react';
import classNames from 'classnames';

import Field, { pickValidProps } from '../Fields/Field.js';
import BlockBuilder from '../Blocks/BlockBuilder.js';

import SectionTag from './SectionTag.js';
import css from './SectionFeatures.module.css';

// TODO This is only an example. There's no example for this yet
const SectionFeatures = props => {
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

  // TODO do we support this in Console?
  // Find background color if it is included
  const fixedBackgroundData = { ...background, type: 'hexColor' }; // TODO remove if type is included
  const colorProp = pickValidProps(fixedBackgroundData, fieldOptions);
  const backgroundColorMaybe = colorProp.color ? { backgroundColor: colorProp.color } : {};

  // TODO do we support this in Console?
  // Create Image field for background image
  // This will be passed to SectionTag as responsive "background" image
  const backgroundImageMaybe = backgroundImage
    ? {
        backgroundImage: (
          <Field
            className={defaultClasses.backgroundImage}
            data={{ ...backgroundImage, type: 'backgroundImage', bgColor: '#00AAFF' }}
            options={fieldOptions}
          />
        ),
      }
    : {};

  return (
    <SectionTag
      id={sectionId}
      className={className}
      style={backgroundColorMaybe}
      {...backgroundImageMaybe}
    >
      <header className={defaultClasses.sectionDetails}>
        <Field className={defaultClasses.title} data={title} options={fieldOptions} />
        <Field className={defaultClasses.ingress} data={ingress} options={fieldOptions} />
        <Field className={defaultClasses.ctaButton} data={callToAction} options={fieldOptions} />
      </header>
      {blocks ? (
        <div className={classNames(defaultClasses.baseColumn, css.featuresMain)}>
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

export default SectionFeatures;
