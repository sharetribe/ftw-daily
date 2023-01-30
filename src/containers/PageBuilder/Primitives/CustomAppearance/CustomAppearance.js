import React from 'react';
import { number, objectOf, oneOf, shape, string } from 'prop-types';
import classNames from 'classnames';

import { ResponsiveImage } from '../../../../components/index.js';

import css from './CustomAppearance.module.css';

// BackgroundImage doesn't have enforcable aspectratio
export const CustomAppearance = React.forwardRef((props, ref) => {
  const { className, rootClassName, color, alt, backgroundImage, sizes } = props;

  const getVariantNames = img => {
    const { variants } = img?.attributes || {};
    return variants ? Object.keys(variants) : [];
  };

  const backgroundColorMaybe = color ? { backgroundColor: color } : {};

  const classes = classNames(rootClassName || css.backgroundImageWrapper, className);
  return (
    <div className={classes} style={backgroundColorMaybe}>
      {backgroundImage ? (
        <ResponsiveImage
          className={css.backgroundImage}
          ref={ref}
          alt={alt}
          image={backgroundImage}
          variants={getVariantNames(backgroundImage)}
          sizes={sizes}
        />
      ) : null}
    </div>
  );
});

CustomAppearance.displayName = 'CustomAppearance';

CustomAppearance.defaultProps = {
  rootClassName: null,
  className: null,
  alt: 'background image',
  sizes: null,
  backgroundImage: null,
};

CustomAppearance.propTypes = {
  rootClassName: string,
  className: string,
  alt: string,
  backgroundImage: shape({
    id: string.isRequired,
    type: oneOf(['imageAsset']).isRequired,
    attributes: shape({
      variants: objectOf(
        shape({
          width: number.isRequired,
          height: number.isRequired,
          url: string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  }),
  sizes: string,
};
