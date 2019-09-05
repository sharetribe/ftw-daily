import React from 'react';
import PropTypes from 'prop-types';
import {
  Slider,
  Slide,
  WithStore,
  ButtonBack,
  ButtonNext,
  ButtonLast,
  ButtonFirst,
} from 'pure-react-carousel';
import classNames from 'classnames';
import { ResponsiveImage, GalleryCarouselPagination, IconArrowHead } from '..';
import '../../../node_modules/pure-react-carousel/dist/react-carousel.es.css';

import css from './GalleryCarouselSlider.css';

const CarouselSlider = ({
  items,
  renderSizes,
  currentSlide,
  totalSlides,
  showArrow,
  pagination,
}) => {
  const carouselNextButton = classNames(css.carouselArrow, css.nextSlide);
  const carouselPrevButton = classNames(css.carouselArrow, css.prevSlide);

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
      {showArrow && (
        <>
          {currentSlide === 0 ? (
            <ButtonLast
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();
              }}
              className={carouselPrevButton}
            >
              <IconArrowHead direction="left" size="big" className={css.iconArrow} />
            </ButtonLast>
          ) : (
            <ButtonBack
              disabled={false}
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();
              }}
              className={carouselPrevButton}
            >
              <IconArrowHead direction="left" size="big" className={css.iconArrow} />
            </ButtonBack>
          )}
          {currentSlide === totalSlides - 1 ? (
            <ButtonFirst
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();
              }}
              className={carouselNextButton}
            >
              <IconArrowHead direction="right" size="big" className={css.iconArrow} />
            </ButtonFirst>
          ) : (
            <ButtonNext
              disabled={false}
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();
              }}
              className={carouselNextButton}
            >
              <IconArrowHead direction="right" size="big" className={css.iconArrow} />
            </ButtonNext>
          )}
        </>
      )}

      {pagination && <GalleryCarouselPagination index={currentSlide} slideCount={totalSlides} />}
    </>
  );
};

const { string, number, array, bool } = PropTypes;

CarouselSlider.propTypes = {
  items: array,
  renderSizes: string,
  currentSlide: number,
  totalSlides: number,
  showArrow: bool,
  pagination: bool,
};

export default WithStore(CarouselSlider, state => ({
  currentSlide: state.currentSlide,
  totalSlides: state.totalSlides,
}));
