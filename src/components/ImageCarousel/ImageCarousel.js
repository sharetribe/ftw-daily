import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import { ResponsiveImage, IconSpinner } from '../../components';
import { propTypes } from '../../util/types';

import css from './ImageCarousel.module.css';

const KEY_CODE_LEFT_ARROW = 37;
const KEY_CODE_RIGHT_ARROW = 39;

class ImageCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedImageIndex: 0, selectedImageLoaded: false };
    this.onKeyUp = this.onKeyUp.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }
  componentDidMount() {
    window.addEventListener('keyup', this.onKeyUp);
  }
  componentWillUnmount() {
    window.removeEventListener('keyup', this.onKeyUp);
  }
  onKeyUp(e) {
    if (e.keyCode === KEY_CODE_LEFT_ARROW) {
      this.prev();
    } else if (e.keyCode === KEY_CODE_RIGHT_ARROW) {
      this.next();
    }
  }
  prev() {
    const count = this.props.images.length;
    if (count < 2) {
      return;
    }
    this.setState(prevState => {
      const newIndex = count > 0 ? (count + prevState.selectedImageIndex - 1) % count : 0;
      return { selectedImageIndex: newIndex, selectedImageLoaded: false };
    });
  }
  next() {
    const count = this.props.images.length;
    if (count < 2) {
      return;
    }
    this.setState(prevState => {
      const newIndex = count > 0 ? (count + prevState.selectedImageIndex + 1) % count : 0;
      return { selectedImageIndex: newIndex, selectedImageLoaded: false };
    });
  }
  render() {
    const { rootClassName, className, images, intl } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    const naturalIndex = this.state.selectedImageIndex + 1;
    const imageIndex =
      images.length > 0 ? (
        <span className={css.imageIndex}>
          {naturalIndex}/{images.length}
        </span>
      ) : null;
    const prevButton =
      images.length > 1 ? <button className={css.prev} onClick={this.prev} /> : null;
    const nextButton =
      images.length > 1 ? <button className={css.next} onClick={this.next} /> : null;

    const imageAltText = intl.formatMessage(
      {
        id: 'ImageCarousel.imageAltText',
      },
      {
        index: naturalIndex,
        count: images.length,
      }
    );

    const markImageLoaded = index => () => {
      this.setState(prevState => {
        if (prevState.selectedImageIndex === index) {
          // Only mark the image loaded if the current index hasn't
          // changed, i.e. user hasn't already changed to another
          // image index.
          return { selectedImageLoaded: true };
        }
        return {};
      });
    };

    const currentImageIsLoaded = images.length === 0 || this.state.selectedImageLoaded;
    const loadingIconClasses = classNames(css.loading, {
      [css.loadingVisible]: !currentImageIsLoaded,
    });
    const imageClasses = classNames(css.image, {
      [css.imageLoading]: !currentImageIsLoaded,
    });

    return (
      <div className={classes}>
        <div className={css.imageWrapper}>
          <IconSpinner className={loadingIconClasses} />
          <ResponsiveImage
            className={imageClasses}
            alt={imageAltText}
            image={images[this.state.selectedImageIndex]}
            onLoad={markImageLoaded(this.state.selectedImageIndex)}
            onError={markImageLoaded(this.state.selectedImageIndex)}
            variants={['scaled-small', 'scaled-medium', 'scaled-large', 'scaled-xlarge']}
            sizes="(max-width: 767px) 100vw, 80vw"
          />
        </div>
        {imageIndex}
        {prevButton}
        {nextButton}
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

  // from injectIntl
  intl: intlShape.isRequired,
};

export default injectIntl(ImageCarousel);
