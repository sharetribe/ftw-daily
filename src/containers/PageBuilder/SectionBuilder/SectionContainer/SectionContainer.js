import React from 'react';
import { func, node, object, shape, string } from 'prop-types';
import classNames from 'classnames';

import Field, { validProps } from '../../Field';

import css from './SectionContainer.module.css';

// This component can be used to wrap some common styles and features of Section-level components.
// E.g: const SectionHero = props => (<SectionContainer><H1>Hello World!</H1></SectionContainer>);
const SectionContainer = props => {
  const { className, rootClassName, id, as, children, background, options, ...otherProps } = props;
  const Tag = as || 'section';
  const classes = classNames(rootClassName || css.root, className);

  // Find background color if it is included
  const colorProp = validProps(background, options);
  const backgroundColorMaybe = colorProp?.color ? { backgroundColor: colorProp.color } : {};

  return (
    <Tag className={classes} id={id} style={backgroundColorMaybe} {...otherProps}>
      <Field
        data={{ ...background, alt: `Background image for ${id}` }}
        className={className}
        options={options}
      />

      <div className={css.sectionContent}>{children}</div>
    </Tag>
  );
};

const propTypeOption = shape({
  fieldComponents: shape({ component: node, pickValidProps: func }),
});

SectionContainer.defaultProps = {
  rootClassName: null,
  className: null,
  as: 'div',
  children: null,
  background: null,
};

SectionContainer.propTypes = {
  rootClassName: string,
  className: string,
  as: string,
  children: node,
  background: object,
  options: propTypeOption,
};

export default SectionContainer;
