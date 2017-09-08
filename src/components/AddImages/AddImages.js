/**
 * Creates a sortable image grid with children added to the end of the created grid.
 *
 * Example:
 * // images = [{ id: 'tempId', imageId: 'realIdFromAPI', file: File }];
 * <AddImages images={images}>
 *   <input type="file" accept="images/*" onChange={handleChange} />
 * </AddImages>
 */
import React, { PropTypes } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import classNames from 'classnames';
import { ImageFromFile, ResponsiveImage, SpinnerIcon } from '../../components';

import css from './AddImages.css';
import RemoveImageButton from './RemoveImageButton';

const ThumbnailWrapper = props => {
  const { className, image, savedImageAltText, onRemoveImage } = props;
  const handleRemoveClick = e => {
    e.stopPropagation();
    onRemoveImage(image.id);
  };

  if (image.file) {
    // Add remove button only when the image has been uploaded and can be removed
    const removeButton = image.imageId ? <RemoveImageButton onClick={handleRemoveClick} /> : null;

    // While image is uploading we show overlay on top of thumbnail
    const uploadingOverlay = !image.imageId
      ? <div className={css.thumbnailLoading}><SpinnerIcon /></div>
      : null;

    return (
      <ImageFromFile
        id={image.id}
        className={className}
        rootClassName={css.thumbnail}
        file={image.file}
      >
        {removeButton}
        {uploadingOverlay}
      </ImageFromFile>
    );
  } else {
    const classes = classNames(css.thumbnail, className);
    return (
      <div className={classes}>
        <div className={css.threeToTwoWrapper}>
          <div className={css.aspectWrapper}>
            <ResponsiveImage
              rootClassName={css.rootForImage}
              image={image}
              alt={savedImageAltText}
              nameSet={[
                { name: 'landscape-crop', size: '400w' },
                { name: 'landscape-crop2x', size: '800w' },
              ]}
              sizes="100%"
            />
          </div>
          <RemoveImageButton onClick={handleRemoveClick} />
        </div>
      </div>
    );
  }
};

ThumbnailWrapper.defaultProps = { className: null };

const { array, func, node, string, object } = PropTypes;

ThumbnailWrapper.propTypes = {
  className: string,
  image: object.isRequired,
  savedImageAltText: string.isRequired,
  onRemoveImage: func.isRequired,
};

// Sorting is disabled temporarily.
//
// The issue with sorting is that in touch devices it makes
// scrolling the page really hard. The image takes 100% of the width
// of the device (minus margin) and thus the whole screen is filled
// up with the sortable images. When the user tries to scroll by dragging
// the finger on the device, it actually start to sort the images and
// not scroll.
//
// TODO Think what to do with the scrolling issue when sorting is in use
//
const SortableImage = ThumbnailWrapper;

// Create container where there are sortable images and passed children like "Add image" input etc.
const SortableImages = SortableContainer(props => {
  const {
    children,
    className,
    thumbnailClassName,
    images,
    savedImageAltText,
    onRemoveImage,
  } = props;
  const classes = classNames(css.root, className);
  return (
    <div className={classes}>
      {images.map((image, index) => {
        return (
          <SortableImage
            image={image}
            index={index}
            key={image.id.uuid || image.id}
            className={thumbnailClassName}
            savedImageAltText={savedImageAltText}
            onRemoveImage={onRemoveImage}
          />
        );
      })}
      {children}
    </div>
  );
});

// Configure sortable container see. https://github.com/clauderic/react-sortable-hoc
// Items can be sorted horizontally, vertically or in a grid.
// axis="xy" means grid like sorting
const AddImages = props => {
  return <SortableImages axis="xy" {...props} />;
};

AddImages.defaultProps = { className: null, thumbnailClassName: null, images: [] };

AddImages.propTypes = {
  images: array,
  children: node.isRequired,
  className: string,
  thumbnailClassName: string,
  onSortEnd: func.isRequired,
  savedImageAltText: string.isRequired,
  onRemoveImage: func.isRequired,
};

export default AddImages;
