import React, { Component, PropTypes } from 'react'; // eslint-disable-line react/no-deprecated
import { injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import { ResponsiveImage } from '../../components';
import * as propTypes from '../../util/propTypes';

import css from './ImageCarousel.css';

const KEY_CODE_LEFT_ARROW = 37;
const KEY_CODE_RIGHT_ARROW = 39;

const imageScaledSmall = 'scaled-small'; // width 320
const imageScaledMedium = 'scaled-medium'; // width 750
const imageScaledLarge = 'scaled-large'; // width 1024
const imageScaledXLarge = 'scaled-xlarge'; // width 2400

class ImageCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedImageIndex: 0 };
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
    this.setState(prevState => {
      const newIndex = count > 0 ? (count + prevState.selectedImageIndex - 1) % count : 0;
      return { selectedImageIndex: newIndex };
    });
  }
  next() {
    const count = this.props.images.length;
    this.setState(prevState => {
      const newIndex = count > 0 ? (count + prevState.selectedImageIndex + 1) % count : 0;
      return { selectedImageIndex: newIndex };
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

    return (
      <div className={classes}>
        <div className={css.imageWrapper}>
          <ResponsiveImage
            className={css.image}
            alt={imageAltText}
            image={images[this.state.selectedImageIndex]}
            nameSet={[
              { name: imageScaledSmall, size: '320w' },
              { name: imageScaledMedium, size: '750w' },
              { name: imageScaledLarge, size: '1024w' },
              { name: imageScaledXLarge, size: '2400w' },
            ]}
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
