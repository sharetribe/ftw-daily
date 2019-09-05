import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CarouselProvider } from 'pure-react-carousel';
import classNames from 'classnames';
import { GalleryCarouselSlider } from '..';

import 'pure-react-carousel/dist/react-carousel.es.css';
import css from './GalleryCarouselWrapper.css';

class GalleryCarouselWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showArrow: false,
    };
  }

  setShowArrow = value => {
    this.setState({
      showArrow: value,
    });
  };

  render() {
    const { showArrow } = this.state;
    const { items, renderSizes, dragEnabled = true, pagination = true } = this.props;

    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={50}
        totalSlides={items.length}
        dragEnabled={dragEnabled}
        className={classNames(css.galleryCarouselWrapper)}
        onMouseEnter={() => this.setShowArrow(true)}
        onMouseLeave={() => this.setShowArrow(false)}
      >
        <GalleryCarouselSlider
          pagination={pagination}
          showArrow={showArrow}
          items={items}
          renderSizes={renderSizes}
        />
      </CarouselProvider>
    );
  }
}

const { string, array, bool } = PropTypes;

GalleryCarouselWrapper.propTypes = {
  items: array,
  renderSizes: string,
  dragEnabled: bool,
  pagination: bool,
};

export default GalleryCarouselWrapper;
