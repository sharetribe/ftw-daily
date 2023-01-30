import React from 'react';
import { func, node, object, shape, string } from 'prop-types';
import classNames from 'classnames';

import Field from '../../Field';

import css from './SectionContainer.module.css';

// This component can be used to wrap some common styles and features of Section-level components.
// E.g: const SectionHero = props => (<SectionContainer><H1>Hello World!</H1></SectionContainer>);
const SectionContainer = props => {
  const { className, rootClassName, id, as, children, appearance, options, ...otherProps } = props;
  const Tag = as || 'section';
  const classes = classNames(rootClassName || css.root, className);

  return (
    <Tag className={classes} id={id} {...otherProps}>
      {appearance?.fieldType === 'customAppearance' ? (
        <Field
          data={{ alt: `Background image for ${id}`, ...appearance }}
          className={className}
          options={options}
        />
      ) : null}

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
  appearance: null,
};

SectionContainer.propTypes = {
  rootClassName: string,
  className: string,
  as: string,
  children: node,
  appearance: object,
  options: propTypeOption,
};

export default SectionContainer;
