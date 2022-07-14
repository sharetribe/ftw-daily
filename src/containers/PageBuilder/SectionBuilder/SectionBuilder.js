import React from 'react';
import { arrayOf, func, node, oneOf, shape, string } from 'prop-types';
import classNames from 'classnames';

// Section components
import SectionArticle from './SectionArticle';
import SectionCarousel from './SectionCarousel';
import SectionColumns from './SectionColumns';
import SectionFeatures from './SectionFeatures';

// Styles
// Note: these contain
// - shared classes that are passed as defaultClasses
// - dark theme overrides
// TODO: alternatively, we could consider more in-place way of theming components
import css from './SectionBuilder.module.css';

// These are shared classes.
// Use these to have consistent styles between different section components
// E.g. share the same title styles
const DEFAULT_CLASSES = {
  sectionDetails: css.sectionDetails,
  title: css.title,
  ingress: css.ingress,
  ctaButton: css.ctaButton,
};

/////////////////////////////////////////////
// Mapping of section types and components //
/////////////////////////////////////////////

const defaultSectionComponents = {
  article: { component: SectionArticle },
  carousel: { component: SectionCarousel },
  columns: { component: SectionColumns },
  features: { component: SectionFeatures },
};

//////////////////////
// Section builder //
//////////////////////

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
        // If the default "dark" theme should be applied
        const isDarkTheme = section.textColor === 'light';
        const classes = classNames({ [css.darkTheme]: isDarkTheme });

        if (Section) {
          return (
            <Section
              key={section.sectionId}
              className={classes}
              defaultClasses={DEFAULT_CLASSES}
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

const propTypeSection = shape({
  sectionId: string.isRequired,
  sectionType: oneOf(['article', 'carousel', 'columns', 'features']).isRequired,
  // Plus all kind of unknown fields.
  // BlockBuilder doesn't really need to care about those
});

const propTypeOption = shape({
  fieldComponents: shape({ component: node, pickValidProps: func }),
  blockComponents: shape({ component: node }),
  sectionComponents: shape({ component: node }),
});

SectionBuilder.defaultProps = {
  sections: [],
  options: null,
};

SectionBuilder.propTypes = {
  sections: arrayOf(propTypeSection),
  options: propTypeOption,
};

export default SectionBuilder;
