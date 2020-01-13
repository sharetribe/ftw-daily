import React, { Component } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { withViewport } from '../../util/contextHelpers';
import { ResponsiveImage, Modal, ImageCarousel } from '../../components';
import ActionBarMaybe from './ActionBarMaybe';

import css from './ListingPage.css';

const GALLERY_TWO_COLUMNS = 1128;
const GALLERY_ONE_COLUMN = 740;

const ImageContainer = ({ handleViewPhotosClick, image, ...imageProps }) => (
  <div className={css.gallerySecondaryImageContainer} onClick={handleViewPhotosClick}>
    <ResponsiveImage image={image} {...imageProps} sizes='25vw' />
  </div>
);
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
      selectedImageIndex,
    } = this.props;
    const { isHovered } = this.state;
    const { images } = listing;

    const hasImages = images && images.length > 0;
    const firstImage = hasImages ? images[0] : null;
    const secondImage = hasImages ? images[1] : null;

    // Action bar is wrapped with a div that prevents the click events
    // to the parent that would otherwise open the image carousel
    const actionBar = listing.id ? (
      <div onClick={e => e.stopPropagation()}>
        <ActionBarMaybe isOwnListing={isOwnListing} listing={listing} editParams={editParams} />
      </div>
    ) : null;

    const viewPhotosButton = hasImages ? (
      <button className={css.viewPhotos} onClick={handleViewPhotosClick}>
        <FormattedMessage id="ListingPage.viewImagesButton" values={{ count: images.length }} />
      </button>
    ) : null;

    const gallerySecondaryColumns =
      images && images.length >= 5 && viewport.width > GALLERY_TWO_COLUMNS
        ? 2
        : images && images.length >= 3 && viewport.width > GALLERY_ONE_COLUMN
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
            <ImageContainer
              image={images[i * 2 - 1]}
              handleViewPhotosClick={e => handleViewPhotosClick(e, i * 2 - 1)}
              {...imageProps}
            />
            <ImageContainer
              image={images[i * 2]}
              handleViewPhotosClick={e => handleViewPhotosClick(e, i * 2)}
              {...imageProps}
            />
          </div>
        );
      }

    return (
      <div className={css.sectionImages}>
        <div className={css.threeToTwoWrapper}>
          <div className={css.aspectWrapper}>
            {actionBar}
            <div
              className={css.galleryImagesWrapper}
              onMouseEnter={() => this.setState({ isHovered: true })}
              onMouseLeave={() => this.setState({ isHovered: false })}
            >
              <div
                className={css.galleryMainImageContainer}
                onClick={e => handleViewPhotosClick(e, 0)}
              >
                <ResponsiveImage image={firstImage} {...imageProps} sizes='75vw' />
              </div>
              {secondImage && !gallerySecondaryColumns && (<div
                className={css.galleryMainImageContainer}
                onClick={e => handleViewPhotosClick(e, 1)}
              >
                <ResponsiveImage image={secondImage} {...imageProps} sizes='75vw' />

              </div>)}

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
          {imageCarouselOpen && (
            <ImageCarousel selectedImageIndex={selectedImageIndex} images={images} />
          )}
        </Modal>
      </div>
    );
  }
}
export default withViewport(SectionImages);
