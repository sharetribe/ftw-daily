/**
 * Creates a sortable image grid with children added to the end of the created grid.
 *
 * Example:
 * // images = [{ id: 'tempId', imageId: 'realIdFromAPI', file: File }];
 * <AddImages images={images}>
 *   <input type="file" accept="images/*" onChange={handleChange} />
 * </AddImages>
 */
import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { SortableContainer } from 'react-sortable-hoc';
import classNames from 'classnames';
import { Promised, ResponsiveImage } from '../../components';
import { uuid } from '../../util/propTypes';
import css from './AddImages.css';

const RemoveImageButton = props => {
  const { onClick } = props;
  return (
    <button className={css.removeImage} onClick={onClick}>
      <svg
        width="10px"
        height="10px"
        viewBox="0 0 10 10"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g strokeWidth="1" fillRule="evenodd">
          <g transform="translate(-821.000000, -311.000000)">
            <g transform="translate(809.000000, 299.000000)">
              <path
                d="M21.5833333,16.5833333 L17.4166667,16.5833333 L17.4166667,12.4170833 C17.4166667,12.1866667 17.2391667,12 17.00875,12 C16.77875,12 16.5920833,12.18625 16.5920833,12.41625 L16.5883333,16.5833333 L12.4166667,16.5833333 C12.18625,16.5833333 12,16.7695833 12,17 C12,17.23 12.18625,17.4166667 12.4166667,17.4166667 L16.5875,17.4166667 L16.5833333,21.5829167 C16.5829167,21.8129167 16.7691667,21.9995833 16.9991667,22 L16.9995833,22 C17.2295833,22 17.41625,21.81375 17.4166667,21.58375 L17.4166667,17.4166667 L21.5833333,17.4166667 C21.8133333,17.4166667 22,17.23 22,17 C22,16.7695833 21.8133333,16.5833333 21.5833333,16.5833333"
                transform="translate(17.000000, 17.000000) rotate(-45.000000) translate(-17.000000, -17.000000) "
              />
            </g>
          </g>
        </g>
      </svg>
    </button>
  );
};

const { any, array, func, node, string, object } = PropTypes;

RemoveImageButton.propTypes = { onClick: func.isRequired };

// readImage returns a promise which is resolved
// when FileReader has loaded given file as dataURL
const readImage = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = e => {
      // eslint-disable-next-line
      console.error('Error (', e, `) happened while reading ${file.name}: ${e.target.result}`);
      reject(new Error(`Error reading ${file.name}: ${e.target.result}`));
    };
    reader.readAsDataURL(file);
  });

// Create sortable elments out of given thumbnail file
class Thumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promisedImage: readImage(this.props.file),
    };
  }

  render() {
    const { className, file, id, imageId, onRemoveImage } = this.props;

    const handleRemoveClick = e => {
      e.preventDefault();
      onRemoveImage(id);
    };

    // While image is uploading we show overlay on top of thumbnail
    const uploadingOverlay = !imageId
      ? <div className={css.thumbnailLoading}><FormattedMessage id="AddImages.upload" /></div>
      : null;
    const removeButton = imageId ? <RemoveImageButton onClick={handleRemoveClick} /> : null;
    const classes = classNames(css.thumbnail, className);
    return (
      <Promised
        key={id}
        promise={this.state.promisedImage}
        renderFulfilled={dataURL => {
          return (
            <div className={classes}>
              <div className={css.aspectWrapper}>
                <img src={dataURL} alt={file.name} className={css.rootForImage} />
              </div>
              {removeButton}
              {uploadingOverlay}
            </div>
          );
        }}
        renderRejected={() => (
          <div className={css.thumbnail}><FormattedMessage id="AddImages.couldNotReadFile" /></div>
        )}
      />
    );
  }
}

Thumbnail.defaultProps = { className: null, imageId: null };

Thumbnail.propTypes = {
  className: string,
  file: any.isRequired,
  id: string.isRequired,
  imageId: uuid,
  onRemoveImage: func.isRequired,
};

const ThumbnailWrapper = props => {
  const { className, image, savedImageAltText, onRemoveImage } = props;
  if (image.file) {
    return <Thumbnail className={className} onRemoveImage={onRemoveImage} {...image} />;
  } else {
    const handleRemoveClick = e => {
      e.preventDefault();
      onRemoveImage(image.id);
    };
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
