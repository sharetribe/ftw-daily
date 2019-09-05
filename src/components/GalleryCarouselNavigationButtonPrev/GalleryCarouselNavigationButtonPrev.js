import React from 'react';
import T from 'prop-types';
import { ButtonBack, ButtonLast } from 'pure-react-carousel';
import { IconArrowHead } from '..';
import '../../../node_modules/pure-react-carousel/dist/react-carousel.es.css';

import css from './GalleryCarouselNavigationButtonPrev.css';

const GalleryCarouselNavigationButtonPrev = ({ currentSlide }) => {
  if (currentSlide === 0)
    return (
      <ButtonLast
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
        }}
        className={css.buttonPrev}
      >
        <IconArrowHead direction="left" size="big" className={css.iconArrow} />
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
      <IconArrowHead direction="left" size="big" className={css.iconArrow} />
    </ButtonBack>
  );
};

GalleryCarouselNavigationButtonPrev.propTypes = {
  currentSlide: T.number.isRequired,
};

export default GalleryCarouselNavigationButtonPrev;
