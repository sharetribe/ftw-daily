import React, { Component } from 'react';
import T from 'prop-types';
import _ from 'lodash';
import { Slider, Slide, WithStore } from 'pure-react-carousel';
import {
  ResponsiveImage,
  GalleryCarouselPagination,
  GalleryCarouselNavigationButtonPrev,
  GalleryCarouselNavigationButtonNext,
} from '..';
import '../../../node_modules/pure-react-carousel/dist/react-carousel.es.css';

import css from './GalleryCarouselSlider.css';

class CarouselSlider extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { items, renderSizes, currentSlide, totalSlides, showArrow, pagination } = this.props;
    const {
      items: nextItems,
      renderSizes: nextRenderSizes,
      currentSlide: nextCurrentSlide,
      totalSlides: nextTotalSlides,
      showArrow: nextShowArrow,
      pagination: nextPagination,
    } = nextProps;
    return (
      !_.isEqual(items, nextItems) ||
      renderSizes !== nextRenderSizes ||
      currentSlide !== nextCurrentSlide ||
      totalSlides !== nextTotalSlides ||
      showArrow !== nextShowArrow ||
      pagination !== nextPagination
    );
  }

  render() {
    const { items, renderSizes, currentSlide, totalSlides, showArrow, pagination, small } = this.props;
    return (
      <>
        <Slider className={css.sliderWrapper}>
          {items.map((item, index) => (
            <Slide index={index} key={index}>
              <ResponsiveImage
                image={item}
                alt="listing-image"
                variants={['landscape-crop', 'landscape-crop2x']}
                sizes={renderSizes}
              />
            </Slide>
          ))}
        </Slider>
        {showArrow && (
          <>
            <GalleryCarouselNavigationButtonPrev small={small} currentSlide={currentSlide} />
            <GalleryCarouselNavigationButtonNext
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              small={small} 
            />
          </>
        )}

        {pagination && <GalleryCarouselPagination index={currentSlide} slideCount={totalSlides} />}
      </>
    );
  }
}

CarouselSlider.propTypes = {
  items: T.array.isRequired,
  renderSizes: T.string.isRequired,
  currentSlide: T.number.isRequired,
  totalSlides: T.number.isRequired,
  showArrow: T.bool.isRequired,
  pagination: T.bool.isRequired,
};

export default WithStore(CarouselSlider, state => ({
  currentSlide: state.currentSlide,
  totalSlides: state.totalSlides,
}));
