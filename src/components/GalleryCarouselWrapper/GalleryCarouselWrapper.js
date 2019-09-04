import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CarouselProvider, ButtonBack, ButtonNext } from 'pure-react-carousel';
import classNames from 'classnames';
import { GalleryCarouselSlider, IconArrowHead } from '..';

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
    const { items, renderSizes } = this.props;

    const carouselNextButton = classNames(css.carouselArrow, css.nextSlide);
    const carouselPrevButton = classNames(css.carouselArrow, css.prevSlide);

    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={50}
        totalSlides={items.length}
        dragEnabled={false}
        className={classNames(css.galleryCarouselWrapper)}
        onMouseEnter={() => this.setShowArrow(true)}
        onMouseLeave={() => this.setShowArrow(false)}
      >
        <GalleryCarouselSlider items={items} renderSizes={renderSizes} />
        {showArrow && (
          <>
            <ButtonBack onClick={event => event.preventDefault()} className={carouselPrevButton}>
              <IconArrowHead direction="left" size="big" className={css.iconArrow} />
            </ButtonBack>
            <ButtonNext onClick={event => event.preventDefault()} className={carouselNextButton}>
              <IconArrowHead direction="right" size="big" className={css.iconArrow} />
            </ButtonNext>
          </>
        )}
      </CarouselProvider>
    );
  }
}

const { string, array } = PropTypes;

GalleryCarouselWrapper.propTypes = {
  items: array,
  renderSizes: string,
};

export default GalleryCarouselWrapper;
