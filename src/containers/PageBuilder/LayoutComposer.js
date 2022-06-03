import React from 'react';

const cache = {};
function parseAreas(areas) {
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
}

const LayoutComposer = React.forwardRef((props, ref) => {
  const { children, style, areas, display, as, ...otherProps } = props;
  const { components, gridTemplateAreas } = parseAreas(areas);
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
export default LayoutComposer;
