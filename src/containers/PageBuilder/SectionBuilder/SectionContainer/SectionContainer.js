import React from 'react';
import { func, node, object, shape, string } from 'prop-types';
import classNames from 'classnames';

import Field from '../../Field';

import css from './SectionContainer.module.css';

// Create Image field for background image
// This will be passed to SectionContainer as responsive "background" image
const BackgroundImageField = props => {
  const { className, backgroundImage, options } = props;
  return backgroundImage ? (
    <div className={css.backgroundImageWrapper}>
      <Field
        data={{ ...backgroundImage, type: 'backgroundImage' }}
        className={className}
        options={options}
      />
    </div>
  ) : null;
};

// This component can be used to wrap some common styles and features of Section-level components.
// E.g: const SectionHero = props => (<SectionContainer><H1>Hello World!</H1></SectionContainer>);
const SectionContainer = props => {
  const { className, rootClassName, as, children, backgroundImage, options, ...otherProps } = props;
  const Tag = as || 'section';
  const classes = classNames(rootClassName || css.root, className);

  return (
    <Tag className={classes} {...otherProps}>
      <BackgroundImageField
        backgroundImage={backgroundImage}
        className={css.backgroundImage}
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
  backgroundImage: null,
};

SectionContainer.propTypes = {
  rootClassName: string,
  className: string,
  as: string,
  children: node,
  backgroundImage: object,
  options: propTypeOption,
};

export default SectionContainer;
