import React from 'react';
import { number, objectOf, oneOf, shape, string } from 'prop-types';
import classNames from 'classnames';

import { ResponsiveImage } from '../../../../components/index.js';

import css from './CustomBackground.module.css';

// BackgroundImage doesn't have enforcable aspectratio
export const CustomBackground = React.forwardRef((props, ref) => {
  const { className, rootClassName, alt, backgroundImage, sizes } = props;

  const getVariantNames = img => {
    const { variants } = img?.attributes || {};
    return variants ? Object.keys(variants) : [];
  };

  const classes = classNames(rootClassName || css.backgroundImageWrapper, className);
  return (
    <div className={classes}>
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

CustomBackground.displayName = 'CustomBackground';

CustomBackground.defaultProps = {
  rootClassName: null,
  className: null,
  alt: 'background image',
  sizes: null,
  backgroundImage: null,
};

CustomBackground.propTypes = {
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
