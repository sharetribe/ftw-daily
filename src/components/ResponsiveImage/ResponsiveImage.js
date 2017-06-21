/**
 * Usage without sizes:
 *   <ResponsiveImage
 *     alt="ListingX"
 *     image={imageDataFromSDK}
 *     nameSet={[{ name: 'landscape-crop', size: '1x'}, { name: 'landscape-crop2x', size: '2x'}]}
 *   />
 *   // produces:
 *   <img
 *     alt="ListingX"
 *     src="url/to/landscape-crop.jpg"
 *     srcSet="url/to/landscape-crop.jpg 1x, url/to/landscape-crop2x.jpg 2x" />
 *
 * Usage with sizes:
 *   <ResponsiveImage
 *     alt="ListingX"
 *     image={imageDataFromSDK}
 *     nameSet={[{ name: 'landscape-crop', size: '400w'}, { name: 'landscape-crop2x', size: '800w'}]}
 *     sizes="(max-width: 600px) 100vw, 50vw"
 *   />
 *   // produces:
 *   <img
 *     alt="ListingX"
 *     src="url/to/landscape-crop.jpg"
 *     srcSet="url/to/landscape-crop.jpg 400w, url/to/landscape-crop2x.jpg 800w"
 *     sizes="(max-width: 600px) 100vw, 50vw" />
 *
 *   // This means that below 600px image will take as many pixels there are available on current
 *   // viewport width (100vw) - and above that image will only take 50% of the page width.
 *   // Browser decides which image it will fetch based on current screen size.
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import * as propTypes from '../../util/propTypes';

import NoImageIcon from './NoImageIcon';
import css from './ResponsiveImage.css';

const ResponsiveImage = props => {
  const { className, rootClassName, alt, image, nameSet, sizes } = props;
  const classes = classNames(rootClassName || css.root, className);

  if (image == null || nameSet.length === 0) {
    const noImageClasses = classNames(rootClassName || css.root, css.noImageContainer, className);
    /* eslint-disable jsx-a11y/img-redundant-alt */
    return (
      <div className={noImageClasses}>
        <div className={css.noImageWrapper}>
          <NoImageIcon className={css.noImageIcon} />
          <div className={css.noImageText}><FormattedMessage id="ResponsiveImage.noImage" /></div>
        </div>
      </div>
    );
    /* eslint-enable jsx-a11y/img-redundant-alt */
  }

  const defaultURL = nameSet[0].url;
  const imageSizes = image.attributes.sizes;

  const srcSet = nameSet
    .map(v => {
      const url = imageSizes.find(i => i.name === v.name).url;
      return `${url} ${v.size}`;
    })
    .join(', ');

  const sizesProp = sizes ? { sizes } : {};

  return <img alt={alt} className={classes} src={defaultURL} srcSet={srcSet} {...sizesProp} />;
};

const { arrayOf, shape, string } = PropTypes;

ResponsiveImage.defaultProps = {
  className: null,
  rootClassName: null,
  image: null,
  nameSet: [],
  sizes: null,
};

ResponsiveImage.propTypes = {
  className: string,
  rootClassName: string,
  alt: string.isRequired,
  image: propTypes.image,
  nameSet: arrayOf(
    shape({
      name: string.isRequired,
      size: string.isRequired,
    })
  ),
  sizes: string,
};

export default ResponsiveImage;
