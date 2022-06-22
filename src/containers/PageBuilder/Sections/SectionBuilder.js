import React from 'react';

import classNames from 'classnames';

import { BlockTag, BlockDefault } from '../Blocks/BlockBuilder.js';

// Default wrapping element for section components
import SectionTag from './SectionTag.js';

// Styles
// Note: these contain shared dark theme rules too
import css from './SectionBuilder.module.css';

// Section components
import SectionColumns from './SectionColumns.js';
import SectionArticle from './SectionArticle.js';
import SectionFeatures from './SectionFeatures.js';
import SectionCarousel from './SectionCarousel.js';

//////////////////////
// Section builder //
//////////////////////

const defaultSectionComponents = {
  columns: { component: SectionColumns },
  article: { component: SectionArticle },
  features: { component: SectionFeatures },
  carousel: { component: SectionCarousel },
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
  };

  return (
    <>
      {sections.map(section => {
        const Section = getComponent(section.sectionType);
        // If the default "dark" theme should be applied
        const isDarkTheme = section.theme === 'dark';
        //const classNameMaybe = isDarkTheme ? { className: css.darkTheme } : {};
        const classes = classNames({ [css.darkTheme]: isDarkTheme });

        if (Section) {
          return (
            <Section
              key={section.sectionId}
              className={classes}
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

export {
  BlockTag,
  BlockDefault,
  SectionTag,
  SectionArticle,
  SectionColumns,
  SectionFeatures,
  SectionCarousel,
};

export default SectionBuilder;
