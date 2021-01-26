import React, { Component } from 'react';
import T from 'prop-types';
import _ from 'lodash';
import { CarouselProvider } from 'pure-react-carousel';
import { GalleryCarouselSlider } from '..';

import 'pure-react-carousel/dist/react-carousel.es.css';
import css from './GalleryCarouselWrapper.css';

const MODAL_BREAKPOINT = 768;

class GalleryCarouselWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showArrow: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { items, renderSizes, dragEnabled, pagination } = this.props;
    const {
      items: nextItems,
      renderSizes: nextRenderSizes,
      dragEnabled: nextDragEnabled,
      pagination: nextPagination,
    } = nextProps;
    return (
      !_.isEqual(items, nextItems) ||
      renderSizes !== nextRenderSizes ||
      dragEnabled !== nextDragEnabled ||
      pagination !== nextPagination ||
      this.state.showArrow !== nextState.showArrow
    );
  }

  setShowArrow = value =>
    this.setState({
      showArrow: value,
    });

  render() {
    const { showArrow } = this.state;
    const {
      items,
      renderSizes,
      dragEnabled = true,
      touchEnabled = true,
      pagination = true,
    } = this.props;

    const isWindowDefined = typeof window !== 'undefined';
    const isMobileLayout = isWindowDefined && window.innerWidth < MODAL_BREAKPOINT;

    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={50}
        totalSlides={items.length}
        dragEnabled={dragEnabled}
        touchEnabled={touchEnabled}
        className={css.galleryCarouselWrapper}
        onMouseEnter={() => this.setShowArrow(true)}
        onMouseLeave={() => this.setShowArrow(false)}
      >
        <GalleryCarouselSlider
          pagination={pagination}
          showArrow={!isMobileLayout && showArrow}
          items={items}
          renderSizes={renderSizes}
          {...this.props}
        />
      </CarouselProvider>
    );
  }
}

GalleryCarouselWrapper.propTypes = {
  items: T.array.isRequired,
  renderSizes: T.string.isRequired,
  dragEnabled: T.bool,
  pagination: T.bool,
};

export default GalleryCarouselWrapper;
