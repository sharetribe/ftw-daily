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
import { Promised } from '../../components';
import css from './AddImages.css';

// readImage returns a promise which is resolved
// when FileReader has loaded given file as dataURL
const readImage = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = e => resolve(e.target.result);
  reader.onerror = e => {
    // eslint-disable-next-line
    console.error(`Error ${e} happened while reading ${file.name}: ${e.target.result}`);
    reject(new Error(`Error reading ${file.name}: ${e.target.result}`));
  };
  reader.readAsDataURL(file);
});

const AddImages = props => {
  const { children, images } = props;
  return (
    <div className={css.imagesContainer}>
      {images.map(i => {
        // While image is uploading we show overlay on top of thumbnail
        const uploadingOverlay = !i.imageId
          ? <div className={css.thumbnailLoading}>Uploading</div>
          : null;
        return (
          <Promised
            key={i.id}
            promise={readImage(i.file)}
            renderFulfilled={dataURL => {
              return (
                <div className={css.thumbnail}>
                  <img
                    src={dataURL}
                    alt={encodeURIComponent(i.file.name)}
                    className={css.thumbnailImage}
                  />
                  {uploadingOverlay}
                </div>
              );
            }}
            renderRejected={() => <div className={css.thumbnail}>Could not read file</div>}
          />
        );
      })}
      {children}
    </div>
  );
};

AddImages.defaultProps = { images: [] };

const { array, node } = PropTypes;

AddImages.propTypes = {
  images: array,
  children: node.isRequired,
};

export default AddImages;
