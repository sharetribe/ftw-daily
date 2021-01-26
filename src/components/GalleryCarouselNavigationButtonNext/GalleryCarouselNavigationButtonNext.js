import React from 'react';
import T from 'prop-types';
import { ButtonNext, ButtonFirst } from 'pure-react-carousel';
import { IconArrowHead } from '..';
import classNames from 'classnames';
import '../../../node_modules/pure-react-carousel/dist/react-carousel.es.css';

import css from './GalleryCarouselNavigationButtonNext.css';

const GalleryCarouselNavigationButtonNext = ({ currentSlide, totalSlides, small }) => {
  if (currentSlide === totalSlides - 1)
    return (
      <ButtonFirst
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
        }}
        className={css.buttonNext}
      >
        <img className={classNames(css.arrow, small && css.small)} src='/static/icons/arrow_right_white.png' />
      </ButtonFirst>
    );

  return (
    <ButtonNext
      disabled={false}
      onClick={event => {
        event.preventDefault();
        event.stopPropagation();
      }}
      className={css.buttonNext}
    >
      <img className={classNames(css.arrow, small && css.small)} src='/static/icons/arrow_right_white.png' />
    </ButtonNext>
  );
};

GalleryCarouselNavigationButtonNext.propTypes = {
  currentSlide: T.number.isRequired,
  totalSlides: T.number.isRequired,
};

export default GalleryCarouselNavigationButtonNext;
