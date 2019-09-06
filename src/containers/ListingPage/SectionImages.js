import React, { Component } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { withViewport } from '../../util/contextHelpers';
import { ResponsiveImage, Modal, ImageCarousel } from '../../components';
import ActionBarMaybe from './ActionBarMaybe';

import css from './ListingPage.css';

const GALLERY_TWO_COLUMNS = 1128;
const GALLERY_ONE_COLUMN = 740;

class SectionImages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHovered: false,
    };
  }

  render() {
    const {
      title,
      listing,
      isOwnListing,
      editParams,
      handleViewPhotosClick,
      imageCarouselOpen,
      onImageCarouselClose,
      onManageDisableScrolling,
      viewport,
    } = this.props;
    const { isHovered } = this.state;

    const hasImages = listing.images && listing.images.length > 0;
    const firstImage = hasImages ? listing.images[0] : null;

    // Action bar is wrapped with a div that prevents the click events
    // to the parent that would otherwise open the image carousel
    const actionBar = listing.id ? (
      <div onClick={e => e.stopPropagation()}>
        <ActionBarMaybe isOwnListing={isOwnListing} listing={listing} editParams={editParams} />
      </div>
    ) : null;

    const viewPhotosButton = hasImages ? (
      <button className={css.viewPhotos} onClick={handleViewPhotosClick}>
        <FormattedMessage
          id="ListingPage.viewImagesButton"
          values={{ count: listing.images.length }}
        />
      </button>
    ) : null;

    const gallerySecondaryColumns =
      listing.images && listing.images.length >= 5 && viewport.width > GALLERY_TWO_COLUMNS
        ? 2
        : listing.images && listing.images.length >= 3 && viewport.width > GALLERY_ONE_COLUMN
        ? 1
        : 0;

    const imageProps = {
      variants: ['landscape-crop', 'landscape-crop2x', 'landscape-crop4x', 'landscape-crop6x'],
      alt: title,
      rootClassName: classNames(css.rootForImage, isHovered && css.hoveredImage),
    };

    let galleryColumns = [];
    if (gallerySecondaryColumns > 0)
      for (let i = 1; i <= gallerySecondaryColumns; i++) {
        galleryColumns.push(
          <div className={css.galleryColumn}>
            <div className={css.gallerySecondaryImageContainer}>
              <ResponsiveImage image={listing.images[i * 2]} {...imageProps} />
            </div>
            <div className={css.gallerySecondaryImageContainer}>
              <ResponsiveImage image={listing.images[i * 2 - 1]} {...imageProps} />
            </div>
          </div>
        );
      }

    return (
      <div className={css.sectionImages}>
        <div className={css.threeToTwoWrapper}>
          <div className={css.aspectWrapper} onClick={handleViewPhotosClick}>
            {actionBar}
            <div
              className={css.galleryImagesWrapper}
              onMouseEnter={() => this.setState({ isHovered: true })}
              onMouseLeave={() => this.setState({ isHovered: false })}
            >
              <div className={css.galleryMainImageContainer}>
                <ResponsiveImage image={firstImage} {...imageProps} />
              </div>
              {galleryColumns}
            </div>
            {viewPhotosButton}
          </div>
        </div>
        <Modal
          id="ListingPage.imageCarousel"
          scrollLayerClassName={css.carouselModalScrollLayer}
          containerClassName={css.carouselModalContainer}
          lightCloseButton
          isOpen={imageCarouselOpen}
          onClose={onImageCarouselClose}
          onManageDisableScrolling={onManageDisableScrolling}
        >
          <ImageCarousel images={listing.images} />
        </Modal>
      </div>
    );
  }
}
export default withViewport(SectionImages);
