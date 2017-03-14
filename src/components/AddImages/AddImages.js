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
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Promised } from '../../components';
import css from './AddImages.css';

// readImage returns a promise which is resolved
// when FileReader has loaded given file as dataURL
const readImage = file => new Promise((resolve, reject) => {
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
    const { file, id, imageId } = this.props;
    // While image is uploading we show overlay on top of thumbnail
    const uploadingOverlay = !imageId
      ? <div className={css.thumbnailLoading}>Uploading</div>
      : null;
    return (
      <Promised
        key={id}
        promise={this.state.promisedImage}
        renderFulfilled={dataURL => {
          return (
            <li className={css.thumbnail}>
              <img src={dataURL} alt={file.name} className={css.thumbnailImage} />
              {uploadingOverlay}
            </li>
          );
        }}
        renderRejected={() => <li className={css.thumbnail}>Could not read file</li>}
      />
    );
  }
}

Thumbnail.defaultProps = { imageId: null };

const { any, array, func, node, string } = PropTypes;

Thumbnail.propTypes = {
  file: any.isRequired,
  id: string.isRequired,
  imageId: string,
};

const SortableImage = SortableElement(Thumbnail);

// Create container where there are sortable images and passed children like "Add image" input etc.
const SortableImages = SortableContainer(props => {
  const { children, images } = props;
  return (
    <ol className={css.imagesContainer}>
      {images.map((image, index) => <SortableImage {...image} index={index} key={image.id} />)}
      {children}
    </ol>
  );
});

// Configure sortable container see. https://github.com/clauderic/react-sortable-hoc
// Items can be sorted horizontally, vertically or in a grid.
// axis="xy" means grid like sorting
const AddImages = props => {
  return <SortableImages axis="xy" {...props} />;
};

AddImages.defaultProps = { images: [] };

AddImages.propTypes = {
  images: array,
  children: node.isRequired,
  onSortEnd: func.isRequired,
};

export default AddImages;
