import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';

import css from './ImageCarousel.css';

class ImageCarousel extends Component {
  render() {
    const { rootClassName, className, images } = this.props;
    console.log('ImageCarousel images:', images);
    const classes = classNames(rootClassName || css.root, className);
    return (
      <div className={classes}>
        <p>TODO: carousel with {images.length} images</p>
      </div>
    );
  }
}

ImageCarousel.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string, arrayOf } = PropTypes;

ImageCarousel.propTypes = {
  rootClassName: string,
  className: string,
  images: arrayOf(propTypes.image).isRequired,
};

export default ImageCarousel;
