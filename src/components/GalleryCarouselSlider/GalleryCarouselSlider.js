import React from 'react';
import PropTypes from 'prop-types';
import { Slider, Slide, WithStore } from 'pure-react-carousel';
import classNames from 'classnames';
import { ResponsiveImage, GalleryCarouselPagination } from '..';
import '../../../node_modules/pure-react-carousel/dist/react-carousel.es.css';

import css from './GalleryCarouselSlider.css';

const CarouselSlider = ({ items, renderSizes, currentSlide, totalSlides }) => {
  return (
    <>
      <Slider className={classNames(css.sliderWrapper)}>
        {items.map((item, index) => (
          <Slide index={index} key={index}>
            <ResponsiveImage
              image={item}
              variants={['landscape-crop', 'landscape-crop2x']}
              sizes={renderSizes}
            />
          </Slide>
        ))}
      </Slider>
      <GalleryCarouselPagination index={currentSlide} slideCount={totalSlides} />
    </>
  );
};

const { string, number, array } = PropTypes;

CarouselSlider.propTypes = {
  items: array,
  renderSizes: string,
  currentSlide: number,
  totalSlides: number,
};

export default WithStore(CarouselSlider, state => ({
  currentSlide: state.currentSlide,
  totalSlides: state.totalSlides,
}));
