import React, { useEffect, useState } from 'react';
import { func, node, objectOf, shape, string } from 'prop-types';

// We are standing on the shoulders of giants.
// This component is adapted from the great work done
// in React Layout Areas and Atomic Layouts projects!
// - https://github.com/giuseppeg/react-layout-areas
// - https://github.com/kettanaito/atomic-layout

// Avoid parsing the same stuff over and over again.
const cache = {};

/**
 * Parses CSS Grid template areas string.
 * For example:
 * `
 *  topbar
 *  main
 *  footer
 * `
 *
 * @param {String} areas for CSS Grid
 * @returns object containing generated Area *components* and *gridTemplateAreas*. E.g. "'topbar' 'main' 'footer' "
 */
const parseAreas = areas => {
  if (cache.hasOwnProperty(areas)) {
    return cache[areas];
  }

  // Split areas string to rows from line breaks and remove empty lines.
  const splitToRows = areasString =>
    areasString
      .trim()
      .split('\n')
      .filter(Boolean);
  // Split rows to words (area names) from white-space and remove empty strings
  const splitToAreaNames = rowString => rowString.split(/\s+/).filter(Boolean);
  // kebab-case to camelCase
  const camelize = s => s.replace(/-(.)/g, l => l[1].toUpperCase());
  // Capitalize initial letter
  const capitalizeWord = s => `${s.charAt(0).toUpperCase()}${s.substr(1)}`;

  const result = splitToRows(areas)
    .map(row => splitToAreaNames(row))
    .reduce(
      (result, areaNames) => {
        areaNames.forEach(areaName => {
          const Component = React.forwardRef((props, ref) => {
            const { as, style, ...otherProps } = props;
            const Tag = as || 'div';
            return <Tag {...otherProps} style={{ ...style, gridArea: areaName }} ref={ref} />;
          });

          const displayName = camelize(capitalizeWord(areaName));
          Component.displayName = `LayoutArea.${displayName}`;
          result.components[displayName] = Component;
        });
        result.gridTemplateAreas += `'${areaNames.join(' ')}' `;
        return result;
      },
      { components: {}, gridTemplateAreas: '' }
    );

  cache[areas] = result;
  return result;
};

// Handle resize event:
// if event matches with the rule set to MediaQueryList, call callback with parsed areas
const resize = (config, callback) => e => {
  // If media query matches
  if (e.matches) {
    callback(parseAreas(config.areas));
  }
};

// Set the current areas according to responsiveAreas config and adds listeners for MediaQueryList changes
const handleResponsiveAreasOnBrowser = (responsiveAreas, setAreas) => {
  let resizeListeners = [];
  const entries = Object.entries(responsiveAreas);
  entries.forEach(([name, config]) => {
    const { mediaQuery, areas } = config;
    const mediaQueryList = window.matchMedia(mediaQuery);
    // Set areas if current viewport matches
    if (mediaQueryList.matches) {
      setAreas(parseAreas(areas));
    }
    // Create listener for future matches of MQL rule
    const resizeListener = resize(config, setAreas);
    // Save MQL and listener for future "removeEventListener" call
    resizeListeners.push({ mediaQueryList, resizeListener });
    // Add the created resizeListener to MQL
    mediaQueryList.addEventListener('change', resizeListener);
  });
  return resizeListeners;
};

// Parse default areas for state hook.
const parseDefaultAreasFromProps = props => {
  const { areas, responsiveAreas } = props;
  if (areas) {
    return parseAreas(areas);
  } else if (responsiveAreas) {
    const firstKey = Object.keys(responsiveAreas)[0];
    const firstAreasString = responsiveAreas?.[firstKey]?.areas;
    if (firstAreasString) {
      return parseAreas(firstAreasString);
    }
  }
  throw new Error(
    'LayoutComposer needs to have either "areas" or "responsiveAreas" included into props.'
  );
};

/**
 * LayoutComposer creates container and area wrappers using CSS Grid Template Areas.
 * Example:
 *
 * const layoutAreas = `
 *   topbar
 *   main
 *   footer
 * `;
 *
 * return (
 *   <LayoutComposer areas={layoutAreas} className={css.layout}>
 *     {props => {
 *       const { Topbar, Main, Footer } = props;
 *       return (
 *         <>
 *           <Topbar as="h1" className={css.topbar}>
 *             Hello world!
 *           </Topbar>
 *           <Main as="main" className={css.main}>
 *             Some custom content.
 *           </Main>
 *           <Footer>
 *             Contact us
 *           </Footer>
 *         </>
 *       );
 *     }}
 *   </LayoutComposer>
 * );
 *
 * Note: "areas" and "responsiveAreas" are alternative props.
 * For the "responsiveAreas", the content should look like this:
 *  {
 *    areasSmall: {
 *      mediaQuery: '(max-width: 767px)',
 *      areas: `
 *        topbar
 *        main
 *        extra
 *        footer
 *      `,
 *    },
 *    areasMedium: {
 *      mediaQuery: '(min-width: 768px) and (max-width: 1023px)',
 *      areas: `
 *      topbar topbar
 *      main extra
 *      footer footer
 *      `,
 *    },
 *    areasLarge: {
 *      mediaQuery: '(min-width: 1024px)',
 *      areas: `
 *      topbar topbar topbar
 *      main extra footer
 *      `,
 *    },
 * }
 *
 * @param {Props} props for LayoutComposer (at least: children, style, areas, display, as)
 * @return LayoutComposer that expects children to be a function.
 */
const LayoutComposer = React.forwardRef((props, ref) => {
  const [currentAreas, setAreas] = useState(parseDefaultAreasFromProps(props));

  useEffect(() => {
    let resizeListeners = [];
    if (responsiveAreas) {
      resizeListeners = handleResponsiveAreasOnBrowser(responsiveAreas, setAreas);
    }

    return () => {
      resizeListeners.forEach(listener => {
        const { mediaQueryList, resizeListener } = listener;
        mediaQueryList.removeEventListener('change', resizeListener);
      });
    };
  }, []);

  const { components, gridTemplateAreas } = currentAreas;
  const { children, style = {}, areas, responsiveAreas, display, as, ...otherProps } = props;
  const Tag = as || 'div';

  return (
    <Tag
      {...otherProps}
      style={{
        ...style,
        gridTemplateAreas,
        display: display === 'inline' ? 'grid-inline' : 'grid',
      }}
      ref={ref}
    >
      {children(components)}
    </Tag>
  );
});
LayoutComposer.displayName = 'LayoutComposer';

LayoutComposer.defaultProps = {
  areas: null,
  responsiveAreas: null,
  display: 'grid',
  as: null,
};

LayoutComposer.propTypes = {
  children: func.isRequired,
  areas: string,
  responsiveAreas: objectOf(
    shape({
      mediaQuery: string.isRequired,
      areas: string.isRequired,
    })
  ),
  display: string,
  as: node,
};

export default LayoutComposer;
