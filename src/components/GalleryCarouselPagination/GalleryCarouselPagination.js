import React from 'react';
import T from 'prop-types';
import { Dot } from 'pure-react-carousel';
import SwipeableViews from 'react-swipeable-views';
import classNames from 'classnames';

import css from './GalleryCarouselPagination.css';

const GalleryCarouselPagination = ({ index, slideCount }) => {
  const children = [];

  for (let i = 0; i < slideCount; i += 1) {
    // Make pagination dot smaller if it is at extermities and there are more images to show after
    let moreState = false;

    // Case where index is small that 3
    if (i === 4 && index < 3 && slideCount > 5) {
      moreState = true;
      // Case where index is larger than the number of slide -4
    } else if (i === slideCount - 5 && index > slideCount - 4 && slideCount > 5) {
      moreState = true;
      // General case
    } else if (
      (i > 2 || i < slideCount - 3) &&
      index > 2 &&
      index < slideCount - 3 &&
      (index >= i + 2 || index <= i - 2)
    ) {
      moreState = true;
    }

    const iconStyle = classNames(
      css.dotIcon,
      i === index && css.dotIconActive,
      moreState && css.dotIconMoreState
    );

    children.push(
      <Dot key={i} slide={i} className={classNames(css.dotButton)}>
        <span className={iconStyle} />
      </Dot>
    );
  }

  const numberOfDots = slideCount > 5 ? 5 : slideCount;
  const sliderPadding = slideCount < 5 ? (5 - slideCount) / 2 : (numberOfDots - 1) / 2;

  const getFixedIndex = (index, slideCount) => {
    if (slideCount < 6) {
      return 0;
    } else if (index < 2) {
      return 2;
    } else if (index > slideCount - 3) {
      return slideCount - 3;
    }
    return index;
  };

  return (
    <div className={css.paginationWrapper}>
      <SwipeableViews
        index={getFixedIndex(index, slideCount)}
        style={{
          width: `90px`,
          padding: `0px ${sliderPadding * 18}px`,
          boxSizing: 'border-box',
        }}
        slideStyle={{ width: '18px', height: '18px' }}
        disabled
      >
        {children}
      </SwipeableViews>
    </div>
  );
};

GalleryCarouselPagination.propTypes = {
  index: T.number.isRequired,
  slideCount: T.number.isRequired,
};

export default GalleryCarouselPagination;
