import React from 'react';
import classNames from 'classnames';

import { BlockTag, BlockDefault } from '../Blocks/BlockBuilder.js';

// Section components
import SectionColumns from './SectionColumns.js';
import SectionArticle from './SectionArticle.js';

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

  // These are shared classes.
  // Use these to have consistent styles between different section components
  // E.g. share the same title styles
  const defaultClasses = {
    backgroundImage: css.backgroundImage,
    sectionDetails: css.sectionDetails,
    title: css.title,
    ingress: css.ingress,
    ctaButton: css.ctaButton,
    singleColumn: css.singleColumn,
  };

  return (
    <>
      {sections.map(section => {
        const Section = getComponent(section.sectionType);
        if (Section) {
          return (
            <Section
              key={section.sectionId}
              tag={SectionTag}
              defaultClasses={defaultClasses}
              options={otherOption}
              {...section}
            />
          );
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
