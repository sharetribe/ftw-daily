import React from 'react';
import { number, objectOf, oneOf, shape, string } from 'prop-types';
import classNames from 'classnames';

import { ResponsiveImage } from '../../../../components/index.js';

import css from './CustomAppearance.module.css';

// BackgroundImage doesn't have enforcable aspectratio
export const CustomAppearance = React.forwardRef((props, ref) => {
  const { className, rootClassName, backgroundColor, backgroundImage, alt, sizes } = props;

  const getVariantNames = img => {
    const { variants } = img?.attributes || {};
    return variants ? Object.keys(variants) : [];
  };

  const backgroundColorMaybe = backgroundColor ? { backgroundColor } : {};

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
  backgroundColor: null,
  backgroundImage: null,
};

CustomAppearance.propTypes = {
  rootClassName: string,
  className: string,
  backgroundColor: string,
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
  alt: string,
  sizes: string,
};
