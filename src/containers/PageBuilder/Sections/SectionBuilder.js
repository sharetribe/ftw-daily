import React from 'react';
import classNames from 'classnames';

import Field, { pickValidProps } from '../Fields/Field.js';
import BlockBuilder, { BlockTag, BlockDefault } from '../Blocks/BlockBuilder.js';
import css from './SectionBuilder.module.css';

/////////////////////
// Section wrapper //
/////////////////////

// This element can be used to wrap some common styles and features.
const SectionTag = props => {
  const {
    className,
    rootClassName,
    themeClass,
    theme,
    as,
    children,
    backgroundImage,
    ...otherProps
  } = props;
  const Tag = as || 'section';
  const isDarkTheme = theme === 'dark';
  const classes = classNames(rootClassName || css.sectionTag, className, {
    // If the default .dark class should be applied, pass property: "theme":
    [css.darkSectionTag]: isDarkTheme,
    // If section component has own dark-theme rules that should be applied:
    [themeClass]: !!themeClass,
  });

  return (
    <Tag className={classes} {...otherProps}>
      <div className={css.backgroundImageWrapper}>{backgroundImage}</div>
      <div className={css.sectionContent}>{children}</div>
    </Tag>
  );
};

/////////////////////
// Custom sections //
/////////////////////

// TODO This is only an example. There's no example for this yet
const SectionArticle = props => {
  const { sectionId, title, background, backgroundImage, blocks, theme, options } = props;

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
            data={{ ...backgroundImage, type: 'backgroundImage', bgColor: '#00AAFF' }}
            className={css.backgroundImage}
            options={fieldOptions}
          />
        ),
      }
    : {};

  return (
    <SectionTag id={sectionId} style={backgroundColorMaybe} {...backgroundImageMaybe} theme={theme}>
      <header className={css.sectionDetails}>
        <Field className={css.title} data={title} options={fieldOptions} />
      </header>
      {blocks ? (
        <div className={css.articleMain}>
          <BlockBuilder blocks={blocks} options={options} />
        </div>
      ) : null}
    </SectionTag>
  );
};

const SectionColumns = props => {
  const {
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
      <header className={css.sectionDetails}>
        <Field data={title} className={css.title} options={fieldOptions} />
        <Field data={ingress} className={css.ingress} options={fieldOptions} />
        <Field data={callToAction} className={css.ctaButton} options={fieldOptions} />
      </header>
      {blocks ? (
        <div className={columnsClasses}>
          <BlockBuilder blocks={blocks} ctaButtonClass={css.ctaButton} options={options} />
        </div>
      ) : null}
    </SectionTag>
  );
};

//////////////////////
// Section builder //
//////////////////////

const defaultSectionComponents = {
  columns: { component: SectionColumns },
  article: { component: SectionArticle },
};

const SectionBuilder = props => {
  const { sections, options } = props;
  const { sectionComponents = {}, ...otherOption } = options || {};

  // If there's no sections, we can't render the correct section component
  if (!sections || sections.length === 0) {
    return null;
  }

  // Selection of Section components
  const components = { ...defaultSectionComponents, ...sectionComponents };
  const getComponent = sectionType => {
    const config = components[sectionType];
    return config?.component;
  };

  return (
    <>
      {sections.map(section => {
        const Section = getComponent(section.sectionType);
        if (Section) {
          return <Section key={section.sectionId} options={otherOption} {...section} />;
        } else {
          // If the section type is unknown, the app can't know what to render
          console.warn(`Unknown section type (${section.sectionType}) detected.`);
          return null;
        }
      })}
    </>
  );
};

export { BlockTag, BlockDefault, SectionTag, SectionArticle, SectionColumns };

export default SectionBuilder;
