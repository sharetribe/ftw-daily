import React from 'react';
import T from 'prop-types';
import { ButtonBack, ButtonLast } from 'pure-react-carousel';
import { IconArrowHead } from '..';
import classNames from 'classnames';
import '../../../node_modules/pure-react-carousel/dist/react-carousel.es.css';

import css from './GalleryCarouselNavigationButtonPrev.css';

const GalleryCarouselNavigationButtonPrev = ({ currentSlide, small }) => {
  if (currentSlide === 0)
    return (
      <ButtonLast
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
        }}
        className={css.buttonPrev}
      >
        <img className={classNames(css.arrow,small && css.small)} src='/static/icons/arrow_left_white.png' />
      </ButtonLast>
    );

  return (
    <ButtonBack
      disabled={false}
      onClick={event => {
        event.preventDefault();
        event.stopPropagation();
      }}
      className={css.buttonPrev}
    >
      <img className={classNames(css.arrow, small && css.small)} src='/static/icons/arrow_left_white.png' />
    </ButtonBack>
  );
};

GalleryCarouselNavigationButtonPrev.propTypes = {
  currentSlide: T.number.isRequired,
};

export default GalleryCarouselNavigationButtonPrev;
